import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, Wand2, Package, CheckCircle, ArrowRight } from 'lucide-react';
import { TEA_PACKETS_CATALOG } from '@/data/teaPacketsData';
import { TeaPacketItem, KitOrderRecord } from '@/types/kit.types';
import { CustomKitBox } from '@/components/kit/CustomKitBox';
import { DraggableTeaPacket } from '@/components/kit/DraggableTeaPacket';
import { KitOrderModal } from '@/components/kit/KitOrderModal';
import { DecorativeDivider, LotusIcon } from '@/components/decorative/SvgIcons';

export const CustomKitPage = () => {
  // 3 ngăn trà trong hộp (tối đa 3 gói)
  const [slots, setSlots] = useState<(TeaPacketItem | null)[]>([null, null, null]);
  const [activeRegionFilter, setActiveRegionFilter] = useState<'ALL' | 'BAC' | 'TRUNG' | 'NAM'>('ALL');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [latestOrder, setLatestOrder] = useState<KitOrderRecord | null>(null);

  // Danh sách các gói trà đang có trong hộp
  const selectedTeas = slots.filter((p): p is TeaPacketItem => p !== null);
  const selectedIds = new Set(selectedTeas.map((t) => t.id));

  // Lọc gói trà theo miền
  const filteredPackets = TEA_PACKETS_CATALOG.filter((packet) => {
    if (activeRegionFilter === 'ALL') return true;
    return packet.macroRegionCode === activeRegionFilter;
  });

  // Xử lý kéo thả gói trà vào đúng vị trí ngăn (slotIndex: 0, 1, 2)
  const handleDropPacket = (slotIndex: number, packet: TeaPacketItem) => {
    setSlots((prev) => {
      const next = [...prev];
      // Nếu gói trà này đã ở ngăn khác, gỡ ở ngăn cũ
      const existingIdx = next.findIndex((p) => p?.id === packet.id);
      if (existingIdx !== -1 && existingIdx !== slotIndex) {
        next[existingIdx] = null;
      }
      next[slotIndex] = packet;
      return next;
    });
  };

  // Thêm nhanh gói trà vào ngăn trống đầu tiên
  const handleSelectPacket = (packet: TeaPacketItem) => {
    setSlots((prev) => {
      const firstEmptyIndex = prev.findIndex((p) => p === null);
      if (firstEmptyIndex === -1) {
        // Hộp đã đầy 3 gói
        return prev;
      }
      const next = [...prev];
      next[firstEmptyIndex] = packet;
      return next;
    });
  };

  // Gỡ gói trà ra khỏi ngăn
  const handleRemovePacket = (slotIndex: number) => {
    setSlots((prev) => {
      const next = [...prev];
      next[slotIndex] = null;
      return next;
    });
  };

  // Làm trống toàn bộ hộp trà
  const handleResetBox = () => {
    setSlots([null, null, null]);
  };

  // Gợi ý phối mẫu 3 Miền (1 Bắc + 1 Trung + 1 Nam)
  const handlePresetTriRegional = () => {
    const bac = TEA_PACKETS_CATALOG.find((p) => p.macroRegionCode === 'BAC');
    const trung = TEA_PACKETS_CATALOG.find((p) => p.macroRegionCode === 'TRUNG');
    const nam = TEA_PACKETS_CATALOG.find((p) => p.macroRegionCode === 'NAM');
    setSlots([bac || null, trung || null, nam || null]);
  };

  return (
    <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
      {/* 1. Header Tiêu Đề */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto relative"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/40 bg-cream-50/80 shadow-xs mb-3">
          <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold-dark font-sans font-bold">
            Trải Nghiệm Tự Phối Hộp Quà Di Sản
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-teal-deep tracking-tight mb-3">
          Tự Phối Bộ Kit Trà Ba Miền
        </h1>

        <DecorativeDivider className="w-56 mx-auto mb-4 text-gold" />

        <p className="text-sm sm:text-base text-teal-deep/80 italic font-serif leading-relaxed">
          &ldquo;Khay định hình 4 ngăn sinh học gồm 1 ngăn đựng sẵn Bộ Tranh Dân Gian và 3 ngăn trống. Hãy kéo thả những gói trà yêu thích của ba miền Bắc - Trung - Nam để tạo nên bộ quà tặng độc bản của riêng bạn.&rdquo;
        </p>

        {/* Thông báo đơn hàng gần nhất nếu vừa đặt */}
        {latestOrder && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 p-4 bg-cream-50 border border-gold/50 rounded-sm inline-flex items-center gap-3 text-left shadow-sm"
          >
            <CheckCircle className="w-5 h-5 text-gold-dark shrink-0" />
            <div>
              <p className="text-xs font-serif font-bold text-teal-deep">
                Đơn hàng {latestOrder.orderId} đã được ghi nhận thành công!
              </p>
              <p className="text-[11px] text-teal-deep/70 font-sans italic">
                Người bán sẽ liên hệ xác nhận lại qua SĐT {latestOrder.customer.phoneNumber}.
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* 2. KHU VỰC HỘP QUÀ VẬT LÝ 4 NGĂN (CHÍNH) */}
      <section className="relative">
        <CustomKitBox
          slots={slots}
          onDropPacket={handleDropPacket}
          onRemovePacket={handleRemovePacket}
          onOpenOrderModal={() => setIsOrderModalOpen(true)}
        />
      </section>

      {/* 3. KHU VỰC DANH TRÀ 3 MIỀN ĐỂ KÉO THẢ */}
      <section className="space-y-6 pt-4 border-t border-gold/25">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Package className="w-4 h-4 text-gold-dark" />
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-teal-deep">
                Kho Danh Trà Ba Miền (Kéo hoặc bấm thêm vào hộp):
              </span>
            </div>
            <p className="text-xs text-teal-deep/75 font-serif italic">
              Bao bì giấy mỹ thuật cao cấp in họa tiết phong cảnh đất nước, trọng lượng 50g/gói.
            </p>
          </div>

          {/* Các nút thao tác nhanh: Làm trống & Gợi ý phối mẫu 3 miền */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handlePresetTriRegional}
              className="px-3.5 py-1.5 rounded-sm bg-cream-100 hover:bg-cream-200/80 border border-gold/30 text-teal-deep text-xs font-sans flex items-center gap-1.5 transition-all shadow-xs"
              title="Tự động chọn 1 gói Bắc, 1 gói Trung, 1 gói Nam"
            >
              <Wand2 className="w-3.5 h-3.5 text-gold-dark" />
              <span>Gợi ý phối 3 Miền</span>
            </button>

            <button
              type="button"
              onClick={handleResetBox}
              disabled={selectedTeas.length === 0}
              className="px-3 py-1.5 rounded-sm bg-cream-100 hover:bg-cream-200/80 border border-gold/30 text-teal-deep text-xs font-sans flex items-center gap-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
            >
              <RefreshCw className="w-3 h-3 text-gold-dark" />
              <span>Làm trống hộp</span>
            </button>
          </div>
        </div>

        {/* Bộ lọc theo miền */}
        <div className="flex flex-wrap items-center gap-2 border-b border-gold/20 pb-3">
          <button
            type="button"
            onClick={() => setActiveRegionFilter('ALL')}
            className={`px-4 py-1.5 rounded-sm text-xs font-sans uppercase tracking-wider transition-all ${
              activeRegionFilter === 'ALL'
                ? 'bg-teal-dark text-cream-50 font-bold shadow-xs'
                : 'bg-cream-50 text-teal-deep/75 hover:bg-cream-200/50 border border-gold/20'
            }`}
          >
            Tất Cả Danh Trà ({TEA_PACKETS_CATALOG.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveRegionFilter('BAC')}
            className={`px-4 py-1.5 rounded-sm text-xs font-sans uppercase tracking-wider transition-all ${
              activeRegionFilter === 'BAC'
                ? 'bg-[#2D6A4F] text-cream-50 font-bold shadow-xs'
                : 'bg-cream-50 text-teal-deep/75 hover:bg-cream-200/50 border border-gold/20'
            }`}
          >
            Miền Bắc ({TEA_PACKETS_CATALOG.filter((p) => p.macroRegionCode === 'BAC').length})
          </button>
          <button
            type="button"
            onClick={() => setActiveRegionFilter('TRUNG')}
            className={`px-4 py-1.5 rounded-sm text-xs font-sans uppercase tracking-wider transition-all ${
              activeRegionFilter === 'TRUNG'
                ? 'bg-[#B45309] text-cream-50 font-bold shadow-xs'
                : 'bg-cream-50 text-teal-deep/75 hover:bg-cream-200/50 border border-gold/20'
            }`}
          >
            Miền Trung ({TEA_PACKETS_CATALOG.filter((p) => p.macroRegionCode === 'TRUNG').length})
          </button>
          <button
            type="button"
            onClick={() => setActiveRegionFilter('NAM')}
            className={`px-4 py-1.5 rounded-sm text-xs font-sans uppercase tracking-wider transition-all ${
              activeRegionFilter === 'NAM'
                ? 'bg-[#0D9488] text-cream-50 font-bold shadow-xs'
                : 'bg-cream-50 text-teal-deep/75 hover:bg-cream-200/50 border border-gold/20'
            }`}
          >
            Miền Nam ({TEA_PACKETS_CATALOG.filter((p) => p.macroRegionCode === 'NAM').length})
          </button>
        </div>

        {/* Lưới các gói trà có thể kéo thả */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredPackets.map((packet) => {
            const isSelected = selectedIds.has(packet.id);
            const isBoxFull = selectedTeas.length === 3;
            return (
              <DraggableTeaPacket
                key={packet.id}
                packet={packet}
                isSelected={isSelected}
                disabled={isBoxFull && !isSelected}
                onSelect={handleSelectPacket}
              />
            );
          })}
        </div>
      </section>

      {/* 4. Banner Cam Kết Chất Lượng & Dịch Vụ */}
      <section className="bg-cream-50/90 border border-gold/30 rounded-sm p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center text-teal-deep shrink-0">
            <LotusIcon className="w-8 h-8 text-gold" />
          </div>
          <div>
            <h4 className="text-lg font-bold font-serif text-teal-deep">
              Cam Kết Đóng Gói Thủ Công &amp; Bảo Chứng Di Sản
            </h4>
            <p className="text-xs text-teal-deep/75 font-serif italic max-w-2xl leading-relaxed mt-0.5">
              Mỗi hộp quà được chuẩn bị thủ công tỉ mỉ với khay 4 ngăn sinh học, bảo quản hương vị trà nguyên bản và bảo chứng nguồn gốc địa lý (GI). Sau khi nhận thông tin đặt hàng, người bán sẽ gọi điện trực tiếp để xác nhận và trao đổi chi tiết cùng quý khách.
            </p>
          </div>
        </div>

        <button
          type="button"
          disabled={selectedTeas.length === 0}
          onClick={() => setIsOrderModalOpen(true)}
          className={`px-6 py-3 rounded-sm text-xs uppercase tracking-wider font-sans font-bold flex items-center gap-2 shrink-0 transition-all shadow-paper ${
            selectedTeas.length === 3
              ? 'bg-gold-dark hover:bg-gold text-white ring-2 ring-gold/40'
              : selectedTeas.length > 0
              ? 'bg-teal-dark hover:bg-teal-deep text-cream-50'
              : 'bg-cream-200 text-teal-deep/40 cursor-not-allowed shadow-none'
          }`}
        >
          <span>Tiến Hành Đặt Hàng ({selectedTeas.length}/3 Trà)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* Modal Nhập Thông Tin Đặt Hàng */}
      <KitOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        selectedTeas={selectedTeas}
        onOrderSuccess={(record) => {
          setLatestOrder(record);
        }}
      />
    </div>
  );
};
