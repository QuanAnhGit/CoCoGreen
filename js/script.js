// ── DATA ──────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 1,
    name: "Chậu xơ dừa 20cm",
    cat: "Chậu xơ dừa",
    price: 45000,
    old: 0,
    rating: 4.7,
    rev: 98,
    region: "Bến Tre",
    badge: "Mới",
    stock: 200,
    supplier: "HTX Bến Tre Xanh",
    img: "assets/images/products/1.png"
  },
  {
    id: 2,
    name: "Than gáo dừa hoạt tính 1kg",
    cat: "Than gáo dừa",
    price: 120000,
    old: 150000,
    rating: 4.5,
    rev: 212,
    region: "Trà Vinh",
    badge: "-20%",
    stock: 483,
    supplier: "HTX Dừa Xanh Trà Vinh",
    img: "assets/images/products/14.jpg"
  },
  {
    id: 3,
    name: "Mụn dừa nén khối 5kg",
    cat: "Mụn dừa",
    price: 85000,
    old: 0,
    rating: 4.8,
    rev: 56,
    region: "Tiền Giang",
    badge: "",
    stock: 8,
    supplier: "Cty Mekong Coco",
    img: "assets/images/products/5.png"
  },
  {
    id: 4,
    name: "Giỏ xơ dừa handmade",
    cat: "Handmade",
    price: 220000,
    old: 280000,
    rating: 4.6,
    rev: 143,
    region: "Sóc Trăng",
    badge: "-21%",
    stock: 45,
    supplier: "Làng nghề Sóc Trăng",
    img: "assets/images/products/17.jpg"
  },
  {
    id: 5,
    name: "Chậu xơ dừa 30cm",
    cat: "Chậu xơ dừa",
    price: 68000,
    old: 0,
    rating: 4.4,
    rev: 77,
    region: "Bến Tre",
    badge: "",
    stock: 156,
    supplier: "HTX Bến Tre Xanh",
    img: "assets/images/products/23.jpg"
  },
  {
    id: 6,
    name: "Than gáo dừa BBQ 2kg",
    cat: "Than gáo dừa",
    price: 195000,
    old: 0,
    rating: 4.9,
    rev: 334,
    region: "Trà Vinh",
    badge: "Hot",
    stock: 320,
    supplier: "HTX Dừa Xanh Trà Vinh",
    img: "assets/images/products/18.jpg"
  },
  {
    id: 7,
    name: "Mụn dừa rời bao 10kg",
    cat: "Mụn dừa",
    price: 165000,
    old: 200000,
    rating: 4.3,
    rev: 29,
    region: "Tiền Giang",
    badge: "-17%",
    stock: 90,
    supplier: "Cty Mekong Coco",
    img: "assets/images/products/17.jpg"
  },
  {
    id: 8,
    name: "Túi xơ dừa handmade",
    cat: "Handmade",
    price: 180000,
    old: 0,
    rating: 4.7,
    rev: 89,
    region: "Sóc Trăng",
    badge: "Mới",
    stock: 60,
    supplier: "Làng nghề Sóc Trăng",
    img: "assets/images/products/19.jpg"
    },
    {
        id: 9,
        name: "Chậu xơ dừa treo 25cm",
        cat: "Chậu xơ dừa",
        price: 72000,
        old: 85000,
        rating: 4.6,
        rev: 64,
        region: "Bến Tre",
        badge: "-15%",
        stock: 120,
        supplier: "HTX Bến Tre Xanh",
        img: "assets/images/products/9.jpg"
    },
    {
        id: 10,
        name: "Than gáo dừa viên nén 3kg",
        cat: "Than gáo dừa",
        price: 250000,
        old: 0,
        rating: 4.8,
        rev: 178,
        region: "Trà Vinh",
        badge: "Hot",
        stock: 300,
        supplier: "HTX Dừa Xanh Trà Vinh",
        img: "assets/images/products/10.jpg"
    },
    {
        id: 11,
        name: "Mụn dừa xử lý sạch 10kg",
        cat: "Mụn dừa",
        price: 180000,
        old: 210000,
        rating: 4.5,
        rev: 92,
        region: "Tiền Giang",
        badge: "-14%",
        stock: 85,
        supplier: "Cty Mekong Coco",
        img: "assets/images/products/11.jpg"
    },
    {
        id: 12,
        name: "Bình hoa xơ dừa decor",
        cat: "Handmade",
        price: 195000,
        old: 0,
        rating: 4.7,
        rev: 53,
        region: "Sóc Trăng",
        badge: "Mới",
        stock: 40,
        supplier: "Làng nghề Sóc Trăng",
        img: "assets/images/products/12.jpg"
    },
    {
        id: 13,
        name: "Chậu xơ dừa vuông 30cm",
        cat: "Chậu xơ dừa",
        price: 88000,
        old: 0,
        rating: 4.4,
        rev: 37,
        region: "Bến Tre",
        badge: "",
        stock: 150,
        supplier: "HTX Bến Tre Xanh",
        img: "assets/images/products/13.jpg"
    },
    {
        id: 14,
        name: "Than gáo dừa BBQ cao cấp 5kg",
        cat: "Than gáo dừa",
        price: 420000,
        old: 480000,
        rating: 4.9,
        rev: 221,
        region: "Trà Vinh",
        badge: "-12%",
        stock: 210,
        supplier: "HTX Dừa Xanh Trà Vinh",
        img: "assets/images/products/14.jpg"
    },
    {
      id: 15,
      name: "Combo trồng rau hữu cơ (Chậu + Mụn dừa)",
      cat: "Combo",
      price: 299000,
      old: 350000,
      rating: 4.8,
      rev: 112,
      region: "Bến Tre",
      badge: "Combo -15%",
      stock: 75,
      supplier: "HTX Bến Tre Xanh",
      img: "assets/images/products/15.jpg"
    }
];
const NEWS = [
  {
    id: 1,
    title: "Xơ dừa vs Đất trồng hóa học: Lựa chọn nào tốt hơn?",
    desc: "Phân tích toàn diện về ưu nhược điểm của giá thể xơ dừa so với đất trồng thông thường trong canh tác hữu cơ...",
    date: "25/02/2026",
    tag: "So sánh",
    views: 1240,
    readTime: 5,
    img: "assets/images/products/30.jpg"
  },
  {
    id: 2,
    title: "Lợi ích môi trường khi dùng sản phẩm từ dừa",
    desc: "Việc sử dụng sản phẩm tái chế từ dừa giúp giảm thiểu rác thải nông nghiệp và cải thiện chất lượng đất...",
    date: "20/02/2026",
    tag: "Môi trường",
    views: 870,
    readTime: 4,
    img: "assets/images/products/24.jpg"
  },
  {
    id: 3,
    title: "Hướng dẫn sử dụng mụn dừa cho rau thủy canh tại nhà",
    desc: "Mụn dừa là giá thể lý tưởng cho hệ thống thủy canh. Cùng tìm hiểu cách pha trộn phù hợp...",
    date: "15/02/2026",
    tag: "Hướng dẫn",
    views: 2100,
    readTime: 7,
    img: "assets/images/products/4.png"
  },
  {
    id: 4,
    title: "Xu hướng nông nghiệp xanh tại đồng bằng sông Cửu Long 2026",
    desc: "Các doanh nghiệp miền Tây đang tiên phong trong sản xuất sạch, tận dụng phế phẩm dừa...",
    date: "10/02/2026",
    tag: "Xu hướng",
    views: 3400,
    readTime: 6,
    img: "assets/images/products/3.png"
  },
];
const PARTNERS = [
  "Cty TNHH Dừa Xanh Bến Tre",
  "HTX Nông nghiệp Trà Vinh",
  "Cty CP Mekong Coco",
  "DN Tự Nhiên Sóc Trăng",
  "HTX Tiền Giang Xanh",
  "Vina Coconut Export",
];
const ORDER_STATUS = {
  PENDING: { label: "Chờ xác nhận", color: "#F59E0B", bg: "#FFF8E1" },
  CONFIRMED: { label: "Đã xác nhận", color: "#3B82F6", bg: "#E3F2FD" },
  SHIPPING: { label: "Đang giao", color: "#8B5CF6", bg: "#F3E5F5" },
  COMPLETED: { label: "Hoàn thành", color: "#22C55E", bg: "#E8F5E9" },
};
const ORDER_NEXT = {
  PENDING: "CONFIRMED",
  CONFIRMED: "SHIPPING",
  SHIPPING: "COMPLETED",
};
let ORDERS = [
  {
    id: "#DH2025001",
    customer: "Trần Văn A",
    product: "Chậu xơ dừa 20cm",
    qty: 50,
    total: 2250000,
    date: "24/02/2026",
    status: "PENDING",
  },
  {
    id: "#DH2025002",
    customer: "Nguyễn Thị B",
    product: "Than gáo dừa hoạt tính 1kg",
    qty: 30,
    total: 3600000,
    date: "23/02/2026",
    status: "CONFIRMED",
  },
  {
    id: "#DH2025003",
    customer: "Lê Minh C",
    product: "Mụn dừa nén khối 5kg",
    qty: 20,
    total: 1700000,
    date: "22/02/2026",
    status: "SHIPPING",
  },
  {
    id: "#DH2025004",
    customer: "Phạm Thị D",
    product: "Giỏ xơ dừa handmade",
    qty: 10,
    total: 2200000,
    date: "21/02/2026",
    status: "COMPLETED",
  },
];

