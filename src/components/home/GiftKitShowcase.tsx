import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, QrCode, Box, Palette, Leaf, Compass, ArrowRight, ShieldCheck, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DecorativeDivider, LotusIcon } from '@/components/decorative/SvgIcons';
import { FolkArtGalleryModal } from './FolkArtGalleryModal';

interface FolkArtTradition {
  id: 'dong-ho' | 'lang-sinh' | 'tranh-kieng';
  name: string;
  region: string;
  origin: string;
  material: string;
  teaPairing: string;
  description: string;
  artFeatures: string[];
  colorTheme: string;
  accentBg: string;
}

const FOLK_ART_DATA: FolkArtTradition[] = [
  {
    id: 'dong-ho',
    name: 'Tranh Đông Hồ (Bắc Ninh)',
    region: 'Miền Bắc',
    origin: 'Làng Đông Hồ, Thuận Thành, Bắc Ninh',
    material: 'Giấy điệp quét vỏ sò óng ánh, màu tự nhiên từ than xoan, hoa dành dành, gỉ đồng',
    teaPairing: 'Lục Trà Tân Cương & Trà Shan Tuyết Cổ Thụ',
    description:
      'Nghệ thuật khắc mộc bản truyền thống Kinh Bắc lưu giữ hồn cốt làng quê đất Việt. Bề mặt giấy điệp lấp lánh như sương mai ngưng đọng trên búp chè non, mang lại cảm giác mộc mạc, gần gũi nhưng thấm đẫm phong vị văn hóa Thăng Long nghìn năm.',
    artFeatures: ['Nét khắc mộc bản dứt khoát', 'Nền giấy điệp vỏ sò lấp lánh', 'Màu sắc hữu cơ từ thiên nhiên'],
    colorTheme: '#0F3E35',
    accentBg: 'bg-[#0F3E35]/10',
  },
  {
    id: 'lang-sinh',
    name: 'Tranh Làng Sình (Cố Đô Huế)',
    region: 'Miền Trung',
    origin: 'Làng Sình (Lại Ân), Phú Vang, Thừa Thiên Huế',
    material: 'Mộc bản thủ công in trên giấy mộc, tô màu thủ công, đượm phong vị sông Hương núi Ngự',
    teaPairing: 'Trà Ô Long Bảo Lộc & Trà Sen Cung Đình',
    description:
      'Dòng tranh mộc bản dân gian xứ Huế gắn liền với nếp sống tâm linh và văn hóa cố đô. Đường nét vẽ tay mộc mạc, phóng khoáng, bảng màu trầm ấm như chén trà ủ hương sen trên hồ Tịnh Tâm, tạo nên sự thư thái và thanh tịnh tuyệt đối.',
    artFeatures: ['Mộc bản in thủ công xứ Huế', 'Tô màu tay tinh tế, tao nhã', 'Gắn kết phong vị cung đình'],
    colorTheme: '#C5A059',
    accentBg: 'bg-[#C5A059]/15',
  },
  {
    id: 'tranh-kieng',
    name: 'Tranh Kiếng (Nam Bộ)',
    region: 'Miền Nam',
    origin: 'Miệt vườn Tây Nam Bộ & Sài Gòn - Chợ Lớn',
    material: 'Vẽ ngược công phu sau mặt kính thủy tinh, cẩn xà cừ và mạ nhũ vàng lộng lẫy',
    teaPairing: 'Trà Lài Tự Nhiên & Trà Thảo Mộc Nam Bộ',
    description:
      'Nghệ thuật dân gian độc đáo của người phương Nam, nơi nghệ nhân vẽ ngược từng lớp màu sau tấm kiếng trong suốt. Sắc màu rực rỡ, đường viền nhũ vàng phóng khoáng phản chiếu sự nồng hậu, hào sảng của đất phương Nam và hương trà hoa dịu ngọt.',
    artFeatures: ['Kỹ thuật vẽ ngược sau mặt kính', 'Cẩn xà cừ & mạ nhũ vàng lấp lánh', 'Phong cách hào sảng, tươi sáng'],
    colorTheme: '#217060',
    accentBg: 'bg-[#217060]/10',
  },
];

