/**
 * Ultra-Reliable Dual-Engine Royal Audio Controller for Wedding Song
 * Primary Track: "Bismillah · Tere Naam Se Shuru Hua (Vocals Only - Without Music)"
 * from YouTube (Kailash Kher & Munawar Masoom)
 * 1. Primary Engine: HTML5 Audio with 320kbps MP3 ("/music/wedding-song.mp3")
 * 2. Secondary Engine: Web Audio API AudioBuffer playback (decodes raw MP3 bytes directly)
 *    Bypasses mobile browser HTMLMediaElement sandbox restrictions
 * 3. Tertiary Engine: Procedural Web Audio Oud & Ney ambient synthesizer
 * 
 * Includes global user-gesture auto-unlock for seamless mobile & desktop experience.
 */

export interface WeddingTrack {
  id: string;
  title: string;
  subtitle: string;
  artist: string;
  durationSec: number;
  url: string;
}

export const WEDDING_TRACKS: WeddingTrack[] = [
  {
    id: 'wedding-song',
    title: 'Music',
    subtitle: '',
    artist: '',
    durationSec: 217,
    url: '/music/wedding-song.mp3',
  },
];

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  currentTrack: WeddingTrack;
  isBuffering: boolean;
}

type AudioListener = (playing: boolean, state: AudioPlayerState) => void;

class ArabicAudioController {
  private audioElement: HTMLAudioElement | null = null;
  private audioCtx: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private bufferSource: AudioBufferSourceNode | null = null;
  private decodedBuffers: Map<string, AudioBuffer> = new Map();
  private isBufferPlaying: boolean = false;
  private isPlaying: boolean = false;
  private isBuffering: boolean = false;
  private isUsingSynth: boolean = false;
  private synthTimer: number | null = null;
  private volume: number = 0.9;
  private listeners: Set<AudioListener> = new Set();
  private userHasInteracted: boolean = false;
  private currentTrackIndex: number = 0;
  private currentTime: number = 0;
  private timeUpdateInterval: number | null = null;

