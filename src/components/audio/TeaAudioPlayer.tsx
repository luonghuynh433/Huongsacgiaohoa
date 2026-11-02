import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, QrCode } from 'lucide-react';
import { teaAudio, REGIONAL_TRACKS } from '@/services/teaAudioService';

export const TeaAudioPlayer = () => {
  const [audioState, setAudioState] = useState(teaAudio.getState());
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const unsubscribe = teaAudio.subscribe(() => {
      setAudioState(teaAudio.getState());
    });
    return unsubscribe;
  }, []);

  const { isPlaying, isMuted, volume, currentTrackIndex, currentTrack } = audioState;

  const togglePlay = () => teaAudio.togglePlay();
  const toggleMute = () => teaAudio.toggleMute();
  const handleVolumeChange = (v: number) => teaAudio.setVolume(v);
  const handleChangeTrack = (idx: number) => teaAudio.playTrack(idx);

  return (
    <aside
      aria-label="Trình phát nhạc thiền trà ba miền"
      className="fixed bottom-6 right-6 z-40 select-none"
    >
      <div
        className={`bg-[#FCFAF5] border border-gold/40 rounded-sm shadow-card transition-all duration-300 relative overflow-hidden ${
          isExpanded ? 'p-4 sm:p-5 w-80' : 'p-2.5'
        }`}
        style={{
          boxShadow: '0 10px 32px rgba(15, 62, 53, 0.2)',
        }}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Tạm dừng thanh âm thiền trà' : 'Phát thanh âm thiền trà'}
            className="w-10 h-10 rounded-full border border-gold/70 bg-teal-dark hover:bg-teal-deep text-gold flex items-center justify-center shrink-0 transition-all duration-300 shadow-paper relative group"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-gold-light fill-gold-light" />
            ) : (
              <Play className="w-4 h-4 text-gold-light fill-gold-light ml-0.5" />
            )}
            {isPlaying && (
              <span className="absolute inset-0 rounded-full border border-gold/60 animate-ping opacity-40 pointer-events-none" />
            )}
          </button>

          {!isExpanded ? (
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-2.5 text-left"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-gold-dark" />
                  <span className="text-[11px] font-bold text-teal-deep uppercase tracking-wider font-sans">
                    Thiền Trà Ba Miền
                  </span>
                </div>
                <p className="text-[10px] text-teal-deep/70 italic font-serif">
                  {isPlaying ? currentTrack.name : 'Chạm để lắng nghe'}
                </p>
              </div>

              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3.5 ml-1">
                  <span className="w-0.5 h-3 bg-gold rounded-full animate-pulse" />
                  <span className="w-0.5 h-2 bg-gold/70 rounded-full animate-pulse delay-75" />
                  <span className="w-0.5 h-3.5 bg-gold rounded-full animate-pulse delay-150" />
                </div>
              )}
            </button>
          ) : (
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-widest text-gold-dark font-sans font-bold flex items-center gap-1">
                  <QrCode className="w-3 h-3 text-gold" />
                  Thiệp Cảm Ơn & Trải Nghiệm
                </span>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="text-xs text-teal-deep/50 hover:text-teal-deep p-0.5 font-sans"
                >
                  &times;
                </button>
              </div>
              <h4 className="text-sm font-bold text-teal-deep truncate font-serif mt-0.5">
                {currentTrack.name}
              </h4>
              <p className="text-[10px] text-gold-dark font-sans font-medium">
                {currentTrack.region}
              </p>
            </div>
          )}
        </div>

        {isExpanded && (
          <div className="mt-3.5 pt-3 border-t border-gold/25 space-y-3">
            {/* Lựa chọn 3 điệu nhạc 3 miền */}
            <div className="space-y-1.5">
              <span className="text-[9px] uppercase tracking-wider text-teal-deep/70 font-sans font-bold block">
                Chọn Điệu Nhạc:
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {REGIONAL_TRACKS.map((t, idx) => {
                  const isCurrent = idx === currentTrackIndex;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleChangeTrack(idx)}
                      className={`px-2 py-2 rounded-sm text-xs font-sans text-center transition-all ${
                        isCurrent
                          ? 'bg-teal-dark text-cream-50 font-bold shadow-xs border border-gold/40'
                          : 'bg-cream-100 text-teal-deep/75 hover:bg-cream-200/50 border border-gold/20'
                      }`}
                    >
                      <span className="block truncate">{t.region}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Thanh chỉnh âm lượng */}
            <div className="flex items-center justify-between text-[10px] text-teal-deep/70 font-sans pt-1">
              <span className="italic font-serif">{currentTrack.scaleName}</span>
              <span className="text-gold-dark uppercase tracking-wider font-semibold">
                {isPlaying ? 'Đang ngân vang' : 'Tạm dừng'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Bật tiếng' : 'Tắt tiếng'}
                className="text-teal-deep/70 hover:text-teal-deep transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-gold-dark" />
                ) : (
                  <Volume2 className="w-4 h-4 text-gold-dark" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-gold/20 rounded-lg appearance-none cursor-pointer accent-gold"
              />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
