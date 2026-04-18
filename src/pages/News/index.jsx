// ============================================================
// COCOGREEN – Page 8: Tin tức & Kiến thức
// ============================================================

import { useState }    from 'react';
import { ImgPlaceholder } from '../../components/common/ImgPlaceholder';
import { NewsCard }    from '../../components/ui/NewsCard';
import { NEWS }        from '../../data/mockData';
import styles from './News.module.css';

export function News() {
  const [selected, setSelected] = useState(null);

  // ── Article detail view ──
  if (selected) {
    return (
      <div className={styles.detailWrapper}>
        <button className={styles.backBtn} style={{ marginBottom: 24 }} onClick={() => setSelected(null)}>
          ← Quay lại danh sách
        </button>
        <span className="tag tag-green" style={{ margin: '0 0 14px 10px', display: 'inline-flex' }}>
          {selected.tag}
        </span>
        <h1 className={styles.detailTitle}>{selected.title}</h1>
        <div className={styles.detailMeta}>
          <span>📅 {selected.date}</span>
          <span>👁️ {selected.views?.toLocaleString()} lượt xem</span>
          <span>⏱️ {selected.readTime} phút đọc</span>
        </div>
        <div className={styles.detailImg}>
          <ImgPlaceholder height={340} label="Ảnh bài viết — 840×340px" />
        </div>
        <div className={styles.detailBody}>
          <p>{selected.desc}</p>
          <p>
            Trong những năm gần đây, xu hướng sử dụng các sản phẩm từ dừa trong nông nghiệp ngày càng được
            quan tâm. Xơ dừa, gáo dừa và các phế phẩm dừa đang dần thay thế các loại hóa chất truyền thống,
            mang lại lợi ích thiết thực cho người nông dân lẫn môi trường.
          </p>
          <h3 className={styles.detailSubtitle}>Ưu điểm nổi bật của sản phẩm dừa</h3>
          <p>
            So với đất trồng hóa học, giá thể từ xơ dừa có khả năng giữ ẩm gấp 8–10 lần, giảm đáng kể chi
            phí tưới tiêu trong mùa khô. Ngoài ra, cấu trúc xốp tự nhiên giúp bộ rễ cây phát triển tốt hơn,
            đặc biệt phù hợp cho cây trồng trong chậu và hệ thống thủy canh.
          </p>
        </div>
      </div>
    );
  }

  // ── Article list view ──
  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <span className="section-label">✦ Kiến thức & Xu hướng ✦</span>
          <h1 className="section-title">Tin tức & Kiến thức</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
            Cập nhật kiến thức nông nghiệp, so sánh sản phẩm và xu hướng xanh
          </p>
        </div>
        {/* Tag filter */}
        <div className={styles.tagFilter}>
          {['Tất cả', 'So sánh', 'Môi trường', 'Hướng dẫn', 'Xu hướng'].map((t) => (
            <button key={t} className={`${styles.tagBtn} ${t === 'Tất cả' ? styles.tagActive : ''}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Featured article */}
      <div className={styles.featured} onClick={() => setSelected(NEWS[0])}>
        <div className={styles.featuredImg}>
          <ImgPlaceholder height="100%" label="Ảnh nổi bật — 700×420px" />
        </div>
        <div className={styles.featuredBody}>
          <span className="tag tag-green" style={{ marginBottom: 14, display: 'inline-flex' }}>
            ⭐ Nổi bật · {NEWS[0].tag}
          </span>
          <h2 className={styles.featuredTitle}>{NEWS[0].title}</h2>
          <p className={styles.featuredDesc}>{NEWS[0].desc}</p>
          <div className={styles.featuredMeta}>
            <span>📅 {NEWS[0].date}</span>
            <span>👁️ {NEWS[0].views?.toLocaleString()}</span>
            <span>⏱️ {NEWS[0].readTime} phút</span>
          </div>
          <button className={styles.readArticleBtn} style={{ marginTop: 20 }}>
            Đọc bài viết →
          </button>
        </div>
      </div>

      {/* Article grid */}
      <h3 className={styles.gridTitle}>Bài viết gần đây</h3>
      <div className={styles.newsGrid}>
        {NEWS.slice(1).map((n) => (
          <NewsCard key={n.id} article={n} onClick={() => setSelected(n)} />
        ))}
      </div>
    </div>
  );
}
