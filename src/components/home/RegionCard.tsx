import type { TeaRegion } from '@/types/tea.types';
import { Mountain, Flower2, TreePalm } from 'lucide-react';

interface RegionCardProps {
  region: TeaRegion;
  title: string;
  subtitle: string;
  description: string;
  teaNames: string[];
  accentColor: string;
}

const regionIcons: Record<TeaRegion, typeof Mountain> = {
  'Bắc': Mountain,
  'Trung': Flower2,
  'Nam': TreePalm,
};

const regionImages: Record<TeaRegion, string> = {
  'Bắc': '🏔️',
  'Trung': '🏛️',
  'Nam': '🌴',
};

export const RegionCard = ({
  region,
  title,
  subtitle,
  description,
  teaNames,
  accentColor,
}: RegionCardProps) => {
  const Icon = regionIcons[region];

  return (
    <div className="group relative">
      <div
        className={`relative bg-cream-50/80 border border-gold/20 rounded-sm overflow-hidden
          shadow-paper hover:shadow-card transition-all duration-500 hover:-translate-y-1`}
      >
        <div className={`h-44 ${accentColor} relative overflow-hidden flex items-center justify-center`}>
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="text-center z-10">
            <span className="text-6xl mb-2 block opacity-80 drop-shadow-sm">
              {regionImages[region]}
            </span>
            <p className="text-cream-50 text-xs uppercase tracking-[0.3em] font-sans font-medium mt-2">
              {subtitle}
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cream-50/60 to-transparent" />
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center bg-cream-paper/60">
              <Icon className="w-4 h-4 text-gold" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-teal-deep tracking-wide">{title}</h3>
              <p className="text-[10px] text-gold uppercase tracking-[0.25em] font-sans">
                Miền {region}
              </p>
            </div>
          </div>

          <p className="text-sm text-teal-deep/70 leading-relaxed italic">
            {description}
          </p>

          <div className="border-t border-gold/10 pt-4">
            <p className="text-[10px] uppercase tracking-widest text-gold/80 font-sans mb-2">
              Danh trà tiêu biểu
            </p>
            <div className="flex flex-wrap gap-1.5">
              {teaNames.map((name) => (
                <span
                  key={name}
                  className="text-xs px-2.5 py-1 bg-cream-200/60 border border-gold/15 rounded-sm text-teal-deep/80"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute top-3 right-3 w-6 h-6 border border-cream-50/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-cream-50/80 text-[10px]">→</span>
        </div>
      </div>
    </div>
  );
};

