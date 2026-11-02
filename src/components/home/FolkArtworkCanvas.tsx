import React from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { FolkArtwork } from '@/data/folkArtGalleryData';

interface FolkArtworkCanvasProps {
  artwork: FolkArtwork;
  className?: string;
  isFullView?: boolean;
}

export const FolkArtworkCanvas: React.FC<FolkArtworkCanvasProps> = ({
  artwork,
  className = '',
  isFullView = false,
}) => {
  const isTranhKieng = artwork.traditionId === 'tranh-kieng';
  const isLangSinh = artwork.traditionId === 'lang-sinh';

  const svgMaxHeightClass = isFullView
    ? 'max-h-[520px] sm:max-h-[58vh] md:max-h-[64vh]'
    : 'max-h-[360px]';

  // Chọn hình minh họa vector biểu tượng cho từng bức tranh
  const renderIllustration = () => {
    switch (artwork.id) {
      // ===== ĐÔNG HỒ =====
      case 'dongho-muc-dong':
        return (
          <svg viewBox="0 0 400 320" className={`w-full h-full ${svgMaxHeightClass} mx-auto select-none transition-all duration-500`}>
            <defs>
              <linearGradient id="dhLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2E6B56" />
                <stop offset="100%" stopColor="#134739" />
              </linearGradient>
              <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F9D479" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#E2A838" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Vầng dương mờ ảo thôn dã */}
            <circle cx="320" cy="80" r="60" fill="url(#sunGrad)" />

            {/* Khóm sen và mây lành */}
            <path d="M40,280 Q80,240 120,280 T200,280" fill="none" stroke="#2E6B56" strokeWidth="4" />
            <path d="M70,260 Q85,210 110,240" fill="#2E6B56" opacity="0.8" />
            <path d="M100,230 Q120,200 135,235" fill="#E26D5C" opacity="0.9" />

            {/* Chú trâu mộc bản Đông Hồ */}
            <path
              d="M130,220 C140,180 180,165 240,175 C290,185 320,210 330,240 C325,270 280,285 220,280 C160,275 125,250 130,220 Z"
              fill="#222B27"
              stroke="#0E1612"
              strokeWidth="4"
            />
            {/* Chân trâu */}
            <path d="M160,270 L155,305 M190,275 L188,310 M280,275 L285,310 M310,260 L315,305" stroke="#222B27" strokeWidth="12" strokeLinecap="round" />
            {/* Sừng trâu cong duyên dáng */}
            <path d="M140,185 C125,160 115,130 145,115 C160,110 170,125 155,155" fill="none" stroke="#131B16" strokeWidth="9" strokeLinecap="round" />
            <path d="M150,195 C140,175 135,150 160,140" fill="none" stroke="#131B16" strokeWidth="7" strokeLinecap="round" />
            {/* Tai trâu & mắt */}
            <ellipse cx="160" cy="190" rx="14" ry="7" fill="#E26D5C" />
            <circle cx="145" cy="180" r="4" fill="#F7FAF7" />
            <circle cx="145" cy="180" r="2" fill="#000" />

            {/* Mục đồng ngồi vắt vẻo thổi tiêu */}
            <ellipse cx="230" cy="155" rx="22" ry="30" fill="#E26D5C" /> {/* Thân áo chu sa */}
            <circle cx="230" cy="115" r="18" fill="#F4D3AF" stroke="#C28B59" strokeWidth="2" /> {/* Mặt */}
            {/* Tóc trái đào Đông Hồ */}
            <circle cx="220" cy="100" r="6" fill="#1A1C1A" />
            <circle cx="240" cy="100" r="6" fill="#1A1C1A" />
            <circle cx="230" cy="96" r="7" fill="#1A1C1A" />

            {/* Ống tiêu trúc màu vàng hoàng kim */}
            <line x1="215" y1="125" x2="185" y2="135" stroke="#E5B94E" strokeWidth="5" strokeLinecap="round" />
            {/* Tay mục đồng nâng tiêu */}
            <path d="M225,135 L215,127 M235,140 L205,132" stroke="#F4D3AF" strokeWidth="5" strokeLinecap="round" />

            {/* Lá sen lớn che đầu mục đồng */}
            <path
              d="M170,80 C190,45 270,40 295,75 C310,95 290,115 260,110 C230,105 180,105 170,80 Z"
              fill="url(#dhLeafGrad)"
              stroke="#0D3528"
              strokeWidth="3"
            />
            <path d="M240,65 L240,105 M205,70 L240,85 M275,65 L240,85" stroke="#71B296" strokeWidth="2" />

            {/* Điệu sáo trúc ngân vang - nốt nhạc tượng hình */}
            <path d="M175,130 Q150,115 160,95 T145,70" fill="none" stroke="#E5B94E" strokeWidth="2" strokeDasharray="4,4" />
            <circle cx="145" cy="68" r="3" fill="#E5B94E" />

            {/* Chữ Hán mộc bản ước lệ góc tranh: AN BÌNH */}
            <rect x="330" y="30" width="28" height="54" rx="2" fill="#A83226" opacity="0.9" />
            <text x="344" y="52" fill="#FCFAF5" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="serif">
              安
            </text>
            <text x="344" y="74" fill="#FCFAF5" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="serif">
              平
            </text>
          </svg>
        );

      case 'dongho-dam-cuoi-chuot':
        return (
          <svg viewBox="0 0 400 320" className={`w-full h-full ${svgMaxHeightClass} mx-auto select-none transition-all duration-500`}>
            {/* Lọng che nghênh hôn */}
            <path d="M70,80 Q120,40 170,80 Z" fill="#D94A38" stroke="#8A2418" strokeWidth="3" />
            <line x1="120" y1="80" x2="120" y2="190" stroke="#8A2418" strokeWidth="4" />

            {/* Mèo béo nhận lễ vật */}
            <ellipse cx="320" cy="180" rx="42" ry="58" fill="#F0B254" stroke="#8A5A1C" strokeWidth="4" />
            <circle cx="320" cy="115" r="30" fill="#F0B254" stroke="#8A5A1C" strokeWidth="4" />
            {/* Tai mèo */}
            <polygon points="300,95 310,70 325,92" fill="#D94A38" stroke="#8A5A1C" strokeWidth="2" />
            <polygon points="325,92 340,70 350,95" fill="#D94A38" stroke="#8A5A1C" strokeWidth="2" />
            {/* Mắt mèo híp cười */}
            <path d="M308,112 Q315,108 322,112" fill="none" stroke="#222" strokeWidth="3" />
            <path d="M328,112 Q335,108 342,112" fill="none" stroke="#222" strokeWidth="3" />
            {/* Râu mèo */}
            <line x1="290" y1="120" x2="270" y2="116" stroke="#222" strokeWidth="2" />
            <line x1="290" y1="125" x2="270" y2="128" stroke="#222" strokeWidth="2" />
            <line x1="345" y1="120" x2="365" y2="116" stroke="#222" strokeWidth="2" />

            {/* Chuột dâng cá chim */}
            <ellipse cx="230" cy="175" rx="16" ry="24" fill="#718B80" stroke="#2B3A34" strokeWidth="3" />
            <circle cx="230" cy="145" r="12" fill="#718B80" stroke="#2B3A34" strokeWidth="3" />
            {/* Con cá dâng lễ */}
            <ellipse cx="260" cy="165" rx="18" ry="8" fill="#589BB5" stroke="#1D4C5E" strokeWidth="2" />
            <polygon points="275,165 290,158 290,172" fill="#589BB5" stroke="#1D4C5E" strokeWidth="2" />

            {/* Chú rể Chuột cưỡi ngựa nghênh hôn */}
            <ellipse cx="120" cy="230" rx="36" ry="20" fill="#995E38" stroke="#4F2D17" strokeWidth="3" />
            <circle cx="85" cy="210" r="16" fill="#995E38" stroke="#4F2D17" strokeWidth="3" />
            {/* Chú rể áo the khăn xếp */}
            <ellipse cx="125" cy="170" rx="14" ry="22" fill="#2E6B56" stroke="#113327" strokeWidth="2" />
            <circle cx="125" cy="140" r="10" fill="#F4D3AF" stroke="#222" strokeWidth="2" />
            <ellipse cx="125" cy="132" rx="11" ry="5" fill="#222" />

            {/* Đoàn kèn thổi hoa chúc */}
            <ellipse cx="50" cy="245" rx="12" ry="18" fill="#D94A38" stroke="#222" strokeWidth="2" />
            <polygon points="58,235 90,225 90,245" fill="#E5B94E" stroke="#8A6E1E" strokeWidth="2" />

            {/* Mộc triện */}
            <rect x="30" y="30" width="26" height="52" rx="2" fill="#A83226" />
            <text x="43" y="52" fill="#FFF" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="serif">
              迎
            </text>
            <text x="43" y="72" fill="#FFF" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="serif">
              婚
            </text>
          </svg>
        );

      case 'dongho-vinh-hoa':
        return (
          <svg viewBox="0 0 400 320" className={`w-full h-full ${svgMaxHeightClass} mx-auto select-none transition-all duration-500`}>
            {/* Bé trai bụ bẫm ôm gà */}
            <ellipse cx="200" cy="210" rx="55" ry="60" fill="#FCEAD2" stroke="#B87B4C" strokeWidth="3" />
            <circle cx="200" cy="115" r="40" fill="#FCEAD2" stroke="#B87B4C" strokeWidth="3" />
            {/* Tóc trái đào cạo trọc chỏm */}
            <circle cx="200" cy="80" r="14" fill="#1C1E1C" />
            <ellipse cx="180" cy="120" rx="5" ry="3" fill="#C95444" />
            <ellipse cx="220" cy="120" rx="5" ry="3" fill="#C95444" />
            {/* Vòng khóa bạc hộ mệnh */}
            <path d="M175,145 C190,165 210,165 225,145" fill="none" stroke="#D1D5DB" strokeWidth="5" />
            <circle cx="200" cy="162" r="8" fill="#D1D5DB" stroke="#8A6E1E" strokeWidth="2" />

            {/* Chú gà trống Đại Cát ôm bên mình */}
            <path
              d="M230,170 C270,150 310,170 320,210 C325,245 295,280 250,270 Z"
              fill="#D94A38"
              stroke="#7E1D13"
              strokeWidth="3"
            />
            {/* Mào gà đỏ thắm 5 nhánh ngũ đức */}
            <path d="M305,140 Q315,120 325,135 Q335,115 345,135 Q355,125 350,150" fill="#B91C1C" stroke="#7E1D13" strokeWidth="2" />
            {/* Đuôi gà xòe cong lông vũ xanh chàm & vàng */}
            <path d="M315,210 C350,190 380,220 365,260 C350,240 330,245 320,240" fill="#2E6B56" stroke="#113327" strokeWidth="3" />
            <path d="M305,220 C340,210 365,240 350,275" fill="#E5B94E" opacity="0.9" />

            {/* Chậu hoa cúc đại đóa tượng trưng trường thọ */}
            <path d="M90,260 L80,300 L140,300 L130,260 Z" fill="#4B6B58" stroke="#1F3327" strokeWidth="3" />
            <circle cx="110" cy="245" r="22" fill="#F5C042" stroke="#997017" strokeWidth="3" />

            {/* Chữ mộc bản: VINH HOA */}
            <rect x="330" y="30" width="28" height="54" rx="2" fill="#B91C1C" />
            <text x="344" y="52" fill="#FFF" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="serif">
              榮
            </text>
            <text x="344" y="74" fill="#FFF" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="serif">
              華
            </text>
          </svg>
        );

      case 'dongho-hung-dua':
        return (
          <svg viewBox="0 0 400 320" className={`w-full h-full ${svgMaxHeightClass} mx-auto select-none transition-all duration-500`}>
            {/* Thân cây dừa cong */}
            <path d="M120,310 C140,230 150,150 180,70" fill="none" stroke="#785028" strokeWidth="24" strokeLinecap="round" />
            {/* Tán dừa xòe */}
            <path d="M180,70 Q240,40 280,70 M180,70 Q240,80 270,120 M180,70 Q130,30 90,60" stroke="#245C41" strokeWidth="8" fill="none" strokeLinecap="round" />
            {/* Buồng dừa trĩu quả */}
            <circle cx="185" cy="85" r="10" fill="#91A84D" stroke="#48591D" strokeWidth="2" />
            <circle cx="195" cy="92" r="10" fill="#91A84D" stroke="#48591D" strokeWidth="2" />

            {/* Chàng trai trèo dừa */}
            <ellipse cx="170" cy="115" rx="12" ry="18" fill="#F4D3AF" />
            <path d="M175,130 L160,165 M165,115 L180,95" stroke="#F4D3AF" strokeWidth="6" strokeLinecap="round" />

            {/* Quả dừa đang rơi */}
            <circle cx="215" cy="180" r="12" fill="#91A84D" stroke="#48591D" strokeWidth="2" />

            {/* Thôn nữ xòe vạt váy đón dừa */}
            <ellipse cx="230" cy="270" rx="30" ry="40" fill="#D94A38" stroke="#7E1D13" strokeWidth="3" /> {/* Váy xòe */}
            <ellipse cx="230" cy="210" rx="14" ry="20" fill="#2E6B56" stroke="#113327" strokeWidth="2" /> {/* Áo tứ thân */}
            <circle cx="230" cy="180" r="14" fill="#F4D3AF" stroke="#B87B4C" strokeWidth="2" />
            {/* Khăn mỏ quạ */}
            <polygon points="218,172 230,160 242,172 230,175" fill="#1A1C1A" />

            {/* Khắc chữ Đông Hồ */}
            <rect x="330" y="30" width="28" height="30" rx="2" fill="#B91C1C" />
            <text x="344" y="52" fill="#FFF" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="serif">
              椰
            </text>
          </svg>
        );

      case 'dongho-to-nu':
        return (
          <svg viewBox="0 0 400 320" className={`w-full h-full ${svgMaxHeightClass} mx-auto select-none transition-all duration-500`}>
            {/* Thiếu nữ Kinh Bắc áo tứ thân thướt tha */}
            <path d="M190,140 C170,200 160,260 170,305 L230,305 C240,260 230,200 210,140 Z" fill="#EADCC2" stroke="#8A6E48" strokeWidth="3" />
            {/* Yếm đào son chu sa */}
            <polygon points="190,145 200,175 210,145" fill="#D94A38" />
            {/* Áo the đen bên ngoài */}
            <path d="M180,145 C175,190 170,240 165,300" stroke="#1E2421" strokeWidth="8" fill="none" />
            <path d="M220,145 C225,190 230,240 235,300" stroke="#1E2421" strokeWidth="8" fill="none" />
            {/* Khuôn mặt thanh tú */}
            <ellipse cx="200" cy="105" rx="18" ry="24" fill="#FCEAD2" stroke="#B87B4C" strokeWidth="2" />
            {/* Tóc vấn trần đuôi gà */}
            <ellipse cx="200" cy="85" rx="20" ry="12" fill="#151715" />
            <path d="M215,90 Q225,110 220,135" fill="none" stroke="#151715" strokeWidth="5" strokeLinecap="round" />

            {/* Cây đàn nguyệt thanh tao */}
            <circle cx="230" cy="210" r="34" fill="#C99452" stroke="#664319" strokeWidth="3" />
            <line x1="230" y1="210" x2="200" y2="125" stroke="#664319" strokeWidth="6" strokeLinecap="round" />
            <circle cx="230" cy="210" r="10" fill="#402507" />

            {/* Án trà gốm mộc mạc bên cạnh */}
            <ellipse cx="100" cy="270" rx="30" ry="10" fill="#4B6B58" stroke="#1B3324" strokeWidth="2" />
            <path d="M90,265 C90,250 110,250 110,265 Z" fill="#8A4A28" stroke="#4A2510" strokeWidth="2" />
            {/* Làn khói trà thơm ngát */}
            <path d="M100,245 Q90,225 105,210 T95,185" fill="none" stroke="#E5B94E" strokeWidth="2" strokeDasharray="3,3" />

            {/* Chữ: TỐ NỮ */}
            <rect x="330" y="30" width="28" height="54" rx="2" fill="#B91C1C" />
            <text x="344" y="52" fill="#FFF" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="serif">
              素
            </text>
            <text x="344" y="74" fill="#FFF" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="serif">
              女
            </text>
          </svg>
        );

      // ===== LÀNG SÌNH & TRANH KIẾNG =====
      default:
        return (
          <svg viewBox="0 0 400 320" className={`w-full h-full ${svgMaxHeightClass} mx-auto select-none transition-all duration-500`}>
            {/* Khung họa tiết mỹ thuật đặc trưng Cố Đô hoặc Nam Bộ */}
            {isTranhKieng ? (
              <>
                {/* Viền kính mạ nhũ vàng lộng lẫy */}
                <rect x="30" y="25" width="340" height="270" rx="6" fill="#0C241E" stroke="#E5B94E" strokeWidth="6" />
                <rect x="42" y="37" width="316" height="246" rx="3" fill="none" stroke="#9E7A36" strokeWidth="2" strokeDasharray="8,4" />
                {/* Họa tiết hoa sen & cẩn xà cừ óng ánh */}
                <circle cx="200" cy="150" r="65" fill="#133D33" stroke="#E5B94E" strokeWidth="3" />
                <path d="M200,95 Q230,130 200,165 Q170,130 200,95 Z" fill="#E26D5C" stroke="#FFF" strokeWidth="1" />
                <path d="M160,150 Q195,120 230,150 Q195,180 160,150 Z" fill="#F0C05E" stroke="#FFF" strokeWidth="1" />
                {/* Cụm chữ vàng son */}
                <text x="200" y="235" fill="#F7FAF7" fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily="serif" letterSpacing="0.1em">
                  {artwork.title}
                </text>
                <text x="200" y="255" fill="#E5B94E" fontSize="11" textAnchor="middle" fontFamily="sans-serif">
                  TRUYỀN THỐNG TRANH KIẾNG NAM BỘ
                </text>
              </>
            ) : isLangSinh ? (
              <>
                {/* Mộc bản Làng Sình mộc mạc trên giấy mộc */}
                <rect x="40" y="30" width="320" height="260" rx="3" fill="#FAF6EE" stroke="#A83226" strokeWidth="4" />
                <circle cx="200" cy="130" r="50" fill="#E8D5B5" stroke="#754823" strokeWidth="3" />
                {/* Dòng sông Hương & núi Ngự */}
                <path d="M70,220 Q140,190 200,220 T330,210" fill="none" stroke="#3B6B82" strokeWidth="4" />
                <path d="M110,180 L140,150 L170,180 Z" fill="#5A7D69" opacity="0.8" />
                <path d="M160,180 L200,140 L240,180 Z" fill="#4B6E5B" opacity="0.9" />
                {/* Chữ mộc bản Cố Đô */}
                <text x="200" y="255" fill="#1C3831" fontSize="17" fontWeight="bold" textAnchor="middle" fontFamily="serif">
                  {artwork.title}
                </text>
                <text x="200" y="275" fill="#A83226" fontSize="11" textAnchor="middle" fontFamily="sans-serif">
                  MỘC BẢN LÀNG SÌNH • XỨ HUẾ
                </text>
              </>
            ) : null}
          </svg>
        );
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* 1. NỀN GIẤY DÓ NÉN BÃ TRÀ HỮU CƠ */}
      <div
        className="w-full h-full p-6 sm:p-10 rounded-sm relative shadow-2xl flex flex-col justify-between"
        style={{
          backgroundColor: '#F5EEDC',
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, rgba(230,215,185,0.85) 100%),
            radial-gradient(#4a3525 0.75px, transparent 0.75px),
            radial-gradient(#2d4a25 0.6px, transparent 0.6px)
          `,
          backgroundSize: '100% 100%, 18px 18px, 32px 32px',
          backgroundPosition: '0 0, 9px 9px, 16px 16px',
          boxShadow: 'inset 0 0 50px rgba(115, 80, 40, 0.25), 0 20px 40px rgba(0,0,0,0.4)',
        }}
      >
        {/* Lớp vân xơ giấy dó dập nhiệt thủ công */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25 mix-blend-multiply"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, rgba(80, 50, 20, 0.05) 0px, rgba(80, 50, 20, 0.05) 2px, transparent 2px, transparent 8px)`,
          }}
        />

        {/* Khung viền mạ vàng / chỉ đỏ mỹ thuật */}
        <div className="absolute inset-2 sm:inset-3 border border-[#C5A059]/60 pointer-events-none rounded-[2px]" />
        <div className="absolute inset-3 sm:inset-4.5 border border-[#8A2418]/30 pointer-events-none rounded-[1px]" />

        {/* Bốn góc hoa văn góc cổ truyền */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#C5A059] pointer-events-none" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#C5A059] pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#C5A059] pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#C5A059] pointer-events-none" />

        {/* Nút chỉ dẫn phóng to / thu nhỏ khi hover */}
        <div className="absolute top-3.5 right-16 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0F3E35]/90 text-[#FAF6EE] px-2.5 py-1 rounded-full text-[10px] font-sans flex items-center gap-1.5 shadow-md border border-[#C5A059]/40 pointer-events-none">
          {isFullView ? (
            <>
              <Minimize2 className="w-3 h-3 text-[#E5B94E]" />
              <span>Nhấn tranh để hiện thông tin</span>
            </>
          ) : (
            <>
              <Maximize2 className="w-3 h-3 text-[#E5B94E]" />
              <span>Nhấn tranh để phóng to toàn cảnh</span>
            </>
          )}
        </div>

        {/* 2. HEADER TÁC PHẨM TRÊN NỀN GIẤY */}
        <div className="relative z-10 flex items-start justify-between border-b border-[#C5A059]/30 pb-3 mb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-xs bg-[#0F3E35] text-[#F8F5EE] text-[9px] uppercase tracking-widest font-sans font-bold">
                {artwork.region}
              </span>
              <span className="text-[10px] text-[#8A2418] font-serif font-bold uppercase tracking-wider">
                {artwork.artCategory}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#0F3E35] tracking-tight">
              {artwork.title}
            </h3>
            <p className="text-[11px] text-[#694825] font-serif italic">
              {artwork.subtitle}
            </p>
          </div>

          {/* Triện son đỏ bảo chứng di sản */}
          <div className="w-11 h-11 border-2 border-[#A83226] bg-[#A83226]/10 rounded-xs flex flex-col items-center justify-center text-[#A83226] shrink-0 p-0.5 select-none shadow-xs">
            <span className="text-[7px] font-sans font-bold leading-none tracking-tighter">GENTEA</span>
            <span className="text-[9px] font-serif font-bold leading-tight">DI SẢN</span>
            <span className="text-[6px] font-sans tracking-widest">2026</span>
          </div>
        </div>

        {/* 3. KHÔNG GIAN BỨC HỌA DÂN GIAN CHÍNH */}
        <div className="relative z-10 my-auto py-2 flex items-center justify-center">
          {renderIllustration()}
        </div>

        {/* 4. CHẤT LIỆU IN TRÊN GIẤY DÓ NÉN BÃ TRÀ - USER MANDATE */}
        <div className="relative z-10 pt-3 border-t border-[#C5A059]/35 mt-2 space-y-1.5 text-left bg-[#F9F5EC]/70 p-3 rounded-xs border">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-sans font-bold text-[#8A2418] tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3B6645] inline-block" />
              Chất Liệu: {artwork.teaPaperType}
            </span>
            <span className="text-[9px] text-[#694825] font-sans font-medium">
              Thủ công hữu cơ 100%
            </span>
          </div>
          <p className="text-[10.5px] text-[#2D3A34] font-serif leading-relaxed italic">
            &ldquo;{artwork.teaPaperDesc}&rdquo;
          </p>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[9px] text-[#8A2418] font-sans font-bold uppercase">Sắc màu tự nhiên:</span>
            {artwork.pigments.map((pigment) => (
              <span
                key={pigment}
                className="text-[9px] px-2 py-0.5 rounded-xs bg-[#EFE4CF] text-[#4A321B] font-serif border border-[#C5A059]/40"
              >
                {pigment}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

