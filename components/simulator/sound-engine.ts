'use client';

/**
 * Sample-based engine sound for the city simulator.
 *
 * Uses a looping WAV recorded at BASE_KMH (mid-RPM) and modulates playbackRate
 * to shift pitch as the car accelerates — the same technique used in racing
 * games (Need for Speed, Forza, etc.).
 *
 * The WAV is a physically-modelled V12 exhaust loop generated at build time.
 *
 * Public API
 * ----------
 *   soundEngine.init()            – call once after the first user gesture.
 *   soundEngine.update(speedKmh)  – call every frame.
 *   soundEngine.playTick()        – call on collision / boundary bump.
 *   soundEngine.dispose()         – tear down on unmount.
 */

/** Speed (km/h) at which the sample was baked — playbackRate = 1 here. */
const BASE_KMH = 44; // ~mid-RPM sweet spot of the loop

/** Minimum playbackRate (car barely creeping). */
const RATE_MIN = 0.55;
/** Maximum playbackRate (redline). */
const RATE_MAX = 2.6;

/** km/h that maps to RATE_MAX. */
const KMH_MAX = 122;

const SAMPLE_URL = '/sounds/engine-loop.wav';

class SimulatorSoundEngine {
  private ctx: AudioContext | null = null;

  // ── Looping engine layer ──────────────────────────────────────────────────
  private engineSource: AudioBufferSourceNode | null = null;
  private engineGain: GainNode | null = null;
  private engineBuffer: AudioBuffer | null = null;

  // ── Master ────────────────────────────────────────────────────────────────
  private limiter: DynamicsCompressorNode | null = null;
  private masterGain: GainNode | null = null;

  // ── State ─────────────────────────────────────────────────────────────────
  private prevSpeed = 0;
  private loading = false;
  private started = false;

  // ──────────────────────────────────────────────────────────────────────────

  async init() {
    if (this.ctx) return;
    try {
      this.ctx = new AudioContext();
      this._buildMasterChain();
      await this._loadSample();
    } catch {
      // AudioContext unavailable (SSR / headless) — silently skip
    }
  }

  /** Call every animation frame with the car's current speed in km/h. */
  update(speedKmh: number) {
    if (!this.ctx || !this.engineGain || !this.engineSource || !this.engineBuffer) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;
    const absSpeed = Math.abs(speedKmh);
    const isMoving = absSpeed > 0.5;

    if (ctx.state === 'suspended') ctx.resume();

    // ── Start looping source once buffer is ready and car first moves ────────
    if (!this.started && isMoving) {
      this._startLoop();
    }

    // ── playbackRate: linear map speed → [RATE_MIN, RATE_MAX] ────────────────
    const t = Math.min(absSpeed / KMH_MAX, 1);
    // smoothstep so low-speed feels lazy and top-end surges
    const tSmooth = t * t * (3 - 2 * t);
    const rate = RATE_MIN + tSmooth * (RATE_MAX - RATE_MIN);

    if (this.engineSource) {
      this.engineSource.playbackRate.linearRampToValueAtTime(rate, now + 0.05);
    }

    // ── Volume: fade out when stopped ─────────────────────────────────────────
    const targetGain = isMoving ? 0.78 : 0;
    const fadeTime = isMoving ? 0.10 : 0.55;
    this.engineGain.gain.linearRampToValueAtTime(targetGain, now + fadeTime);

    // ── Collision detection ───────────────────────────────────────────────────
    const dropped = this.prevSpeed - absSpeed;
    if (dropped > 6 && absSpeed < this.prevSpeed * 0.65) this.playTick();
    this.prevSpeed = absSpeed;
  }

  /** Short metallic thud — collision / boundary bump. */
  playTick() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;

    // Body thud (pitch-dropping sine)
    const thud = ctx.createOscillator();
    thud.type = 'sine';
    thud.frequency.setValueAtTime(110, now);
    thud.frequency.exponentialRampToValueAtTime(38, now + 0.14);

    const thudGain = ctx.createGain();
    thudGain.gain.setValueAtTime(0.6, now);
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    thud.connect(thudGain).connect(this.masterGain);
    thud.start(now);
    thud.stop(now + 0.16);

    // Brief metallic transient
    const bufLen = Math.floor(ctx.sampleRate * 0.05);
    const noiseBuf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
    const nd = noiseBuf.getChannelData(0);
    for (let i = 0; i < bufLen; i++) nd[i] = Math.random() * 2 - 1;

    const noiseSrc = ctx.createBufferSource();
    noiseSrc.buffer = noiseBuf;

    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 380;
    bp.Q.value = 2.5;

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.35, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    noiseSrc.connect(bp).connect(noiseGain).connect(this.masterGain);
    noiseSrc.start(now);
    noiseSrc.stop(now + 0.06);
  }

  dispose() {
    try {
      this.engineSource?.stop();
      this.ctx?.close();
    } catch { /* ignore */ }
    this.ctx = null;
    this.engineSource = null;
    this.engineGain = null;
    this.engineBuffer = null;
    this.limiter = null;
    this.masterGain = null;
    this.prevSpeed = 0;
    this.started = false;
    this.loading = false;
  }

  // ── Private ───────────────────────────────────────────────────────────────

  private _buildMasterChain() {
    const ctx = this.ctx!;

    this.masterGain = ctx.createGain();
    this.masterGain.gain.value = 0.9;
    this.masterGain.connect(ctx.destination);

    // True limiter — no peaks, no clipping
    this.limiter = ctx.createDynamicsCompressor();
    this.limiter.threshold.value = -3;
    this.limiter.knee.value = 2;
    this.limiter.ratio.value = 20;
    this.limiter.attack.value = 0.001;
    this.limiter.release.value = 0.05;
    this.limiter.connect(this.masterGain);

    // Engine gain bus (starts silent)
    this.engineGain = ctx.createGain();
    this.engineGain.gain.value = 0;
    this.engineGain.connect(this.limiter);
  }

  private async _loadSample() {
    if (this.loading || !this.ctx) return;
    this.loading = true;
    try {
      const res = await fetch(SAMPLE_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const arrayBuf = await res.arrayBuffer();
      this.engineBuffer = await this.ctx.decodeAudioData(arrayBuf);
    } catch (e) {
      console.warn('[SoundEngine] Could not load engine sample:', e);
    }
    this.loading = false;
  }

  private _startLoop() {
    if (!this.ctx || !this.engineBuffer || !this.engineGain) return;
    const src = this.ctx.createBufferSource();
    src.buffer = this.engineBuffer;
    src.loop = true;
    src.loopStart = 0;
    src.loopEnd = this.engineBuffer.duration;
    src.playbackRate.value = RATE_MIN;
    src.connect(this.engineGain);
    src.start();
    this.engineSource = src;
    this.started = true;
  }
}

export const soundEngine = new SimulatorSoundEngine();
