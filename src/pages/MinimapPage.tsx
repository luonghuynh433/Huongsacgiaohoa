import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Sparkles, Filter } from 'lucide-react';
import { teaData, regionColors } from '@/data';
import { DecorativeDivider } from '@/components/decorative/SvgIcons';
import { SandpaperTooltipCard } from '@/components/map/SandpaperTooltipCard';
import { VietnamTeaMap } from '@/components/map/VietnamTeaMap';
import type { TeaProduct, TeaRegion } from '@/types/tea.types';

const regionLabel: Record<TeaRegion, string> = {
  'Bắc': 'Miền Bắc',
  'Trung': 'Miền Trung',
  'Nam': 'Miền Nam',
};

export const MinimapPage = () => {
  const [searchParams] = useSearchParams();
  const teaQuery = searchParams.get('tea');
  const regionQuery = searchParams.get('region') as TeaRegion | null;

  const [activeRegion, setActiveRegion] = useState<TeaRegion | 'ALL'>('ALL');
  const [activeTea, setActiveTea] = useState<TeaProduct | null>(null);

  useEffect(() => {
    if (teaQuery) {
      const matched = teaData.find((t) => t.id === teaQuery);
      if (matched) {
        setActiveTea(matched);
        setActiveRegion(matched.region);
        return;
      }
    }

    if (regionQuery && (regionQuery === 'Bắc' || regionQuery === 'Trung' || regionQuery === 'Nam')) {
      setActiveRegion(regionQuery);
      setActiveTea(null);
    }
  }, [teaQuery, regionQuery]);

  const filteredTeas = useMemo(() => {
    if (activeRegion === 'ALL') return teaData;
    return teaData.filter((t) => t.region === activeRegion);
  }, [activeRegion]);

  const handleSelectRegion = (region: TeaRegion | 'ALL') => {
    setActiveRegion(region);
    setActiveTea(null);
  };

  const handleSelectTea = (tea: TeaProduct) => {
    setActiveTea(tea);
    setActiveRegion(tea.region);
  };

  return (
    <div className="flex-1 bg-cream-100 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 border border-gold/30 px-5 py-1.5 rounded-full mb-3 bg-cream-50/70 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-gold" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-sans font-medium">
              Bản Đồ Thổ Nhưỡng & Vị Giác &bull; GENTEA 2026
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-teal-deep tracking-tight mb-3">
            Bản Đồ Vùng Trà Việt Nam
          </h1>

          <DecorativeDivider className="w-48 mx-auto mb-3 text-gold" />

          <p className="text-xs sm:text-sm text-teal-deep/70 max-w-xl mx-auto italic leading-relaxed">
            Hành trình sống động theo bước chân trà qua 3 miền đất nước. Chọn từng vùng hoặc danh trà để bản đồ tự động di chuyển đến toạ độ thổ nhưỡng tương ứng.
          </p>

          {activeTea && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-teal-deep text-xs font-sans animate-fade-in shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
              <span>
                Đang định vị danh trà: <strong>{activeTea.name}</strong> ({regionLabel[activeTea.region]}) &bull; Độ cao {activeTea.altitude}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col gap-4">
            <VietnamTeaMap
              teas={teaData}
              activeTea={activeTea}
              activeRegion={activeRegion}
              onSelectTea={handleSelectTea}
              onSelectRegion={handleSelectRegion}
            />

            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#FAF6EE]/80 rounded-sm border border-gold/20 shadow-xs text-xs text-teal-deep/75">
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-deep/90 font-sans">
                  Chú thích màu vùng:
                </span>
                {(['Bắc', 'Trung', 'Nam'] as const).map((region) => (
                  <button
                    key={region}
                    type="button"
                    onClick={() => handleSelectRegion(region)}
                    className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shadow-xs"
                      style={{ backgroundColor: regionColors[region] }}
                    />
                    <span className="font-serif font-medium">{regionLabel[region]}</span>
                  </button>
                ))}
              </div>

              <span className="text-[10px] text-gold-dark italic font-serif">
                Quần đảo Hoàng Sa & Trường Sa thuộc chủ quyền Việt Nam
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-5">
            {activeTea ? (
              <SandpaperTooltipCard
                product={activeTea}
                onClose={() => setActiveTea(null)}
              />
            ) : (
              <div className="rounded-sm border-2 border-gold/35 p-7 text-center shadow-card select-none text-teal-deep bg-[#FCFAF5] relative overflow-hidden">
                <div className="absolute inset-1.5 border border-gold/20 pointer-events-none rounded-[1px]" />
                <div className="w-12 h-12 rounded-full border border-gold/40 bg-cream-50 flex items-center justify-center mx-auto mb-3 shadow-xs">
                  <MapPin className="w-6 h-6 text-gold-dark" />
                </div>
                <h3 className="text-base font-bold uppercase tracking-wider text-teal-deep font-serif mb-1.5">
                  {activeRegion !== 'ALL'
                    ? `Vùng Trà Miền ${activeRegion}`
                    : 'Chạm Điểm Trà Trên Bản Đồ'}
                </h3>
                <p className="text-xs text-teal-deep/75 italic font-serif leading-relaxed mb-4 max-w-xs mx-auto">
                  {activeRegion !== 'ALL'
                    ? `Đang định vị các vùng trà Miền ${activeRegion}. Hãy nhấn vào một điểm trà trên bản đồ hoặc danh sách bên dưới để mở thẻ thông tin chi tiết.`
                    : 'Bản đồ sẽ tự động chuyển động mượt mà đến vùng thổ nhưỡng bạn chọn. Nhấn vào điểm trà để mở thẻ thông tin chi tiết.'}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {(['Bắc', 'Trung', 'Nam'] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => handleSelectRegion(r)}
                      className="px-3 py-1.5 rounded-sm bg-cream-50 border border-gold/30 text-xs font-sans font-medium text-teal-deep hover:bg-gold/20 transition-colors shadow-xs"
                    >
                      Khám phá Miền {r}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-cream-50/90 border border-gold/25 rounded-sm shadow-paper p-5">
              <div className="flex items-center justify-between mb-3 border-b border-gold/15 pb-2.5">
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-gold" />
                  <h3 className="text-xs font-bold text-teal-deep uppercase tracking-wider font-sans">
                    Danh Sách Vùng Trà ({filteredTeas.length})
                  </h3>
                </div>
                {activeRegion !== 'ALL' && (
                  <button
                    type="button"
                    onClick={() => handleSelectRegion('ALL')}
                    className="text-[10px] text-gold hover:underline font-sans uppercase tracking-wider"
                  >
                    Xem tất cả
                  </button>
                )}
              </div>

              <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
                {filteredTeas.map((tea) => {
                  const isSelected = activeTea?.id === tea.id;
                  const color = regionColors[tea.region];

                  return (
                    <button
                      key={tea.id}
                      type="button"
                      onClick={() => handleSelectTea(tea)}
                      className={`w-full text-left p-2.5 rounded-sm text-xs transition-all duration-200 border flex items-center justify-between group ${
                        isSelected
                          ? 'bg-cream-200/90 border-gold shadow-xs'
                          : 'bg-cream-100/50 hover:bg-cream-200/40 border-gold/15'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-2 h-2 rounded-full flex-shrink-0 transition-transform ${
                            isSelected ? 'scale-125' : 'group-hover:scale-110'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                        <div className="truncate">
                          <p className={`font-serif font-bold truncate ${
                            isSelected ? 'text-teal-deep' : 'text-teal-deep/90'
                          }`}>
                            {tea.name}
                          </p>
                          <p className="text-[10px] text-teal-deep/60 font-sans truncate">
                            {tea.category} &bull; {tea.altitude}
                          </p>
                        </div>
                      </div>

                      <span className="text-[10px] text-gold font-sans font-medium uppercase tracking-wider flex-shrink-0 ml-2">
                        {tea.region}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
