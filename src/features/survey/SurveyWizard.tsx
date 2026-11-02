import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Check,
  BookmarkCheck,
  Loader2,
  Thermometer,
  Clock,
  Sparkle,
  FlaskConical,
  Layers,
} from 'lucide-react';
import type {
  MindStatePreference,
  FlavorProfilePreference,
  ProcessingPreference,
  SurveyAnswers,
  RecommendationResult,
} from '@/types/survey.types';
import { calculateRecommendation } from './recommendationEngine';
import { saveSurveyResult } from './surveyApi';
import {
  AlertFocusIcon,
  RelaxSootheIcon,
  WildMountainIcon,
  AstringentSweetIcon,
  FloralMilkyIcon,
  HoneyMineralIcon,
  FreshLeafIcon,
  FermentationPotIcon,
  LotusFlowerScentIcon,
} from '@/components/decorative/SurveyIllustrations';
import { DecorativeDivider, LotusIcon } from '@/components/decorative/SvgIcons';

export const SurveyWizard = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [result, setResult] = useState<RecommendationResult | null>(null);
  const [activeTeaId, setActiveTeaId] = useState<string | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'saving' | 'saved' | 'fallback'>('idle');
  const [savedId, setSavedId] = useState<string | null>(null);

  const handleSelectMindState = (mindState: MindStatePreference) => {
    setAnswers((prev) => ({ ...prev, mindState }));
  };

  const handleSelectFlavor = (flavor: FlavorProfilePreference) => {
    setAnswers((prev) => ({ ...prev, flavor }));
  };

  const handleSelectProcessing = (processingStyle: ProcessingPreference) => {
    setAnswers((prev) => ({ ...prev, processingStyle }));
  };

  const handleNextToStep2 = () => {
    if (answers.mindState) {
      setStep(2);
    }
  };

  const handleNextToStep3 = () => {
    if (answers.flavor) {
      setStep(3);
    }
  };

  const handleFinishSurvey = async () => {
    if (answers.mindState && answers.flavor && answers.processingStyle) {
      const rec = calculateRecommendation(answers);
      setResult(rec);
      setActiveTeaId(rec.product.id);
      setStep(4);
      setSubmissionStatus('saving');

      try {
        const resp = await saveSurveyResult({
          answers,
          recommendedRegion: rec.region,
          recommendedTeaId: rec.product.id,
          recommendedTeaName: rec.product.name,
          additionalTeaIds: rec.recommendations.slice(1).map((r) => r.product.id),
          clientTimestamp: new Date().toISOString(),
        });
        if (resp.success) {
          setSubmissionStatus('saved');
          setSavedId(resp.id);
        } else {
          setSubmissionStatus('fallback');
        }
      } catch {
        setSubmissionStatus('fallback');
      }
    }
  };

  const handleReset = () => {
    setAnswers({});
    setResult(null);
    setActiveTeaId(null);
    setSubmissionStatus('idle');
    setSavedId(null);
    setStep(1);
  };

  const handleExploreMinimap = (teaId?: string, region?: string) => {
    const targetTeaId = teaId || activeTeaId || result?.product.id;
    const targetRegion = region || result?.region;
    if (targetTeaId && targetRegion) {
      navigate(`/minimap?tea=${encodeURIComponent(targetTeaId)}&region=${encodeURIComponent(targetRegion)}`);
    } else {
      navigate('/minimap');
    }
  };

  const currentDisplayTea = result?.recommendations.find((r) => r.product.id === activeTeaId) ||
    result?.recommendations[0];

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Khung Thiệp Trải Nghiệm Giấy Mỹ Thuật */}
      <div className="relative bg-cream-50/95 border-2 border-gold/30 rounded-sm shadow-card p-6 sm:p-10 md:p-12 overflow-hidden">
        {/* Đường viền chỉ vàng kép kiểu thiệp cung đình */}
        <div className="absolute inset-2 border border-gold/20 pointer-events-none rounded-[1px]" />
        <div className="absolute inset-3 border border-gold/10 pointer-events-none rounded-[1px]" />

        {/* Họa tiết hoa sen chìm */}
        <div className="absolute -top-12 -right-12 opacity-10 pointer-events-none">
          <LotusIcon className="w-48 h-48 text-gold" />
        </div>

        <div className="relative z-10">
          {/* Thanh chỉ số bước */}
          {step < 4 && (
            <div className="flex items-center justify-between border-b border-gold/20 pb-4 mb-8 text-xs font-sans">
              <div className="flex items-center gap-2 text-teal-deep/80">
                <span className="w-2.5 h-2.5 rounded-full bg-gold shadow-xs" />
                <span className="uppercase tracking-[0.25em] font-semibold text-teal-deep">
                  Thiệp Khảo Sát &bull; Trang {step}/3
                </span>
              </div>
              <div className="text-gold uppercase tracking-widest text-[11px] font-medium">
                {step === 1 && 'Nhu Cầu Thần Kinh & Thân Tâm'}
                {step === 2 && 'Khoa Học Cảm Quan & Vị Giác'}
                {step === 3 && 'Công Nghệ Chế Biến & Hương Tự Nhiên'}
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* ================= BƯỚC 1: NHU CẦU THÂN - TÂM ================= */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-7"
              >
                <div className="text-center max-w-xl mx-auto">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-sans font-medium block mb-2">
                    Câu hỏi 01 &bull; Trạng thái Thần kinh & Thân Tâm
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-teal-deep tracking-tight mb-2 font-serif">
                    Bạn đang tìm kiếm trạng thái nào cho tâm trí?
                  </h2>
                  <p className="text-xs sm:text-sm text-teal-deep/70 italic leading-relaxed">
                    Dược tính và tỷ lệ axit amin tự nhiên trong từng búp chè sẽ tương tác trực tiếp với hệ thần kinh của bạn.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {/* Lựa chọn 1: Tỉnh táo */}
                  <button
                    type="button"
                    onClick={() => handleSelectMindState('alert_focus')}
                    className={`relative text-left p-5 rounded-sm border transition-all duration-300 flex flex-col justify-between group ${
                      answers.mindState === 'alert_focus'
                        ? 'bg-cream-200/80 border-gold shadow-paper ring-1 ring-gold/50'
                        : 'bg-cream-100/50 border-gold/25 hover:border-gold/60 hover:bg-cream-200/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center bg-cream-50 text-teal-dark group-hover:scale-105 transition-transform">
                          <AlertFocusIcon className="w-8 h-8 text-teal-dark" />
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            answers.mindState === 'alert_focus'
                              ? 'border-gold bg-gold text-cream-50'
                              : 'border-gold/40 bg-transparent'
                          }`}
                        >
                          {answers.mindState === 'alert_focus' && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-teal-deep mb-1.5 font-serif">
                        Tỉnh táo & Tập trung sâu
                      </h3>
                      <p className="text-xs text-teal-deep/75 leading-relaxed italic mb-3">
                        Kích thích sóng não Alpha (8-12 Hz), đưa tâm trí vào sự minh mẫn sắc bén, tập trung cao độ mà không gây hồi hộp.
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-gold/15 flex flex-wrap gap-1 text-[10px] text-teal-deep/70 font-sans">
                      <span className="px-2 py-0.5 bg-cream-50 border border-gold/20 rounded-sm">L-Theanine &gt;50%</span>
                      <span className="px-2 py-0.5 bg-cream-50 border border-gold/20 rounded-sm">Sáng sủa, thông tuệ</span>
                    </div>
                  </button>

                  {/* Lựa chọn 2: Thư giãn */}
                  <button
                    type="button"
                    onClick={() => handleSelectMindState('relax_soothe')}
                    className={`relative text-left p-5 rounded-sm border transition-all duration-300 flex flex-col justify-between group ${
                      answers.mindState === 'relax_soothe'
                        ? 'bg-cream-200/80 border-gold shadow-paper ring-1 ring-gold/50'
                        : 'bg-cream-100/50 border-gold/25 hover:border-gold/60 hover:bg-cream-200/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center bg-cream-50 text-gold-dark group-hover:scale-105 transition-transform">
                          <RelaxSootheIcon className="w-8 h-8 text-gold-dark" />
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            answers.mindState === 'relax_soothe'
                              ? 'border-gold bg-gold text-cream-50'
                              : 'border-gold/40 bg-transparent'
                          }`}
                        >
                          {answers.mindState === 'relax_soothe' && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-teal-deep mb-1.5 font-serif">
                        Thư giãn & Vỗ về thân tâm
                      </h3>
                      <p className="text-xs text-teal-deep/75 leading-relaxed italic mb-3">
                        Kích hoạt hệ thần kinh đối giao cảm, chuyển hóa polyphenol đắng chát thành hương thơm este êm dịu, xoa dịu âu lo.
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-gold/15 flex flex-wrap gap-1 text-[10px] text-teal-deep/70 font-sans">
                      <span className="px-2 py-0.5 bg-cream-50 border border-gold/20 rounded-sm">Bán oxy hóa 50-70%</span>
                      <span className="px-2 py-0.5 bg-cream-50 border border-gold/20 rounded-sm">An thần, tĩnh tại</span>
                    </div>
                  </button>

                  {/* Lựa chọn 3: Nguyên bản núi rừng */}
                  <button
                    type="button"
                    onClick={() => handleSelectMindState('wild_heritage')}
                    className={`relative text-left p-5 rounded-sm border transition-all duration-300 flex flex-col justify-between group ${
                      answers.mindState === 'wild_heritage'
                        ? 'bg-cream-200/80 border-gold shadow-paper ring-1 ring-gold/50'
                        : 'bg-cream-100/50 border-gold/25 hover:border-gold/60 hover:bg-cream-200/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center bg-cream-50 text-teal-deep group-hover:scale-105 transition-transform">
                          <WildMountainIcon className="w-8 h-8 text-teal-deep" />
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            answers.mindState === 'wild_heritage'
                              ? 'border-gold bg-gold text-cream-50'
                              : 'border-gold/40 bg-transparent'
                          }`}
                        >
                          {answers.mindState === 'wild_heritage' && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-teal-deep mb-1.5 font-serif">
                        Nguyên bản & Núi rừng
                      </h3>
                      <p className="text-xs text-teal-deep/75 leading-relaxed italic mb-3">
                        Thấm đẫm linh khí núi cao Hoàng Liên Sơn, nội chất chè cổ thụ dày dặn với lớp mao trạng giữ ấm bẫy sương trời.
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-gold/15 flex flex-wrap gap-1 text-[10px] text-teal-deep/70 font-sans">
                      <span className="px-2 py-0.5 bg-cream-50 border border-gold/20 rounded-sm">Cổ thụ 100-500 năm</span>
                      <span className="px-2 py-0.5 bg-cream-50 border border-gold/20 rounded-sm">Khoáng chất tự nhiên</span>
                    </div>
                  </button>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    disabled={!answers.mindState}
                    onClick={handleNextToStep2}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-sm text-xs uppercase tracking-wider font-sans font-medium transition-all ${
                      answers.mindState
                        ? 'bg-teal-dark text-cream-50 hover:bg-teal-deep shadow-paper'
                        : 'bg-teal-dark/30 text-cream-50/50 cursor-not-allowed'
                    }`}
                  >
                    <span>Tiếp tục sang Cảm quan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ================= BƯỚC 2: CẢM QUAN HƯƠNG VỊ ================= */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-7"
              >
                <div className="text-center max-w-xl mx-auto">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-sans font-medium block mb-2">
                    Câu hỏi 02 &bull; Khoa Học Cảm Quan & Vị Giác
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-teal-deep tracking-tight mb-2 font-serif">
                    Vòm họng bạn rung động với nốt vị nào?
                  </h2>
                  <p className="text-xs sm:text-sm text-teal-deep/70 italic leading-relaxed">
                    Sự kết hợp giữa hợp chất thơm bay hơi và cấu trúc phân tử polyphenol sẽ tạo nên bản hòa tấu vị giác độc nhất.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {/* Lựa chọn 1: Tiền chát hậu ngọt */}
                  <button
                    type="button"
                    onClick={() => handleSelectFlavor('astringent_sweet')}
                    className={`relative text-left p-5 rounded-sm border transition-all duration-300 flex flex-col justify-between group ${
                      answers.flavor === 'astringent_sweet'
                        ? 'bg-cream-200/80 border-gold shadow-paper ring-1 ring-gold/50'
                        : 'bg-cream-100/50 border-gold/25 hover:border-gold/60 hover:bg-cream-200/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center bg-cream-50 text-teal-dark group-hover:scale-105 transition-transform">
                          <AstringentSweetIcon className="w-8 h-8 text-teal-dark" />
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            answers.flavor === 'astringent_sweet'
                              ? 'border-gold bg-gold text-cream-50'
                              : 'border-gold/40 bg-transparent'
                          }`}
                        >
                          {answers.flavor === 'astringent_sweet' && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-teal-deep mb-1.5 font-serif">
                        Chát dịu & Hậu Umami sâu
                      </h3>
                      <p className="text-xs text-teal-deep/75 leading-relaxed italic mb-3">
                        Tiền chát thanh thoát do Catechin mang lại, nhanh chóng chuyển hóa thành hậu ngọt ngào Umami dồi dào, ngát hương cốm nếp.
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-gold/15 flex flex-wrap gap-1 text-[10px] text-teal-deep/70 font-sans">
                      <span className="px-2 py-0.5 bg-cream-50 border border-gold/20 rounded-sm">Hương cốm non</span>
                      <span className="px-2 py-0.5 bg-cream-50 border border-gold/20 rounded-sm">Hậu ngọt sâu lắng</span>
                    </div>
                  </button>

                  {/* Lựa chọn 2: Hương hoa & bơ sữa ngậy */}
                  <button
                    type="button"
                    onClick={() => handleSelectFlavor('floral_milky')}
                    className={`relative text-left p-5 rounded-sm border transition-all duration-300 flex flex-col justify-between group ${
                      answers.flavor === 'floral_milky'
                        ? 'bg-cream-200/80 border-gold shadow-paper ring-1 ring-gold/50'
                        : 'bg-cream-100/50 border-gold/25 hover:border-gold/60 hover:bg-cream-200/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center bg-cream-50 text-gold group-hover:scale-105 transition-transform">
                          <FloralMilkyIcon className="w-8 h-8 text-gold" />
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            answers.flavor === 'floral_milky'
                              ? 'border-gold bg-gold text-cream-50'
                              : 'border-gold/40 bg-transparent'
                          }`}
                        >
                          {answers.flavor === 'floral_milky' && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-teal-deep mb-1.5 font-serif">
                        Hương hoa mộc & Sữa ngậy
                      </h3>
                      <p className="text-xs text-teal-deep/75 leading-relaxed italic mb-3">
                        Hương hoa mộc lan và quả đào chín quyện cùng vị kem bơ ngậy béo mịn màng. Nước trà tròn đầy không chát gắt.
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-gold/15 flex flex-wrap gap-1 text-[10px] text-teal-deep/70 font-sans">
                      <span className="px-2 py-0.5 bg-cream-50 border border-gold/20 rounded-sm">Hoa mộc & đào chín</span>
                      <span className="px-2 py-0.5 bg-cream-50 border border-gold/20 rounded-sm">Bơ sữa mềm mượt</span>
                    </div>
                  </button>

                  {/* Lựa chọn 3: Mộc mạc khoáng & mật ong */}
                  <button
                    type="button"
                    onClick={() => handleSelectFlavor('honey_mineral')}
                    className={`relative text-left p-5 rounded-sm border transition-all duration-300 flex flex-col justify-between group ${
                      answers.flavor === 'honey_mineral'
                        ? 'bg-cream-200/80 border-gold shadow-paper ring-1 ring-gold/50'
                        : 'bg-cream-100/50 border-gold/25 hover:border-gold/60 hover:bg-cream-200/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center bg-cream-50 text-teal-deep group-hover:scale-105 transition-transform">
                          <HoneyMineralIcon className="w-8 h-8 text-teal-deep" />
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            answers.flavor === 'honey_mineral'
                              ? 'border-gold bg-gold text-cream-50'
                              : 'border-gold/40 bg-transparent'
                          }`}
                        >
                          {answers.flavor === 'honey_mineral' && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-teal-deep mb-1.5 font-serif">
                        Mộc mạc khoáng & Mật ong
                      </h3>
                      <p className="text-xs text-teal-deep/75 leading-relaxed italic mb-3">
                        Hệ huyền phù mao trạng bọc lấy gai lưỡi, thơm mật ong rừng hòa cùng khoáng chất đá vôi nguyên sơ, thanh sạch kéo dài.
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-gold/15 flex flex-wrap gap-1 text-[10px] text-teal-deep/70 font-sans">
                      <span className="px-2 py-0.5 bg-cream-50 border border-gold/20 rounded-sm">Mao trạng bọc gai lưỡi</span>
                      <span className="px-2 py-0.5 bg-cream-50 border border-gold/20 rounded-sm">Mật ong rừng Tây Bắc</span>
                    </div>
                  </button>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider font-sans text-teal-deep/70 hover:text-teal-deep transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Quay lại</span>
                  </button>

                  <button
                    type="button"
                    disabled={!answers.flavor}
                    onClick={handleNextToStep3}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-sm text-xs uppercase tracking-wider font-sans font-medium transition-all ${
                      answers.flavor
                        ? 'bg-teal-dark text-cream-50 hover:bg-teal-deep shadow-paper'
                        : 'bg-teal-dark/30 text-cream-50/50 cursor-not-allowed'
                    }`}
                  >
                    <span>Tiếp tục sang Chế biến</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ================= BƯỚC 3: CÔNG NGHỆ CHẾ BIẾN & HƯƠNG TỰ NHIÊN ================= */}
            {step === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-7"
              >
                <div className="text-center max-w-xl mx-auto">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-gold font-sans font-medium block mb-2">
                    Câu hỏi 03 &bull; Công Nghệ Chế Biến & Hương Tự Nhiên
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-teal-deep tracking-tight mb-2 font-serif">
                    Bạn ưu ái phong cách chế biến & tầng hương nào?
                  </h2>
                  <p className="text-xs sm:text-sm text-teal-deep/70 italic leading-relaxed">
                    Mức độ oxy hóa và nghệ thuật ướp hương hoa truyền thống sẽ định hình độ dày và dư vị của ngụm trà.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {/* Lựa chọn 1: Trà mộc tươi non */}
                  <button
                    type="button"
                    onClick={() => handleSelectProcessing('fresh_unfermented')}
                    className={`relative text-left p-5 rounded-sm border transition-all duration-300 flex flex-col justify-between group ${
                      answers.processingStyle === 'fresh_unfermented'
                        ? 'bg-cream-200/80 border-gold shadow-paper ring-1 ring-gold/50'
                        : 'bg-cream-100/50 border-gold/25 hover:border-gold/60 hover:bg-cream-200/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center bg-cream-50 text-teal-dark group-hover:scale-105 transition-transform">
                          <FreshLeafIcon className="w-8 h-8 text-teal-dark" />
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            answers.processingStyle === 'fresh_unfermented'
                              ? 'border-gold bg-gold text-cream-50'
                              : 'border-gold/40 bg-transparent'
                          }`}
                        >
                          {answers.processingStyle === 'fresh_unfermented' && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-teal-deep mb-1.5 font-serif">
                        Trà Mộc Tươi Non (0% Oxy Hóa)
                      </h3>
                      <p className="text-xs text-teal-deep/75 leading-relaxed italic mb-3">
                        Diệt men tức thì bằng nhiệt để lưu giữ trọn vẹn sắc xanh diệp lục, hương cốm non mộc mạc và vị tươi mới của lá chè.
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-gold/15 flex flex-wrap gap-1 text-[10px] text-teal-deep/70 font-sans">
                      <span className="px-2 py-0.5 bg-cream-50 border border-gold/20 rounded-sm">0% oxy hóa</span>
                      <span className="px-2 py-0.5 bg-cream-50 border border-gold/20 rounded-sm">Giữ trọn diệp lục</span>
                    </div>
                  </button>

                  {/* Lựa chọn 2: Bán oxy hóa & Lên men ủ men */}
                  <button
                    type="button"
                    onClick={() => handleSelectProcessing('oxidized_fermented')}
                    className={`relative text-left p-5 rounded-sm border transition-all duration-300 flex flex-col justify-between group ${
                      answers.processingStyle === 'oxidized_fermented'
                        ? 'bg-cream-200/80 border-gold shadow-paper ring-1 ring-gold/50'
                        : 'bg-cream-100/50 border-gold/25 hover:border-gold/60 hover:bg-cream-200/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center bg-cream-50 text-gold-dark group-hover:scale-105 transition-transform">
                          <FermentationPotIcon className="w-8 h-8 text-gold-dark" />
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            answers.processingStyle === 'oxidized_fermented'
                              ? 'border-gold bg-gold text-cream-50'
                              : 'border-gold/40 bg-transparent'
                          }`}
                        >
                          {answers.processingStyle === 'oxidized_fermented' && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-teal-deep mb-1.5 font-serif">
                        Bán Oxy Hóa & Lên Men Ủ Men
                      </h3>
                      <p className="text-xs text-teal-deep/75 leading-relaxed italic mb-3">
                        Kỹ thuật siết banh 36h bung nở nốt hương bơ sữa, hoặc lên men vi sinh êm dịu dạ dày, nước trà hổ phách ấm áp.
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-gold/15 flex flex-wrap gap-1 text-[10px] text-teal-deep/70 font-sans">
                      <span className="px-2 py-0.5 bg-cream-50 border border-gold/20 rounded-sm">50 - 100% oxy hóa</span>
                      <span className="px-2 py-0.5 bg-cream-50 border border-gold/20 rounded-sm">Ấm bụng, dịu êm</span>
                    </div>
                  </button>

                  {/* Lựa chọn 3: Nghệ thuật ướp hoa tươi */}
                  <button
                    type="button"
                    onClick={() => handleSelectProcessing('flower_scented')}
                    className={`relative text-left p-5 rounded-sm border transition-all duration-300 flex flex-col justify-between group ${
                      answers.processingStyle === 'flower_scented'
                        ? 'bg-cream-200/80 border-gold shadow-paper ring-1 ring-gold/50'
                        : 'bg-cream-100/50 border-gold/25 hover:border-gold/60 hover:bg-cream-200/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3.5">
                        <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center bg-cream-50 text-gold group-hover:scale-105 transition-transform">
                          <LotusFlowerScentIcon className="w-8 h-8 text-gold" />
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            answers.processingStyle === 'flower_scented'
                              ? 'border-gold bg-gold text-cream-50'
                              : 'border-gold/40 bg-transparent'
                          }`}
                        >
                          {answers.processingStyle === 'flower_scented' && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>

                      <h3 className="text-base font-bold text-teal-deep mb-1.5 font-serif">
                        Ướp Hoa Tự Nhiên Truyền Thống
                      </h3>
                      <p className="text-xs text-teal-deep/75 leading-relaxed italic mb-3">
                        Thấm đượm hương hoa sen Bách Diệp Hồ Tây ướp 7 lượt hoặc hoa lài tự nhiên, thanh tao và đài các cung đình.
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-gold/15 flex flex-wrap gap-1 text-[10px] text-teal-deep/70 font-sans">
                      <span className="px-2 py-0.5 bg-cream-50 border border-gold/20 rounded-sm">Sen Bách Diệp</span>
                      <span className="px-2 py-0.5 bg-cream-50 border border-gold/20 rounded-sm">Thanh khiết, tao nhã</span>
                    </div>
                  </button>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider font-sans text-teal-deep/70 hover:text-teal-deep transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Quay lại</span>
                  </button>

                  <button
                    type="button"
                    disabled={!answers.processingStyle}
                    onClick={handleFinishSurvey}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-sm text-xs uppercase tracking-wider font-sans font-medium transition-all ${
                      answers.processingStyle
                        ? 'bg-teal-dark text-cream-50 hover:bg-teal-deep shadow-paper'
                        : 'bg-teal-dark/30 text-cream-50/50 cursor-not-allowed'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-gold-light" />
                    <span>Mở Thiệp Gợi Ý Vị Giác</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ================= BƯỚC 4: THIỆP CẢM ƠN & KẾT QUẢ GỢI Ý (ĐA DANH TRÀ) ================= */}
            {step === 4 && result && currentDisplayTea && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="space-y-6"
              >
                {/* Header của tấm thiệp */}
                <div className="border-b border-gold/25 pb-5">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-gold shadow-xs" />
                    <span className="text-[10px] uppercase tracking-[0.3em] text-gold font-sans font-medium">
                      Thiệp Cảm Ơn &bull; Sắc Hương Hữu Duyên &bull; Tìm thấy {result.recommendations.length} danh trà phù hợp
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-teal-deep tracking-tight font-serif">
                    {result.headline}
                  </h2>
                </div>

                {/* Thanh chuyển đổi nhanh giữa các danh trà nếu gợi ý > 1 loại */}
                {result.recommendations.length > 1 && (
                  <div className="bg-cream-100/60 p-2 rounded-sm border border-gold/20 flex flex-wrap gap-2">
                    <div className="text-[10px] uppercase tracking-wider text-gold-dark font-sans font-semibold flex items-center gap-1 px-2">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Danh trà tương hợp:</span>
                    </div>
                    {result.recommendations.map((rec) => {
                      const isSelected = rec.product.id === currentDisplayTea.product.id;
                      return (
                        <button
                          key={rec.product.id}
                          type="button"
                          onClick={() => setActiveTeaId(rec.product.id)}
                          className={`text-xs px-3 py-1.5 rounded-sm font-sans transition-all flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-teal-dark text-cream-50 shadow-xs font-medium ring-1 ring-gold/40'
                              : 'bg-cream-50 text-teal-deep/80 hover:bg-cream-200/70 border border-gold/20'
                          }`}
                        >
                          <span>{rec.product.name}</span>
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                              isSelected ? 'bg-gold/30 text-gold-light' : 'bg-gold/15 text-gold-dark'
                            }`}
                          >
                            {rec.matchedScore}%
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Khối giấy mỹ thuật giới thiệu danh trà đang được chọn */}
                <div className="bg-cream-100/80 border border-gold/35 rounded-sm p-6 sm:p-8 relative shadow-inner overflow-hidden">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className="inline-block px-2.5 py-0.5 bg-gold/20 text-teal-deep text-[10px] font-sans uppercase tracking-widest rounded-sm border border-gold/30 font-semibold">
                          {currentDisplayTea.badgeLabel} &bull; {currentDisplayTea.matchedScore}%
                        </span>
                        <span className="inline-block px-2.5 py-0.5 bg-teal-dark/10 text-teal-deep text-[10px] font-sans rounded-sm border border-teal-dark/20">
                          Miền {currentDisplayTea.product.region} &bull; {currentDisplayTea.product.category}
                        </span>
                        <span className="inline-block px-2.5 py-0.5 bg-cream-50 text-teal-deep/80 text-[10px] font-sans rounded-sm border border-gold/20">
                          Độ cao: {currentDisplayTea.product.altitude}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-teal-deep font-serif tracking-tight">
                        {currentDisplayTea.product.name}
                      </h3>
                      {currentDisplayTea.product.soil && (
                        <p className="text-xs text-gold-dark font-sans mt-1">
                          Thổ nhưỡng: {currentDisplayTea.product.soil}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 self-start">
                      {currentDisplayTea.product.flavorProfile.map((flavor) => (
                        <span
                          key={flavor}
                          className="text-xs px-2.5 py-1 bg-cream-50 border border-gold/30 rounded-sm text-teal-deep/90 font-serif shadow-xs"
                        >
                          {flavor}
                        </span>
                      ))}
                    </div>
                  </div>

                  <DecorativeDivider className="w-36 my-4 text-gold" />

                  {/* Trạng thái lưu ẩn danh */}
                  <div className="mb-4">
                    {submissionStatus === 'saving' && (
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cream-50 border border-gold/30 text-[11px] text-teal-deep/80 font-sans">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-gold" />
                        <span>Đang lưu ẩn danh vào Sổ Hương Vị GENTEA...</span>
                      </div>
                    )}
                    {submissionStatus === 'saved' && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-cream-200/90 border border-gold/40 text-[11px] text-teal-deep font-sans shadow-xs">
                        <BookmarkCheck className="w-3.5 h-3.5 text-teal-dark" />
                        <span>
                          Đã lưu ẩn danh vào Sổ Hương Vị GENTEA{' '}
                          {savedId && <strong className="font-mono text-[10px]">#{savedId}</strong>}
                        </span>
                      </div>
                    )}
                    {submissionStatus === 'fallback' && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-cream-50 border border-gold/30 text-[11px] text-teal-deep/70 font-sans">
                        <Check className="w-3 h-3 text-gold" />
                        <span>Đã ghi nhận kết quả trên phiên duyệt của bạn</span>
                      </div>
                    )}
                  </div>

                  {/* Chi tiết Hóa sinh học & Cảm quan */}
                  <div className="space-y-4 text-sm text-teal-deep/85 leading-relaxed">
                    {/* Căn nguyên hóa sinh */}
                    <div className="p-4 bg-cream-50/90 border border-gold/30 rounded-sm">
                      <div className="flex items-center gap-2 mb-1.5">
                        <FlaskConical className="w-3.5 h-3.5 text-gold-dark" />
                        <h4 className="text-[11px] uppercase tracking-widest text-gold-dark font-sans font-semibold">
                          Căn nguyên Hóa sinh học & Tác động Thần kinh
                        </h4>
                      </div>
                      <p className="text-xs text-teal-deep/85 leading-relaxed">
                        {currentDisplayTea.biochemicalReason}
                      </p>
                    </div>

                    {/* Bản đồ cảm quan vị giác */}
                    <div className="p-4 bg-cream-50/90 border border-gold/30 rounded-sm">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Sparkle className="w-3.5 h-3.5 text-gold-dark" />
                        <h4 className="text-[11px] uppercase tracking-widest text-gold-dark font-sans font-semibold">
                          Khoa học Cảm quan & Vị giác
                        </h4>
                      </div>
                      <p className="text-xs text-teal-deep/85 leading-relaxed italic">
                        &ldquo;{currentDisplayTea.sensoryNote}&rdquo;
                      </p>
                    </div>

                    {/* Thông số pha trà chuẩn */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-3 bg-cream-50/70 border border-gold/20 rounded-sm flex items-start gap-2.5">
                        <Thermometer className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-gold font-sans font-semibold">
                            Nhiệt độ nước pha chuẩn
                          </div>
                          <div className="text-xs text-teal-deep font-medium mt-0.5">
                            {currentDisplayTea.brewingTemp}
                          </div>
                        </div>
                      </div>

                      <div className="p-3 bg-cream-50/70 border border-gold/20 rounded-sm flex items-start gap-2.5">
                        <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[10px] uppercase tracking-wider text-gold font-sans font-semibold">
                            Nghi thức thưởng ẩm
                          </div>
                          <div className="text-xs text-teal-deep font-medium mt-0.5">
                            {currentDisplayTea.ritualNote}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Các danh trà đồng điệu bổ trợ nếu có */}
                {result.recommendations.length > 1 && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-gold" />
                      <h4 className="text-xs uppercase tracking-[0.2em] text-teal-deep font-sans font-bold">
                        Các Danh Trà Đồng Điệu Khác Trong Bộ Sưu Tập
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {result.recommendations
                        .filter((r) => r.product.id !== currentDisplayTea.product.id)
                        .map((alt) => (
                          <div
                            key={alt.product.id}
                            className="bg-cream-100/70 border border-gold/25 p-4 rounded-sm flex flex-col justify-between hover:bg-cream-100 transition-all hover:border-gold/50"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-sm bg-gold/15 text-gold-dark border border-gold/25">
                                  Đồng điệu {alt.matchedScore}%
                                </span>
                                <span className="text-[10px] text-teal-deep/60 font-sans">
                                  Miền {alt.product.region}
                                </span>
                              </div>
                              <h5 className="text-base font-bold text-teal-deep font-serif mb-1">
                                {alt.product.name}
                              </h5>
                              <p className="text-xs text-teal-deep/75 italic line-clamp-2 mb-3">
                                {alt.sensoryNote}
                              </p>
                            </div>

                            <div className="pt-2 border-t border-gold/15 flex items-center justify-between">
                              <button
                                type="button"
                                onClick={() => setActiveTeaId(alt.product.id)}
                                className="text-[11px] text-gold-dark hover:text-teal-deep font-sans font-medium flex items-center gap-1"
                              >
                                <span>Xem chi tiết thiệp</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleExploreMinimap(alt.product.id, alt.product.region)}
                                className="text-[11px] text-teal-dark hover:text-teal-deep font-sans font-medium flex items-center gap-1"
                              >
                                <Compass className="w-3 h-3" />
                                <span>Xem trên bản đồ</span>
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Các nút hành động chính */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 border border-gold/40 text-teal-deep rounded-sm text-xs uppercase tracking-wider font-sans hover:bg-cream-200/50 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-gold" />
                    <span>Thực hiện lại khảo sát</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleExploreMinimap(currentDisplayTea.product.id, currentDisplayTea.product.region)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-teal-dark text-cream-50 rounded-sm text-xs uppercase tracking-wider font-sans font-semibold hover:bg-teal-deep transition-all shadow-paper group"
                  >
                    <Compass className="w-4 h-4 text-gold-light group-hover:rotate-45 transition-transform duration-300" />
                    <span>Khám phá {currentDisplayTea.product.name} trên Bản đồ vị giác</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold-light" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
