"use client";

// Simple Procedural SFX Engine
// No external files needed. Uses Web Audio API to synthesize UI sounds.

let audioCtx: AudioContext | null = null;

const initAudio = () => {
    if (typeof window === 'undefined') return null;
    try {
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContextClass) {
                audioCtx = new AudioContextClass();
            }
        }
    } catch (e) {
        console.warn("AudioContext init failed", e);
        return null; // Silent fail on audio
    }
    return audioCtx;
};

// Generic Sound Generator
const playTone = (freq: number, type: OscillatorType, duration: number, vol: number = 0.05) => {
    const ctx = initAudio();
    if (!ctx) return;

    // Resume context if suspended (browser policy)
    if (ctx.state === 'suspended') {
        ctx.resume().catch(() => { });
    }

    try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Envelope
        gain.gain.setValueAtTime(vol, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch (e) {
        // Ignore specific audio errors
    }
};

export const sfx = {
    hover: () => {
        // Sci-fi high pitched chirp
        playTone(1200, "sine", 0.05, 0.03);
        setTimeout(() => playTone(1800, "sine", 0.05, 0.01), 30);
    },
    click: () => {
        // Mechanical heavy click
        playTone(300, "square", 0.08, 0.05);
        playTone(150, "sawtooth", 0.08, 0.05);
    },
    confirm: () => {
        // Positive major chord
        playTone(440, "sine", 0.2, 0.05); // A4
        setTimeout(() => playTone(554, "sine", 0.2, 0.05), 50); // C#5
        setTimeout(() => playTone(659, "sine", 0.3, 0.05), 100); // E5
    },
    error: () => {
        // Error buzz
        playTone(100, "sawtooth", 0.2, 0.1);
        setTimeout(() => playTone(80, "sawtooth", 0.2, 0.1), 50);
    },
    typing: () => {
        // Minimal click
        const freq = 400 + Math.random() * 200; // variance
        playTone(freq, "triangle", 0.03, 0.03);
    }
};