  // Traditional Arabic modal scale for fallback
  private readonly oudScale: number[] = [
    146.83, 155.56, 185.00, 196.00, 220.00, 233.08, 261.63, 293.66, 311.13, 369.99, 392.00, 440.00
  ];
  private readonly motifs: number[][] = [
    [0, 2, 3, 4, 7, 4, 3, 2],
    [3, 4, 5, 7, 8, 7, 5, 4],
    [7, 9, 8, 7, 5, 4, 3, 2],
    [0, 3, 4, 7, 4, 2, 1, 0],
  ];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioElement();
      this.preloadAudioBuffer(this.getCurrentTrack().url, this.getCurrentTrack().id);
      this.setupGlobalUnlock();
    }
  }

  public getCurrentTrack(): WeddingTrack {
    return WEDDING_TRACKS[this.currentTrackIndex] || WEDDING_TRACKS[0];
  }

  public getTracks(): WeddingTrack[] {
    return WEDDING_TRACKS;
  }

  public getState(): AudioPlayerState {
    const track = this.getCurrentTrack();
    const duration =
      this.audioElement && !isNaN(this.audioElement.duration) && this.audioElement.duration > 0
        ? this.audioElement.duration
        : track.durationSec;

    return {
      isPlaying: this.isPlaying,
      currentTime: this.currentTime,
      duration,
      volume: this.volume,
      currentTrack: track,
      isBuffering: this.isBuffering,
    };
  }

  private initAudioElement() {
    try {
      const track = this.getCurrentTrack();
      const audio = new Audio();
      audio.src = track.url;
      audio.loop = true;
      audio.volume = this.volume;
      audio.muted = false;
      audio.preload = 'auto';

      audio.addEventListener('playing', () => {
        this.isPlaying = true;
        this.isBuffering = false;
        this.isUsingSynth = false;
        this.isBufferPlaying = false;
        this.startTimeTracker();
        this.notify();
      });

      audio.addEventListener('waiting', () => {
        this.isBuffering = true;
        this.notify();
      });

      audio.addEventListener('timeupdate', () => {
        this.currentTime = audio.currentTime;
        this.notify();
      });

      audio.addEventListener('pause', () => {
        if (!this.isBufferPlaying && !this.isUsingSynth) {
          this.isPlaying = false;
          this.stopTimeTracker();
          this.notify();
        }
      });

      audio.addEventListener('ended', () => {
        this.currentTime = 0;
        audio.play().catch(() => {});
      });

      audio.addEventListener('error', (e) => {
        console.warn('HTML5 Audio error, will use Web Audio Buffer:', e);
      });

      this.audioElement = audio;
    } catch (err) {
      console.warn('Could not initialize HTMLAudioElement:', err);
    }
  }

  private startTimeTracker() {
    this.stopTimeTracker();
    this.timeUpdateInterval = window.setInterval(() => {
      if (this.audioElement && this.isPlaying) {
        this.currentTime = this.audioElement.currentTime;
        this.notify();
      }
    }, 500);
  }

  private stopTimeTracker() {
    if (this.timeUpdateInterval !== null) {
      window.clearInterval(this.timeUpdateInterval);
      this.timeUpdateInterval = null;
    }
  }

  /**
   * Pre-fetches the MP3 into memory so Web Audio API can decode and play
   * directly if HTML5 Audio encounters platform restrictions
   */
  private async preloadAudioBuffer(url: string, id: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) return;
      const arrayBuffer = await response.arrayBuffer();

      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        if (!this.audioCtx) {
          this.audioCtx = new AudioContextClass();
        }
        this.audioCtx.decodeAudioData(
          arrayBuffer,
          (buffer) => {
            this.decodedBuffers.set(id, buffer);
          },
          (err) => {
            console.warn('decodeAudioData error:', err);
          }
        );
      }
    } catch {
      // Network error, will rely on audio element or synth
    }
  }

  /**
   * Register first user gesture to unlock audio context in Safari / Chrome
   */
  private setupGlobalUnlock() {
    const handleFirstGesture = () => {
      this.userHasInteracted = true;
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume().catch(() => {});
      }
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture, { passive: true });
    window.addEventListener('touchstart', handleFirstGesture, { passive: true });
    window.addEventListener('keydown', handleFirstGesture, { passive: true });
  }

  public subscribe(callback: AudioListener) {
    this.listeners.add(callback);
    callback(this.isPlaying, this.getState());
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notify() {
    const state = this.getState();
    this.listeners.forEach((cb) => cb(this.isPlaying, state));
  }

  private getAudioContext(): AudioContext | null {
    if (!this.audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  /**
   * Play decoded MP3 buffer via Web Audio API
   */
  private playBufferEngine(): boolean {
    const ctx = this.getAudioContext();
    const currentTrackId = this.getCurrentTrack().id;
    const buffer = this.decodedBuffers.get(currentTrackId);
    if (!ctx || !buffer) return false;

    try {
      this.stopBufferEngine();

      if (!this.gainNode) {
        this.gainNode = ctx.createGain();
        this.gainNode.connect(ctx.destination);
      }
      this.gainNode.gain.setValueAtTime(this.volume, ctx.currentTime);

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      source.connect(this.gainNode);
      source.start(0);

      this.bufferSource = source;
      this.isBufferPlaying = true;
      this.isPlaying = true;
      this.notify();
      return true;
    } catch (e) {
      console.warn('Web Audio buffer playback failed:', e);
      return false;
    }
  }

  private stopBufferEngine() {
    if (this.bufferSource) {
      try {
        this.bufferSource.stop();
        this.bufferSource.disconnect();
      } catch {}
      this.bufferSource = null;
    }
    this.isBufferPlaying = false;
  }

  public async play(): Promise<boolean> {
    this.userHasInteracted = true;

    // 1. Ensure audio context is awake
    const ctx = this.getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      await ctx.resume().catch(() => {});
    }

    // 2. Primary: Try HTML5 Audio element
    if (!this.audioElement) {
      this.initAudioElement();
    }

    if (this.audioElement) {
      try {
        this.audioElement.volume = this.volume;
        this.audioElement.muted = false;
        await this.audioElement.play();
        this.isPlaying = true;
        this.isBufferPlaying = false;
        this.isUsingSynth = false;
        this.startTimeTracker();
        this.notify();
        return true;
      } catch (err) {
        console.warn('Primary HTML5 Audio play() failed, trying Web Audio Buffer:', err);
      }
    }

    // 3. Secondary: Try Web Audio Buffer Engine
    const currentTrackId = this.getCurrentTrack().id;
    if (this.decodedBuffers.has(currentTrackId)) {
      const bufferSuccess = this.playBufferEngine();
      if (bufferSuccess) return true;
    }

    // 4. Tertiary: Procedural Acoustic Synthesizer
    this.startSynth();
    return true;
  }

  public pause() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopTimeTracker();
    this.stopBufferEngine();
    this.stopSynth();
    this.notify();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public seek(seconds: number) {
    const maxDur = this.getState().duration;
    const clamped = Math.max(0, Math.min(maxDur, seconds));
    this.currentTime = clamped;
    if (this.audioElement) {
      try {
        this.audioElement.currentTime = clamped;
      } catch {}
    }
    this.notify();
  }

  public switchTrack(trackId: string) {
    const idx = WEDDING_TRACKS.findIndex((t) => t.id === trackId);
    if (idx === -1 || idx === this.currentTrackIndex) return;

    const wasPlaying = this.isPlaying;
    this.pause();

    this.currentTrackIndex = idx;
    this.currentTime = 0;
    const newTrack = this.getCurrentTrack();

    if (this.audioElement) {
      this.audioElement.src = newTrack.url;
      this.audioElement.load();
    } else {
      this.initAudioElement();
    }

    this.preloadAudioBuffer(newTrack.url, newTrack.id);

    if (wasPlaying) {
      this.play().catch(() => {});
    } else {
      this.notify();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
    if (this.gainNode && this.audioCtx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
    }
    this.notify();
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /* ------------------- Fallback Procedural Oud Synth ------------------- */
  private pluckOud(freq: number, time: number, duration: number = 2.4) {
    if (!this.audioCtx || !this.gainNode) return;
    const osc1 = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const noteGain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, time);

    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(freq * 1.002, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(Math.min(freq * 4.2, 3400), time);
    filter.frequency.exponentialRampToValueAtTime(Math.max(freq * 1.1, 280), time + duration);
    filter.Q.setValueAtTime(3.8, time);

    noteGain.gain.setValueAtTime(0.0001, time);
    noteGain.gain.exponentialRampToValueAtTime(0.35, time + 0.015);
    noteGain.gain.exponentialRampToValueAtTime(0.12, time + 0.45);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration);
    osc2.stop(time + duration);
  }

  private startSynth() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    if (!this.gainNode) {
      this.gainNode = ctx.createGain();
      this.gainNode.connect(ctx.destination);
    }
    this.gainNode.gain.setValueAtTime(this.volume, ctx.currentTime);

    this.isUsingSynth = true;
    this.isPlaying = true;
    this.notify();

    let motifIdx = 0;
    let noteIdx = 0;
    const intervalMs = 620;

    const tick = () => {
      if (!this.isPlaying || !this.audioCtx) return;
      const motif = this.motifs[motifIdx % this.motifs.length];
      const scaleIdx = motif[noteIdx % motif.length];
      const freq = this.oudScale[scaleIdx] || 220;
      const now = this.audioCtx.currentTime;

      this.pluckOud(freq, now, 2.2);

      noteIdx++;
      if (noteIdx >= motif.length) {
        noteIdx = 0;
        motifIdx++;
      }
      this.synthTimer = window.setTimeout(tick, intervalMs);
    };

    tick();
  }

  private stopSynth() {
    this.isUsingSynth = false;
    if (this.synthTimer !== null) {
      window.clearTimeout(this.synthTimer);
      this.synthTimer = null;
    }
  }
}

export const arabicAudio = new ArabicAudioController();