// ── STATE ─────────────────────────────────────────────────────
let currentPage = "home";
let cart = [];
let currentProduct = PRODUCTS[1];
let currentNews = null;
let currentTab = "desc";
let orderFilter = "ALL";
let qty = 1;
let activeImg = 0;

// ── HELPERS ───────────────────────────────────────────────────
const fmt = (n) => n.toLocaleString("vi-VN") + "đ";
const stars = (r) => "★".repeat(Math.floor(r));
const totalItems = () => cart.reduce((s, c) => s + (c.qty || 1), 0);
const totalPrice = () => cart.reduce((s, c) => s + c.price * (c.qty || 1), 0);

function ph(w, h, label, extra = "") {
  const wStr = typeof w === "number" ? w + "px" : w;
  return `<div class="img-ph" style="width:${wStr};height:${h}px;${extra}">
    <span class="img-ph-icon">🌿</span>
    <span class="img-ph-label">${label}</span>
    ${h ? `<span class="img-ph-size">h:${h}px</span>` : ""}
  </div>`;
}

// ── NAVIGATION ────────────────────────────────────────────────
function nav(page) {
  currentPage = page;
  document
    .querySelectorAll(".nav-btn")
    .forEach((b) => b.classList.remove("active"));
  const nb = document.getElementById("nav-" + page);
  if (nb) nb.classList.add("active");
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ── CART ──────────────────────────────────────────────────────
function addToCart(id) {
  const p = PRODUCTS.find((p) => p.id === id);
  const ex = cart.find((c) => c.id === id);
  if (ex) ex.qty = (ex.qty || 1) + 1;
  else cart.push({ ...p, qty: 1 });
  updateCartBadge();
  showToast(`✅ Đã thêm "${p.name}" vào giỏ hàng`);
}
function removeFromCart(id) {
  cart = cart.filter((c) => c.id !== id);
  render();
}
function updateCartQty(id, q) {
  if (q < 1) {
    removeFromCart(id);
    return;
  }
  cart = cart.map((c) => (c.id === id ? { ...c, qty: q } : c));
  render();
}
function updateCartBadge() {
  const b = document.getElementById("cart-badge");
  const t = totalItems();
  b.textContent = t;
  b.style.display = t > 0 ? "flex" : "none";
}

// ── TOAST ─────────────────────────────────────────────────────
function showToast(msg) {
  const wrap = document.getElementById("toast-wrap");
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  wrap.appendChild(el);
  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateY(10px)";
    el.style.transition = "all .3s";
    setTimeout(() => el.remove(), 300);
  }, 2600);
}

// ── SCROLL HEADER ─────────────────────────────────────────────
window.addEventListener("scroll", () => {
  const h = document.getElementById("site-header");
  if (h) h.classList.toggle("scrolled", window.scrollY > 20);
});

// ── ORDER ACTIONS ─────────────────────────────────────────────
function advanceOrder(id) {
  ORDERS = ORDERS.map((o) => {
    if (o.id !== id) return o;
    const next = ORDER_NEXT[o.status];
    return next ? { ...o, status: next } : o;
  });
  render();
}

// ── PRODUCT CARD ──────────────────────────────────────────────
function prodCard(p, small = false) {
  const imgH = small ? 170 : 200;
  return `<article class="prod-card" onclick="viewProduct(${p.id})">
    <div class="prod-card-img">
      ${
          p.img
              ? `<img src="${p.img}" class="prod-real-img" style="width:100%;height:${imgH}px;object-fit:cover;">`
              : ph("100%", imgH, "400×400px")
      }
      ${p.badge ? `<span class="prod-badge">${p.badge}</span>` : ""}
      <button class="prod-fav" onclick="event.stopPropagation()">♡</button>
    </div>
    <div class="prod-body">
      <div class="prod-meta">${p.cat} · ${p.region}</div>
      <div class="prod-name">${p.name}</div>
      <div class="prod-price-row">
        <span class="prod-price">${fmt(p.price)}</span>
        ${p.old ? `<span class="prod-old">${fmt(p.old)}</span>` : ""}
      </div>
      <div class="prod-rating"><span class="stars">${stars(p.rating)}</span> ${p.rating} (${p.rev})</div>
      <button class="prod-cart-btn" onclick="event.stopPropagation();addToCart(${p.id})">🛒 Thêm vào giỏ</button>
    </div>
  </article>`;
}

