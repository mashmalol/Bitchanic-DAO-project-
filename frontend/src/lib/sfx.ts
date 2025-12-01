// small WebAudio helper for short 8-bit style beep
export function playBeep({ freq = 880, duration = 0.06, type = 'square', volume = 0.12 } = {}) {
  try {
    const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type as OscillatorType;
    osc.frequency.value = freq;
    gain.gain.value = volume;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    // ramp down quickly to avoid clicks
    gain.gain.setTargetAtTime(0, ctx.currentTime + duration * 0.6, 0.01);
    setTimeout(() => {
      try { osc.stop(); ctx.close(); } catch (e) { /* ignore */ }
    }, Math.max(50, duration * 1000 + 50));
  } catch (e) {
    // ignore if audio not available
  }
}

export default playBeep;
