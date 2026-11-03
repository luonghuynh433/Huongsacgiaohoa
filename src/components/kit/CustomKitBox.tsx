import React, { useState } from 'react';
import { X, Sparkles, Plus, Palette, QrCode, ShieldCheck, Box } from 'lucide-react';
import { TeaPacketItem } from '@/types/kit.types';

interface CustomKitBoxProps {
  slots: (TeaPacketItem | null)[];
  onDropPacket: (slotIndex: number, packet: TeaPacketItem) => void;
  onRemovePacket: (slotIndex: number) => void;
  onOpenOrderModal: () => void;
  isDraggingAnyPacket?: boolean;
}

export const CustomKitBox: React.FC<CustomKitBoxProps> = ({
  slots,
  onDropPacket,
  onRemovePacket,
  onOpenOrderModal,
  isDraggingAnyPacket = false,
}) => {
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const selectedCount = slots.filter(Boolean).length;
  const isComplete = selectedCount === 3;

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setDragOverIndex(index);
  };

  const handleDragLeave = (index: number) => {
    if (dragOverIndex === index) {
      setDragOverIndex(null);
    }
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(null);
    try {
      const dataStr = e.dataTransfer.getData('application/json');
      if (dataStr) {
        const packet: TeaPacketItem = JSON.parse(dataStr);
        onDropPacket(index, packet);
      }
    } catch (err) {
      console.error('Lỗi nhận diện gói trà thả vào hộp:', err);
    }
  };

  return (
    <div className="bg-[#FAF7F0] border-2 border-gold/40 rounded-sm p-4 sm:p-7 md:p-8 shadow-card relative">
      {/* Khung viền chỉ vàng đôi phong cách hoàng gia */}
      <div className="absolute inset-2 border border-gold/25 pointer-events-none rounded-[1px]" />
      <div className="absolute inset-3.5 border border-gold/15 pointer-events-none rounded-[1px]" />

      {/* 1. Header Hộp Quà: Nắp Hộp & Triết Lý */}
      <div className="relative z-10 mb-6 pb-4 border-b border-gold/25 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/15 border border-gold/30 rounded-full mb-2">
            <Box className="w-3.5 h-3.5 text-gold-dark" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-dark font-sans font-bold">
              Cấu Trúc Hộp Quà Vật Lý &bull; GENTEA 2026
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-serif text-teal-deep tracking-tight">
            Chạm Sắc Hương &bull; Sắc Hương Giao Hòa
          </h3>
          <p className="text-xs sm:text-sm text-teal-deep/75 font-serif italic mt-0.5">
            Khay định hình 4 ngăn sinh học: 3 ngăn trà tùy chọn ba miền & 1 ngăn trải nghiệm văn hóa.
          </p>
        </div>

        {/* Thanh trạng thái chọn gói trà */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-teal-deep/70 font-sans block">
              Số gói trà trong hộp:
            </span>
            <span className="text-lg font-bold font-serif text-teal-deep">
              <span className={isComplete ? 'text-gold-dark' : 'text-teal-deep'}>
                {selectedCount}
              </span>{' '}
              / 3 gói
            </span>
          </div>

          <button
            type="button"
            disabled={selectedCount === 0}
            onClick={onOpenOrderModal}
            className={`px-5 py-2.5 rounded-sm text-xs uppercase tracking-wider font-sans font-bold flex items-center gap-2 transition-all shadow-paper ${
              isComplete
                ? 'bg-gold-dark hover:bg-gold text-white ring-2 ring-gold/40 animate-pulse'
                : selectedCount > 0
                ? 'bg-teal-dark hover:bg-teal-deep text-cream-50'
                : 'bg-cream-200 text-teal-deep/40 cursor-not-allowed shadow-none'
            }`}
          >
            <Sparkles className="w-4 h-4 text-cream-50" />
            <span>{isComplete ? 'Đặt Hàng Bộ Kit Này' : `Đặt Hàng (${selectedCount}/3 Trà)`}</span>
          </button>
        </div>
      </div>

      {/* 2. Cấu Trúc Khay Hộp 4 Ngăn Vật Lý (Giống Ảnh Thật) */}
      <div className="relative z-10 bg-[#0C241E] p-4 sm:p-6 rounded-sm border-2 border-[#C5A059] shadow-2xl">
        {/* Viền kim loại mạ vàng của khay hộp */}
        <div className="absolute inset-1 border border-[#C5A059]/40 pointer-events-none rounded-[1px]" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
          {/* CỘT TRÁI (5 PHẦN): 3 NGĂN TRÀ XẾP DỌC (KÉO THẢ TỐI ĐA 3 GÓI) */}
          <div className="md:col-span-5 flex flex-col gap-3 justify-between">
            <div className="flex items-center justify-between text-[#E5B94E] px-1 text-[11px] font-sans font-bold uppercase tracking-wider">
              <span>3 Ngăn Trà Tự Phối:</span>
              <span className="text-[10px] text-[#FAF6EE]/60 font-normal">Kéo thả vào đây</span>
            </div>

            {slots.map((packet, idx) => {
              const isOver = dragOverIndex === idx;
              return (
                <div
                  key={idx}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDragLeave={() => handleDragLeave(idx)}
                  onDrop={(e) => handleDrop(e, idx)}
                  className={`relative min-h-[105px] rounded-sm p-3.5 transition-all duration-300 flex flex-col justify-between ${
                    packet
                      ? 'bg-[#FAF7F0] border border-[#C5A059] shadow-md text-teal-deep'
                      : isOver
                      ? 'bg-[#153D32] border-2 border-[#5EEAD4] border-dashed shadow-inner scale-[1.02] ring-2 ring-[#5EEAD4]/40'
                      : isDraggingAnyPacket
                      ? 'bg-[#12362C] border-2 border-dashed border-[#E5B94E] shadow-lg animate-pulse ring-1 ring-[#C5A059]/40'
                      : 'bg-[#102B24] border border-dashed border-[#C5A059]/40 hover:border-[#C5A059] shadow-inner'
                  }`}
                >
                  {packet ? (
                    <div className="relative z-10">
                      {/* Gói trà đã được đặt vào ngăn */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`px-1.5 py-0.5 rounded-[2px] text-[8px] font-sans font-bold uppercase tracking-wider ${
                              packet.region === 'Bắc'
                                ? 'bg-[#2D6A4F] text-[#F7F3E8]'
                                : packet.region === 'Trung'
                                ? 'bg-[#B45309] text-[#F7F3E8]'
                                : 'bg-[#0D9488] text-[#F7F3E8]'
                            }`}
                          >
                            Trà Miền {packet.region}
                          </span>
                          <span className="text-[10px] text-gold-dark font-sans font-semibold">
                            Ngăn {idx + 1}
                          </span>
                        </div>

                        {/* Nút gỡ gói trà ra khỏi ngăn */}
                        <button
                          type="button"
                          onClick={() => onRemovePacket(idx)}
                          className="w-5 h-5 rounded-full bg-cream-200/80 hover:bg-[#8A2418] hover:text-white text-teal-deep flex items-center justify-center transition-colors"
                          title="Gỡ gói trà này ra"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>

                      <h5 className="text-sm font-bold font-serif text-teal-deep mt-1 truncate">
                        {packet.name}
                      </h5>
                      <p className="text-[10px] text-teal-deep/70 font-serif italic truncate">
                        {packet.category} &bull; {packet.weight}
                      </p>

                      <div className="flex items-center gap-1 mt-1 text-[9px] text-gold-dark font-serif truncate">
                        <span>Hương: {packet.flavorNotes.join(', ')}</span>
                      </div>
                    </div>
                  ) : (
                    /* Ngăn trà đang để trống */
                    <div className="flex flex-col items-center justify-center text-center my-auto py-2">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center mb-1.5 transition-colors ${
                        isOver
                          ? 'bg-[#5EEAD4] text-[#0C241E]'
                          : isDraggingAnyPacket
                          ? 'bg-[#E5B94E] text-[#0C241E] animate-bounce'
                          : 'bg-[#184439] border border-[#C5A059]/40 text-[#E5B94E]'
                      }`}>
                        <Plus className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-serif font-bold text-[#FAF6EE]/90">
                        {isOver ? `Thả vào Ngăn ${idx + 1}` : `Ngăn Trà Số ${idx + 1} (Trống)`}
                      </span>
                      <p className="text-[10px] text-[#C5A059] font-sans italic font-medium">
                        {isOver
                          ? 'Nhả chuột để đặt vào ngăn'
                          : isDraggingAnyPacket
                          ? '✨ Thả gói trà vào ngăn này ✨'
                          : 'Kéo thả gói trà vào đây hoặc bấm "Thêm vào hộp"'}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CỘT PHẢI (7 PHẦN): NGĂN LỚN ĐỰNG SẴN BỘ TRANH DÂN GIAN & THIỆP QR (CỐ ĐỊNH THEO YÊU CẦU) */}
          <div className="md:col-span-7 bg-[#102B24] rounded-sm p-4 sm:p-5 border border-[#C5A059]/60 flex flex-col justify-between relative overflow-hidden">
            {/* Lớp nền trang trí hoa sen chìm */}
            <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-[#C5A059]/5 pointer-events-none" />

            <div>
              {/* Header ngăn trải nghiệm di sản */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#C5A059]/30">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#5EEAD4] animate-pulse" />
                  <span className="text-[10px] uppercase tracking-widest text-[#E5B94E] font-sans font-bold">
                    Ngăn Trải Nghiệm Văn Hóa &bull; Đựng Sẵn
                  </span>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-[2px] bg-[#C5A059]/20 text-[#E5B94E] border border-[#C5A059]/30 font-sans font-semibold">
                  Mặc Định Trong Hộp
                </span>
              </div>

              {/* Mô phỏng các bức tranh xếp lớp trang trọng */}
              <div className="relative py-2 flex items-center justify-center">
                {/* Tấm tranh Kiếng Nam Bộ (lớp 3) */}
                <div
                  className="w-36 sm:w-44 h-48 bg-[#FAF7F0] border-2 border-[#1E3F35] rounded-[2px] p-2.5 shadow-md absolute -rotate-6 translate-x-8 -translate-y-1 opacity-75"
                  style={{
                    boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                  }}
                >
                  <div className="border border-[#C5A059]/50 h-full p-2 flex flex-col justify-between text-center bg-[#F5EEDC]">
                    <span className="text-[8px] font-sans font-bold text-[#8A2418] uppercase">Tranh Kiếng Nam Bộ</span>
                    <div className="w-8 h-8 rounded-full border border-gold mx-auto flex items-center justify-center text-gold-dark my-auto">
                      <Palette className="w-4 h-4" />
                    </div>
                    <span className="text-[8px] font-serif italic text-teal-deep">Cẩn xà cừ & mạ nhũ vàng</span>
                  </div>
                </div>

                {/* Tấm tranh Làng Sình Huế (lớp 2) */}
                <div
                  className="w-36 sm:w-44 h-48 bg-[#FAF7F0] border-2 border-[#8A2418] rounded-[2px] p-2.5 shadow-md absolute rotate-3 translate-x-2 translate-y-1 opacity-90"
                  style={{
                    boxShadow: '0 6px 18px rgba(0,0,0,0.6)',
                  }}
                >
                  <div className="border border-[#C5A059]/50 h-full p-2 flex flex-col justify-between text-center bg-[#F5EEDC]">
                    <span className="text-[8px] font-sans font-bold text-[#8A2418] uppercase">Tranh Làng Sình (Huế)</span>
                    <div className="w-8 h-8 rounded-full border border-gold mx-auto flex items-center justify-center text-gold-dark my-auto">
                      <Palette className="w-4 h-4" />
                    </div>
                    <span className="text-[8px] font-serif italic text-teal-deep">Mộc bản in tay Cố Đô</span>
                  </div>
                </div>

                {/* Tấm tranh Đông Hồ (lớp 1 - phía trước) */}
                <div
                  className="w-40 sm:w-48 h-52 bg-[#FAF7F0] border-2 border-[#C5A059] rounded-[2px] p-3 shadow-2xl relative z-10 -rotate-2"
                  style={{
                    boxShadow: '0 10px 25px rgba(0,0,0,0.7)',
                  }}
                >
                  <div className="border border-[#C5A059] h-full p-2.5 flex flex-col justify-between text-center bg-[#FAF5EA]">
                    <div className="flex items-center justify-between text-[7px] text-[#8A2418] font-bold font-sans uppercase">
                      <span>Đông Hồ</span>
                      <span>Bắc Ninh</span>
                    </div>

                    <div className="my-auto">
                      <div className="w-9 h-9 rounded-full bg-[#184439] border border-gold mx-auto flex items-center justify-center text-[#E5B94E] mb-1">
                        <Palette className="w-4 h-4" />
                      </div>
                      <h6 className="text-xs font-bold font-serif text-teal-deep">Bộ Tranh 3 Miền</h6>
                      <p className="text-[8.5px] text-teal-deep/70 font-serif italic leading-tight mt-0.5">
                        In trên giấy Dó nén bã trà tự nhiên
                      </p>
                    </div>

                    <div className="pt-1.5 border-t border-gold/30 flex items-center justify-between text-[7px] text-gold-dark font-sans">
                      <span>GENTEA 2026</span>
                      <span>Mộc bản di sản</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thông tin thiệp cảm ơn QR kèm theo */}
              <div className="mt-4 p-2.5 bg-[#0C241E]/90 rounded-[2px] border border-[#C5A059]/40 flex items-center gap-3">
                <div className="w-9 h-9 rounded-[2px] bg-[#FAF7F0] border border-[#C5A059] flex items-center justify-center text-teal-deep shrink-0">
                  <QrCode className="w-5 h-5 text-teal-dark" />
                </div>
                <div>
                  <h6 className="text-xs font-bold text-[#FAF6EE] font-serif">
                    Thiệp Cảm Ơn & Trải Nghiệm (Tích hợp QR)
                  </h6>
                  <p className="text-[10px] text-[#C5A059] font-serif italic">
                    Quét để kết nối Bản Đồ Vị Giác & Âm Nhạc Thiền Trà 432Hz
                  </p>
                </div>
              </div>
            </div>

            {/* Chân ngăn trải nghiệm */}
            <div className="pt-3 mt-3 border-t border-[#C5A059]/20 flex items-center justify-between text-[10px] text-[#FAF6EE]/70 font-sans">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5EEAD4]" />
                Bột giấy ép sinh học phân hủy 100%
              </span>
              <span className="text-[#E5B94E] font-medium">Bảo chứng di sản</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
