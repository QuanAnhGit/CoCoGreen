# 🌿 CoCoGreen Frontend

Nền tảng quảng bá sản phẩm xanh từ dừa miền Tây Việt Nam.

---

## 🗂️ Cấu trúc thư mục

```
cocogreen/
│
├── index.html                      # Entry HTML
├── vite.config.js                  # Vite config (alias @/ → src/)
├── package.json
│
└── src/
    │
    ├── main.jsx                    # React entry point
    ├── App.jsx                     # Root: routing + global state
    │
    ├── styles/
    │   ├── globals.css             # Reset, utilities, shared classes
    │   ├── variables.css           # Design tokens (màu, font, spacing…)
    │   └── animations.css          # @keyframes + animation utilities
    │
    ├── data/
    │   └── mockData.js             # Dữ liệu giả lập (thay bằng API sau)
    │
    ├── utils/
    │   └── format.js               # formatCurrency, filterProducts…
    │
    ├── hooks/
    │   ├── useCart.js              # Giỏ hàng (add/remove/update qty)
    │   └── useToast.js             # Toast notification
    │
    ├── components/
    │   ├── common/                 # Dùng lại nhiều nơi
    │   │   ├── Button.jsx + .module.css
    │   │   ├── Breadcrumb.jsx + .module.css
    │   │   └── ImgPlaceholder.jsx + .module.css
    │   │
    │   ├── layout/                 # Bộ khung trang
    │   │   ├── Header.jsx + .module.css
    │   │   └── Footer.jsx + .module.css
    │   │
    │   └── ui/                     # UI blocks tái sử dụng
    │       ├── ProductCard.jsx + .module.css
    │       ├── NewsCard.jsx + .module.css
    │       └── StatCard.jsx + .module.css
    │
    └── pages/
        ├── Home/
        │   ├── index.jsx           # Page 1 – Trang chủ
        │   └── Home.module.css
        │
        ├── Products/
        │   ├── index.jsx           # Page 2 – Danh sách sản phẩm
        │   └── Products.module.css
        │
        ├── ProductDetail/
        │   ├── index.jsx           # Page 3 – Chi tiết sản phẩm
        │   └── ProductDetail.module.css
        │
        ├── Favorites/
        │   ├── index.jsx           # Page 4 – Yêu thích
        │   └── Favorites.module.css
        │
        ├── Cart/
        │   ├── index.jsx           # Giỏ hàng
        │   └── Cart.module.css
        │
        ├── Dashboard/
        │   ├── index.jsx           # Page 5 – Dashboard DN
        │   ├── Dashboard.module.css
        │   ├── OrderCenter.jsx     # Page 6 – Trung tâm đơn hàng
        │   └── OrderCenter.module.css
        │
        └── News/
            ├── index.jsx           # Page 8 – Tin tức & Kiến thức
            └── News.module.css
```

---

## 🚀 Cài đặt & chạy

```bash
npm install
npm run dev
```

Mở trình duyệt: `http://localhost:5173`

---

## 📐 Quy ước code

| Quy ước | Chi tiết |
|---------|----------|
| **CSS** | CSS Modules (`.module.css`) cho mỗi component |
| **Design tokens** | Tất cả màu/font/spacing qua biến CSS trong `variables.css` |
| **State** | `useState` local + custom hooks (`useCart`, `useToast`) |
| **Props** | `onNavigate(page)` – điều hướng, `onAddToCart(product)` – thêm giỏ |
| **Ảnh** | `<ImgPlaceholder>` giữ chỗ – thay bằng `<img src="...">` sau |
| **Data** | `mockData.js` – thay bằng `fetch(API_URL)` trong hooks sau |

---

## 🔜 Bước tiếp theo (Backend integration)

1. **Auth** – Tạo `useAuth` hook, trang Login/Register
2. **API** – Tạo `src/api/` với các file `products.js`, `orders.js`, `auth.js`
3. **State management** – Nâng lên Context hoặc Zustand nếu app phức tạp hơn
4. **React Router** – Thay `currentPage` string bằng `react-router-dom` routes
5. **Images** – Thay `<ImgPlaceholder>` bằng `<img src={product.imageUrl}>` thật
