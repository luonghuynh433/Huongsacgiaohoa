import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2, Phone, Mail, MapPin, User, FileText, Sparkles, ShieldCheck } from 'lucide-react';
import { TeaPacketItem, CustomerOrderInfo, KitOrderRecord } from '@/types/kit.types';

interface KitOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTeas: TeaPacketItem[];
  onOrderSuccess: (record: KitOrderRecord) => void;
}

export const KitOrderModal: React.FC<KitOrderModalProps> = ({
  isOpen,
  onClose,
  selectedTeas,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState<CustomerOrderInfo>({
    fullName: '',
    phoneNumber: '',
    email: '',
    city: 'Hà Nội',
    district: '',
    addressDetail: '',
    note: '',
    giftNote: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState<KitOrderRecord | null>(null);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên';
    }
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Vui lòng nhập số điện thoại';
    } else if (!phoneRegex.test(formData.phoneNumber.replace(/\s+/g, ''))) {
      newErrors.phoneNumber = 'Số điện thoại không hợp lệ (VD: 0912345678)';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email để nhận xác nhận đơn';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email không đúng định dạng';
    }
    if (!formData.addressDetail.trim()) {
      newErrors.addressDetail = 'Vui lòng nhập địa chỉ nhận hàng cụ thể';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: KitOrderRecord = {
        orderId: `GENTEA-KIT-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date().toISOString(),
        customer: { ...formData },
        selectedTeas: [...selectedTeas],
        kitDetails: {
          boxType: 'Hộp giấy mỹ thuật cao cấp phủ nhũ vàng, khay 4 ngăn sinh học',
          artPrintsIncluded: ['Tranh Đông Hồ (Bắc)', 'Tranh Làng Sình (Trung)', 'Tranh Kiếng (Nam)'],
          qrCardIncluded: true,
        },
        status: 'PENDING_CONFIRMATION',
      };

      // Lưu trữ đơn hàng cục bộ
      try {
        const stored = localStorage.getItem('gentea_kit_orders');
        const list = stored ? JSON.parse(stored) : [];
        list.push(newOrder);
        localStorage.setItem('gentea_kit_orders', JSON.stringify(list));
      } catch (err) {
        console.error('Lưu đơn hàng vào localStorage thất bại:', err);
      }

      setOrderResult(newOrder);
      setIsSubmitting(false);
      onOrderSuccess(newOrder);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-2xl bg-[#FCFAF5] border-2 border-gold/50 rounded-sm shadow-2xl relative overflow-hidden my-8"
        style={{
          boxShadow: '0 25px 50px -12px rgba(15, 62, 53, 0.4)',
        }}
      >
        {/* Nút đóng */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream-100 hover:bg-[#8A2418] hover:text-white text-teal-deep flex items-center justify-center transition-colors z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {orderResult ? (
          /* ================= MÀN HÌNH ĐẶT HÀNG THÀNH CÔNG ================= */
          <div className="p-6 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center mx-auto text-teal-deep">
              <CheckCircle2 className="w-9 h-9 text-gold-dark" />
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold-dark font-sans font-bold block mb-1">
                Tiếp Nhận Đơn Hàng Thành Công
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-teal-deep">
                Cảm Ơn Bạn Đã Chọn GENTEA 2026
              </h3>
              <p className="text-xs font-mono text-gold-dark mt-1 font-bold">
                Mã đơn hàng: {orderResult.orderId}
              </p>
            </div>

            {/* Thông báo cam kết từ người bán (MANDATE USER) */}
            <div className="p-4 bg-cream-100/80 border border-gold/40 rounded-sm text-left space-y-2">
              <div className="flex items-center gap-2 text-gold-dark text-xs font-sans font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-teal-deep" />
                <span>Quy Trình Xác Nhận Đơn Hàng:</span>
              </div>
              <p className="text-sm text-teal-deep font-serif italic leading-relaxed">
                &ldquo;Đơn hàng bộ kit tùy phối của bạn đã được gửi tới hệ thống. <strong>Người bán sẽ liên hệ trực tiếp qua số điện thoại ({orderResult.customer.phoneNumber}) để xác nhận lại</strong> thông tin địa chỉ và các gói trà trước khi bắt đầu đóng gói thủ công.&rdquo;
              </p>
            </div>

            {/* Tóm tắt 3 gói trà đã chọn */}
            <div className="text-left bg-cream-50 p-4 rounded-sm border border-gold/20 space-y-2">
              <span className="text-[10px] uppercase font-sans font-bold text-teal-deep tracking-wider block">
                Cấu trúc bộ kit đã phối ({orderResult.selectedTeas.length} gói trà + Bộ tranh 3 miền):
              </span>
              <div className="space-y-1.5">
                {orderResult.selectedTeas.map((tea, idx) => (
                  <div key={tea.id} className="flex items-center justify-between text-xs font-serif">
                    <span className="text-teal-deep font-bold">
                      {idx + 1}. {tea.name} ({tea.weight})
                    </span>
                    <span className="text-gold-dark font-sans text-[10px] uppercase">
                      Miền {tea.region}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t border-gold/20 flex items-center justify-between text-xs font-serif text-teal-deep/80 italic">
                  <span>Kèm theo: Bộ 3 Tranh Dân Gian &amp; Thiệp Cảm Ơn QR</span>
                  <span className="text-gold-dark font-sans text-[10px] font-bold">ĐỰNG SẴN</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 bg-teal-dark hover:bg-teal-deep text-cream-50 rounded-sm text-xs uppercase tracking-wider font-sans font-bold shadow-paper transition-all"
            >
              Hoàn Tất &amp; Quay Về
            </button>
          </div>
        ) : (
          /* ================= FORM NHẬP THÔNG TIN KHÁCH HÀNG ================= */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 text-gold-dark text-[10px] font-sans font-bold uppercase tracking-widest mb-1">
                <Sparkles className="w-3 h-3 text-gold" />
                <span>Đặt Hàng Bộ Kit Tùy Phối</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-teal-deep">
                Thông Tin Nhận Bộ Quà Tặng
              </h3>
              <p className="text-xs text-teal-deep/75 font-serif italic">
                Sau khi gửi đơn, người bán sẽ gọi điện trực tiếp để xác nhận đơn hàng với bạn.
              </p>
            </div>

            {/* Tóm tắt nhanh 3 gói trà trong hộp */}
            <div className="p-3 bg-cream-100/70 border border-gold/30 rounded-sm">
              <span className="text-[10px] uppercase font-sans font-bold text-teal-deep block mb-1.5">
                Gói trà bạn đã chọn cho hộp quà ({selectedTeas.length} / 3 gói):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {selectedTeas.map((tea, i) => (
                  <div key={tea.id} className="p-2 bg-[#FCFAF5] rounded-[2px] border border-gold/25 text-xs font-serif">
                    <span className="text-[8px] uppercase tracking-wider font-sans font-bold text-gold-dark block">
                      Ngăn {i + 1} &bull; Miền {tea.region}
                    </span>
                    <span className="font-bold text-teal-deep truncate block">{tea.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Các trường thông tin */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {/* Họ tên */}
              <div className="space-y-1">
                <label className="text-xs font-sans font-semibold text-teal-deep flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-gold" />
                  <span>Họ và tên *</span>
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-serif bg-cream-50 border border-gold/40 rounded-sm focus:outline-none focus:border-teal-deep"
                />
                {errors.fullName && <p className="text-[10px] text-red-600 font-sans">{errors.fullName}</p>}
              </div>

              {/* Số điện thoại */}
              <div className="space-y-1">
                <label className="text-xs font-sans font-semibold text-teal-deep flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-gold" />
                  <span>Số điện thoại (Người bán sẽ liên hệ lại) *</span>
                </label>
                <input
                  type="tel"
                  placeholder="Ví dụ: 0912345678"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-serif bg-cream-50 border border-gold/40 rounded-sm focus:outline-none focus:border-teal-deep"
                />
                {errors.phoneNumber && <p className="text-[10px] text-red-600 font-sans">{errors.phoneNumber}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-sans font-semibold text-teal-deep flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-gold" />
                  <span>Email nhận thông tin xác nhận *</span>
                </label>
                <input
                  type="email"
                  placeholder="Ví dụ: yourname@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-serif bg-cream-50 border border-gold/40 rounded-sm focus:outline-none focus:border-teal-deep"
                />
                {errors.email && <p className="text-[10px] text-red-600 font-sans">{errors.email}</p>}
              </div>

              {/* Địa chỉ chi tiết */}
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-sans font-semibold text-teal-deep flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gold" />
                  <span>Địa chỉ giao nhận bộ kit *</span>
                </label>
                <input
                  type="text"
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  value={formData.addressDetail}
                  onChange={(e) => setFormData({ ...formData, addressDetail: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-serif bg-cream-50 border border-gold/40 rounded-sm focus:outline-none focus:border-teal-deep"
                />
                {errors.addressDetail && (
                  <p className="text-[10px] text-red-600 font-sans">{errors.addressDetail}</p>
                )}
              </div>

              {/* Lời chúc / Ghi chú trên thiệp tặng */}
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-sans font-semibold text-teal-deep flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-gold" />
                  <span>Lời chúc viết tay trên thiệp cảm ơn (nếu làm quà tặng):</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Lời chúc gửi tặng người thân, đối tác hoặc ghi chú đặc biệt khi nhận hàng..."
                  value={formData.giftNote}
                  onChange={(e) => setFormData({ ...formData, giftNote: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-serif bg-cream-50 border border-gold/40 rounded-sm focus:outline-none focus:border-teal-deep resize-none"
                />
              </div>
            </div>

            {/* Cam kết xác nhận */}
            <div className="p-3 bg-cream-100/60 rounded-[2px] border border-gold/20 flex items-center gap-2 text-left">
              <ShieldCheck className="w-5 h-5 text-teal-deep shrink-0" />
              <p className="text-[11px] font-serif italic text-teal-deep/80 leading-snug">
                Sau khi bấm xác nhận, thông tin bộ kit sẽ được chuyển đến người phụ trách. Người bán sẽ liên hệ xác nhận lại qua số điện thoại để chốt đơn và thời gian giao hàng.
              </p>
            </div>

            {/* Nút gửi đơn */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-sans uppercase tracking-wider text-teal-deep/70 hover:text-teal-deep"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-teal-dark hover:bg-teal-deep text-cream-50 rounded-sm text-xs font-sans font-bold uppercase tracking-wider shadow-paper transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Đang gửi đơn...' : 'Xác Nhận Đặt Hàng Bộ Kit'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
