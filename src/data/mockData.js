// ============================================================
// COCOGREEN – MOCK DATA
// Dùng cho giai đoạn frontend, thay bằng API call sau
// ============================================================

export const PRODUCTS = [
  {
    id: 1,
    name: 'Chậu xơ dừa 20cm',
    category: 'Chậu xơ dừa',
    price: 45000,
    oldPrice: 0,
    rating: 4.7,
    reviews: 98,
    region: 'Bến Tre',
    status: 'new',
    badge: 'Mới',
    stock: 200,
    supplier: 'HTX Bến Tre Xanh',
    approvalStatus: 'APPROVED',
  },
  {
    id: 2,
    name: 'Than gáo dừa hoạt tính 1kg',
    category: 'Than gáo dừa',
    price: 120000,
    oldPrice: 150000,
    rating: 4.5,
    reviews: 212,
    region: 'Trà Vinh',
    status: 'sale',
    badge: '-20%',
    stock: 483,
    supplier: 'HTX Dừa Xanh Trà Vinh',
    approvalStatus: 'APPROVED',
  },
  {
    id: 3,
    name: 'Mụn dừa nén khối 5kg',
    category: 'Mụn dừa',
    price: 85000,
    oldPrice: 0,
    rating: 4.8,
    reviews: 56,
    region: 'Tiền Giang',
    status: 'stock',
    badge: '',
    stock: 8,          // tồn kho thấp
    supplier: 'Cty Mekong Coco',
    approvalStatus: 'PENDING',
  },
  {
    id: 4,
    name: 'Giỏ xơ dừa handmade',
    category: 'Handmade',
    price: 220000,
    oldPrice: 280000,
    rating: 4.6,
    reviews: 143,
    region: 'Sóc Trăng',
    status: 'sale',
    badge: '-21%',
    stock: 45,
    supplier: 'Làng nghề Sóc Trăng',
    approvalStatus: 'APPROVED',
  },
  {
    id: 5,
    name: 'Chậu xơ dừa 30cm',
    category: 'Chậu xơ dừa',
    price: 68000,
    oldPrice: 0,
    rating: 4.4,
    reviews: 77,
    region: 'Bến Tre',
    status: 'stock',
    badge: '',
    stock: 156,
    supplier: 'HTX Bến Tre Xanh',
    approvalStatus: 'APPROVED',
  },
  {
    id: 6,
    name: 'Than gáo dừa BBQ 2kg',
    category: 'Than gáo dừa',
    price: 195000,
    oldPrice: 0,
    rating: 4.9,
    reviews: 334,
    region: 'Trà Vinh',
    status: 'hot',
    badge: 'Hot',
    stock: 320,
    supplier: 'HTX Dừa Xanh Trà Vinh',
    approvalStatus: 'APPROVED',
  },
  {
    id: 7,
    name: 'Mụn dừa rời bao 10kg',
    category: 'Mụn dừa',
    price: 165000,
    oldPrice: 200000,
    rating: 4.3,
    reviews: 29,
    region: 'Tiền Giang',
    status: 'sale',
    badge: '-17%',
    stock: 90,
    supplier: 'Cty Mekong Coco',
    approvalStatus: 'APPROVED',
  },
  {
    id: 8,
    name: 'Túi xơ dừa handmade',
    category: 'Handmade',
    price: 180000,
    oldPrice: 0,
    rating: 4.7,
    reviews: 89,
    region: 'Sóc Trăng',
    status: 'new',
    badge: 'Mới',
    stock: 60,
    supplier: 'Làng nghề Sóc Trăng',
    approvalStatus: 'APPROVED',
  },
];

export const CATEGORIES = ['Chậu xơ dừa', 'Than gáo dừa', 'Mụn dừa', 'Handmade'];
export const REGIONS    = ['Bến Tre', 'Trà Vinh', 'Sóc Trăng', 'Tiền Giang'];

