import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Palette,
  Leaf,
  Sparkles,
  Play,
  Pause,
  Coffee,
  Info,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { FOLK_ARTWORKS, FolkArtwork } from '@/data/folkArtGalleryData';
import { FolkArtworkCanvas } from './FolkArtworkCanvas';
import { SpinningVinylPlayer } from '@/components/audio/SpinningVinylPlayer';

interface FolkArtGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTraditionId?: 'dong-ho' | 'lang-sinh' | 'tranh-kieng';
}

export const FolkArtGalleryModal: React.FC<FolkArtGalleryModalProps> = ({
  isOpen,
  onClose,
  defaultTraditionId = 'dong-ho',
}) => {
  const [selectedTradition, setSelectedTradition] = useState<'dong-ho' | 'lang-sinh' | 'tranh-kieng'>(
    defaultTraditionId
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [isFullView, setIsFullView] = useState(false);
  const [direction, setDirection] = useState<number>(0);

  // Lọc danh sách tranh theo trường phái dân gian đang chọn
  const filteredArtworks = FOLK_ARTWORKS.filter((art) => art.traditionId === selectedTradition);
  const currentArtwork: FolkArtwork = filteredArtworks[currentIndex] || filteredArtworks[0];

  // Khi đổi trường phái, reset về tranh đầu tiên
  useEffect(() => {
    setSelectedTradition(defaultTraditionId);
    setCurrentIndex(0);
    setIsFullView(false);
  }, [defaultTraditionId]);

  const handleSelectTradition = (traditionId: 'dong-ho' | 'lang-sinh' | 'tranh-kieng') => {
    setSelectedTradition(traditionId);
    setCurrentIndex(0);
    setDirection(0);
  };

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredArtworks.length);
  }, [filteredArtworks.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filteredArtworks.length) % filteredArtworks.length);
  }, [filteredArtworks.length]);

  // Hỗ trợ phím tắt bàn phím (Mũi tên trái/phải, ESC, Phím F để toggle full)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'f' || e.key === 'F') setIsFullView((prev) => !prev);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleNext, handlePrev]);

  // Chế độ tự động chuyển tranh (Auto-play slideshow)
  // Khi bật tự động trình chiếu: TỰ ĐỘNG ẨN THÔNG TIN VÀ PHÓNG TO TRANH FULL
  useEffect(() => {
    if (!isOpen || !isAutoPlay) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [isOpen, isAutoPlay, handleNext]);

  const handleToggleAutoPlay = () => {
    const nextState = !isAutoPlay;
    setIsAutoPlay(nextState);
    if (nextState) {
      // Khi bật tự động chuyển tranh -> tự động ẩn thông tin và phóng to ảnh ra full
      setIsFullView(true);
    }
  };

  if (!isOpen) return null;

  // Lấy id vùng miền tương ứng để đồng bộ âm thanh
  const regionTrackId =
    selectedTradition === 'dong-ho' ? 'bac' : selectedTradition === 'lang-sinh' ? 'trung' : 'nam';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#0A1612]/95 backdrop-blur-md flex flex-col justify-between text-[#FAF6EE] select-none">
      {/* 1. THANH TIÊU ĐỀ TRÊN CÙNG (TOP HEADER) */}
      <header
        className={`px-4 sm:px-8 py-3 border-b border-[#C5A059]/30 bg-[#07130F]/90 backdrop-blur-md flex items-center justify-between gap-4 z-20 transition-all duration-300 ${
          isFullView ? 'opacity-85 hover:opacity-100' : ''
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center text-[#E5B94E]">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#E5B94E] font-sans font-bold">
                Phòng Trưng Bày Di Sản
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#5EEAD4]" />
              <span className="hidden sm:inline-block text-[10px] text-[#FAF6EE]/70 font-sans">
                Giấy Dó Nén Bã Trà Tự Nhiên
              </span>
            </div>
            <h2 className="text-sm sm:text-lg font-bold font-serif text-[#FAF6EE]">
              {selectedTradition === 'dong-ho' && 'Tranh Dân Gian Đông Hồ (Bắc Ninh)'}
              {selectedTradition === 'lang-sinh' && 'Tranh Mộc Bản Làng Sình (Cố Đô Huế)'}
              {selectedTradition === 'tranh-kieng' && 'Nghệ Thuật Tranh Kiếng (Nam Bộ)'}
            </h2>
          </div>
        </div>

        {/* Bộ chuyển đổi 3 dòng tranh 3 miền */}
        <div className="hidden md:flex items-center gap-1.5 bg-[#122A22] p-1 rounded-sm border border-[#C5A059]/30">
          <button
            type="button"
            onClick={() => handleSelectTradition('dong-ho')}
            className={`px-3 py-1.5 rounded-xs text-xs font-sans transition-all ${
              selectedTradition === 'dong-ho'
                ? 'bg-[#C5A059] text-[#0A1612] font-bold shadow-xs'
                : 'text-[#FAF6EE]/70 hover:text-[#FAF6EE]'
            }`}
          >
            Đông Hồ (Bắc)
          </button>
          <button
            type="button"
            onClick={() => handleSelectTradition('lang-sinh')}
            className={`px-3 py-1.5 rounded-xs text-xs font-sans transition-all ${
              selectedTradition === 'lang-sinh'
                ? 'bg-[#C5A059] text-[#0A1612] font-bold shadow-xs'
                : 'text-[#FAF6EE]/70 hover:text-[#FAF6EE]'
            }`}
          >
            Làng Sình (Trung)
          </button>
          <button
            type="button"
            onClick={() => handleSelectTradition('tranh-kieng')}
            className={`px-3 py-1.5 rounded-xs text-xs font-sans transition-all ${
              selectedTradition === 'tranh-kieng'
                ? 'bg-[#C5A059] text-[#0A1612] font-bold shadow-xs'
                : 'text-[#FAF6EE]/70 hover:text-[#FAF6EE]'
            }`}
          >
            Tranh Kiếng (Nam)
          </button>
        </div>

        {/* Các nút chức năng phải: Nút Phóng to/Thu nhỏ, Tự động chạy, Số trang, Nút đóng */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* NÚT PHÓNG TO FULL / HIỆN THÔNG TIN */}
          <button
            type="button"
            onClick={() => setIsFullView(!isFullView)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border text-[11px] font-sans transition-all shadow-xs ${
              isFullView
                ? 'bg-[#5EEAD4] text-[#0A1612] border-[#5EEAD4] font-bold'
                : 'bg-[#122A22] text-[#FAF6EE]/80 border-[#C5A059]/40 hover:border-[#C5A059]'
            }`}
            title={isFullView ? 'Thu nhỏ & hiện thông tin (phím F)' : 'Phóng to ảnh full & ẩn thông tin (phím F)'}
          >
            {isFullView ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isFullView ? 'Hiện Thông Tin' : 'Phóng To Toàn Cảnh'}</span>
          </button>

          {/* NÚT TỰ ĐỘNG TRÌNH CHIẾU */}
          <button
            type="button"
            onClick={handleToggleAutoPlay}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border text-[11px] font-sans transition-all ${
              isAutoPlay
                ? 'bg-[#C5A059] text-[#0A1612] border-[#C5A059] font-bold'
                : 'bg-[#122A22] text-[#FAF6EE]/80 border-[#C5A059]/30 hover:border-[#C5A059]'
            }`}
            title="Tự động chuyển tranh sau 6 giây & phóng to toàn màn hình"
          >
            {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Tự Động Trình Chiếu</span>
          </button>

          <span className="text-xs font-serif text-[#E5B94E] px-2 py-1 bg-[#122A22] border border-[#C5A059]/30 rounded-sm">
            {currentIndex + 1} / {filteredArtworks.length}
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng phòng tranh"
            className="w-8 h-8 rounded-full bg-[#122A22] border border-[#C5A059]/40 flex items-center justify-center text-[#FAF6EE]/80 hover:text-[#FAF6EE] hover:bg-[#8A2418] hover:border-[#8A2418] transition-all shadow-md ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. KHÔNG GIAN TRIỂN LÃM CHÍNH (MAIN EXHIBITION AREA) */}
      <main className="flex-1 relative overflow-y-auto px-4 sm:px-8 py-3 sm:py-5 flex items-center justify-center">
        {/* Nút lùi tranh (Previous) */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Bức tranh trước đó"
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#07130F]/80 hover:bg-[#C5A059] text-[#E5B94E] hover:text-[#0A1612] border border-[#C5A059]/50 flex items-center justify-center transition-all shadow-xl backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Nút tiến tranh (Next) */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Bức tranh kế tiếp"
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-[#07130F]/80 hover:bg-[#C5A059] text-[#E5B94E] hover:text-[#0A1612] border border-[#C5A059]/50 flex items-center justify-center transition-all shadow-xl backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Huy hiệu chỉ dẫn chế độ phóng to toàn cảnh */}
        {isFullView && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          >
            <div className="px-4 py-1 bg-[#07130F]/85 backdrop-blur-md border border-[#C5A059]/40 rounded-full text-[10px] font-sans text-[#E5B94E] flex items-center gap-2 shadow-lg">
              <Sparkles className="w-3 h-3 text-[#5EEAD4]" />
              <span>Chế độ chiêm ngưỡng toàn cảnh &bull; Nhấn trực tiếp vào tranh để hiện lại thông tin</span>
            </div>
          </motion.div>
        )}

        {/* Khung trưng bày trung tâm: Tự động co giãn khi toggle fullView */}
        <div
          className={`w-full mx-auto grid items-center my-auto transition-all duration-500 gap-6 lg:gap-8 ${
            isFullView
              ? 'max-w-4xl lg:max-w-5xl grid-cols-1'
              : 'max-w-6xl grid-cols-1 lg:grid-cols-12'
          }`}
        >
          {/* CỘT TRÁI (HOẶC TOÀN KHUNG KHI PHÓNG TO): BỨC HỌA TRÊN NỀN GIẤY DÓ NÉN BÃ TRÀ */}
          <div
            className={`flex justify-center transition-all duration-500 ${
              isFullView ? 'w-full' : 'lg:col-span-7'
            }`}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentArtwork.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: direction * -40, scale: 0.96 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className={`w-full cursor-pointer group transition-all duration-500 ${
                  isFullView ? 'max-w-3xl lg:max-w-4xl' : 'max-w-lg'
                }`}
                onClick={() => setIsFullView(!isFullView)}
                title={isFullView ? 'Nhấn vào tranh để thu nhỏ & hiện thông tin' : 'Nhấn vào tranh để phóng to toàn màn hình'}
              >
                <FolkArtworkCanvas artwork={currentArtwork} isFullView={isFullView} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CỘT PHẢI: CHI TIẾT Ý NIỆM, CHẤT LIỆU BÃ TRÀ & THƯỞNG ẨM (ẨN ĐI KHI FULLVIEW) */}
          <AnimatePresence>
            {!isFullView && (
              <motion.div
                initial={{ opacity: 0, x: 25, width: 0 }}
                animate={{ opacity: 1, x: 0, width: 'auto' }}
                exit={{ opacity: 0, x: 25, width: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="lg:col-span-5 space-y-4 overflow-hidden"
              >
                <div className="space-y-3.5">
                  {/* Huy hiệu phong cách */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#122A22] border border-[#C5A059]/40 rounded-full">
                    <Sparkles className="w-3.5 h-3.5 text-[#E5B94E]" />
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#E5B94E]">
                      {currentArtwork.traditionName}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#FAF6EE] leading-tight">
                    {currentArtwork.title}
                  </h1>
                  <p className="text-xs text-[#E5B94E] font-serif italic">
                    {currentArtwork.subtitle}
                  </p>

                  {/* Điển tích & Ý nghĩa văn hóa */}
                  <div className="p-3.5 bg-[#0F261E]/90 border border-[#C5A059]/30 rounded-sm space-y-1.5 shadow-sm">
                    <div className="flex items-center gap-1.5 text-[#E5B94E] text-[10px] font-sans font-bold uppercase tracking-wider">
                      <Info className="w-3.5 h-3.5" />
                      <span>Điển Tích & Linh Hồn Tác Phẩm:</span>
                    </div>
                    <p className="text-xs text-[#FAF6EE]/85 font-serif italic leading-relaxed">
                      &ldquo;{currentArtwork.story}&rdquo;
                    </p>
                  </div>

                  {/* Chất liệu chế tác: Giấy Dó nén bã trà */}
                  <div className="p-3.5 bg-[#17332A]/80 border border-[#5EEAD4]/30 rounded-sm space-y-1.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-sans font-bold text-[#5EEAD4] tracking-wider flex items-center gap-1.5">
                        <Leaf className="w-3.5 h-3.5 text-[#5EEAD4]" />
                        Nghệ Thuật Giấy Dó Nén Bã Trà:
                      </span>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#5EEAD4]/10 text-[#5EEAD4] font-sans">
                        Di sản xanh 2026
                      </span>
                    </div>
                    <p className="text-xs font-serif font-bold text-[#FAF6EE]">
                      {currentArtwork.teaPaperType}
                    </p>
                    <p className="text-[11px] text-[#FAF6EE]/75 font-serif leading-relaxed">
                      Bột giấy Dó tự nhiên được ngâm ủ và hòa trộn cùng xác lá bã trà hữu cơ sau quá trình pha chế, tạo nên bề mặt giấy lấm tấm xơ thô mộc, giữ hương trà tự nhiên và bền bỉ qua hàng thế kỷ.
                    </p>
                  </div>

                  {/* Gợi ý thưởng trà cùng tranh */}
                  <div className="p-3.5 bg-[#1F2C23]/80 border border-[#C5A059]/40 rounded-sm space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[#E5B94E] text-[10px] font-sans font-bold uppercase tracking-wider">
                      <Coffee className="w-3.5 h-3.5" />
                      <span>Chén Trà Tri Kỷ Đồng Điệu:</span>
                    </div>
                    <p className="text-xs font-serif font-bold text-[#FAF6EE]">
                      {currentArtwork.teaPairing}
                    </p>
                    <p className="text-[10px] text-[#C5A059] font-sans">
                      Tâm trạng: {currentArtwork.mood}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* 3. THANH THUMBNAIL DƯỚI CÙNG & VÒNG XOAY ĐĨA NHẠC GÓC PHẢI */}
      <footer
        className={`px-4 sm:px-8 py-3 bg-[#07130F]/95 backdrop-blur-md border-t border-[#C5A059]/30 relative z-20 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 ${
          isFullView ? 'opacity-85 hover:opacity-100' : ''
        }`}
      >
        {/* Dải hình thu nhỏ (Thumbnails) 4-5 bức tranh */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
          {filteredArtworks.map((art, idx) => {
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={art.id}
                type="button"
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`relative px-3 py-1.5 rounded-sm border text-left transition-all shrink-0 ${
                  isCurrent
                    ? 'bg-[#C5A059] text-[#0A1612] border-[#C5A059] font-bold shadow-paper'
                    : 'bg-[#122A22] text-[#FAF6EE]/75 border-[#C5A059]/25 hover:border-[#C5A059]/60'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-sans font-bold">
                    {idx + 1}.
                  </span>
                  <span className="text-xs font-serif truncate max-w-[120px] sm:max-w-[150px]">
                    {art.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Hướng dẫn thao tác nhanh */}
        <div className="hidden xl:flex items-center gap-2 text-[10px] text-[#FAF6EE]/60 font-sans">
          <span>Nhấn vào tranh để phóng to / thu nhỏ</span>
          <span>&bull;</span>
          <span>Phím F để toàn màn hình</span>
          <span>&bull;</span>
          <span>Phím ESC để đóng</span>
        </div>

        {/* VÒNG XOAY ĐĨA NHẠC Ở GÓC PHẢI BÊN DƯỚI - THE USER'S EXACT MANDATE */}
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
          <SpinningVinylPlayer initialRegion={regionTrackId} />
        </div>
      </footer>
    </div>
  );
};
