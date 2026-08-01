// ============================================================================
// audio.js - Motor de Audio Chiptune Avanzado
// ============================================================================

export class ChiptuneAudioEngine {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.volume = 0.1;
        this.synthTypes = ['square', 'sawtooth', 'triangle', 'sine'];
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
    }

    playTone(freq, type = 'square', duration = 0.08, vol = null) {
        if (!this.enabled) return;
        this.init();
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        const actualVol = vol !== null ? vol : this.volume;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(actualVol, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    playMelody(notes, tempo = 120) {
        if (!this.enabled) return;
        let currentTime = 0;
        const beatDuration = 60 / tempo;
        
        notes.forEach((note, index) => {
            setTimeout(() => {
                if (typeof note === 'object') {
                    this.playTone(note.freq, note.type || 'square', note.duration || 0.1, note.vol);
                } else if (note === 0) {
                    // Silencio
                } else {
                    this.playTone(note, 'square', beatDuration * 0.8);
                }
            }, currentTime * 1000);
            currentTime += beatDuration;
        });
    }

    playKeyPress() {
        const freqs = [380, 410, 440, 470];
        const randomFreq = freqs[Math.floor(Math.random() * freqs.length)];
        this.playTone(randomFreq, 'triangle', 0.02, 0.02);
    }

    playCmdSuccess() {
        this.playTone(523.25, 'square', 0.05, 0.04);
        setTimeout(() => this.playTone(659.25, 'square', 0.06, 0.04), 50);
    }

    playAffectionUp() {
        this.playTone(523.25, 'sine', 0.08, 0.06);
        setTimeout(() => this.playTone(659.25, 'sine', 0.08, 0.06), 70);
        setTimeout(() => this.playTone(783.99, 'sine', 0.08, 0.06), 140);
        setTimeout(() => this.playTone(1046.50, 'sine', 0.12, 0.08), 210);
    }

    playRomanticSuccess() {
        // Arpegio romántico
        const notes = [523.25, 659.25, 783.99, 1046.50, 783.99, 659.25, 523.25];
        notes.forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 'sine', 0.15, 0.08), i * 100);
        });
    }

    playCombatHit() {
        this.playTone(150, 'sawtooth', 0.1, 0.08);
        setTimeout(() => this.playTone(80, 'sawtooth', 0.15, 0.1), 50);
    }

    playError() {
        this.playTone(200, 'sawtooth', 0.15, 0.1);
        setTimeout(() => this.playTone(150, 'sawtooth', 0.2, 0.1), 100);
    }

    playNotification() {
        this.playTone(880, 'sine', 0.1, 0.05);
    }
}

export const sfx = new ChiptuneAudioEngine();