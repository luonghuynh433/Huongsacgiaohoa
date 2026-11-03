import React from 'react';
import { Plus, Check, Sparkles, GripVertical } from 'lucide-react';
import { TeaPacketItem } from '@/types/kit.types';

interface DraggableTeaPacketProps {
  packet: TeaPacketItem;
  isSelected: boolean;
  onSelect: (packet: TeaPacketItem) => void;
  disabled?: boolean;
  onDragStart?: (e: React.DragEvent, packet: TeaPacketItem) => void;
  onDragEnd?: (e: React.DragEvent) => void;
}

export const DraggableTeaPacket: React.FC<DraggableTeaPacketProps> = ({
  packet,
  isSelected,
  onSelect,
  disabled = false,
  onDragStart,
  onDragEnd,
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    const payload = JSON.stringify(packet);
    try {
      e.dataTransfer.setData('application/json', payload);
    } catch {
      // Một số trình duyệt chỉ cho phép đặt text/plain
    }
    e.dataTransfer.setData('text/plain', payload);
    e.dataTransfer.effectAllowed = 'all';
    onDragStart?.(e, packet);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    onDragEnd?.(e);
  };

  const regionLabel =
    packet.region === 'Bắc'
      ? 'TRÀ MIỀN BẮC'
      : packet.region === 'Trung'
      ? 'TRÀ MIỀN TRUNG'
      : 'TRÀ MIỀN NAM';

  const regionBadgeColor =
    packet.region === 'Bắc'
      ? 'bg-[#2D6A4F] text-[#F7F3E8]'
      : packet.region === 'Trung'
      ? 'bg-[#B45309] text-[#F7F3E8]'
      : 'bg-[#0D9488] text-[#F7F3E8]';

  return (
    <div
      draggable={!isSelected && !disabled}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`relative rounded-sm border p-4 transition-all duration-300 select-none flex flex-col justify-between ${
        isSelected
          ? 'bg-cream-100/50 border-gold/30 opacity-60 cursor-not-allowed shadow-none'
          : 'bg-[#FCFAF5] border-gold/40 hover:border-gold hover:shadow-card hover:-translate-y-1 cursor-grab active:cursor-grabbing shadow-xs'
      }`}
      style={{
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(197, 160, 89, 0.05) 0%, transparent 40%),
          radial-gradient(#c5a059 0.4px, transparent 0.4px)
        `,
        backgroundSize: '100% 100%, 16px 16px',
      }}
    >
      {/* Khung viền chỉ đôi mỹ thuật bên trong gói trà */}
      <div className="absolute inset-1.5 border border-gold/20 pointer-events-none rounded-[1px]" />

      <div>
        {/* Header gói trà: Vùng miền & Trọng lượng */}
        <div className="flex items-center justify-between gap-2 mb-2 relative z-10">
          <span
            className={`px-2 py-0.5 rounded-[2px] text-[9px] font-sans font-bold uppercase tracking-widest shadow-xs ${regionBadgeColor}`}
          >
            {regionLabel}
          </span>
          <div className="flex items-center gap-1 text-[10px] text-gold-dark font-sans font-bold">
            <Sparkles className="w-2.5 h-2.5 text-gold" />
            <span>{packet.weight}</span>
          </div>
        </div>

        {/* Họa tiết phong cảnh đồi chè & mây lượn ước lệ (Tái hiện bao bì thật) */}
        <div className="my-2 p-2 rounded-[2px] bg-cream-50/90 border border-gold/20 relative overflow-hidden flex flex-col items-center justify-center text-center">
          <svg viewBox="0 0 160 50" className="w-full h-10 text-teal-deep/30 opacity-70">
            {/* Đồi chè nhấp nhô & cổng đình cổ */}
            <path
              d="M0,45 Q40,20 80,35 T160,30 L160,50 L0,50 Z"
              fill="currentColor"
              opacity="0.5"
            />
            <path
              d="M20,40 Q60,10 100,28 T160,20 L160,50 L0,50 Z"
              fill="currentColor"
              opacity="0.3"
            />
            <circle cx="125" cy="15" r="7" fill="#C5A059" opacity="0.6" />
            {/* Cổng đình nhỏ */}
            <path d="M72,30 L72,20 L88,20 L88,30 M70,20 L90,20 L80,14 Z" stroke="#C5A059" strokeWidth="1.2" fill="none" />
          </svg>
          <span className="text-[9px] font-serif italic text-teal-deep/60 leading-tight">
            {packet.packagingArt}
          </span>
        </div>

        {/* Tên danh trà */}
        <h4 className="text-base font-bold text-teal-deep font-serif tracking-tight mb-1">
          {packet.name}
        </h4>
        <p className="text-[11px] text-gold-dark font-sans font-medium mb-2">
          {packet.category}
        </p>

        <p className="text-xs text-teal-deep/75 font-serif italic leading-relaxed line-clamp-2 mb-3">
          {packet.shortDesc}
        </p>

        {/* Nốt hương vị */}
        <div className="flex flex-wrap gap-1 mb-3">
          {packet.flavorNotes.map((note) => (
            <span
              key={note}
              className="text-[9px] px-1.5 py-0.5 rounded-[2px] bg-cream-100 text-teal-deep/80 font-serif border border-gold/25"
            >
              {note}
            </span>
          ))}
        </div>
      </div>

      {/* Nút kéo hoặc bấm thêm vào hộp */}
      <div className="pt-2.5 border-t border-gold/20 flex items-center justify-between gap-2 relative z-10">
        <span className="text-[9px] text-teal-deep/60 font-sans flex items-center gap-1">
          <GripVertical className="w-3 h-3 text-gold" />
          <span className="hidden sm:inline">Kéo vào hộp hoặc</span>
        </span>

        {isSelected ? (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-[2px] bg-gold/20 text-teal-deep text-[10px] font-sans font-bold">
            <Check className="w-3 h-3 text-teal-deep" />
            Đã trong hộp
          </span>
        ) : (
          <button
            type="button"
            disabled={disabled}
            onClick={() => onSelect(packet)}
            className={`px-3 py-1.5 rounded-[2px] text-[10px] font-sans font-bold uppercase tracking-wider flex items-center gap-1 transition-all ${
              disabled
                ? 'bg-cream-200 text-teal-deep/40 cursor-not-allowed'
                : 'bg-teal-dark hover:bg-teal-deep text-cream-50 shadow-xs active:scale-95'
            }`}
          >
            <Plus className="w-3 h-3" />
            <span>Thêm vào hộp</span>
          </button>
        )}
      </div>
    </div>
  );
};