function viewProduct(id) {
  currentProduct = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];
  currentTab = "desc";
  qty = 1;
  activeImg = 0;
  nav("product-detail");
}

// ── NEWS CARD ─────────────────────────────────────────────────
function newsCard(n) {
    return `<article class="news-card" onclick="viewNews(${n.id})">
        <div class="news-card-img">
          ${n.img
                ? `<img src="${n.img}" style="width:100%;height:200px;object-fit:cover;">`
                : ph("100%", 200, "600×300px")
          }
      <span class="tag tag-green" style="position:absolute;top:12px;left:12px">${n.tag}</span>
    </div>
    <div class="news-body">
      <div class="news-title">${n.title}</div>
      <div class="news-desc">${n.desc.slice(0, 100)}…</div>
      <div class="news-foot"><span>📅 ${n.date}</span><span class="news-read">Đọc thêm →</span></div>
    </div>
  </article>`;
}

function viewNews(id) {
  currentNews = NEWS.find((n) => n.id === id);
  nav("news");
}

// ── BREADCRUMB ────────────────────────────────────────────────
function bc(items) {
  return `<nav class="breadcrumb">${items
    .map(
      (it, i) =>
        `${i > 0 ? '<span class="bc-sep">/</span>' : ""}
     ${it.page ? `<button class="bc-link" onclick="nav('${it.page}')">${it.label}</button>` : `<span class="bc-current">${it.label}</span>`}`,
    )
    .join("")}</nav>`;
}

// ── RENDER PAGES ──────────────────────────────────────────────
function render() {
  const app = document.getElementById("app");
  updateCartBadge();
  switch (currentPage) {
    case "home":
      app.innerHTML = renderHome();
      break;
    case "products":
      app.innerHTML = renderProducts();
      break;
    case "product-detail":
      app.innerHTML = renderProductDetail();
      break;
    case "favorites":
      app.innerHTML = renderFavorites();
      break;
    case "news":
      app.innerHTML = renderNews();
      break;
    case "cart":
      app.innerHTML = renderCart();
      break;
    case "dashboard":
      app.innerHTML = renderDashboard();
      break;
    case "orders":
      app.innerHTML = renderOrders();
      break;
    default:
      app.innerHTML = renderHome();
  }
}

