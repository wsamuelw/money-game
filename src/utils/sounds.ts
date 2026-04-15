class SoundManager {
  private audioCtx: AudioContext | null = null;

  private init() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playCoinDrop() {
    try {
      this.init();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(2000, this.audioCtx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.1);
      
      osc.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);
      
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.1);
    } catch (e) {
      console.error('Audio error', e);
    }
  }

  playSuccess() {
    try {
      this.init();
      if (!this.audioCtx) return;
      
      const playNote = (freq: number, timeOffset: number) => {
        const osc = this.audioCtx!.createOscillator();
        const gainNode = this.audioCtx!.createGain();
        
        osc.type = 'triangle';
        osc.frequency.value = freq;
        
        gainNode.gain.setValueAtTime(0, this.audioCtx!.currentTime + timeOffset);
        gainNode.gain.linearRampToValueAtTime(0.2, this.audioCtx!.currentTime + timeOffset + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx!.currentTime + timeOffset + 0.3);
        
        osc.connect(gainNode);
        gainNode.connect(this.audioCtx!.destination);
        
        osc.start(this.audioCtx!.currentTime + timeOffset);
        osc.stop(this.audioCtx!.currentTime + timeOffset + 0.3);
      };

      playNote(440, 0); // A4
      playNote(554.37, 0.1); // C#5
      playNote(659.25, 0.2); // E5
      playNote(880, 0.3); // A5
    } catch (e) {
      console.error('Audio error', e);
    }
  }

  playError() {
    try {
      this.init();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, this.audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(100, this.audioCtx.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.2, this.audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.2);
      
      osc.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);
      
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.2);
    } catch (e) {
      console.error('Audio error', e);
    }
  }
}

export const sounds = new SoundManager();
