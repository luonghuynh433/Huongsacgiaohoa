// Định nghĩa kiểu dữ liệu cho tính năng Tự Phối Bộ Kit Quà Tặng GENTEA 2026

export interface TeaPacketItem {
  id: string;
  name: string;
  region: 'Bắc' | 'Trung' | 'Nam';
  macroRegionCode: 'BAC' | 'TRUNG' | 'NAM';
  category: string;
  flavorNotes: string[];
  weight: string; // VD: "50g"
  colorTheme: string;
  accentBg: string;
  packagingArt: string; // Tên họa tiết phong cảnh
  shortDesc: string;
}

export interface KitSlot {
  slotIndex: 0 | 1 | 2;
  packet: TeaPacketItem | null;
}

export interface CustomerOrderInfo {
  fullName: string;
  phoneNumber: string;
  email: string;
  city: string;
  district: string;
  addressDetail: string;
  note?: string;
  giftNote?: string; // Lời chúc viết tay trên thiệp
}

export interface KitOrderRecord {
  orderId: string;
  createdAt: string;
  customer: CustomerOrderInfo;
  selectedTeas: TeaPacketItem[];
  kitDetails: {
    boxType: string;
    artPrintsIncluded: string[];
    qrCardIncluded: boolean;
  };
  status: 'PENDING_CONFIRMATION'; // Chờ người bán liên hệ xác nhận
}