// ──────────────────────────────────────────────────────────────
// PAGE: HOME
// ──────────────────────────────────────────────────────────────
function renderHome() {
    const kpis = [
    {
            icon: `
      <svg viewBox="0 0 100 100" class="kpi-svg">
        <rect x="20" y="40" width="20" height="30" stroke="currentColor" stroke-width="4" fill="none"/>
        <rect x="45" y="30" width="20" height="40" stroke="currentColor" stroke-width="4" fill="none"/>
        <rect x="70" y="20" width="15" height="50" stroke="currentColor" stroke-width="4" fill="none"/>
        <line x1="10" y1="70" x2="90" y2="70" stroke="currentColor" stroke-width="4"/>
      </svg>
    `,
            val: "120+",
            lbl: "Doanh nghiệp"
        },
        {
            icon: `
      <svg viewBox="0 0 100 100" class="kpi-svg">
        <polygon points="20,40 50,20 80,40 50,60" stroke="currentColor" stroke-width="4" fill="none"/>
        <line x1="20" y1="40" x2="20" y2="70" stroke="currentColor" stroke-width="4"/>
        <line x1="80" y1="40" x2="80" y2="70" stroke="currentColor" stroke-width="4"/>
        <line x1="20" y1="70" x2="80" y2="70" stroke="currentColor" stroke-width="4"/>
      </svg>
    `,
            val: "350+",
            lbl: "Sản phẩm"
        },
        {
            icon: `
      <svg viewBox="0 0 100 100" class="kpi-svg">
        <rect x="20" y="30" width="60" height="40" stroke="currentColor" stroke-width="4" fill="none"/>
        <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" stroke-width="4"/>
      </svg>
    `,
            val: "8,500",
            lbl: "Đơn hoàn thành"
        },
        {
            icon: `
      <svg viewBox="0 0 100 100" class="kpi-svg">
        <polygon points="50,20 61,40 85,40 66,55 75,80 50,65 25,80 34,55 15,40 39,40"
          stroke="currentColor"
          stroke-width="4"
          fill="none"/>
      </svg>
    `,
            val: "4.8/5",
            lbl: "Đánh giá TB"
        },
        {
            icon: `
      <svg viewBox="0 0 100 100" class="kpi-svg">
        <circle cx="50" cy="50" r="35" stroke="currentColor" stroke-width="4" fill="none"/>
        <line x1="50" y1="50" x2="50" y2="30" stroke="currentColor" stroke-width="4"/>
        <line x1="50" y1="50" x2="65" y2="60" stroke="currentColor" stroke-width="4"/>
      </svg>
    `,
            val: "8–17h",
            lbl: "Giờ hoạt động"
        }
  ];
  const benefits = [
    {
      icon: "♻️",
      title: "100% Tái chế",
      desc: "Toàn bộ sản phẩm từ phế phẩm dừa, không phát sinh rác thải mới.",
    },
    {
      icon: "💧",
      title: "Tiết kiệm nước",
      desc: "Xơ dừa giữ ẩm gấp 8–10 lần đất, giảm tưới tiêu đáng kể.",
    },
    {
      icon: "🌱",
      title: "Cải tạo đất",
      desc: "Bổ sung vi chất tự nhiên, cải thiện cấu trúc đất lâu dài.",
    },
    {
      icon: "🤝",
      title: "Hỗ trợ địa phương",
      desc: "Mua trực tiếp từ hợp tác xã và doanh nghiệp miền Tây.",
    },
  ];
  const partnerMarkup = [...PARTNERS, ...PARTNERS]
    .map(
      (p) =>
        `<div class="partner-chip">${ph(36, 36, "", "border-radius:50%")}<span class="partner-name">${p}</span></div>`,
    )
    .join("");

  return `
  <!-- HERO -->
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-overlay"></div>
    <div class="hero-content anim-up">
      <span class="tag tag-green" style="margin-bottom:18px">🌴 Nền tảng xanh từ miền Tây</span>
      <h1 class="hero-title">Sản phẩm xơ dừa miền Tây –<br>Giải pháp xanh cho nông nghiệp</h1>
      <p class="hero-desc">Kết nối trực tiếp doanh nghiệp địa phương.<br><strong>Minh bạch · Thân thiện môi trường · Dễ đặt hàng.</strong></p>
      <div class="hero-cta">
        <button class="btn btn-primary btn-lg" onclick="nav('products')">Xem sản phẩm</button>
        <button class="hero-ghost-btn">Tìm hiểu lợi ích</button>
      </div>
    </div>
    <div class="hero-badge">
      <span style="font-size:28px">🌱</span>
      <div><div class="hero-badge-title">Eco Certified</div><div class="hero-badge-sub">100% tái chế từ dừa</div></div>
    </div>
  </section>

  <!-- KPI STRIP -->
   <div class="kpi-strip">
      ${kpis
              .map(
                  (k, i) => `
          <div class="kpi-item">
            <span class="kpi-icon">
              ${k.icon}
            </span>
            <span class="kpi-value">${k.val}</span>
            <span class="kpi-label">${k.lbl}</span>
          </div>
          `
              )
              .join("")}
   </div>

  <!-- FEATURED PRODUCTS -->
  <div class="section-wrap">
    <div class="section-head">
      <span class="section-label">✦ Nổi bật ✦</span>
      <h2 class="section-title">Sản phẩm tiêu biểu</h2>
      <p class="section-sub">Những sản phẩm xơ dừa chất lượng cao được yêu thích nhất</p>
    </div>
    <div class="cat-tabs">
      ${["Tất cả", "Chậu xơ dừa", "Than gáo dừa", "Mụn dừa", "Handmade"]
        .map(
          (t, i) =>
            `<button class="cat-tab${i === 0 ? " active" : ""}" onclick="this.closest('.cat-tabs').querySelectorAll('.cat-tab').forEach(b=>b.classList.remove('active'));this.classList.add('active')">${t}</button>`,
        )
        .join("")}
    </div>
    <div class="prod-grid">
      ${PRODUCTS.map((p) => prodCard(p)).join("")}
    </div>
    <div style="text-align:center;margin-top:36px">
      <button class="btn btn-outline btn-md" onclick="nav('products')">Xem tất cả sản phẩm →</button>
    </div>
  </div>

  <!-- BENEFITS -->
  <section class="benefits-section">
    <div class="benefits-inner">
      <span class="section-label" style="color:var(--green-pale)">✦ Vì sao chọn CoCoGreen ✦</span>
      <h2 class="benefits-title">Lợi ích cho môi trường & nông nghiệp</h2>
      <p style="color:rgba(255,255,255,.7);margin-bottom:44px;font-size:15px">Từ phế phẩm dừa đến giải pháp nông nghiệp bền vững</p>
      <div class="benefits-grid">
        ${benefits
          .map(
            (b) => `
          <div class="benefit-card">
            <span class="benefit-icon">${b.icon}</span>
            <h4 class="benefit-title">${b.title}</h4>
            <p class="benefit-desc">${b.desc}</p>
          </div>`,
          )
          .join("")}
      </div>
    </div>
  </section>

  <!-- PARTNERS MARQUEE -->
  <div class="partner-section">
    <div style="text-align:center;margin-bottom:20px"><span class="section-label">✦ Doanh nghiệp liên kết ✦</span></div>
    <div style="overflow:hidden"><div class="marquee-track">${partnerMarkup}</div></div>
  </div>

  <!-- NEWS PREVIEW -->
  <div class="section-wrap">
    <div class="news-header">
      <div>
        <span class="section-label">✦ Kiến thức & Tin tức ✦</span>
        <h2 class="section-title">Bài viết mới nhất</h2>
      </div>
      <button class="btn btn-outline btn-sm" onclick="nav('news')">Xem tất cả</button>
    </div>
    <div class="news-grid">${NEWS.slice(0, 3).map(newsCard).join("")}</div>
  </div>

  <!-- CTA BANNER -->
  <div class="cta-banner-wrap">
    <div class="cta-banner">
      <div>
        <span class="tag" style="background:rgba(255,255,255,.15);color:var(--green-pale);margin-bottom:14px;display:inline-flex">Ưu đãi đặc biệt</span>
        <h2 class="cta-banner-title">Đặt hàng lần đầu — Giảm 10%</h2>
        <p class="cta-banner-desc">Đăng ký tài khoản và nhận ngay mã giảm giá 10% cho đơn hàng đầu tiên. Áp dụng cho tất cả sản phẩm.</p>
      </div>
      <div class="cta-banner-btns">
        <button class="btn btn-gold btn-lg">Đăng ký ngay</button>
        <button class="cta-learn-btn">Tìm hiểu thêm</button>
      </div>
    </div>
  </div>`;
}

// ──────────────────────────────────────────────────────────────
// PAGE: PRODUCTS
// ──────────────────────────────────────────────────────────────
function renderProducts() {
  return `<div class="page">
    ${bc([{ label: "Trang chủ", page: "home" }, { label: "Sản phẩm" }])}
    <div class="products-header">
      <h1 class="section-title" style="margin:0">Danh sách sản phẩm</h1>
      <div class="products-controls">
        <div class="search-wrap">
          <span class="search-icon">🔍</span>
          <input class="form-control search-input" placeholder="Tìm sản phẩm, doanh nghiệp..." />
        </div>
        <select class="form-control" style="width:200px">
          <option>Sắp xếp: Mặc định</option>
          <option>Giá tăng dần</option><option>Giá giảm dần</option>
          <option>Mới nhất</option><option>Đánh giá cao nhất</option><option>Bán chạy</option>
        </select>
      </div>
    </div>
    <div class="products-layout">
      <!-- Sidebar -->
      <aside class="filter-sidebar">
        <div class="filter-box">
          <div class="filter-top">
            <span class="filter-main-title">🔧 Bộ lọc</span>
            <button class="filter-clear">Xóa tất cả</button>
          </div>
          ${[
            {
              title: "💰 Khoảng giá",
              opts: [
                "Dưới 100.000đ",
                "100.000 – 300.000đ",
                "300.000 – 500.000đ",
                "Trên 500.000đ",
              ],
            },
            {
              title: "📦 Danh mục",
              opts: ["Chậu xơ dừa", "Than gáo dừa", "Mụn dừa", "Handmade"],
            },
            {
              title: "📍 Khu vực",
              opts: ["Bến Tre", "Trà Vinh", "Sóc Trăng", "Tiền Giang"],
            },
            {
              title: "📊 Tình trạng",
              opts: ["Còn hàng", "Giảm giá", "Sản phẩm mới"],
            },
          ]
            .map(
              (s) => `
            <div class="filter-section">
              <div class="filter-title">${s.title}</div>
              ${s.opts.map((o) => `<label class="filter-item"><input type="checkbox"><span>${o}</span></label>`).join("")}
            </div>`,
            )
            .join("")}
          <button class="btn btn-primary btn-full" style="margin-top:4px">Áp dụng bộ lọc</button>
        </div>
      </aside>
      <!-- Grid -->
      <div class="products-content">
        <p class="result-count">Hiển thị 1–8 / 350 sản phẩm</p>
        <div class="products-grid">${PRODUCTS.map((p) => prodCard(p, true)).join("")}</div>
        <div class="pagination">
          <button class="page-btn">‹</button>
          ${[1, 2, 3, 4, 5].map((n) => `<button class="page-btn${n === 1 ? " active" : ""}">${n}</button>`).join("")}
          <button class="page-btn">···</button>
          <button class="page-btn">18</button>
          <button class="page-btn">›</button>
        </div>
      </div>
    </div>
  </div>`;
}

