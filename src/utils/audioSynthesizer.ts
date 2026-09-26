/**
 * Luxury Acoustic Synthesizer for Royal Wedding Ambience
 * Uses Web Audio API to procedurally generate soothing oriental harp and soft strings arpeggios.
 * Requires zero external audio downloads and guarantees 100% reliable offline playback.
 */

class RoyalAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private gainNode: GainNode | null = null;
  private currentStep: number = 0;
  private volume: number = 0.45;
  private onStateChange?: (playing: boolean) => void;

  // D Minor / Hijaz royal modal sequence: [D, F, A, Bb, C#, D, E, F]
  // Frequencies in Hz for a rich acoustic harp timbre
  private readonly melodyScale: number[] = [
    146.83, // D3
    220.00, // A3
    293.66, // D4
    349.23, // F4
    392.00, // G4
    440.00, // A4
    466.16, // Bb4
    554.37, // C#5
    587.33, // D5
    698.46, // F5
    880.00, // A5
  ];

  // Musical phrase patterns (indices into melodyScale)
  private readonly phrases: number[][] = [
    [0, 2, 3, 5, 8, 5, 3, 2],
    [1, 3, 4, 6, 7, 6, 4, 3],
    [0, 2, 4, 5, 7, 8, 10, 8],
    [1, 2, 3, 5, 6, 5, 3, 2],
  ];

  constructor() {
    // Lazy initialization on first user interaction
  }

  public subscribe(callback: (playing: boolean) => void) {
    this.onStateChange = callback;
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Synthesize a single acoustic plucked string note with warm resonance
   */
  private pluckString(freq: number, time: number, duration: number = 2.5, velocity: number = 0.5) {
    if (!this.ctx || !this.gainNode) return;

    const osc = this.ctx.createOscillator();
    const oscHarmonic = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Warm oriental harp timbre
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    oscHarmonic.type = 'sine';
    oscHarmonic.frequency.setValueAtTime(freq * 2, time);

    // Warm low-pass acoustic resonant filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(Math.min(freq * 4.5, 3200), time);
    filter.frequency.exponentialRampToValueAtTime(Math.max(freq * 1.2, 300), time + duration);
    filter.Q.setValueAtTime(3.5, time);

    // Realistic plucked string amplitude envelope (instant attack, gentle decay)
    noteGain.gain.setValueAtTime(0.0001, time);
    noteGain.gain.exponentialRampToValueAtTime(velocity * 0.35, time + 0.02);
    noteGain.gain.exponentialRampToValueAtTime(velocity * 0.15, time + 0.5);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    // Routing
    osc.connect(filter);
    oscHarmonic.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start(time);
    oscHarmonic.start(time);
    osc.stop(time + duration);
    oscHarmonic.stop(time + duration);
  }

  /**
   * Ambient drone bass chord to create royal cathedral/palace depth
   */
  private playWarmDrone(rootFreq: number, time: number, duration: number = 5.0) {
    if (!this.ctx || !this.gainNode) return;

    const bassOsc = this.ctx.createOscillator();
    const droneGain = this.ctx.createGain();
    const bassFilter = this.ctx.createBiquadFilter();

    bassOsc.type = 'sine';
    bassOsc.frequency.setValueAtTime(rootFreq * 0.5, time);

    bassFilter.type = 'lowpass';
    bassFilter.frequency.setValueAtTime(260, time);

    droneGain.gain.setValueAtTime(0.0001, time);
    droneGain.gain.linearRampToValueAtTime(0.08, time + 1.2);
    droneGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    bassOsc.connect(bassFilter);
    bassFilter.connect(droneGain);
    droneGain.connect(this.gainNode);

    bassOsc.start(time);
    bassOsc.stop(time + duration);
  }

  public play() {
    this.initContext();
    if (!this.ctx) return;

    this.isPlaying = true;
    if (this.onStateChange) this.onStateChange(true);

    const stepInterval = 650; // Milliseconds per note for a meditative, elegant tempo
    let phraseIndex = 0;
    let noteInPhrase = 0;

    const tick = () => {
      if (!this.isPlaying || !this.ctx) return;

      const currentPhrase = this.phrases[phraseIndex % this.phrases.length];
      const noteScaleIdx = currentPhrase[noteInPhrase % currentPhrase.length];
      const freq = this.melodyScale[noteScaleIdx] || 293.66;

      const now = this.ctx.currentTime;

      // Every 8 notes, add a warm grounding bass drone
      if (noteInPhrase % 8 === 0) {
        this.playWarmDrone(this.melodyScale[0], now, 5.0);
      }

      // Slightly humanized velocity and duration
      const velocity = 0.4 + Math.sin(this.currentStep * 0.3) * 0.15;
      const duration = 2.2 + Math.random() * 0.6;
      this.pluckString(freq, now, duration, velocity);

      noteInPhrase++;
      if (noteInPhrase >= currentPhrase.length) {
        noteInPhrase = 0;
        phraseIndex++;
      }
      this.currentStep++;

      this.timerId = window.setTimeout(tick, stepInterval);
    };

    tick();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.onStateChange) this.onStateChange(false);
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.ctx && this.gainNode) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const royalAudioPlayer = new RoyalAudioPlayer();
