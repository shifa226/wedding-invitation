import math
import struct
import wave
import subprocess
import os

sample_rate = 44100
bpm = 72
beat_duration = 60.0 / bpm
bar_duration = beat_duration * 4 # 4/4 meter
total_bars = 16
total_duration = bar_duration * total_bars # ~53 seconds looping composition
total_samples = int(sample_rate * total_duration)

# Maqam Hijaz in D:
# D3, Eb3, F#3, G3, A3, Bb3, C4, D4, Eb4, F#4, G4, A4, Bb4, C5, D5
scale_freqs = {
    'D2': 73.42,
    'A2': 110.00,
    'D3': 146.83,
    'Eb3': 155.56,
    'Fs3': 185.00,
    'G3': 196.00,
    'A3': 220.00,
    'Bb3': 233.08,
    'C4': 261.63,
    'D4': 293.66,
    'Eb4': 311.13,
    'Fs4': 369.99,
    'G4': 392.00,
    'A4': 440.00,
    'Bb4': 466.16,
    'C5': 523.25,
    'D5': 587.33,
}

left_channel = [0.0] * total_samples
right_channel = [0.0] * total_samples

def add_sound(samples_L, samples_R, start_time, duration, gen_fn, vol=1.0, pan=0.5):
    start_sample = int(start_time * sample_rate)
    end_sample = min(total_samples, start_sample + int(duration * sample_rate))
    pan_L = math.cos(pan * math.pi / 2.0)
    pan_R = math.sin(pan * math.pi / 2.0)
    
    for i in range(start_sample, end_sample):
        t = (i - start_sample) / sample_rate
        val = gen_fn(t, duration) * vol
        samples_L[i] += val * pan_L
        samples_R[i] += val * pan_R

def oud_note(freq):
    def synth(t, dur):
        # Quick attack, warm acoustic pluck with slight harmonic body
        env = math.exp(-t * 3.5) * (1.0 - math.exp(-t * 120.0))
        h1 = math.sin(2 * math.pi * freq * t)
        h2 = 0.5 * math.sin(2 * math.pi * freq * 2.004 * t)
        h3 = 0.25 * math.sin(2 * math.pi * freq * 3.008 * t)
        body = 0.15 * math.sin(2 * math.pi * freq * 0.5 * t)
        return (h1 + h2 + h3 + body) * env
    return synth

def ney_note(freq):
    def synth(t, dur):
        # Breathy attack, soft vibrato
        env = (1.0 - math.exp(-t * 8.0)) * (1.0 - math.exp(-(dur - t) * 6.0)) if dur - t > 0 else 0
        vibrato = 1.0 + 0.015 * math.sin(2 * math.pi * 5.0 * t) if t > 0.3 else 1.0
        f = freq * vibrato
        h1 = math.sin(2 * math.pi * f * t)
        h2 = 0.3 * math.sin(2 * math.pi * f * 2.0 * t)
        noise = (math.sin(t * 12345.67) % 0.1) * 0.15 * env
        return (h1 + h2 + noise) * max(0.0, env)
    return synth

def strings_chord(freqs):
    def synth(t, dur):
        env = (1.0 - math.exp(-t * 2.5)) * (1.0 - math.exp(-(dur - t) * 2.5)) if dur - t > 0 else 0
        acc = 0.0
        for f in freqs:
            acc += math.sin(2 * math.pi * f * t) + 0.3 * math.sin(2 * math.pi * f * 2.0 * t)
        return (acc / len(freqs)) * max(0.0, env)
    return synth

def doumbek_dum(t, dur):
    env = math.exp(-t * 7.0)
    pitch_env = 85.0 * math.exp(-t * 25.0) + 55.0
    return math.sin(2 * math.pi * pitch_env * t) * env

def doumbek_tek(t, dur):
    env = math.exp(-t * 22.0)
    noise = (math.sin(t * 87654.3) % 0.3)
    tone = math.sin(2 * math.pi * 320.0 * t)
    return (noise * 0.6 + tone * 0.4) * env

# 1. Warm String Chords across all bars
chords_prog = [
    ['D3', 'A3', 'D4', 'Fs4'],
    ['G3', 'D4', 'G4', 'Bb4'],
    ['Eb3', 'Bb3', 'Eb4', 'G4'],
    ['D3', 'A3', 'Fs4', 'A4'],
]

for b in range(total_bars):
    t_bar = b * bar_duration
    chord = chords_prog[b % len(chords_prog)]
    freqs = [scale_freqs[n] for n in chord]
    add_sound(left_channel, right_channel, t_bar, bar_duration, strings_chord(freqs), vol=0.22, pan=0.5)