// ──────────────────────────────────────────────────────────────
// PAGE: PRODUCT DETAIL
// ──────────────────────────────────────────────────────────────
function renderProductDetail() {
  const p = currentProduct;
  const tabs = ["desc", "tech", "eco", "reviews"];
  const tabLabels = {
    desc: "📝 Mô tả",
    tech: "🔬 Thông số",
    eco: "🌿 Lợi ích",
    reviews: `⭐ Đánh giá (${p.rev})`,
  };
  const specRows = [
    ["Chất liệu", "Than gáo dừa tự nhiên"],
    ["Trọng lượng", "1 kg / túi"],
    ["Độ ẩm", "≤ 10%"],
    ["Carbon", "≥ 80%"],
    ["Kích cỡ hạt", "2–5 mm"],
    ["Ứng dụng", "Trồng trọt, lọc nước"],
    ["Hướng dẫn", "Trộn 5–10% vào đất"],
  ];
  const reviews = [
    {
      user: "Nguyễn Minh T.",
      s: 5,
      text: "Sản phẩm chất lượng tốt, đóng gói cẩn thận. Trồng rau tại nhà thấy cải thiện rõ rệt.",
      date: "20/02/2026",
    },
    {
      user: "Trần Thị L.",
      s: 4,
      text: "Giao hàng nhanh, than sạch không tạp chất. Sẽ mua lại lần sau.",
      date: "18/02/2026",
    },
    {
      user: "Lê Văn H.",
      s: 5,
      text: "Mùi khói nhẹ ban đầu nhưng phơi nắng hết. Cây phát triển rất tốt.",
      date: "15/02/2026",
    },
  ];

  let tabContent = "";
  if (currentTab === "desc")
    tabContent = `
    <div class="tab-content-box"><h3>Mô tả sản phẩm</h3>
      <p class="desc-text">Than gáo dừa hoạt tính 1kg được sản xuất từ vỏ gáo dừa tươi qua quy trình than hóa và hoạt hóa nhiệt độ cao. Sản phẩm có khả năng hấp thụ mùi, lọc không khí và cải thiện chất lượng đất vượt trội.</p>
      <div class="desc-features">
        ${["✅ Tăng độ xốp", "✅ Cải thiện thoát nước", "✅ Giữ dinh dưỡng lâu", "✅ Không độc hại"].map((i) => `<div class="desc-feature">${i}</div>`).join("")}
      </div>
    </div>`;
  else if (currentTab === "tech")
    tabContent = `
    <div class="tab-content-box"><h3>Thông số kỹ thuật</h3>
      <table style="width:100%;border-collapse:collapse">
        ${specRows.map(([k, v]) => `<tr style="border-bottom:1px solid var(--cream-dark)"><td style="padding:10px 0;font-weight:600;color:var(--green-deep);width:40%;font-size:14px">${k}</td><td style="padding:10px 0;font-size:14px">${v}</td></tr>`).join("")}
      </table>
    </div>`;
  else if (currentTab === "eco")
    tabContent = `
    <div class="tab-content-box"><h3>Lợi ích môi trường</h3>
      ${[
        [
          "🌍",
          "Giảm CO₂",
          "Giảm 70% lượng CO₂ so với than khoáng qua quy trình từ phế phẩm dừa.",
        ],
        [
          "💧",
          "Tiết kiệm nước",
          "Cấu trúc xốp giữ ẩm lâu, giảm 40% lượng nước tưới tiêu mỗi ngày.",
        ],
        [
          "🌿",
          "Hỗ trợ vi sinh",
          "Tạo môi trường lý tưởng cho vi sinh vật có lợi trong đất.",
        ],
      ]
        .map(
          ([icon, t, d]) => `
        <div class="eco-item"><span style="font-size:30px;flex-shrink:0">${icon}</span><div><h4 style="color:var(--green-deep);margin-bottom:6px">${t}</h4><p style="font-size:14px;color:var(--text-muted);line-height:1.6">${d}</p></div></div>`,
        )
        .join("")}
    </div>`;
  else
    tabContent = `
    <div class="reviews-grid">
      <div class="review-summary">
        <div class="review-score">4.5</div>
        <div class="stars" style="font-size:20px">★★★★½</div>
        <div style="color:var(--text-muted);font-size:13px;margin-top:4px">${p.rev} đánh giá</div>
        <div style="margin-top:16px">
          ${[
            [5, 60],
            [4, 25],
            [3, 10],
            [2, 3],
            [1, 2],
          ]
            .map(
              ([s, pct]) => `
            <div class="rating-bar-row">
              <span style="font-size:12px;color:var(--text-muted);width:12px">${s}</span>
              <span style="color:#f4a81d;font-size:12px">★</span>
              <div class="rating-bar-track"><div class="rating-bar-fill" style="width:${pct}%"></div></div>
              <span style="font-size:12px;color:var(--text-muted);width:28px">${pct}%</span>
            </div>`,
            )
            .join("")}
        </div>
      </div>
      <div class="review-list">
        ${reviews
          .map(
            (r) => `
          <div class="review-card">
            <div class="review-card-head">
              <div class="review-user-row">
                ${ph(38, 38, "", `border-radius:50%`)}
                <div><div style="font-weight:600;font-size:14px">${r.user}</div><div class="stars" style="font-size:13px">${"★".repeat(r.s)}</div></div>
              </div>
              <span style="font-size:12px;color:var(--text-muted)">${r.date}</span>
            </div>
            <p style="font-size:14px;line-height:1.6">${r.text}</p>
          </div>`,
          )
          .join("")}
      </div>
    </div>`;

  return `<div class="page">
    ${bc([{ label: "Trang chủ", page: "home" }, { label: "Sản phẩm", page: "products" }, { label: p.name }])}
    <div class="detail-grid">
      <!-- Gallery -->
      <div>
        <div class="gallery-main">${ph("100%", 420, "Ảnh chính — 600×600px")}</div>
        <div class="gallery-thumbs">
          ${[0, 1, 2, 3].map((i) => `<div class="gallery-thumb${activeImg === i ? " active" : ""}" onclick="activeImg=${i};renderTabContent()"><div>${ph("100%", 78, String(i + 1))}</div></div>`).join("")}
        </div>
      </div>
      <!-- Info -->
      <div>
        <span class="tag tag-gold" style="margin-bottom:12px;display:inline-flex">🏅 ${p.cat}</span>
        <h1 class="detail-title">${p.name}</h1>
        <div class="rating-row">
          <span class="stars" style="font-size:18px">${stars(p.rating)}</span>
          <strong>${p.rating}/5</strong>
          <span style="color:var(--text-muted);font-size:13px">(${p.rev} đánh giá)</span>
          <span class="stock-badge">✓ Còn hàng</span>
        </div>
        <div class="price-row">
          <span class="detail-price">${fmt(p.price)}</span>
          ${p.old ? `<span class="detail-old-price">${fmt(p.old)}</span>` : ""}
        </div>
        <div class="supplier-box">
          <div class="supplier-label">📍 Doanh nghiệp cung cấp</div>
          <div class="supplier-row">
            ${ph(40, 40, "", "border-radius:50%")}
            <div><div style="font-size:14px;font-weight:600">${p.supplier}</div><div style="font-size:12px;color:var(--text-muted)">${p.region} · ⭐ 4.8 · 2,400 đánh giá</div></div>
          </div>
        </div>
        <div class="qty-row">
          <div class="qty-ctrl">
            <button class="qty-btn" onclick="qty=Math.max(1,qty-1);document.getElementById('qty-val').textContent=qty">−</button>
            <span class="qty-val" id="qty-val">${qty}</span>
            <button class="qty-btn" onclick="qty++;document.getElementById('qty-val').textContent=qty">+</button>
          </div>
          <span style="font-size:13px;color:var(--text-muted)">Còn ${p.stock} sản phẩm</span>
        </div>
        <div class="action-row">
          <button class="btn btn-primary btn-md" style="flex:1" onclick="addToCart(${p.id})">🛒 Thêm vào giỏ hàng</button>
          <button class="btn btn-gold btn-md" style="flex:1">⚡ Mua ngay</button>
          <button class="fav-btn">♡</button>
        </div>
        <div class="eco-tags">
          ${["♻️ Tái chế", "🌱 Hữu cơ", "🌊 Thân thiện MT", "🏭 Sản xuất Việt"].map((t) => `<span class="tag tag-green" style="font-size:12px">${t}</span>`).join("")}
        </div>
      </div>
    </div>
    <!-- Tabs -->
    <div class="tab-bar" id="tab-bar">
      ${tabs.map((t) => `<button class="tab-btn${currentTab === t ? " active" : ""}" onclick="switchTab('${t}')">${tabLabels[t]}</button>`).join("")}
    </div>
    <div id="tab-content" class="anim-in">${tabContent}</div>
  </div>`;
}