const KIT_COMPONENTS = [
  {
    code: 'A',
    title: 'Nắp Hộp Mỹ Thuật',
    subtitle: 'Giấy mỹ thuật cao cấp, phủ nhũ vàng, ép nổi họa tiết',
    desc: 'Họa tiết mây lành, cổng làng kiến trúc cổ và đồi chè nhấp nhô tượng trưng cho ba miền hội tụ.',
    icon: Box,
  },
  {
    code: 'B',
    title: 'Khay Định Hình Sinh Học',
    subtitle: 'Bột giấy ép sinh học phân hủy 100% thân thiện môi trường',
    desc: 'Thiết kế 4 ngăn tinh tế: 3 ngăn trà di sản ba miền và 1 ngăn trải nghiệm đa giác quan.',
    icon: ShieldCheck,
  },
  {
    code: 'C',
    title: '3 Gói Trà 3 Miền',
    subtitle: 'Bao bì cao cấp in họa tiết phong cảnh đất nước',
    desc: 'Bảo quản tối ưu hương vị nguyên bản: Trà Miền Bắc, Trà Miền Trung và Trà Miền Nam.',
    icon: Leaf,
  },
  {
    code: 'D',
    title: 'Bộ Tranh Dân Gian 3 Miền',
    subtitle: 'Nét vẽ thủ công trên giấy mỹ thuật',
    desc: 'Giao thoa 3 trường phái tranh xưa: Tranh Đông Hồ (Bắc), Tranh Làng Sình (Trung), Tranh Kiếng (Nam).',
    icon: Palette,
  },
  {
    code: 'E',
    title: 'Thiệp Cảm Ơn & Trải Nghiệm',
    subtitle: 'Tích hợp QR kết nối Bản đồ vị giác & Âm nhạc',
    desc: 'Quét mã để chạm vào Bản đồ thổ nhưỡng tương tác và lắng nghe điệu thiền trà 432Hz.',
    icon: QrCode,
  },
];

