
export enum View {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  RESEARCH = 'RESEARCH',
  MEDIA = 'MEDIA',
  CONTACT = 'CONTACT',
  TRACKING = 'TRACKING'
}

export enum ShipmentStatus {
  PLACED = 'Tạo đơn & Booking',
  PICKED_UP = 'Đã lấy hàng',
  IN_TRANSIT = 'Đang vận chuyển',
  AT_HUB = 'Tại trung tâm phân loại',
  OUT_FOR_DELIVERY = 'Đang giao hàng',
  DELIVERED = 'Hoàn tất'
}

export interface TrackingEvent {
  timestamp: string;
  location: string;
  status: ShipmentStatus;
  description: string;
}

export interface ShipmentData {
  id: string;
  sender: string;
  receiver: string;
  route: string;
  createdDate: string;
  currentStatus: ShipmentStatus;
  history: TrackingEvent[];
  estimatedDelivery: string;
  hubLocation: {
    lat: number;
    lng: number;
    name: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