function switchTab(t) {
  currentTab = t;
  render();
}
function renderTabContent() {
  document
    .querySelectorAll(".gallery-thumb")
    .forEach((el, i) => el.classList.toggle("active", i === activeImg));
}

// ──────────────────────────────────────────────────────────────
// PAGE: FAVORITES
// ──────────────────────────────────────────────────────────────
function renderFavorites() {
  const favs = PRODUCTS.slice(0, 4);
  return `<div class="page">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <span class="section-label">✦ Danh sách của bạn ✦</span>
        <h1 class="section-title" style="margin:0">Sản phẩm yêu thích</h1>
      </div>
      <p style="color:var(--text-muted);font-size:14px">${favs.length} sản phẩm đã lưu</p>
    </div>
    <div class="prod-grid">${favs.map((p) => prodCard(p)).join("")}</div>
  </div>`;
}

// ──────────────────────────────────────────────────────────────
// PAGE: NEWS
// ──────────────────────────────────────────────────────────────
function renderNews() {
  if (currentNews) {
    const n = currentNews;
    return `<div class="news-detail-wrap">
      <button class="btn btn-outline btn-sm" style="margin-bottom:24px" onclick="currentNews=null;nav('news')">← Quay lại danh sách</button>
      <span class="tag tag-green" style="margin-bottom:14px;display:inline-flex">${n.tag}</span>
      <h1 class="news-detail-title">${n.title}</h1>
      <div class="news-detail-meta">
        <span>📅 ${n.date}</span>
        <span>👁️ ${n.views?.toLocaleString()} lượt xem</span>
        <span>⏱️ ${n.readTime} phút đọc</span>
      </div>
      <div class="news-detail-img">
          ${
                n.img
                    ? `<img src="${n.img}" style="width:100%;height:320px;object-fit:cover;border-radius:12px;">`
                    : ph("100%", 320, "Ảnh bài viết — 840×340px")
          }
      </div>
      <div class="news-detail-body">
        <p>${n.desc}</p>
        <p>Trong những năm gần đây, xu hướng sử dụng các sản phẩm từ dừa trong nông nghiệp ngày càng được quan tâm rộng rãi. Xơ dừa, gáo dừa và các phế phẩm dừa đang dần thay thế các loại hóa chất truyền thống, mang lại lợi ích thiết thực cho người nông dân lẫn môi trường xung quanh.</p>
        <h3>Ưu điểm nổi bật của sản phẩm dừa</h3>
        <p>So với đất trồng hóa học, giá thể từ xơ dừa có khả năng giữ ẩm gấp 8–10 lần, giảm đáng kể chi phí tưới tiêu trong mùa khô hạn. Ngoài ra, cấu trúc xốp tự nhiên giúp bộ rễ cây phát triển tốt hơn, đặc biệt phù hợp với hệ thống thủy canh.</p>
      </div>
    </div>`;
  }

  return `<div class="page">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:20px;margin-bottom:28px">
      <div>
        <span class="section-label">✦ Kiến thức & Xu hướng ✦</span>
        <h1 class="section-title" style="margin:0">Tin tức & Kiến thức</h1>
        <p style="color:var(--text-muted);font-size:14px;margin-top:6px">Cập nhật kiến thức nông nghiệp và xu hướng xanh</p>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${["Tất cả", "So sánh", "Môi trường", "Hướng dẫn", "Xu hướng"]
          .map(
            (t, i) =>
              `<button class="cat-tab${i === 0 ? " active" : ""}" onclick="this.closest('div').querySelectorAll('.cat-tab').forEach(b=>b.classList.remove('active'));this.classList.add('active')">${t}</button>`,
          )
          .join("")}
      </div>
    </div>
    <!-- Featured article -->
    <div style="display:grid;grid-template-columns:1fr 1fr;background:var(--white);border-radius:var(--radius-lg);overflow:hidden;box-shadow:var(--shadow-lg);margin-bottom:44px;cursor:pointer;min-height:340px" onclick="viewNews(${NEWS[0].id})">
      <div style="overflow:hidden">
        ${
            NEWS[0].img
                ? `<img src="${NEWS[0].img}" 
                style="width:100%;height:420px;object-fit:cover;">`
                : ph("100%", 420, "Ảnh nổi bật — 700×420px")
        }
      </div>
      <div style="padding:40px;display:flex;flex-direction:column;justify-content:center">
        <span class="tag tag-green" style="margin-bottom:14px;display:inline-flex">⭐ Nổi bật · ${NEWS[0].tag}</span>
        <h2 style="font-size:clamp(17px,2.2vw,24px);color:var(--green-deep);margin-bottom:12px;line-height:1.4">${NEWS[0].title}</h2>
        <p style="font-size:14px;color:var(--text-muted);line-height:1.7;margin-bottom:12px">${NEWS[0].desc}</p>
        <div style="display:flex;gap:16px;font-size:12px;color:var(--text-muted)">
          <span>📅 ${NEWS[0].date}</span><span>👁️ ${NEWS[0].views?.toLocaleString()}</span><span>⏱️ ${NEWS[0].readTime} phút</span>
        </div>
        <button class="btn btn-primary btn-sm" style="margin-top:20px;align-self:flex-start">Đọc bài viết →</button>
      </div>
    </div>
    <h3 style="font-family:var(--font-body);font-size:17px;font-weight:700;color:var(--green-deep);margin-bottom:20px">Bài viết gần đây</h3>
    <div class="news-grid">${NEWS.slice(1).map(newsCard).join("")}</div>
  </div>`;
}