export const GiftKitShowcase = () => {
  const navigate = useNavigate();
  const [selectedArt, setSelectedArt] = useState<'dong-ho' | 'lang-sinh' | 'tranh-kieng'>('dong-ho');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const currentArt = FOLK_ART_DATA.find((a) => a.id === selectedArt) || FOLK_ART_DATA[0];

  return (
    <section className="py-24 px-4 sm:px-6 bg-[#F8F5EE] relative overflow-hidden border-b border-gold/20">
      {/* Họa tiết hoa sen chìm */}
      <div className="absolute top-10 right-10 opacity-10 pointer-events-none">
        <LotusIcon className="w-80 h-80 text-gold" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header tiêu đề */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 border border-gold/40 px-5 py-1.5 rounded-full mb-3.5 bg-cream-50/80 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold-dark font-sans font-bold">
              Ý Niệm Bộ Quà Tặng &bull; GENTEA 2026
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-teal-deep tracking-tight mb-3 font-serif">
            Chạm Sắc Hương &bull; Sắc Hương Giao Hòa
          </h2>

          <DecorativeDivider className="w-56 mx-auto mb-4 text-gold" />

          <p className="text-sm sm:text-base text-teal-deep/80 italic font-serif leading-relaxed">
            &ldquo;Một hành trình trải nghiệm đầy cảm xúc, nơi hương trà Việt và văn hóa tranh dân gian ba miền giao hòa trọn vẹn trong một tác phẩm quà tặng di sản.&rdquo;
          </p>
        </motion.div>

        {/* Khối cấu trúc 5 thành phần của Bộ Kit */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-20">
          {KIT_COMPONENTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.code}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#FCFAF5] p-5 rounded-sm border border-gold/30 shadow-card hover:border-gold hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-7 h-7 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center font-serif font-bold text-teal-deep text-xs">
                      {item.code}
                    </span>
                    <Icon className="w-4 h-4 text-gold-dark group-hover:scale-110 transition-transform" />
                  </div>

                  <h4 className="text-base font-bold text-teal-deep font-serif mb-1 group-hover:text-gold-dark transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-gold-dark font-sans font-medium mb-2 leading-snug">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-teal-deep/75 font-serif italic leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-gold/15 flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-teal-deep/60 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span>Chuẩn hóa thủ công</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Khu vực Trọng tâm: BỘ BA TRANH DÂN GIAN 3 MIỀN */}
        <div className="bg-[#FCFAF5] border-2 border-gold/40 rounded-sm p-6 sm:p-10 md:p-12 shadow-card relative overflow-hidden">
          <div className="absolute inset-2 border border-gold/20 pointer-events-none rounded-[1px]" />
          <div className="absolute inset-3.5 border border-gold/10 pointer-events-none rounded-[1px]" />

          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[10px] uppercase tracking-[0.35em] text-gold-dark font-sans font-bold block mb-1.5">
                Hồn Di Sản &bull; Nghệ Thuật Tranh Xưa
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-deep font-serif tracking-tight mb-2">
                Bộ Ba Tranh Dân Gian Ba Miền
              </h3>
              <p className="text-xs sm:text-sm text-teal-deep/75 italic font-serif">
                Mỗi hộp quà GENTEA gói trọn 3 bức tranh thủ công đại diện cho tinh hoa mỹ thuật dân gian Bắc - Trung - Nam.
              </p>

              {/* 3 Nút chọn trường phái tranh */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6">
                {FOLK_ART_DATA.map((art) => {
                  const isSelected = selectedArt === art.id;
                  return (
                    <button
                      key={art.id}
                      type="button"
                      onClick={() => setSelectedArt(art.id)}
                      className={`px-4 py-2.5 rounded-sm text-xs uppercase tracking-wider font-sans font-medium transition-all duration-300 flex items-center gap-2 ${
                        isSelected
                          ? 'bg-teal-dark text-cream-50 shadow-paper ring-1 ring-gold/50'
                          : 'bg-cream-100/70 border border-gold/30 text-teal-deep/80 hover:bg-cream-200/50'
                      }`}
                    >
                      <Palette className="w-3.5 h-3.5 text-gold" />
                      <span>{art.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chi tiết về trường phái tranh đang chọn */}
            <motion.div
              key={currentArt.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-cream-50/90 border border-gold/30 rounded-sm p-6 sm:p-8"
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-sm bg-gold/20 text-teal-deep text-[10px] font-sans uppercase tracking-widest font-bold border border-gold/30">
                    {currentArt.region} &bull; Tranh Dân Gian
                  </span>
                  <span className="text-xs text-gold-dark font-sans font-semibold">
                    {currentArt.origin}
                  </span>
                </div>

                <h4 className="text-2xl sm:text-3xl font-bold text-teal-deep font-serif">
                  {currentArt.name}
                </h4>

                <p className="text-sm text-teal-deep/85 font-serif italic leading-relaxed">
                  &ldquo;{currentArt.description}&rdquo;
                </p>

                <div className="p-3.5 bg-[#FAF6EE] rounded-sm border border-gold/25 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-gold-dark font-sans font-semibold uppercase tracking-wider text-[10px]">
                    <Leaf className="w-3.5 h-3.5" />
                    <span>Hòa Điệu Cùng Dòng Trà:</span>
                  </div>
                  <p className="font-serif font-bold text-teal-deep">
                    {currentArt.teaPairing}
                  </p>
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] uppercase tracking-wider font-sans font-bold text-gold-dark block">
                    Đặc Trưng Nghệ Thuật:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentArt.artFeatures.map((feat) => (
                      <span
                        key={feat}
                        className="text-xs px-3 py-1 bg-cream-100 border border-gold/30 rounded-sm text-teal-deep font-serif"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Nút Xem Tranh Dân Gian - USER MANDATE */}
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => setIsGalleryOpen(true)}
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-sm bg-teal-dark hover:bg-teal-deep text-cream-50 font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-paper hover:shadow-lg ring-1 ring-gold/50 group"
                  >
                    <Eye className="w-4 h-4 text-gold-light group-hover:scale-110 transition-transform" />
                    <span>Xem Tranh &bull; {currentArt.name}</span>
                    <ArrowRight className="w-4 h-4 text-gold-light group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Thẻ mô phỏng tấm thiệp tranh xưa */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-full max-w-xs bg-[#FBF8F1] border-2 border-[#9E7A36] p-6 rounded-sm shadow-card text-center overflow-hidden">
                  <div className="absolute inset-1.5 border border-[#9E7A36]/40 pointer-events-none rounded-[1px]" />

                  <div className="w-16 h-16 rounded-full border border-gold/40 bg-cream-100 flex items-center justify-center mx-auto mb-4 text-gold-dark shadow-xs">
                    <Palette className="w-8 h-8" />
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold-dark font-sans font-bold block mb-1">
                    Tranh Khắc Gỗ Cổ Truyền
                  </span>
                  <h5 className="text-xl font-bold font-serif text-teal-deep mb-2">
                    {currentArt.name}
                  </h5>
                  <p className="text-xs text-teal-deep/75 font-serif italic leading-relaxed mb-4">
                    Chất liệu: {currentArt.material}
                  </p>

                  {/* Nút Xem Tranh trực tiếp từ thẻ */}
                  <button
                    type="button"
                    onClick={() => setIsGalleryOpen(true)}
                    className="w-full py-2.5 px-4 bg-teal-dark hover:bg-teal-deep text-cream-50 rounded-xs text-[11px] font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs border border-gold/40 mb-3"
                  >
                    <Eye className="w-3.5 h-3.5 text-gold-light" />
                    <span>Thưởng Lãm Tranh Dân Gian</span>
                  </button>

                  <div className="pt-3 border-t border-gold/25 flex items-center justify-between text-[10px] text-gold-dark font-sans uppercase tracking-widest">
                    <span>GENTEA &bull; 2026</span>
                    <span>Mộc Bản Di Sản</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Thiệp Cảm Ơn & Trải Nghiệm - Quét QR */}
            <div className="mt-10 p-6 bg-cream-100/70 border border-gold/30 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded bg-[#FCFAF5] border border-gold/40 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <QrCode className="w-8 h-8 text-teal-dark" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase tracking-widest text-gold-dark font-sans font-bold">
                      Thiệp Cảm Ơn & Trải Nghiệm
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-dark" />
                    <span className="text-[10px] text-teal-deep/70 font-sans">
                      Quét để Chạm & Thưởng Thức
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-teal-deep font-serif">
                    Kết nối trực tiếp Bản Đồ Vị Giác & Âm Nhạc Thiền Trà
                  </h4>
                  <p className="text-xs text-teal-deep/75 font-serif italic">
                    Tấm thiệp vật lý đi kèm hộp quà mang mã QR dẫn lối người thưởng ẩm vào không gian số tương tác của GENTEA.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => navigate('/minimap')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-teal-dark text-cream-50 rounded-sm text-xs uppercase tracking-wider font-sans font-semibold hover:bg-teal-deep transition-all shadow-paper"
                >
                  <Compass className="w-3.5 h-3.5 text-gold-light" />
                  <span>Mở Bản Đồ Vị Giác</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL TRÌNH CHIẾU TRANH DÂN GIAN TOÀN MÀN HÌNH VỚI VÒNG XOAY ĐĨA NHẠC */}
      <FolkArtGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        defaultTraditionId={selectedArt}
      />
    </section>
  );
};