export const ORDERS = [
  {
    id: '#DH2025001',
    customer: 'Trần Văn A',
    product: 'Chậu xơ dừa 20cm',
    qty: 50,
    total: 2250000,
    date: '24/02/2026',
    status: 'PENDING',
  },
  {
    id: '#DH2025002',
    customer: 'Nguyễn Thị B',
    product: 'Than gáo dừa hoạt tính 1kg',
    qty: 30,
    total: 3600000,
    date: '23/02/2026',
    status: 'CONFIRMED',
  },
  {
    id: '#DH2025003',
    customer: 'Lê Minh C',
    product: 'Mụn dừa nén khối 5kg',
    qty: 20,
    total: 1700000,
    date: '22/02/2026',
    status: 'SHIPPING',
  },
  {
    id: '#DH2025004',
    customer: 'Phạm Thị D',
    product: 'Giỏ xơ dừa handmade',
    qty: 10,
    total: 2200000,
    date: '21/02/2026',
    status: 'COMPLETED',
  },
];

export const ORDER_STATUS = {
  PENDING:   { label: 'Chờ xác nhận', color: '#F59E0B', bg: '#FFF8E1' },
  CONFIRMED: { label: 'Đã xác nhận',  color: '#3B82F6', bg: '#E3F2FD' },
  SHIPPING:  { label: 'Đang giao',    color: '#8B5CF6', bg: '#F3E5F5' },
  COMPLETED: { label: 'Hoàn thành',   color: '#22C55E', bg: '#E8F5E9' },
  CANCELLED: { label: 'Đã hủy',       color: '#E63946', bg: '#FCE4EC' },
};

// Quy tắc chuyển trạng thái – P6
export const ORDER_NEXT_STATUS = {
  PENDING:   'CONFIRMED',
  CONFIRMED: 'SHIPPING',
  SHIPPING:  'COMPLETED',
  // COMPLETED: không có trạng thái tiếp theo
};

export const NEWS = [
  {
    id: 1,
    title: 'Xơ dừa vs Đất trồng hóa học: Lựa chọn nào tốt hơn?',
    desc: 'Phân tích toàn diện về ưu nhược điểm của giá thể xơ dừa so với đất trồng thông thường trong canh tác hữu cơ...',
    date: '25/02/2026',
    tag: 'So sánh',
    views: 1240,
    readTime: 5,
  },
  {
    id: 2,
    title: 'Lợi ích môi trường khi dùng sản phẩm từ dừa trong nông nghiệp',
    desc: 'Việc sử dụng sản phẩm tái chế từ dừa giúp giảm thiểu rác thải nông nghiệp và cải thiện chất lượng đất bền vững...',
    date: '20/02/2026',
    tag: 'Môi trường',
    views: 870,
    readTime: 4,
  },
  {
    id: 3,
    title: 'Hướng dẫn sử dụng mụn dừa cho rau thủy canh tại nhà',
    desc: 'Mụn dừa là giá thể lý tưởng cho hệ thống thủy canh. Cùng tìm hiểu cách pha trộn và xử lý phù hợp...',
    date: '15/02/2026',
    tag: 'Hướng dẫn',
    views: 2100,
    readTime: 7,
  },
  {
    id: 4,
    title: 'Xu hướng nông nghiệp xanh tại đồng bằng sông Cửu Long 2026',
    desc: 'Các doanh nghiệp miền Tây đang tiên phong trong sản xuất sạch, tận dụng phế phẩm dừa để tạo ra giá trị kinh tế...',
    date: '10/02/2026',
    tag: 'Xu hướng',
    views: 3400,
    readTime: 6,
  },
];

export const PARTNERS = [
  'Công ty TNHH Dừa Xanh Bến Tre',
  'HTX Nông nghiệp Trà Vinh',
  'Cty CP Mekong Coco',
  'DN Tự Nhiên Sóc Trăng',
  'Hợp tác xã Tiền Giang Xanh',
  'Vina Coconut Export',
];

export const KPI_STATS = [
  { value: '120+',  label: 'Doanh nghiệp liên kết' },
  { value: '350+',  label: 'Sản phẩm niêm yết' },
  { value: '8,500', label: 'Đơn hàng hoàn thành' },
  { value: '4.8/5', label: 'Đánh giá trung bình' },
  { value: '8–17h', label: 'Giờ hoạt động' },
];

export const DASHBOARD_STATS = [
  { label: 'Tổng đơn hàng',     value: '1,247',   change: '+12%',  up: true  },
  { label: 'Tổng doanh thu',     value: '48.3M đ', change: '+8.4%', up: true  },
  { label: 'Sản phẩm đang bán',  value: '32',      change: '+3',    up: true  },
  { label: 'Tồn kho thấp',      value: '5',       change: '-2',    up: false },
];