// ──────────────────────────────────────────────────────────────
// PAGE: CART
// ──────────────────────────────────────────────────────────────
function renderCart() {
  if (!cart.length)
    return `<div class="page">
    <div class="empty-state">
      <div class="empty-state-icon">🛒</div>
      <h2 class="empty-state-title">Giỏ hàng trống</h2>
      <p class="empty-state-desc">Hãy thêm sản phẩm vào giỏ để tiến hành đặt hàng.</p>
      <button class="btn btn-primary btn-md" onclick="nav('products')">Xem sản phẩm ngay →</button>
    </div>
  </div>`;

  return `<div class="page">
    <h1 class="section-title" style="margin-bottom:24px">Giỏ hàng (${cart.length} sản phẩm)</h1>
    <div class="cart-layout">
      <div class="cart-items">
        ${cart
          .map(
            (item) => `
          <div class="cart-item">
            ${ph(90, 90, "", "border-radius:8px;flex-shrink:0")}
            <div class="cart-item-info">
              <div class="cart-item-cat">${item.cat}</div>
              <div class="cart-item-name">${item.name}</div>
              <div style="font-size:12px;color:var(--text-muted)">${item.supplier}</div>
            </div>
            <div class="cart-item-qty">
              <button class="cart-qty-btn" onclick="updateCartQty(${item.id},${(item.qty || 1) - 1})">−</button>
              <span class="cart-qty-val">${item.qty || 1}</span>
              <button class="cart-qty-btn" onclick="updateCartQty(${item.id},${(item.qty || 1) + 1})">+</button>
            </div>
            <div class="cart-item-price">
              <strong>${fmt(item.price * (item.qty || 1))}</strong>
              <span>${fmt(item.price)} / sp</span>
            </div>
            <button class="cart-remove" onclick="removeFromCart(${item.id})">🗑</button>
          </div>`,
          )
          .join("")}
      </div>
      <div class="cart-summary">
        <div class="cart-summary-title">Tóm tắt đơn hàng</div>
        <div class="summary-row"><span>Tạm tính</span><span>${fmt(totalPrice())}</span></div>
        <div class="summary-row"><span>Phí vận chuyển</span><span style="color:var(--green-mid);font-weight:700">Miễn phí</span></div>
        <div class="summary-row"><span>Giảm giá</span><span style="color:#c62828">−0đ</span></div>
        <div class="summary-total"><span>Tổng cộng</span><span>${fmt(totalPrice())}</span></div>
        <div class="promo-row">
          <input class="form-control" placeholder="Nhập mã giảm giá..." style="font-size:13px">
          <button class="btn btn-outline btn-sm" style="flex-shrink:0">Áp dụng</button>
        </div>
        <button class="btn btn-primary btn-full btn-md">Tiến hành đặt hàng →</button>
        <button class="btn btn-ghost btn-full btn-sm" style="margin-top:8px;border-radius:var(--radius-full)" onclick="nav('products')">← Tiếp tục mua sắm</button>
      </div>
    </div>
  </div>`;
}

