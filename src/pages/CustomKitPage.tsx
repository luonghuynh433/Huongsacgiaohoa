import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Wand2, Package, CheckCircle, ArrowRight, ArrowUp, ArrowLeftRight } from 'lucide-react';
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

  // Trạng thái kéo thả & tự động cuộn trang
  const [isDraggingAnyPacket, setIsDraggingAnyPacket] = useState(false);
  const [draggedFromSlotIndex, setDraggedFromSlotIndex] = useState<number | null>(null);
  const [draggedPacketName, setDraggedPacketName] = useState<string | null>(null);
  const [activeDraggedPacket, setActiveDraggedPacket] = useState<{
    packet: TeaPacketItem;
    fromSlotIndex?: number;
  } | null>(null);
  const activeDraggedPacketRef = useRef<{
    packet: TeaPacketItem;
    fromSlotIndex?: number;
  } | null>(null);

  const boxSectionRef = useRef<HTMLElement | null>(null);
  const isDraggingRef = useRef<boolean>(false);
  const animFrameRef = useRef<number | null>(null);
  const lastClientYRef = useRef<number | null>(null);

  // Danh sách các gói trà đang có trong hộp
  const selectedTeas = slots.filter((p): p is TeaPacketItem => p !== null);
  const selectedIds = new Set(selectedTeas.map((t) => t.id));

  // Dừng tự động cuộn và đặt lại cờ kéo thả
  const stopAutoScroll = useCallback(() => {
    isDraggingRef.current = false;
    setIsDraggingAnyPacket(false);
    setDraggedFromSlotIndex(null);
    setDraggedPacketName(null);
    setActiveDraggedPacket(null);
    activeDraggedPacketRef.current = null;
    lastClientYRef.current = null;
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, []);

  // Vòng lặp tính toán và thực thi tự động cuộn mượt mà theo vị trí con trỏ khi kéo thả
  const scrollTick = useCallback(() => {
    if (!isDraggingRef.current) return;

    const y = lastClientYRef.current;
    if (y !== null && y >= 0) {
      const EDGE_THRESHOLD_TOP = 220; // Vùng đệm 220px từ mép trên màn hình
      const EDGE_THRESHOLD_BOTTOM = 180; // Vùng đệm 180px từ mép dưới màn hình
      const MAX_SPEED = 28; // Tốc độ cuộn tối đa (px/khung hình)

      if (y < EDGE_THRESHOLD_TOP) {
        // Càng gần mép trên thì cuộn LÊN càng nhanh
        const ratio = Math.max(0, (EDGE_THRESHOLD_TOP - y) / EDGE_THRESHOLD_TOP);
        const speed = Math.max(4, Math.round(Math.pow(ratio, 1.2) * MAX_SPEED));
        window.scrollBy({ top: -speed, behavior: 'auto' });
      } else if (y > window.innerHeight - EDGE_THRESHOLD_BOTTOM) {
        // Càng gần mép dưới thì cuộn XUỐNG càng nhanh
        const bottomZone = window.innerHeight - EDGE_THRESHOLD_BOTTOM;
        const ratio = Math.max(0, (y - bottomZone) / EDGE_THRESHOLD_BOTTOM);
        const speed = Math.max(4, Math.round(Math.pow(ratio, 1.2) * MAX_SPEED));
        window.scrollBy({ top: speed, behavior: 'auto' });
      }
    }

    animFrameRef.current = requestAnimationFrame(scrollTick);
  }, []);

  // Đăng ký lắng nghe sự kiện dragover và dragend trên cửa sổ
  useEffect(() => {
    const handleWindowDragOver = (e: DragEvent) => {
      if (isDraggingRef.current) {
        e.preventDefault();
        lastClientYRef.current = e.clientY;

        if (!animFrameRef.current) {
          animFrameRef.current = requestAnimationFrame(scrollTick);
        }
      }
    };

    const handleWindowDragEnd = () => {
      stopAutoScroll();
    };

    window.addEventListener('dragover', handleWindowDragOver);
    window.addEventListener('dragend', handleWindowDragEnd);

    return () => {
      window.removeEventListener('dragover', handleWindowDragOver);
      window.removeEventListener('dragend', handleWindowDragEnd);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [scrollTick, stopAutoScroll]);

  // Bắt đầu kéo gói trà từ kho danh mục (bên dưới)
  const handlePacketDragStart = (_e: React.DragEvent, packet: TeaPacketItem) => {
    isDraggingRef.current = true;
    setIsDraggingAnyPacket(true);
    setDraggedFromSlotIndex(null);
    setDraggedPacketName(packet.name);
    const draggingData = { packet };
    setActiveDraggedPacket(draggingData);
    activeDraggedPacketRef.current = draggingData;

    if (!animFrameRef.current) {
      animFrameRef.current = requestAnimationFrame(scrollTick);
    }
  };

  // Bắt đầu kéo gói trà từ TRONG HỘP: Cho phép đổi ngăn hoặc kéo ra ngoài để loại bỏ
  const handleDragStartFromSlot = (_e: React.DragEvent, packet: TeaPacketItem, slotIndex: number) => {
    isDraggingRef.current = true;
    setIsDraggingAnyPacket(true);
    setDraggedFromSlotIndex(slotIndex);
    setDraggedPacketName(packet.name);
    const draggingData = { packet, fromSlotIndex: slotIndex };
    setActiveDraggedPacket(draggingData);
    activeDraggedPacketRef.current = draggingData;

    if (!animFrameRef.current) {
      animFrameRef.current = requestAnimationFrame(scrollTick);
    }
  };

  const handlePacketDragEnd = () => {
    stopAutoScroll();
  };

  // Lọc gói trà theo miền
  const filteredPackets = TEA_PACKETS_CATALOG.filter((packet) => {
    if (activeRegionFilter === 'ALL') return true;
    return packet.macroRegionCode === activeRegionFilter;
  });

  // Xử lý kéo thả gói trà vào đúng vị trí ngăn (slotIndex: 0, 1, 2)
  const handleDropPacket = (targetSlotIndex: number, packet: TeaPacketItem, fromSlotIndex?: number) => {
    const effectiveFromSlot = fromSlotIndex ?? activeDraggedPacketRef.current?.fromSlotIndex;

    // Trường hợp 1: Kéo đổi ngăn giữa các ngăn trong hộp
    if (effectiveFromSlot !== undefined && effectiveFromSlot !== null) {
      if (effectiveFromSlot === targetSlotIndex) {
        stopAutoScroll();
        return;
      }

      setSlots((prev) => {
        const next = [...prev];
        const fromPacket = next[effectiveFromSlot];
        const toPacket = next[targetSlotIndex];
        next[targetSlotIndex] = fromPacket;
        next[effectiveFromSlot] = toPacket; // Hoán đổi vị trí hoặc để trống nếu toPacket ban đầu là null
        return next;
      });
      stopAutoScroll();
      return;
    }

    // Trường hợp 2: Kéo từ kho danh trà bên dưới vào hộp
    setSlots((prev) => {
      const next = [...prev];
      // Nếu gói trà này đã ở ngăn khác, gỡ ở ngăn cũ
      const existingIdx = next.findIndex((p) => p?.id === packet.id);
      if (existingIdx !== -1 && existingIdx !== targetSlotIndex) {
        next[existingIdx] = null;
      }
      next[targetSlotIndex] = packet;
      return next;
    });
    stopAutoScroll();
  };

  // Thêm nhanh gói trà vào ngăn trống đầu tiên (đồng thời tự cuộn đến hộp quà)
  const handleSelectPacket = (packet: TeaPacketItem) => {
    setSlots((prev) => {
      const firstEmptyIndex = prev.findIndex((p) => p === null);
      if (firstEmptyIndex === -1) {
        return prev;
      }
      const next = [...prev];
      next[firstEmptyIndex] = packet;
      return next;
    });

    if (boxSectionRef.current) {
      const rect = boxSectionRef.current.getBoundingClientRect();
      if (rect.top < 60 || rect.bottom < 160) {
        boxSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Gỡ gói trà ra khỏi ngăn
  const handleRemovePacket = (slotIndex: number) => {
    setSlots((prev) => {
      const next = [...prev];
      next[slotIndex] = null;
      return next;
    });
    stopAutoScroll();
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

    if (boxSectionRef.current) {
      boxSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-12 relative">
      {/* Cảnh báo / Hướng dẫn nổi khi đang kéo thả gói trà */}
      <AnimatePresence>
        {isDraggingAnyPacket && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-24 left-1/2 z-50 bg-[#0C241E]/95 text-[#FAF6EE] border-2 border-[#C5A059] px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 pointer-events-none backdrop-blur-md"
            style={{
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            }}
          >
            {draggedFromSlotIndex !== null ? (
              <>
                <ArrowLeftRight className="w-4 h-4 text-[#E5B94E] animate-pulse" />
                <span className="text-xs font-serif font-bold">
                  Đang kéo {draggedPacketName ? `"${draggedPacketName}"` : 'gói trà'} &bull; Thả vào ngăn khác để đổi vị trí, hoặc kéo ra ngoài để loại bỏ
                </span>
              </>
            ) : (
              <>
                <ArrowUp className="w-4 h-4 text-[#E5B94E] animate-bounce" />
                <span className="text-xs font-serif font-bold">
                  Đang kéo {draggedPacketName ? `"${draggedPacketName}"` : 'gói trà'} &bull; Rê chuột lên trên để trang tự cuộn tới Hộp Quà
                </span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

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
      <section ref={boxSectionRef} id="physical-kit-box" className="relative scroll-mt-28">
        <CustomKitBox
          slots={slots}
          onDropPacket={handleDropPacket}
          onRemovePacket={handleRemovePacket}
          onOpenOrderModal={() => setIsOrderModalOpen(true)}
          isDraggingAnyPacket={isDraggingAnyPacket}
          draggedFromSlotIndex={draggedFromSlotIndex}
          activeDraggedPacket={activeDraggedPacket}
          onDragStartFromSlot={handleDragStartFromSlot}
          onDragEndFromSlot={stopAutoScroll}
        />
      </section>

      {/* 3. KHU VỰC DANH TRÀ 3 MIỀN ĐỂ KÉO THẢ */}
      <section
        onDragOver={(e) => {
          if (draggedFromSlotIndex !== null) {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
          }
        }}
        onDrop={(e) => {
          if (draggedFromSlotIndex !== null) {
            e.preventDefault();
            handleRemovePacket(draggedFromSlotIndex);
          }
        }}
        className={`space-y-6 pt-4 border-t border-gold/25 transition-all duration-300 rounded-sm p-3 ${
          draggedFromSlotIndex !== null
            ? 'bg-red-950/10 border-2 border-dashed border-red-400/50'
            : ''
        }`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Package className="w-4 h-4 text-gold-dark" />
              <span className="text-xs font-sans font-bold uppercase tracking-wider text-teal-deep">
                Kho Danh Trà Ba Miền (Kéo hoặc bấm thêm vào hộp):
              </span>
            </div>
            <p className="text-xs text-teal-deep/75 font-serif italic">
              {draggedFromSlotIndex !== null
                ? '✨ Thả gói trà vào đây để loại bỏ khỏi hộp quà ✨'
                : 'Bao bì giấy mỹ thuật cao cấp in họa tiết phong cảnh đất nước, trọng lượng 50g/gói. Trang tự động cuộn khi bạn kéo gói trà.'}
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
                onDragStart={handlePacketDragStart}
                onDragEnd={handlePacketDragEnd}
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
