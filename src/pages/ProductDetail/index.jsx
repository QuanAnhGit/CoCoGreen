// ============================================================
// COCOGREEN – Page 3: Chi tiết sản phẩm
// ============================================================

import { useState } from 'react';
import { ImgPlaceholder } from '../../components/common/ImgPlaceholder';
import { Breadcrumb } from '../../components/common/Breadcrumb';
import { PRODUCTS } from '../../data/mockData';
import { formatCurrency } from '../../utils/format';
import styles from './ProductDetail.module.css';

const TABS = [
  { key: 'desc', label: 'Mô tả' },
  { key: 'tech', label: 'Thông số kỹ thuật' },
  { key: 'eco', label: 'Lợi ích môi trường' },
  { key: 'reviews', label: 'Đánh giá (212)' },
];

const TECH_SPECS = [
  ['Chất liệu', 'Than gáo dừa tự nhiên'],
  ['Trọng lượng', '1 kg / túi'],
  ['Độ ẩm', '≤ 10%'],
  ['Hàm lượng Carbon', '≥ 80%'],
  ['Kích cỡ hạt', '2–5 mm'],
  ['Ứng dụng', 'Trồng trọt, lọc nước, khử mùi'],
  ['Hướng dẫn', 'Trộn 5–10% vào đất giá thể'],
];

const REVIEWS = [
  { user: 'Nguyễn Minh T.', stars: 5, text: 'Sản phẩm chất lượng tốt, đóng gói cẩn thận. Dùng trồng rau tại nhà thấy cải thiện rõ rệt.', date: '20/02/2026' },
  { user: 'Trần Thị L.', stars: 4, text: 'Giao hàng nhanh, than sạch không có tạp chất. Sẽ mua lại lần sau.', date: '18/02/2026' },
  { user: 'Lê Văn H.', stars: 5, text: 'Mùi khói nhẹ ban đầu nhưng sau khi phơi nắng thì hết. Cây phát triển rất tốt.', date: '15/02/2026' },
];