// ──────────────────────────────────────────────────────────────
// PAGE: DASHBOARD
// ──────────────────────────────────────────────────────────────
function renderDashboard() {
  const stats = [
    { icon: "📦", label: "Tổng đơn hàng", val: "1,247", chg: "+12%", up: true },
    {
      icon: "💰",
      label: "Tổng doanh thu",
      val: "48.3M đ",
      chg: "+8.4%",
      up: true,
    },
    { icon: "📋", label: "Sản phẩm đang bán", val: "32", chg: "+3", up: true },
    { icon: "⚠️", label: "Tồn kho thấp", val: "5", chg: "-2", up: false },
  ];
  const topProds = [
    { name: "Than gáo dừa 1kg", sold: 445, rev: 53400000, stock: 120 },
    { name: "Chậu xơ dừa 20cm", sold: 312, rev: 14040000, stock: 45 },
    { name: "Giỏ xơ dừa handmade", sold: 189, rev: 41580000, stock: 8 },
    { name: "Mụn dừa nén khối 5kg", sold: 134, rev: 11390000, stock: 200 },
  ];
  const activity = [
    {
      dot: "🟢",
      text: "Đơn hàng #DH2025006 đã xác nhận",
      time: "5 phút trước",
    },
    {
      dot: "🟡",
      text: "Sản phẩm 'Mụn dừa 5kg' chờ duyệt",
      time: "1 giờ trước",
    },
    { dot: "🔵", text: "Đơn hàng #DH2025005 đang giao", time: "2 giờ trước" },
    {
      dot: "⭐",
      text: "Nhận đánh giá 5 sao từ khách hàng",
      time: "3 giờ trước",
    },
    {
      dot: "🟠",
      text: "Tồn kho 'Giỏ handmade' còn 8 sản phẩm",
      time: "5 giờ trước",
    },
  ];

  return `<div class="page">
    <div class="dash-header">
      <div>
        <h1 class="section-title" style="margin-bottom:4px">Dashboard Doanh nghiệp</h1>
        <p style="color:var(--text-muted);font-size:14px">HTX Dừa Xanh Trà Vinh · Cập nhật 14:32 – 24/02/2026</p>
      </div>
      <button class="btn btn-primary btn-md">+ Thêm sản phẩm</button>
    </div>
    <div class="kpi-grid">
      ${stats
        .map(
          (s, i) => `
        <div class="stat-card" style="animation:fadeInUp .5s ease ${i * 0.1}s both">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
            <span style="font-size:26px">${s.icon}</span>
            <span style="font-size:12px;font-weight:700;padding:3px 8px;border-radius:4px;background:${s.up ? "#e8f5e9" : "#fce4ec"};color:${s.up ? "var(--green-mid)" : "#c62828"}">${s.chg}</span>
          </div>
          <div class="stat-value">${s.val}</div>
          <div class="stat-label">${s.label}</div>
        </div>`,
        )
        .join("")}
    </div>
    <div class="mid-grid">
      <div class="card" style="padding:24px">
        <div class="card-title">📊 Sản phẩm bán chạy</div>
        <table class="table">
          <thead><tr><th>Sản phẩm</th><th>Đã bán</th><th>Doanh thu</th><th>Tồn kho</th></tr></thead>
          <tbody>
            ${topProds
              .map(
                (p) => `<tr>
              <td style="font-weight:500;font-size:13px">${p.name}</td>
              <td style="font-size:13px">${p.sold}</td>
              <td style="font-size:13px;color:var(--green-mid);font-weight:600">${fmt(p.rev)}</td>
              <td><span class="${p.stock < 10 ? "tag tag-red" : "tag tag-green"}" style="font-size:12px">${p.stock < 10 ? "⚠️ " : ""} ${p.stock}</span></td>
            </tr>`,
              )
              .join("")}
          </tbody>
        </table>
      </div>
      <div class="card" style="padding:24px">
        <div class="card-title">🔔 Hoạt động gần đây</div>
        ${activity
          .map(
            (a, i) => `
          <div class="activity-item${i < activity.length - 1 ? " activity-border" : ""}">
            <span style="font-size:14px;flex-shrink:0;margin-top:2px">${a.dot}</span>
            <div>
              <div style="font-size:13px;line-height:1.4">${a.text}</div>
              <div style="font-size:11px;color:var(--text-muted);margin-top:2px">${a.time}</div>
            </div>
          </div>`,
          )
          .join("")}
      </div>
    </div>
    <div class="card" style="padding:24px">
      <div class="table-header">
        <div class="card-title">📦 Quản lý sản phẩm</div>
        <div style="display:flex;gap:10px">
          <input class="form-control" style="width:200px;font-size:13px" placeholder="🔍 Tìm sản phẩm...">
          <select class="form-control" style="width:160px;font-size:13px"><option>Tất cả trạng thái</option><option>Đã duyệt</option><option>Chờ duyệt</option></select>
        </div>
      </div>
      <table class="table">
        <thead><tr><th>Sản phẩm</th><th>Danh mục</th><th>Giá</th><th>Tồn kho</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
        <tbody>
          ${PRODUCTS.map(
            (p) => `<tr>
            <td><div style="display:flex;align-items:center;gap:10px">${ph(36, 36, "", "border-radius:6px;flex-shrink:0")}<span style="font-size:13px;font-weight:500">${p.name}</span></div></td>
            <td style="font-size:13px">${p.cat}</td>
            <td style="font-size:13px;font-weight:600;color:var(--green-mid)">${fmt(p.price)}</td>
            <td><span class="${p.stock < 10 ? "tag tag-red" : "tag tag-green"}" style="font-size:12px">${p.stock < 10 ? "⚠️ " : ""} ${p.stock}</span></td>
            <td><span class="${p.id === 3 ? "tag tag-gold" : "tag tag-green"}" style="font-size:12px">${p.id === 3 ? "PENDING" : "APPROVED"}</span></td>
            <td><div style="display:flex;gap:6px">
              <button class="btn btn-ghost btn-sm" style="border-radius:6px;font-size:12px">Sửa</button>
              <button class="btn btn-sm" style="background:#fce4ec;border:none;font-size:12px;color:#c62828;border-radius:6px">Ẩn</button>
            </div></td>
          </tr>`,
          ).join("")}
        </tbody>
      </table>
    </div>
  </div>`;
}

// ──────────────────────────────────────────────────────────────
// PAGE: ORDERS
// ──────────────────────────────────────────────────────────────
function renderOrders() {
  const filtered =
    orderFilter === "ALL"
      ? ORDERS
      : ORDERS.filter((o) => o.status === orderFilter);
  const countOf = (s) => ORDERS.filter((o) => o.status === s).length;

  return `<div class="page">
    <h1 class="section-title" style="margin-bottom:6px">Trung tâm đơn hàng</h1>
    <p style="color:var(--text-muted);margin-bottom:26px;font-size:14px">Theo dõi và xử lý đơn hàng của doanh nghiệp</p>
    <div class="order-tabs">
      ${["ALL", "PENDING", "CONFIRMED", "SHIPPING", "COMPLETED"]
        .map(
          (s) => `
        <button class="order-tab${orderFilter === s ? " active" : ""}" onclick="orderFilter='${s}';render()">
          ${s === "ALL" ? "Tất cả" : ORDER_STATUS[s].label}
          <span class="order-tab-count">${s === "ALL" ? ORDERS.length : countOf(s)}</span>
        </button>`,
        )
        .join("")}
    </div>
    <div class="table-wrap">
      <table class="table">
        <thead><tr><th>Mã đơn</th><th>Khách hàng</th><th>Sản phẩm</th><th>SL</th><th>Tổng tiền</th><th>Ngày</th><th>Trạng thái</th><th>Hành động</th></tr></thead>
        <tbody>
          ${filtered
            .map((o) => {
              const st = ORDER_STATUS[o.status];
              const nx = ORDER_NEXT[o.status];
              const nxInfo = nx ? ORDER_STATUS[nx] : null;
              return `<tr>
              <td style="font-weight:700;color:var(--green-mid);font-size:13px">${o.id}</td>
              <td style="font-size:13px">${o.customer}</td>
              <td style="font-size:13px;max-width:170px">${o.product}</td>
              <td style="font-size:13px">${o.qty}</td>
              <td style="font-size:13px;font-weight:700">${fmt(o.total)}</td>
              <td style="font-size:13px;color:var(--text-muted)">${o.date}</td>
              <td><span style="background:${st.bg};color:${st.color};padding:5px 12px;border-radius:20px;font-size:12px;font-weight:700;font-family:var(--font-body);white-space:nowrap">${st.label}</span></td>
              <td><div style="display:flex;gap:6px">
                ${nxInfo ? `<button class="advance-btn" onclick="advanceOrder('${o.id}')">→ ${nxInfo.label}</button>` : ""}
                <button class="detail-btn2">Chi tiết</button>
              </div></td>
            </tr>`;
            })
            .join("")}
        </tbody>
      </table>
    </div>
    <div class="rule-notice">⚠️ <strong>Quy tắc:</strong> Không thể hủy đơn đã COMPLETED · SHIPPING không thể quay về · 24h chưa xác nhận sẽ nhận nhắc nhở tự động.</div>
  </div>`;
}

// ── INIT ──────────────────────────────────────────────────────
render();
