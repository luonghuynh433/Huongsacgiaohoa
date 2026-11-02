import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { SurveyWizard } from '@/features/survey/SurveyWizard';
import { DecorativeDivider, LotusIcon } from '@/components/decorative/SvgIcons';

export const SurveyPage = () => {
  return (
    <div className="flex-1 bg-cream-100 py-12 px-4 sm:px-6 relative overflow-hidden min-h-[calc(100vh-5rem)] flex flex-col justify-center">
      {/* Họa tiết hoa sen chìm góc trang */}
      <div className="absolute top-10 right-10 opacity-10 pointer-events-none">
        <LotusIcon className="w-72 h-72 text-teal-dark" />
      </div>
      <div className="absolute -bottom-10 -left-10 opacity-10 pointer-events-none rotate-45">
        <LotusIcon className="w-72 h-72 text-gold" />
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 border border-gold/40 px-5 py-1.5 rounded-full mb-3.5 bg-cream-50/80 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-gold-dark font-sans font-semibold">
              Thiệp Cảm Ơn &bull; Trải Nghiệm Vị Giác GENTEA
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-teal-deep tracking-tight mb-2.5 font-serif">
            Khảo Sát Phong Vị &bull; Chạm Sắc Hương
          </h1>

          <DecorativeDivider className="w-48 mx-auto mb-3.5 text-gold" />

          <p className="max-w-lg mx-auto text-xs sm:text-sm text-teal-deep/75 italic leading-relaxed font-serif">
            Mỗi búp trà mang một linh hồn và cấu trúc hóa sinh học riêng biệt. Lắng nghe thân tâm qua ba câu hỏi mộc mạc để tìm thấy những danh trà hòa hợp và đồng điệu nhất với phong vị của bạn.
          </p>
        </motion.div>

        <SurveyWizard />
      </div>
    </div>
  );
};
