import { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import type { TeaProduct, TeaRegion } from '@/types/tea.types';
import { regionColors, regionLeafletCenters } from '@/data';
import { Layers, RotateCcw, ZoomIn, ZoomOut, Compass } from 'lucide-react';

interface VietnamTeaMapProps {
  teas: TeaProduct[];
  activeTea: TeaProduct | null;
  activeRegion: TeaRegion | 'ALL';
  onSelectTea: (tea: TeaProduct) => void;
  onSelectRegion: (region: TeaRegion | 'ALL') => void;
}

type TileStyle = 'natgeo' | 'osm' | 'topo';

const TILE_LAYERS: Record<TileStyle, { url: string; attribution: string; name: string; shortName: string; subdomains?: string }> = {
  natgeo: {
    name: 'Mỹ Thuật Sơn Thủy (NatGeo)',
    shortName: 'Mỹ Thuật',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; National Geographic, Esri',
  },
  osm: {
    name: 'Bản Đồ Mộc (OpenStreetMap)',
    shortName: 'Bản Đồ Mộc',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abc',
  },
  topo: {
    name: 'Địa Hình Tự Nhiên (Topo)',
    shortName: 'Địa Hình',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri World Topographic',
  },
};

const SOVEREIGN_ISLANDS = [
  {
    name: 'Quần đảo Hoàng Sa',
    admin: 'TP. Đà Nẵng, Việt Nam',
    coords: [16.5, 112.0] as [number, number],
  },
  {
    name: 'Quần đảo Trường Sa',
    admin: 'Tỉnh Khánh Hòa, Việt Nam',
    coords: [9.5, 113.8] as [number, number],
  },
];

// Tọa độ bao bọc ranh giới thổ nhưỡng 3 miền
const REGION_BOUNDARIES: Record<TeaRegion, [number, number][]> = {
  Bắc: [
    [23.4, 105.0],
    [22.8, 103.2],
    [21.6, 103.5],
    [20.5, 104.8],
    [20.2, 106.0],
    [20.8, 106.8],
    [21.6, 107.8],
    [22.7, 106.6],
    [23.4, 105.5],
  ],
  Trung: [
    [19.8, 105.2],
    [18.2, 106.5],
    [16.8, 107.8],
    [16.1, 108.3],
    [14.5, 109.2],
    [12.8, 109.4],
    [11.5, 108.7],
    [11.4, 107.5],
    [12.3, 107.3],
    [14.2, 107.4],
    [15.8, 107.2],
    [18.6, 105.2],
  ],
  Nam: [
    [11.8, 105.8],
    [11.6, 107.4],
    [10.7, 107.2],
    [10.2, 106.8],
    [8.5, 104.8],
    [9.2, 104.2],
    [10.2, 103.8],
    [10.5, 104.5],
    [11.2, 105.2],
  ],
};

export const VietnamTeaMap = ({
  teas,
  activeTea,
  activeRegion,
  onSelectTea,
  onSelectRegion,
}: VietnamTeaMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const boundaryLayersRef = useRef<L.Polygon[]>([]);

  // Đẩy lớp Mỹ Thuật lên đầu và làm mặc định
  const [currentStyle, setCurrentStyle] = useState<TileStyle>('natgeo');

  const createMarkerIcon = useCallback(
    (product: TeaProduct, isActive: boolean, isRegionHighlighted: boolean, isRegionDimmed: boolean) => {
      const color = regionColors[product.region] ?? '#0F3E35';

      let size = 28;
      if (isActive) {
        size = 40;
      } else if (isRegionHighlighted) {
        size = 34;
      } else if (isRegionDimmed) {
        size = 20;
      }

      const pulseRing = isActive || isRegionHighlighted
        ? `<span class="absolute inset-0 rounded-full animate-ping opacity-50" style="background-color: ${color};"></span>`
        : '';

      const opacityStyle = isRegionDimmed ? 'opacity: 0.38; filter: grayscale(40%);' : 'opacity: 1;';
      const borderStyle = isActive
        ? '3px solid #C5A059'
        : isRegionHighlighted
        ? '2.5px solid #FAF6EE'
        : '1.5px solid rgba(250, 246, 238, 0.7)';

      const labelVisibleClass = isActive || isRegionHighlighted
        ? 'opacity-100 z-30 font-bold scale-105'
        : isRegionDimmed
        ? 'opacity-0 group-hover:opacity-100 z-10'
        : 'opacity-0 group-hover:opacity-100 z-20';

      const html = `
        <div class="relative flex items-center justify-center cursor-pointer group transition-all duration-300"
             style="width: ${size}px; height: ${size}px; ${opacityStyle}">
          ${pulseRing}
          <div class="relative rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-125"
               style="
                 width: ${size}px;
                 height: ${size}px;
                 background-color: ${color};
                 border: ${borderStyle};
                 box-shadow: ${isRegionHighlighted ? '0 0 16px rgba(197, 160, 89, 0.6), 0 4px 14px rgba(15, 62, 53, 0.35)' : '0 3px 8px rgba(0,0,0,0.2)'};
               ">
            <svg class="${size > 26 ? 'w-4 h-4' : 'w-2.5 h-2.5'} text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66l.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
            </svg>
          </div>
          <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-serif text-teal-deep bg-[#FCFAF5]/95 border border-gold/40 shadow-sm pointer-events-none transition-all duration-200 ${labelVisibleClass}">
            ${product.name}
          </div>
        </div>
      `;

      return L.divIcon({
        html,
        className: 'custom-tea-marker',
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });
    },
    []
  );

  const createPopupContent = useCallback((product: TeaProduct) => {
    const flavorChips = product.flavorProfile
      .map(
        (f) =>
          `<span style="display:inline-block; padding:2px 7px; margin:2px 3px 2px 0; background:#F4EFE6; border:1px solid rgba(197,160,89,0.35); border-radius:3px; font-size:11px; font-family:'Noto Serif', serif; color:#0F3E35;">${f}</span>`
      )
      .join('');

    return `
      <div style="font-family:'Noto Serif', serif; min-width: 230px; max-width: 270px; color:#0F3E35; padding: 2px;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:5px; border-bottom:1px solid rgba(197,160,89,0.3); padding-bottom:5px;">
          <span style="font-size:10px; text-transform:uppercase; letter-spacing:0.18em; font-weight:700; color:#8C6B2D; font-family:sans-serif;">
            Miền ${product.region} &bull; ${product.category}
          </span>
          <span style="font-size:10px; color:#8C6B2D; font-family:sans-serif; font-weight:600;">${product.altitude}</span>
        </div>
        <h4 style="font-size:16px; font-weight:700; margin:0 0 7px 0; color:#0F3E35; letter-spacing:-0.01em;">
          ${product.name}
        </h4>
        <div style="font-size:11.5px; margin-bottom:6px; line-height:1.4;">
          <strong style="font-family:sans-serif; font-size:9px; text-transform:uppercase; color:#8C6B2D; display:block; margin-bottom:1px;">Thổ nhưỡng:</strong>
          <span style="font-style:italic; color:#0F3E35;">${product.soil || 'Đất Feralit / Đất mùn tự nhiên'}</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:5px; margin:6px 0; padding:6px 8px; background:rgba(255,255,255,0.7); border:1px solid rgba(197,160,89,0.3); border-radius:3px;">
          <div>
            <span style="font-family:sans-serif; font-size:8.5px; text-transform:uppercase; font-weight:700; color:#8C6B2D; display:block;">Mức Oxy Hóa</span>
            <span style="font-size:11px; font-weight:600; color:#0F3E35;">${product.oxidationLevel || '0 - 5%'}</span>
          </div>
          <div>
            <span style="font-family:sans-serif; font-size:8.5px; text-transform:uppercase; font-weight:700; color:#8C6B2D; display:block;">Nhiệt Độ Pha</span>
            <span style="font-size:11px; font-weight:600; color:#0F3E35;">${product.brewingTemp || '80°C - 85°C'}</span>
          </div>
        </div>
        <div style="margin-top:7px;">
          ${flavorChips}
        </div>
      </div>
    `;
  }, []);

  // Khởi tạo Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [regionLeafletCenters.ALL.lat, regionLeafletCenters.ALL.lng],
      zoom: regionLeafletCenters.ALL.zoom,
      zoomControl: false,
      maxBounds: [
        [4.0, 100.0],
        [24.5, 118.0],
      ],
      minZoom: 5,
      maxZoom: 14,
    });

    const activeTile = TILE_LAYERS[currentStyle];
    const tileLayer = L.tileLayer(activeTile.url, {
      attribution: activeTile.attribution,
      subdomains: activeTile.subdomains || 'abc',
      maxZoom: 18,
    }).addTo(map);

    tileLayerRef.current = tileLayer;
    mapInstanceRef.current = map;

    // Đánh dấu chủ quyền Quần đảo Hoàng Sa & Trường Sa
    SOVEREIGN_ISLANDS.forEach((island) => {
      const islandIcon = L.divIcon({
        html: `
          <div class="flex flex-col items-center select-none pointer-events-none">
            <div class="w-3 h-3 rounded-full bg-red-700/80 border border-gold flex items-center justify-center shadow-sm">
              <span class="w-1 h-1 rounded-full bg-gold"></span>
            </div>
            <div class="bg-[#FAF6EE]/95 border border-gold/40 px-1.5 py-0.5 rounded shadow-xs text-center mt-1">
              <p class="text-[9px] font-serif font-bold text-red-900 leading-none whitespace-nowrap">${island.name}</p>
              <p class="text-[7px] text-teal-deep/70 font-sans tracking-tight">${island.admin}</p>
            </div>
          </div>
        `,
        className: 'sovereign-island-marker',
        iconSize: [80, 40],
        iconAnchor: [40, 10],
      });
      L.marker(island.coords, { icon: islandIcon, interactive: false }).addTo(map);
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [currentStyle]);

  // Cập nhật đường biên giới vùng trà: Khi chọn 1 miền, CHỈ hiển thị đường biên giới miền đó
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Xóa các polygon biên giới cũ
    boundaryLayersRef.current.forEach((poly) => poly.remove());
    boundaryLayersRef.current = [];

    if (activeRegion !== 'ALL') {
      const coords = REGION_BOUNDARIES[activeRegion];
      const color = regionColors[activeRegion];

      const highlightedPolygon = L.polygon(coords, {
        color: color,
        weight: 2.5,
        dashArray: '6, 6',
        fillColor: color,
        fillOpacity: 0.16,
      }).addTo(map);

      boundaryLayersRef.current = [highlightedPolygon];
    } else {
      // Khi ở chế độ Toàn quốc, vẽ mờ nhẹ 3 miền để định hướng
      (['Bắc', 'Trung', 'Nam'] as const).forEach((r) => {
        const poly = L.polygon(REGION_BOUNDARIES[r], {
          color: regionColors[r],
          weight: 1.2,
          dashArray: '4, 4',
          fillColor: regionColors[r],
          fillOpacity: 0.04,
        }).addTo(map);
        boundaryLayersRef.current.push(poly);
      });
    }
  }, [activeRegion]);

  // Cập nhật Markers: Làm nổi bật các vùng trà thuộc miền được chọn, làm mờ các miền khác
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    teas.forEach((product) => {
      const isActive = activeTea?.id === product.id;
      const isRegionHighlighted = activeRegion !== 'ALL' && product.region === activeRegion;
      const isRegionDimmed = activeRegion !== 'ALL' && product.region !== activeRegion;

      const icon = createMarkerIcon(product, isActive, isRegionHighlighted, isRegionDimmed);

      const marker = L.marker([product.coordinates.lat, product.coordinates.lng], {
        icon,
        title: product.name,
        zIndexOffset: isActive ? 1000 : isRegionHighlighted ? 500 : 0,
      });

      // Bind custom popup
      const popupHtml = createPopupContent(product);
      marker.bindPopup(popupHtml, {
        className: 'sandpaper-popup',
        offset: [0, -14],
        closeButton: true,
      });

      // Tương tác click: Chỉ mở thẻ khi người dùng nhấn vào điểm trà
      marker.on('click', () => {
        onSelectTea(product);
        marker.openPopup();
      });

      marker.addTo(map);
      markersRef.current.set(product.id, marker);

      if (isActive) {
        marker.openPopup();
      }
    });
  }, [teas, activeTea, activeRegion, createMarkerIcon, createPopupContent, onSelectTea]);

  // Điều khiển camera mượt mà (FlyTo) & đóng popup khi chuyển vùng
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (activeTea) {
      map.flyTo([activeTea.coordinates.lat, activeTea.coordinates.lng], 10, {
        duration: 1.4,
        easeLinearity: 0.25,
      });
    } else {
      map.closePopup();
      if (activeRegion !== 'ALL' && regionLeafletCenters[activeRegion]) {
        const target = regionLeafletCenters[activeRegion];
        map.flyTo([target.lat, target.lng], target.zoom, {
          duration: 1.3,
          easeLinearity: 0.25,
        });
      } else if (activeRegion === 'ALL') {
        map.flyTo(
          [regionLeafletCenters.ALL.lat, regionLeafletCenters.ALL.lng],
          regionLeafletCenters.ALL.zoom,
          { duration: 1.3 }
        );
      }
    }
  }, [activeTea, activeRegion]);

  const handleChangeTileStyle = (style: TileStyle) => {
    setCurrentStyle(style);
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }
    const newTile = TILE_LAYERS[style];
    const newLayer = L.tileLayer(newTile.url, {
      attribution: newTile.attribution,
      subdomains: newTile.subdomains || 'abc',
      maxZoom: 18,
    }).addTo(map);
    tileLayerRef.current = newLayer;
  };

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleResetView = () => {
    onSelectRegion('ALL');
    mapInstanceRef.current?.flyTo(
      [regionLeafletCenters.ALL.lat, regionLeafletCenters.ALL.lng],
      regionLeafletCenters.ALL.zoom,
      { duration: 1.2 }
    );
  };

  return (
    <div className="relative w-full h-[640px] md:h-[720px] rounded-sm overflow-hidden border border-gold/30 shadow-card bg-cream-50">
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Thanh điều khiển trên cùng - Bố cục thông minh không bao giờ bị đè che */}
      <div className="absolute top-3 inset-x-3 z-20 flex flex-wrap items-center justify-between gap-2.5 pointer-events-none">
        {/* Bộ lọc vùng: Toàn quốc, Miền Bắc, Miền Trung, Miền Nam */}
        <div className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 bg-[#FAF6EE]/95 backdrop-blur-md p-1.5 rounded-sm border border-gold/30 shadow-paper">
          <button
            type="button"
            onClick={() => onSelectRegion('ALL')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-sm text-xs font-sans font-medium uppercase tracking-wider transition-all ${
              activeRegion === 'ALL'
                ? 'bg-teal-dark text-cream-50 shadow-xs'
                : 'text-teal-deep/75 hover:text-teal-deep hover:bg-cream-200/50'
            }`}
          >
            Toàn quốc
          </button>
          {(['Bắc', 'Trung', 'Nam'] as const).map((region) => (
            <button
              key={region}
              type="button"
              onClick={() => onSelectRegion(region)}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-sm text-xs font-sans font-medium uppercase tracking-wider transition-all ${
                activeRegion === region
                  ? 'bg-teal-dark text-cream-50 shadow-xs'
                  : 'text-teal-deep/75 hover:text-teal-deep hover:bg-cream-200/50'
              }`}
            >
              <span
                className="w-2 h-2 rounded-full shadow-xs shrink-0"
                style={{ backgroundColor: regionColors[region] }}
              />
              <span className="whitespace-nowrap">Miền {region}</span>
            </button>
          ))}
        </div>

        {/* Bộ chọn phong cách họa đồ bản đồ: Mỹ Thuật lên đầu */}
        <div className="pointer-events-auto flex items-center gap-1 bg-[#FAF6EE]/95 backdrop-blur-md p-1.5 rounded-sm border border-gold/30 shadow-paper">
          <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-gold-dark px-1.5 hidden sm:flex font-sans">
            <Layers className="w-3.5 h-3.5 text-gold" />
            <span>Sắc Họa:</span>
          </div>
          {(['natgeo', 'osm', 'topo'] as const).map((styleKey) => (
            <button
              key={styleKey}
              type="button"
              onClick={() => handleChangeTileStyle(styleKey)}
              className={`px-2.5 py-1 rounded text-[11px] font-sans font-medium transition-all ${
                currentStyle === styleKey
                  ? 'bg-gold/25 font-bold text-teal-deep border border-gold/40 shadow-xs'
                  : 'text-teal-deep/70 hover:text-teal-deep hover:bg-cream-200/40'
              }`}
            >
              {TILE_LAYERS[styleKey].shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Bộ điều khiển Zoom & Khôi phục góc nhìn */}
      <div className="absolute bottom-6 left-4 z-20 flex flex-col gap-1.5 bg-[#FAF6EE]/90 backdrop-blur-md p-1 rounded-sm border border-gold/30 shadow-paper">
        <button
          type="button"
          onClick={handleZoomIn}
          title="Phóng to"
          className="w-8 h-8 rounded flex items-center justify-center text-teal-deep/80 hover:text-teal-deep hover:bg-cream-200/50 transition-colors"
        >
          <ZoomIn className="w-4 h-4 text-gold" />
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          title="Thu nhỏ"
          className="w-8 h-8 rounded flex items-center justify-center text-teal-deep/80 hover:text-teal-deep hover:bg-cream-200/50 transition-colors"
        >
          <ZoomOut className="w-4 h-4 text-gold" />
        </button>
        <div className="w-full h-px bg-gold/20 my-0.5" />
        <button
          type="button"
          onClick={handleResetView}
          title="Xem toàn cảnh Việt Nam"
          className="w-8 h-8 rounded flex items-center justify-center text-teal-deep/80 hover:text-teal-deep hover:bg-cream-200/50 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-gold" />
        </button>
      </div>

      {/* Thanh thông tin chân bản đồ */}
      <div className="absolute bottom-6 right-4 z-20 hidden sm:flex items-center gap-3 bg-[#FAF6EE]/90 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-gold/30 shadow-paper text-[10px] text-teal-deep/80 font-sans select-none">
        <div className="flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-gold" />
          <span className="font-semibold text-teal-deep">Bản Đồ Vị Giác GENTEA</span>
        </div>
        <span className="text-gold/40">&bull;</span>
        <span className="italic font-serif">Nhấn vào điểm trà để mở thẻ thông tin giấy dó</span>
      </div>
    </div>
  );
};
