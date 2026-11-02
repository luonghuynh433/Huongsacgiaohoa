import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, FileText, Sparkles, BookOpen, Droplets, Award, ArrowRight } from 'lucide-react';
import {
  LotusIcon,
  MountainSilhouette,
  TraditionalGate,
  DecorativeDivider,
} from '@/components/decorative/SvgIcons';
import { TeaPackagingCard } from '@/components/home/TeaPackagingCard';
import { GiftKitShowcase } from '@/components/home/GiftKitShowcase';
import { homeTeaShowcaseList } from '@/data/homeTeaShowcase';

type TeaCategoryFilter = 'all' | 'luc-tra' | 'shan-tuyet' | 'o-long' | 'uop-hoa' | 'len-men';

const CATEGORY_TABS: { id: TeaCategoryFilter; label: string }[] = [
  { id: 'all', label: 'Tất Cả Danh Trà' },
  { id: 'luc-tra', label: 'Lục Trà' },
  { id: 'shan-tuyet', label: 'Shan Tuyết Cổ Thụ' },
  { id: 'o-long', label: 'Trà Ô Long' },
  { id: 'uop-hoa', label: 'Trà Ướp Hoa' },
  { id: 'len-men', label: 'Hồng Trà & Hắc Trà' },
];

export const HomePage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<TeaCategoryFilter>('all');

  const filteredTeas = useMemo(() => {
    if (selectedCategory === 'all') return homeTeaShowcaseList;
    if (selectedCategory === 'luc-tra') {
      return homeTeaShowcaseList.filter((t) => t.id === 'tra-tan-cuong');
    }
    if (selectedCategory === 'shan-tuyet') {
      return homeTeaShowcaseList.filter(
        (t) => t.id === 'tra-shan-tuyet-ha-giang' || t.id === 'hong-tra-shan-tuyet' || t.id === 'hac-tra-pho-nhi'
      );
    }
    if (selectedCategory === 'o-long') {
      return homeTeaShowcaseList.filter((t) => t.id === 'tra-b-lao');
    }
    if (selectedCategory === 'uop-hoa') {
      return homeTeaShowcaseList.filter(
        (t) => t.id === 'tra-sen-tay-ho' || t.id === 'tra-tay-ninh'
      );
    }
    if (selectedCategory === 'len-men') {
      return homeTeaShowcaseList.filter(
        (t) => t.id === 'hong-tra-shan-tuyet' || t.id === 'hac-tra-pho-nhi'
      );
    }
    return homeTeaShowcaseList;
  }, [selectedCategory]);

  return (
    <div className="flex-1 bg-cream-100 overflow-hidden">
      <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center py-20">
        <div className="absolute inset-0 bg-cream-100" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M60 10 Q65 35 60 60 Q55 35 60 10Z' fill='%230F3E35'/%3E%3Cpath d='M35 70 Q50 60 60 65 Q50 75 35 70Z' fill='%230F3E35'/%3E%3Cpath d='M85 70 Q70 60 60 65 Q70 75 85 70Z' fill='%230F3E35'/%3E%3C/svg%3E")`,
            backgroundSize: '120px 120px',
          }}
        />

        <div className="absolute top-10 left-10 opacity-30 pointer-events-none">
          <LotusIcon className="w-28 h-28 text-gold" />
        </div>
        <div className="absolute top-16 right-16 opacity-25 pointer-events-none">
          <LotusIcon className="w-20 h-20 text-teal-medium" />
        </div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15 pointer-events-none">
          <TraditionalGate className="w-80 h-64 text-teal-dark" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
          <MountainSilhouette className="w-full h-56 text-teal-dark" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-4"
          >
            <LotusIcon className="w-20 h-20 text-gold mx-auto mb-3" />
            <div className="inline-block border border-gold/40 px-5 py-1.5 rounded-full bg-cream-50/70 shadow-sm">
              <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-sans font-semibold">
                Di Sản Danh Trà Việt Nam &bull; GENTEA 2026
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.15, ease: 'easeOut' }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-3 font-serif"
          >
            <span className="text-teal-deep">Gen</span>
            <span className="text-gold-accent">Tea</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '100%' }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <DecorativeDivider className="w-64 mx-auto my-4 text-gold" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
            className="space-y-4"
          >
            <p className="text-2xl sm:text-3xl text-teal-deep/95 font-serif font-bold tracking-wide">
              Chạm Sắc Hương &bull; Sắc Hương Giao Hoà
            </p>

            <p className="text-sm sm:text-base text-teal-deep/75 max-w-2xl mx-auto leading-relaxed font-serif italic">
              &ldquo;Từ rặng núi đá vôi Hoàng Liên Sơn mây mù bao phủ, qua những quả đồi bán sơn địa phù sa cổ Thái Nguyên, đến dải đất đỏ bazan cao nguyên Di Linh lộng gió. Mỗi búp trà Việt Nam là sự giao thoa kỳ diệu giữa thổ nhưỡng, hóa sinh tự nhiên và bàn tay tài hoa của nghệ nhân chế biến.&rdquo;
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            className="flex flex-wrap items-center justify-center gap-4 mt-10"
          >
            <button
              type="button"
              onClick={() => navigate('/survey')}
              className="group flex items-center gap-2 px-7 py-3.5 bg-teal-dark hover:bg-teal-deep text-cream-50 rounded-sm text-xs tracking-widest uppercase font-sans font-semibold transition-all duration-300 shadow-paper hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4 text-gold-light" />
              <span>Thiệp Khảo Sát Vị Giác</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold-light group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/minimap')}
              className="group flex items-center gap-2 px-7 py-3.5 bg-[#FAF6EE]/90 hover:bg-[#FAF6EE] border-2 border-gold/40 hover:border-gold text-teal-deep rounded-sm text-xs tracking-widest uppercase font-sans font-semibold transition-all duration-300 shadow-sm hover:-translate-y-0.5"
            >
              <Compass className="w-4 h-4 text-gold group-hover:rotate-45 transition-transform duration-300" />
              <span>Khám Phá Bản Đồ Vùng Trà</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-14 pt-8 border-t border-gold/20 grid grid-cols-3 max-w-xl mx-auto text-center"
          >
            <div>
              <p className="text-xl sm:text-2xl font-bold font-serif text-teal-deep">123.000<span className="text-xs text-gold font-sans font-normal ml-0.5">ha</span></p>
              <p className="text-[10px] text-teal-deep/60 uppercase tracking-widest font-sans mt-0.5">Vùng Trồng Cả Nước</p>
            </div>
            <div className="border-x border-gold/20">
              <p className="text-xl sm:text-2xl font-bold font-serif text-teal-deep">100 - 500<span className="text-xs text-gold font-sans font-normal ml-0.5">năm</span></p>
              <p className="text-[10px] text-teal-deep/60 uppercase tracking-widest font-sans mt-0.5">Tuổi Chè Cổ Thụ</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold font-serif text-teal-deep">0 - 70<span className="text-xs text-gold font-sans font-normal ml-0.5">%</span></p>
              <p className="text-[10px] text-teal-deep/60 uppercase tracking-widest font-sans mt-0.5">Biên Độ Oxy Hóa</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ý Niệm Bộ Quà Tặng & Tranh Dân Gian 3 Miền: Đông Hồ, Làng Sình, Tranh Kiếng */}
      <GiftKitShowcase />

      <section className="relative py-24 px-6 bg-cream-paper/50 border-t border-b border-gold/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-[11px] uppercase tracking-[0.35em] text-gold font-sans font-bold">
                Bộ Sưu Tập Danh Trà Di Sản Bản Địa
              </span>
              <Sparkles className="w-4 h-4 text-gold" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-teal-deep tracking-tight mb-4 font-serif">
              Tinh Hoa Danh Trà Ba Miền
            </h2>

            <DecorativeDivider className="w-56 mx-auto mb-4 text-gold" />

            <p className="text-sm sm:text-base text-teal-deep/75 max-w-2xl mx-auto italic font-serif leading-relaxed mb-8">
              Tuyển tập các dòng trà trứ danh đại diện cho các vùng địa lý, tầng thổ nhưỡng và công nghệ chế biến tinh hoa của nền trà học Việt Nam.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {CATEGORY_TABS.map((tab) => {
                const isActive = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-4 py-2 rounded-sm text-xs font-sans font-medium uppercase tracking-wider transition-all duration-300 ${
                      isActive
                        ? 'bg-teal-dark text-cream-50 shadow-sm border border-teal-dark'
                        : 'bg-[#FAF6EE] text-teal-deep/75 hover:text-teal-deep hover:bg-cream-200/60 border border-gold/30'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
            >
              {filteredTeas.map((tea, idx) => (
                <TeaPackagingCard key={tea.id} tea={tea} index={idx} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="py-20 px-6 bg-cream-100">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75 }}
            className="bg-[#FAF6EE] border-2 border-gold/30 rounded-sm p-8 sm:p-12 shadow-card relative overflow-hidden"
          >
            <div className="absolute inset-1.5 border border-gold/20 pointer-events-none rounded-[1px]" />

            <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-gold/15 border border-gold/30 text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-teal-deep">
                <Award className="w-3.5 h-3.5 text-gold-dark" />
                <span>Tiêu Chuẩn Khoa Học Cảm Quan &bull; TCVN 3218</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-teal-deep font-serif">
                &ldquo;Trà là sự giao hòa giữa Khoa học và Tâm linh&rdquo;
              </h3>

              <DecorativeDivider className="w-40 mx-auto text-gold" />

              <p className="text-sm sm:text-base text-teal-deep/80 font-serif italic leading-relaxed">
                Đằng sau chén trà thơm là hàm lượng L-Theanine kích thích sóng não Alpha tạo trạng thái thư giãn tỉnh táo, là liên kết Catechin chống oxy hóa trường tồn, và là lớp mao trạng lông tơ bẫy sương ngưng tụ giữa đại ngàn Tây Bắc. GENTEA gìn giữ những giá trị nguyên bản ấy trong từng hộp trà di sản.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-teal-deep/75 font-sans">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-gold" />
                  <span>Dữ liệu thực địa chuẩn hóa</span>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-gold" />
                  <span>Khoa học hóa sinh cảm quan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-gold" />
                  <span>Định vị tọa độ địa lý 3 miền</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
