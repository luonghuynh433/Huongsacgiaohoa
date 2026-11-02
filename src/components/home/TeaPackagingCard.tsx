import { motion } from 'framer-motion';
import { Mountain, Flame, Wind, Layers, ArrowUpRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface TeaPackagingData {
  id: string;
  name: string;
  vietnameseTitle: string;
  regionTag: string;
  origin: string;
  altitude: string;
  soil: string;
  oxidation: string;
  technique: string;
  flavorNotes: string[];
  sensoryDescription: string;
  culturalNote: string;
  sealText: string;
  accentColor: string;
  borderTheme: string;
}

interface TeaPackagingCardProps {
  tea: TeaPackagingData;
  index: number;
}

const getFolkArtBadge = (regionTag: string) => {
  if (regionTag.includes('Bắc') || regionTag.includes('Tây Bắc')) {
    return 'Họa Sắc: Tranh Đông Hồ';
  }
  if (regionTag.includes('Trung')) {
    return 'Họa Sắc: Tranh Làng Sình';
  }
  return 'Họa Sắc: Tranh Kiếng Nam Bộ';
};

export const TeaPackagingCard = ({ tea, index }: TeaPackagingCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col h-full bg-[#FAF6EE] border-2 border-[#C5A059]/40 rounded-sm shadow-card hover:shadow-2xl transition-all duration-500 overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(#C5A059 0.5px, transparent 0.5px),
          linear-gradient(180deg, rgba(250,246,238,0.95) 0%, rgba(243,237,224,0.98) 100%)
        `,
        backgroundSize: '16px 16px, 100% 100%',
      }}
    >
      <div className="absolute inset-1.5 border border-[#C5A059]/25 pointer-events-none rounded-[1px]" />

      <div className="relative p-6 sm:p-7 flex flex-col flex-1 z-10">
        <div className="flex items-start justify-between gap-3 border-b border-[#C5A059]/25 pb-4 mb-5">
          <div>
            <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: tea.accentColor }} />
              <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#9E7A36]">
                {tea.regionTag}
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-gold/15 text-gold-dark font-sans font-medium border border-gold/25">
                {getFolkArtBadge(tea.regionTag)}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-teal-deep tracking-tight group-hover:text-gold-dark transition-colors">
              {tea.name}
            </h3>
            <p className="text-xs text-teal-deep/70 font-serif italic mt-0.5">
              {tea.origin}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center border border-red-800/60 bg-red-900/[0.04] px-2 py-1 rounded-[2px] shadow-xs select-none flex-shrink-0">
            <span className="text-[8px] font-serif uppercase tracking-widest text-red-900 font-bold leading-none">
              {tea.sealText}
            </span>
            <span className="text-[7px] text-red-800/70 font-sans tracking-tight mt-0.5">
              DI SẢN TRÀ
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5 p-3.5 bg-cream-50/80 rounded border border-[#C5A059]/20 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#9E7A36] font-sans font-semibold">
              <Mountain className="w-3.5 h-3.5 text-gold" />
              <span>Độ cao</span>
            </div>
            <p className="font-serif font-bold text-teal-deep text-sm">
              {tea.altitude}
            </p>
            <p className="text-[10px] text-teal-deep/70 font-sans line-clamp-1" title={tea.soil}>
              {tea.soil}
            </p>
          </div>

          <div className="space-y-1 border-l border-[#C5A059]/20 pl-3">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#9E7A36] font-sans font-semibold">
              <Flame className="w-3.5 h-3.5 text-gold" />
              <span>Chế biến</span>
            </div>
            <p className="font-serif font-bold text-teal-deep text-sm">
              {tea.oxidation}
            </p>
            <p className="text-[10px] text-teal-deep/70 font-sans line-clamp-1" title={tea.technique}>
              {tea.technique}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#9E7A36] font-sans font-semibold mb-2">
            <Wind className="w-3 h-3 text-gold" />
            <span>Tầng hương vị đặc trưng</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tea.flavorNotes.map((note) => (
              <span
                key={note}
                className="px-2.5 py-0.5 rounded-[2px] bg-cream-100 border border-[#C5A059]/30 text-teal-deep text-xs font-serif shadow-xs"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3 text-xs text-teal-deep/80 leading-relaxed font-serif flex-1">
          <p className="italic border-l-2 border-gold/40 pl-3 py-0.5 text-teal-deep/90">
            &ldquo;{tea.sensoryDescription}&rdquo;
          </p>
          <div className="pt-2 border-t border-[#C5A059]/15 flex items-start gap-1.5 text-[11px] text-teal-deep/75">
            <Layers className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
            <p>{tea.culturalNote}</p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#C5A059]/25 flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-[#9E7A36] font-sans font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Hộp Trà Thượng Phẩm
          </span>

          <button
            type="button"
            onClick={() => navigate(`/minimap?tea=${encodeURIComponent(tea.id)}`)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-teal-dark hover:bg-teal-deep text-cream-50 text-xs font-sans font-medium uppercase tracking-wider transition-all duration-300 shadow-xs group-hover:bg-gold-dark"
          >
            <span>Bản Đồ</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-gold-light" />
          </button>
        </div>
      </div>
    </motion.article>
  );
};

