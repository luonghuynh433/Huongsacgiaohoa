import type { TeaProduct, TeaRegion } from '@/types/tea.types';
import { Mountain, Layers, Wind, Sparkles, X, Thermometer, Flame } from 'lucide-react';
import { regionColors } from '@/data';

interface SandpaperTooltipCardProps {
  product: TeaProduct;
  onClose?: () => void;
}

const regionLabel: Record<TeaRegion, string> = {
  Bắc: 'Miền Bắc',
  Trung: 'Miền Trung',
  Nam: 'Miền Nam',
};

export const SandpaperTooltipCard = ({ product, onClose }: SandpaperTooltipCardProps) => {
  const accent = regionColors[product.region] ?? '#0F3E35';

  return (
    <div className="relative rounded-sm border-2 border-gold/40 p-6 shadow-card select-none text-teal-deep overflow-hidden transition-all duration-300 bg-[#FCFAF5]">
      {/* Đường chỉ vàng kép viền giấy mỹ thuật thanh nhã */}
      <div className="absolute inset-1.5 border border-gold/25 pointer-events-none rounded-[1px]" />
      <div className="absolute inset-2.5 border border-gold/10 pointer-events-none rounded-[1px]" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 relative z-10 mb-4 border-b border-gold/25 pb-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block shadow-xs"
              style={{ backgroundColor: accent }}
            />
            <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-gold-dark">
              {regionLabel[product.region]} &bull; {product.category}
            </span>
          </div>
          <h3 className="text-2xl font-bold font-serif text-teal-deep tracking-tight">
            {product.name}
          </h3>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng bảng thông tin"
            className="text-teal-deep/50 hover:text-teal-deep hover:bg-gold/10 p-1.5 rounded-sm transition-colors"
          >
            <X className="w-4 h-4 text-gold-dark" />
          </button>
        )}
      </div>

      {/* Thông tin chi tiết Thổ nhưỡng, Oxy hóa, Nhiệt độ nước, Hương vị */}
      <div className="space-y-3.5 relative z-10 text-xs">
        {/* 1. Thổ nhưỡng */}
        <div className="p-3 bg-cream-50/90 rounded-sm border border-gold/25 flex items-start gap-2.5">
          <Layers className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] uppercase tracking-wider font-sans font-bold text-gold-dark block mb-0.5">
              Thổ nhưỡng
            </span>
            <p className="text-teal-deep font-serif italic text-xs leading-relaxed">
              {product.soil ?? 'Đất đỏ Feralit tự nhiên giàu khoáng vi lượng'}
            </p>
          </div>
        </div>

        {/* 2. Mức độ Oxy hóa & Nhiệt độ nước chuẩn */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="p-3 rounded-sm bg-cream-50/90 border border-gold/25 flex items-start gap-2.5">
            <Flame className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
            <div>
              <span className="text-[9px] uppercase tracking-wider font-sans font-bold text-gold-dark block">
                Mức độ Oxy hóa
              </span>
              <span className="text-xs text-teal-deep font-semibold font-serif leading-tight block mt-0.5">
                {product.oxidationLevel ?? '0 - 5%'}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-sm bg-cream-50/90 border border-gold/25 flex items-start gap-2.5">
            <Thermometer className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
            <div>
              <span className="text-[9px] uppercase tracking-wider font-sans font-bold text-gold-dark block">
                Nhiệt độ nước chuẩn
              </span>
              <span className="text-xs text-teal-deep font-semibold font-serif leading-tight block mt-0.5">
                {product.brewingTemp ?? '80°C - 85°C'}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Độ cao địa hình */}
        <div className="p-3 bg-cream-50/90 rounded-sm border border-gold/25 flex items-start gap-2.5">
          <Mountain className="w-4 h-4 text-gold-dark shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] uppercase tracking-wider font-sans font-bold text-gold-dark block mb-0.5">
              Độ cao địa hình
            </span>
            <p className="text-teal-deep font-serif font-semibold text-xs">
              {product.altitude}
            </p>
          </div>
        </div>

        {/* 4. Tầng hương vị */}
        <div className="p-3 bg-cream-50/90 rounded-sm border border-gold/25">
          <div className="flex items-center gap-2 mb-2">
            <Wind className="w-4 h-4 text-gold-dark" />
            <span className="text-[10px] uppercase tracking-wider font-sans font-bold text-gold-dark">
              Tầng hương vị đặc trưng
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {product.flavorProfile.map((flavor) => (
              <span
                key={flavor}
                className="px-2.5 py-1 rounded-sm bg-cream-100 border border-gold/30 text-teal-deep text-xs font-serif shadow-xs"
              >
                {flavor}
              </span>
            ))}
          </div>
        </div>

        {/* Mô tả cảm quan */}
        <div className="p-3 bg-cream-50/60 rounded-sm border-l-2 border-gold/60 border-t border-r border-b border-gold/15">
          <p className="text-xs text-teal-deep/85 italic font-serif leading-relaxed">
            &ldquo;{product.description}&rdquo;
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-3 flex items-center justify-between text-[9px] text-gold-dark font-sans uppercase tracking-widest border-t border-gold/20">
        <span className="flex items-center gap-1.5 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          Giấy Dó Thổ Nhưỡng
        </span>
        <span className="font-semibold">GENTEA &bull; 2026</span>
      </div>
    </div>
  );
};
