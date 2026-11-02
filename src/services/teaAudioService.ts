// Dịch vụ quản lý âm thanh thiền trà 432Hz thống nhất cho toàn bộ nền tảng GENTEA

export interface AudioTrack {
  id: 'bac' | 'trung' | 'nam';
  name: string;
  region: string;
  scaleName: string;
  droneFreq: number;
  frequencies: number[];
  intervalMs: number;
  description: string;
}

export const REGIONAL_TRACKS: AudioTrack[] = [
  {
    id: 'bac',
    name: 'Khúc Thiền Kinh Bắc',
    region: 'Miền Bắc',
    scaleName: 'Giai Điệu Bắc Bộ (432Hz)',
    droneFreq: 110, // A2 (hòa cùng tần số 432Hz)
    frequencies: [146.83, 164.81, 196.0, 220.0, 261.63, 293.66, 329.63, 392.0, 440.0, 523.25],
    intervalMs: 2600,
    description: 'Thanh âm sáo trúc và đàn tranh Kinh Bắc thanh tao, tĩnh lặng như sương sớm đọng trên búp chè non.',
  },
  {
    id: 'trung',
    name: 'Nhã Điệu Cố Đô',
    region: 'Miền Trung',
    scaleName: 'Hơi Điệu Nam Xuân Xứ Huế',
    droneFreq: 130.81, // C3
    frequencies: [130.81, 155.56, 174.61, 196.0, 233.08, 261.63, 311.13, 349.23, 392.0, 466.16],
    intervalMs: 3100,
    description: 'Âm sắc đàn tỳ bà và đàn nguyệt trầm mặc bên dòng sông Hương, hòa quyện hương sen ngát hồ Tịnh Tâm.',
  },
  {
    id: 'nam',
    name: 'Dạ Khúc Phương Nam',
    region: 'Miền Nam',
    scaleName: 'Đờn Ca Tài Tử Miệt Vườn',
    droneFreq: 146.83, // D3
    frequencies: [146.83, 174.61, 196.0, 220.0, 261.63, 293.66, 349.23, 392.0, 440.0, 523.25],
    intervalMs: 2300,
    description: 'Tiếng đàn kìm và đàn bầu dặt dìu, phóng khoáng như làn gió miệt vườn phương Nam nồng hậu.',
  },
];

type AudioListener = () => void;

class TeaAudioService {
  private audioCtx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private droneOsc: OscillatorNode | null = null;
  private intervalId: number | null = null;

  private isPlaying = false;
  private isMuted = false;
  private volume = 0.65;
  private currentTrackIndex = 0;
  private listeners: Set<AudioListener> = new Set();

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
      currentTrackIndex: this.currentTrackIndex,
      currentTrack: REGIONAL_TRACKS[this.currentTrackIndex],
    };
  }

  private initContext() {
    if (!this.audioCtx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtx();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    if (!this.masterGain && this.audioCtx) {
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.audioCtx.currentTime);
      this.masterGain.connect(this.audioCtx.destination);
    }
  }

  private playPluck(freq: number) {
    if (!this.audioCtx || !this.masterGain) return;
    const ctx = this.audioCtx;
    const destination = this.masterGain;

    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.008, ctx.currentTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 3.0);

    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + 3.4);
    osc2.stop(now + 3.4);
  }

  private startSynth() {
    this.initContext();
    if (!this.audioCtx || !this.masterGain) return;
    const ctx = this.audioCtx;
    const master = this.masterGain;
    const track = REGIONAL_TRACKS[this.currentTrackIndex];

    // Dừng drone cũ
    if (this.droneOsc) {
      try {
        this.droneOsc.stop();
        this.droneOsc.disconnect();
      } catch {
        // ignore
      }
      this.droneOsc = null;
    }

    // Drone nền ấm trầm
    const droneOsc = ctx.createOscillator();
    const droneGain = ctx.createGain();
    droneOsc.type = 'sine';
    droneOsc.frequency.setValueAtTime(track.droneFreq, ctx.currentTime);
    droneGain.gain.setValueAtTime(0.025, ctx.currentTime);
    droneOsc.connect(droneGain);
    droneGain.connect(master);
    droneOsc.start();
    this.droneOsc = droneOsc;

    // Nốt dạo đầu
    this.playPluck(track.frequencies[2] || 220);

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = window.setInterval(() => {
      if (!this.isPlaying) return;
      const randomIdx = Math.floor(Math.random() * track.frequencies.length);
      const chosenFreq = track.frequencies[randomIdx];
      if (chosenFreq) {
        this.playPluck(chosenFreq);
      }
    }, track.intervalMs);
  }

  private stopSynth() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.droneOsc) {
      try {
        this.droneOsc.stop();
        this.droneOsc.disconnect();
      } catch {
        // ignore
      }
      this.droneOsc = null;
    }
    if (this.audioCtx && this.audioCtx.state === 'running') {
      this.audioCtx.suspend();
    }
  }

  public play() {
    this.isPlaying = true;
    this.startSynth();
    this.notify();
  }

  public pause() {
    this.isPlaying = false;
    this.stopSynth();
    this.notify();
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public playTrack(trackIdOrIndex: 'bac' | 'trung' | 'nam' | number) {
    let newIndex = 0;
    if (typeof trackIdOrIndex === 'number') {
      newIndex = trackIdOrIndex;
    } else {
      newIndex = REGIONAL_TRACKS.findIndex((t) => t.id === trackIdOrIndex);
      if (newIndex < 0) newIndex = 0;
    }

    this.currentTrackIndex = newIndex;
    if (this.isPlaying) {
      this.stopSynth();
      this.startSynth();
    }
    this.notify();
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.audioCtx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
    }
    this.notify();
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.audioCtx) {
      const targetVol = this.isMuted ? 0 : this.volume;
      this.masterGain.gain.setValueAtTime(targetVol, this.audioCtx.currentTime);
    }
    this.notify();
  }
}

export const teaAudio = new TeaAudioService();