export function ProductDetail({ onNavigate, onAddToCart }) {
  // Demo dùng product đầu tiên, sau này nhận id qua props/params
  const product = PRODUCTS[1];

  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('desc');
  const [activeImg, setActiveImg] = useState(0);
  const [tabDirection, setTabDirection] = useState('forward');

  const tabOrder = TABS.map((tab) => tab.key);
  const handleTabChange = (key) => {
    if (key === activeTab) return;
    const nextIndex = tabOrder.indexOf(key);
    const currentIndex = tabOrder.indexOf(activeTab);
    setTabDirection(nextIndex > currentIndex ? 'forward' : 'back');
    setActiveTab(key);
  };

  return (
    <div className="page-wrapper">
      <Breadcrumb
        items={[
          { label: 'Trang chủ', onClick: () => onNavigate('home') },
          { label: 'Sản phẩm', onClick: () => onNavigate('products') },
          { label: product.name },
        ]}
      />

      {/* ── Main Section ── */}
      <div className={styles.mainGrid}>
        {/* Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImg}>
            <ImgPlaceholder height={420} label="Ảnh chính — 600×600px" />
          </div>
          <div className={styles.thumbRow}>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`${styles.thumb} ${activeImg === i ? styles.thumbActive : ''}`}
                onClick={() => setActiveImg(i)}
              >
                <ImgPlaceholder height={80} label={String(i + 1)} />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className={styles.info}>
          <span className="tag tag-gold" style={{ marginBottom: 12, display: 'inline-flex' }}>
            🏅 {product.category}
          </span>
          <h1 className={styles.productTitle}>{product.name}</h1>

          {/* Rating row */}
          <div className={styles.ratingRow}>
            <span className="stars" style={{ fontSize: 18 }}>
              {'★'.repeat(Math.floor(product.rating))}
            </span>
            <strong>{product.rating}/5</strong>
            <span style={{ color: 'var(--text-muted)', fontSize: 13 }}>
              ({product.reviews} đánh giá)
            </span>
            <span className={styles.stockBadge}>✓ Còn hàng</span>
          </div>

          {/* Price */}
          <div className={styles.priceRow}>
            <span className={styles.price}>{formatCurrency(product.price)}</span>
            {product.oldPrice > 0 && (
              <span className={styles.oldPrice}>{formatCurrency(product.oldPrice)}</span>
            )}
          </div>

          {/* Supplier */}
          <div className={styles.supplierBox}>
            <p className={styles.supplierLabel}>📍 Doanh nghiệp cung cấp</p>
            <div className={styles.supplierRow}>
              <ImgPlaceholder width={40} height={40} label="" />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{product.supplier}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {product.region} · ⭐ 4.8 · 2,400 đánh giá
                </div>
              </div>
            </div>
          </div>

          {/* Qty + Buttons */}
          <div className={styles.qtyRow}>
            <div className={styles.qtyControl}>
              <button className={styles.qtyBtn} onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span className={styles.qtyVal}>{qty}</span>
              <button className={styles.qtyBtn} onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Còn {product.stock} sản phẩm</span>
          </div>
          <div className={styles.actionRow}>
            <button
              className={styles.addToCartBtn}
              style={{ flex: 1, justifyContent: 'center', fontSize: 15 }}
              onClick={() => onAddToCart(product, qty)}
            >
              Thêm vào giỏ hàng
            </button>
            <button className={styles.buyNowBtn} style={{ flex: 1, justifyContent: 'center', fontSize: 15 }}>
              Mua ngay
            </button>
            <button className={styles.favBtn}>♡</button>
          </div>

          {/* Eco tags */}
          <div className={styles.ecoTags}>
            {['Tái chế', 'Hữu cơ', 'Thân thiện môi trường', 'Sản xuất Việt'].map((t) => (
              <span key={t} className="tag tag-green" style={{ fontSize: 12 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className={styles.tabBar}>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`${styles.tabBtn} ${activeTab === tab.key ? styles.tabActive : ''}`}
            onClick={() => handleTabChange(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab Content ── */}
      <div className={styles.tabContent}>
        <div className={`${styles.tabPane} ${tabDirection === 'forward' ? styles.slideForward : styles.slideBack}`} key={activeTab}>
          {activeTab === 'desc' && (
            <div className={styles.contentBox}>
              <h3 className={styles.boxTitle}>Mô tả sản phẩm</h3>
              <p className={styles.descText}>
                Than gáo dừa hoạt tính 1kg được sản xuất từ vỏ gáo dừa tươi qua quy trình than hóa và hoạt hóa nhiệt độ cao. Sản phẩm có khả năng hấp thụ mùi, lọc không khí và cải thiện chất lượng đất vượt trội.
              </p>
              <div className={styles.descFeatures}>
                {['Tăng độ xốp của đất', 'Cải thiện thoát nước', 'Giữ dinh dưỡng lâu hơn', 'Không độc hại, an toàn'].map((item) => (
                  <div key={item} className={styles.descFeatureItem}>{item}</div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tech' && (
            <div className={styles.contentBox}>
              <h3 className={styles.boxTitle}>Thông số kỹ thuật</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                {TECH_SPECS.map(([k, v]) => (
                  <tr key={k} style={{ borderBottom: '1px solid var(--cream-dark)' }}>
                    <td style={{ padding: '10px 0', fontWeight: 600, color: 'var(--green-deep)', width: '40%', fontSize: 14 }}>{k}</td>
                    <td style={{ padding: '10px 0', fontSize: 14 }}>{v}</td>
                  </tr>
                ))}
              </table>
            </div>
          )}

          {activeTab === 'eco' && (
            <div className={styles.contentBox}>
              <h3 className={styles.boxTitle}>Lợi ích môi trường</h3>
              {[
                { icon: '🌍', title: 'Giảm CO₂', desc: 'Quy trình sản xuất từ phế phẩm dừa giúp giảm 70% lượng CO₂ so với than khoáng.' },
                { icon: '💧', title: 'Tiết kiệm nước', desc: 'Cấu trúc xốp giữ ẩm lâu, giảm 40% lượng nước tưới tiêu mỗi ngày.' },
                { icon: '🌿', title: 'Hỗ trợ vi sinh', desc: 'Tạo môi trường sống lý tưởng cho vi sinh vật có lợi trong đất.' },
              ].map((b) => (
                <div key={b.icon} className={styles.ecoItem}>
                  <span style={{ fontSize: 32, flexShrink: 0 }}>{b.icon}</span>
                  <div>
                    <h4 style={{ color: 'var(--green-deep)', marginBottom: 6 }}>{b.title}</h4>
                    <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6 }}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className={styles.reviewsGrid}>
              {/* Summary */}
              <div className={styles.reviewSummary}>
                <div className={styles.reviewScore}>4.5</div>
                <div className="stars" style={{ fontSize: 22 }}>★★★★½</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>{product.reviews} đánh giá</div>
                <div style={{ marginTop: 16 }}>
                  {[[5, 60], [4, 25], [3, 10], [2, 3], [1, 2]].map(([s, pct]) => (
                    <div key={s} className={styles.ratingBar}>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)', width: 12 }}>{s}</span>
                      <span style={{ color: '#f4a81d', fontSize: 12 }}>★</span>
                      <div className={styles.barTrack}>
                        <div className={styles.barFill} style={{ width: `${pct}%` }} />
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)', width: 30 }}>{pct}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review list */}
              <div className={styles.reviewList}>
                {REVIEWS.map((r, i) => (
                  <div key={i} className={styles.reviewCard}>
                    <div className={styles.reviewHeader}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <ImgPlaceholder width={38} height={38} label="" />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14 }}>{r.user}</div>
                          <div className="stars" style={{ fontSize: 13 }}>{'★'.repeat(r.stars)}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{r.date}</span>
                    </div>
                    <p style={{ fontSize: 14, lineHeight: 1.6 }}>{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
