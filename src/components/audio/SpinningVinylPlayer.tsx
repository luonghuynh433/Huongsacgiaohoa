import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause, Disc3, Sparkles } from 'lucide-react';
import { teaAudio, REGIONAL_TRACKS } from '@/services/teaAudioService';

interface SpinningVinylPlayerProps {
  initialRegion?: 'bac' | 'trung' | 'nam';
  className?: string;
}

export const SpinningVinylPlayer: React.FC<SpinningVinylPlayerProps> = ({
  initialRegion,
  className = '',
}) => {
  const [audioState, setAudioState] = useState(teaAudio.getState());
  const [isControlsOpen, setIsControlsOpen] = useState(false);

  useEffect(() => {
    // Nếu có chỉ định vùng miền ban đầu và đang khác track hiện tại, chuyển sang track đó
    if (initialRegion) {
      const targetIndex = REGIONAL_TRACKS.findIndex((t) => t.id === initialRegion);
      if (targetIndex >= 0 && targetIndex !== teaAudio.getState().currentTrackIndex) {
        teaAudio.playTrack(targetIndex);
      }
    }

    const unsubscribe = teaAudio.subscribe(() => {
      setAudioState(teaAudio.getState());
    });
    return unsubscribe;
  }, [initialRegion]);

  const { isPlaying, isMuted, volume, currentTrackIndex, currentTrack } = audioState;

  const togglePlay = () => teaAudio.togglePlay();
  const toggleMute = () => teaAudio.toggleMute();
  const handleVolumeChange = (v: number) => teaAudio.setVolume(v);
  const handleSelectTrack = (idx: number) => teaAudio.playTrack(idx);

  return (
    <div className={`relative select-none ${className}`}>
      {/* Hộp điều khiển âm thanh tinh chỉnh mở rộng */}
      <AnimatePresence>
        {isControlsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-24 right-0 w-72 bg-[#10241E]/95 backdrop-blur-md border border-[#C5A059]/60 rounded-sm p-4 text-[#FAF6EE] shadow-2xl z-50"
            style={{
              boxShadow: '0 15px 35px rgba(0,0,0,0.6), inset 0 0 20px rgba(197, 160, 89, 0.1)',
            }}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#C5A059]/30">
              <span className="text-[9px] uppercase tracking-widest text-[#E5B94E] font-sans font-bold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#E5B94E]" />
                Đĩa Nhạc Thiền Trà 432Hz
              </span>
              <button
                type="button"
                onClick={() => setIsControlsOpen(false)}
                className="text-xs text-[#FAF6EE]/60 hover:text-[#FAF6EE] px-1"
              >
                &times;
              </button>
            </div>

            <h4 className="text-sm font-bold font-serif text-[#F4D3AF] truncate">
              {currentTrack.name}
            </h4>
            <p className="text-[10px] text-[#C5A059] font-sans mb-3">
              {currentTrack.scaleName}
            </p>

            {/* Chọn nhanh điệu nhạc 3 miền */}
            <div className="space-y-1 mb-3">
              <span className="text-[9px] uppercase tracking-wider text-[#FAF6EE]/70 font-sans block">
                Giai điệu ba miền:
              </span>
              <div className="grid grid-cols-3 gap-1">
                {REGIONAL_TRACKS.map((t, idx) => {
                  const isCurrent = idx === currentTrackIndex;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => handleSelectTrack(idx)}
                      className={`px-1.5 py-1.5 rounded-xs text-[10px] font-sans transition-all text-center ${
                        isCurrent
                          ? 'bg-[#C5A059] text-[#10241E] font-bold shadow-xs'
                          : 'bg-[#1C3A32] text-[#FAF6EE]/80 hover:bg-[#254F44]'
                      }`}
                    >
                      {t.region}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Thanh trượt âm lượng */}
            <div className="flex items-center gap-2 pt-1 border-t border-[#C5A059]/20">
              <button
                type="button"
                onClick={toggleMute}
                className="text-[#E5B94E] hover:text-[#FFF] transition-colors p-1"
                aria-label={isMuted ? 'Bật âm lượng' : 'Tắt âm lượng'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-[#254F44] rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
              />
              <span className="text-[10px] font-mono text-[#FAF6EE]/80 w-7 text-right">
                {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
              </span>
            </div>

            <p className="text-[9px] text-center text-[#C5A059]/80 italic font-serif mt-3 pt-2 border-t border-[#C5A059]/15">
              &ldquo;Vừa ngắm tranh xưa, vừa nhấp ngụm trà lắng đọng tâm tư.&rdquo;
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VÒNG XOAY ĐĨA NHẠC CHÍNH (VINYL RECORD TURNTABLE) */}
      <div className="flex items-center gap-3">
        {/* Nút bật tắt popover thông tin nhanh */}
        <div className="hidden sm:flex flex-col items-end text-right">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#10241E]/90 backdrop-blur-sm border border-[#C5A059]/50 rounded-full shadow-lg">
            <span
              className={`w-2 h-2 rounded-full ${
                isPlaying ? 'bg-[#5EEAD4] animate-ping' : 'bg-[#9CA3AF]'
              }`}
            />
            <span className="text-[10px] font-sans font-bold text-[#E5B94E] uppercase tracking-wider">
              {isPlaying ? 'Đang ngân vang' : 'Đĩa nhạc thiền trà'}
            </span>
          </div>
          <span className="text-[10px] text-[#FAF6EE]/90 font-serif italic mt-0.5">
            {currentTrack.name}
          </span>
        </div>

        {/* Khối Đĩa Than & Cần Kim (Tonearm) */}
        <div className="relative group cursor-pointer" onClick={togglePlay}>
          {/* Vòng hào quang âm thanh lan tỏa khi nhạc phát */}
          {isPlaying && (
            <>
              <div className="absolute -inset-3 rounded-full bg-[#C5A059]/20 animate-ping pointer-events-none" />
              <div className="absolute -inset-1.5 rounded-full bg-[#E5B94E]/30 animate-pulse pointer-events-none" />
            </>
          )}

          {/* Mặt đĩa than xoay tròn 360 độ */}
          <div
            className={`w-20 h-20 sm:w-22 sm:h-22 rounded-full relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-2xl ${
              isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
            }`}
            style={{
              background: `
                radial-gradient(circle at center, #8A6E1E 0%, #3A2B07 14%, #181919 15%, #0B0C0C 28%, #1D1E1F 30%, #08090A 52%, #1C1D1E 54%, #0A0B0B 72%, #1A1B1C 74%, #050606 100%)
              `,
              boxShadow: '0 8px 25px rgba(0,0,0,0.8), inset 0 0 10px rgba(0,0,0,0.9)',
            }}
          >
            {/* Vệt phản quang ánh sáng rãnh đĩa than */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none opacity-20"
              style={{
                background:
                  'conic-gradient(from 45deg, transparent 0deg, rgba(255,255,255,0.4) 60deg, transparent 120deg, rgba(255,255,255,0.4) 240deg, transparent 300deg)',
              }}
            />

            {/* Nhãn tâm đĩa than dát nhũ vàng */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#C5A059] border-2 border-[#10241E] flex flex-col items-center justify-center relative shadow-inner">
              <Disc3 className="w-4 h-4 text-[#10241E] animate-pulse" />
              {/* Lỗ trục đĩa trung tâm */}
              <div className="w-1.5 h-1.5 rounded-full bg-[#10241E]" />
            </div>

            {/* Icon Play/Pause xuất hiện khi hover */}
            <div className="absolute inset-0 rounded-full bg-[#000]/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              {isPlaying ? (
                <Pause className="w-5 h-5 text-[#FAF6EE] fill-[#FAF6EE]" />
              ) : (
                <Play className="w-5 h-5 text-[#FAF6EE] fill-[#FAF6EE] ml-0.5" />
              )}
            </div>
          </div>

          {/* Cần kim đĩa than (Tonearm) */}
          <div
            className={`absolute -top-1 -right-1 w-6 h-12 pointer-events-none transition-transform duration-500 origin-top-right ${
              isPlaying ? 'rotate-18' : '-rotate-12 opacity-80'
            }`}
          >
            {/* Khớp xoay kim mạ vàng */}
            <div className="w-3 h-3 rounded-full bg-[#C5A059] border border-[#10241E] absolute top-0 right-0 shadow-sm" />
            {/* Cần kim kim loại */}
            <div className="w-0.5 h-10 bg-gradient-to-b from-[#C5A059] to-[#E5E7EB] absolute top-1.5 right-1.5 origin-top" />
            {/* Đầu kim stylus tiếp xúc đĩa */}
            <div className="w-1.5 h-2 bg-[#8A2418] absolute bottom-0 right-0 rounded-xs" />
          </div>
        </div>

        {/* Nút bấm nhỏ mở rộng bảng tinh chỉnh âm nhạc */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsControlsOpen(!isControlsOpen);
          }}
          className="w-8 h-8 rounded-full bg-[#10241E]/90 border border-[#C5A059]/60 flex items-center justify-center text-[#E5B94E] hover:bg-[#1A382F] hover:text-[#FFF] transition-all shadow-md shrink-0"
          title="Tùy chỉnh điệu nhạc & âm lượng"
        >
          <Volume2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

