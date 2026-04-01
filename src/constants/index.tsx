
import { ShipmentData, ShipmentStatus } from '../types';

export const DEMO_SHIPMENTS: Record<string, ShipmentData> = {
  'ZEN123456': {
    id: 'ZEN123456',
    sender: 'Global Tech Corp (San Jose, US)',
    receiver: 'Cty TNHH Giải Pháp Số (Quận 1, TP.HCM)',
    route: 'US -> VN',
    createdDate: '10/05/2024 14:00',
    currentStatus: ShipmentStatus.OUT_FOR_DELIVERY,
    estimatedDelivery: '15/05/2024',
    hubLocation: { lat: 10.7769, lng: 106.7009, name: 'HCMC Logistics Hub Center' },
    history: [
      { timestamp: '14/05/2024 08:30', location: 'Quận 1, TP.HCM', status: ShipmentStatus.OUT_FOR_DELIVERY, description: 'Shipper đã lấy hàng và đang trên đường giao.' },
      { timestamp: '13/05/2024 22:00', location: 'Kho Tổng HCMC', status: ShipmentStatus.AT_HUB, description: 'Kiện hàng đã đến trung tâm phân loại chính.' },
      { timestamp: '12/05/2024 14:00', location: 'Transit Point', status: ShipmentStatus.IN_TRANSIT, description: 'Đang làm thủ tục thông quan.' },
      { timestamp: '11/05/2024 10:00', location: 'San Jose, US', status: ShipmentStatus.PICKED_UP, description: 'Đã lấy hàng từ kho người gửi.' },
      { timestamp: '10/05/2024 14:00', location: 'San Jose, US', status: ShipmentStatus.PLACED, description: 'Đã nhận thông tin booking đơn hàng.' },
    ]
  },
  'FLOW101': {
    id: 'FLOW101',
    sender: 'Fashion Forward (Paris, FR)',
    receiver: 'Shop Thời Trang ABC (Hà Nội)',
    route: 'France -> Vietnam',
    createdDate: '12/05/2024 09:00',
    currentStatus: ShipmentStatus.IN_TRANSIT,
    estimatedDelivery: '20/05/2024',
    hubLocation: { lat: 21.0285, lng: 105.8542, name: 'Hanoi Gateway Hub' },
    history: [
      { timestamp: '14/05/2024 15:00', location: 'Charles de Gaulle Airport', status: ShipmentStatus.IN_TRANSIT, description: 'Kiện hàng đã rời sân bay CDG.' },
      { timestamp: '12/05/2024 09:00', location: 'Paris, FR', status: ShipmentStatus.PLACED, description: 'Xác nhận tạo đơn hàng.' },
    ]
  },
  'HCMC202': {
    id: 'HCMC202',
    sender: 'Electronics Hub (Shenzhen, CN)',
    receiver: 'Lê Văn C (Đà Nẵng)',
    route: 'China -> Vietnam',
    createdDate: '01/05/2024 08:00',
    currentStatus: ShipmentStatus.DELIVERED,
    estimatedDelivery: '08/05/2024',
    hubLocation: { lat: 16.0544, lng: 108.2022, name: 'Da Nang Sorting Center' },
    history: [
      { timestamp: '08/05/2024 10:30', location: 'Đà Nẵng', status: ShipmentStatus.DELIVERED, description: 'Giao hàng thành công.' },
      { timestamp: '01/05/2024 08:00', location: 'Shenzhen, CN', status: ShipmentStatus.PLACED, description: 'Đơn hàng khởi tạo.' },
    ]
  }
};

export const STATUS_STEPS = [
  ShipmentStatus.PLACED,
  ShipmentStatus.PICKED_UP,
  ShipmentStatus.IN_TRANSIT,
  ShipmentStatus.AT_HUB,
  ShipmentStatus.OUT_FOR_DELIVERY,
  ShipmentStatus.DELIVERED
];

export const KPIS = [
  { label: 'Tỉ lệ theo dõi đơn', value: '98%', desc: 'Cập nhật thời gian thực' },
  { label: 'Giảm thời gian xử lý', value: '20%', desc: 'Tự động hóa vận hành' },
  { label: 'Tiết kiệm chi phí', value: '15%', desc: 'Nhờ tối ưu hóa tuyến' },
  { label: 'Thời gian phản hồi', value: '24/7', desc: 'Hỗ trợ không gián đoạn' }
];

export const FEEDBACK_DATA = [
  {
    name: "Lê Minh Tuấn",
    role: "Operations Manager",
    company: "Global Freight Solutions",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    metric: "Giảm 30% Manual Work",
    quote: "Trước đây chúng tôi mất hàng giờ để cập nhật Excel cho khách hàng. Với Flowdex, mọi thứ tự động 100%. Khách hàng của chúng tôi cực kỳ hài lòng vì có thể tự tra cứu real-time."
  },
  {
    name: "Trần Thu Hà",
    role: "Logistics Supervisor",
    company: "VinaTrade Import-Export",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    metric: "SLA đạt 99.8%",
    quote: "Flowdex không chỉ là phần mềm tracking, nó là công cụ quản trị. Việc phân tích dữ liệu hub giúp chúng tôi phát hiện ra các điểm nghẽn và xử lý ngay lập tức trước khi đơn hàng bị trễ."
  },
  {
    name: "Nguyễn Quốc Bảo",
    role: "Founder & CEO",
    company: "FastTrack Logistics SME",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    rating: 5,
    metric: "ROI x2 sau 6 tháng",
    quote: "Là một SME, chúng tôi cần sự tinh gọn. Flowdex cài đặt rất nhanh, đội ngũ hỗ trợ 24/7. Hệ thống giúp chúng tôi cạnh tranh sòng phẳng với các ông lớn nhờ tính minh bạch vượt trội."
  }
];

export const COMPETITORS_DATA = [
  { feature: 'Cập nhật Real-time', flowdex: 'Tức thời (API/IOT)', traditional: 'Thủ công / Cách quãng' },
  { feature: 'Quản lý chứng từ', flowdex: '100% Digital', traditional: 'Giấy tờ / Email rời rạc' },
  { feature: 'Phân tích dữ liệu', flowdex: 'Tích hợp Dashboard AI', traditional: 'Báo cáo Excel thủ công' },
  { feature: 'Tích hợp hệ thống', flowdex: 'API mở / Webhook', traditional: 'Hệ thống đóng' },
  { feature: 'Minh bạch chi phí', flowdex: 'Chi tiết từng chặng', traditional: 'Phí gộp / Khó đối soát' }
];