# 2. Percussion (Gentle Malfuf / Maqsum Arabic rhythm)
for b in range(total_bars):
    t_bar = b * bar_duration
    # Dum on beat 1 (t=0)
    add_sound(left_channel, right_channel, t_bar, 0.6, doumbek_dum, vol=0.35, pan=0.48)
    # Tek on beat 2.5
    add_sound(left_channel, right_channel, t_bar + beat_duration * 1.5, 0.3, doumbek_tek, vol=0.18, pan=0.58)
    # Dum on beat 3
    add_sound(left_channel, right_channel, t_bar + beat_duration * 2.0, 0.6, doumbek_dum, vol=0.28, pan=0.48)
    # Tek on beat 4
    add_sound(left_channel, right_channel, t_bar + beat_duration * 3.0, 0.3, doumbek_tek, vol=0.22, pan=0.58)
    # Soft syncopated accent
    add_sound(left_channel, right_channel, t_bar + beat_duration * 3.5, 0.25, doumbek_tek, vol=0.14, pan=0.62)

# 3. Oud & Kanun Melody Motifs (Traditional Arabesque Wedding phrases)
melody_phrases = [
    # Phrase 1: Majestic Ascent
    [('D4', 1.0), ('Fs4', 0.5), ('G4', 0.5), ('A4', 1.5), ('G4', 0.5), ('Fs4', 0.5), ('Eb4', 0.5), ('D4', 2.0)],
    # Phrase 2: Playful ornamentation
    [('A4', 1.0), ('Bb4', 0.5), ('C5', 0.5), ('D5', 1.5), ('C5', 0.5), ('Bb4', 0.5), ('A4', 1.0), ('G4', 1.5)],
    # Phrase 3: Deep emotional descent
    [('G4', 0.75), ('A4', 0.25), ('Bb4', 0.5), ('A4', 0.5), ('G4', 0.5), ('Fs4', 0.5), ('Eb4', 0.75), ('Fs4', 0.25), ('D4', 3.0)],
    # Phrase 4: Resonant Cadence
    [('D3', 0.5), ('A3', 0.5), ('D4', 1.0), ('Fs4', 1.0), ('Eb4', 0.5), ('D4', 2.5)],
]

cur_t = 0.5
while cur_t < total_duration - 4.0:
    p_idx = int(cur_t / (bar_duration * 2)) % len(melody_phrases)
    phrase = melody_phrases[p_idx]
    
    for note, dur in phrase:
        f = scale_freqs[note]
        # Main Oud Pluck
        add_sound(left_channel, right_channel, cur_t, dur * 1.5, oud_note(f), vol=0.48, pan=0.38)
        # Occasional Ney counter-melody on sustained notes
        if dur >= 1.5:
            add_sound(left_channel, right_channel, cur_t + 0.2, dur * 0.9, ney_note(f), vol=0.28, pan=0.65)
        cur_t += dur * beat_duration * 0.85
    cur_t += beat_duration * 1.0

# Normalize and write to temporary WAV
max_val = max(max(abs(x) for x in left_channel), max(abs(x) for x in right_channel), 0.001)
gain = 0.88 / max_val

wav_path = '/tmp/arabic_wedding_song.wav'
mp3_path = '/public/music/wedding-song.mp3'

with wave.open(wav_path, 'w') as wf:
    wf.setnchannels(2)
    wf.setsampwidth(2)
    wf.setframerate(sample_rate)
    frames = bytearray()
    for i in range(total_samples):
        # Fade in first 1.5 sec and fade out last 2.0 sec for seamless looping
        t_sec = i / sample_rate
        fade = 1.0
        if t_sec < 1.5:
            fade = t_sec / 1.5
        elif t_sec > total_duration - 2.0:
            fade = (total_duration - t_sec) / 2.0
            
        sL = int(max(-32767, min(32767, left_channel[i] * gain * fade * 32767)))
        sR = int(max(-32767, min(32767, right_channel[i] * gain * fade * 32767)))
        frames.extend(struct.pack('<hh', sL, sR))
    wf.writeframes(frames)

# Convert to high-quality MP3 using ffmpeg
os.makedirs('/public/music', exist_ok=True)
cmd = f"ffmpeg -y -i {wav_path} -codec:a libmp3lame -b:a 192k {mp3_path}"
subprocess.run(cmd, shell=True, check=True)
print("SUCCESS: Generated /public/music/wedding-song.mp3")
