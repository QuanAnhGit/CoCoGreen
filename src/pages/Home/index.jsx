// ============================================================
// COCOGREEN – Page 1: Trang chủ
// ============================================================

import landing from '../../data/landing.webp';
import { ImgPlaceholder } from '../../components/common/ImgPlaceholder';
import { ProductCard } from '../../components/ui/ProductCard';
import { NewsCard } from '../../components/ui/NewsCard';
import { PRODUCTS, NEWS, PARTNERS, KPI_STATS } from '../../data/mockData';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useAutoScroll } from '../../hooks/useAutoScroll';
import styles from './Home.module.css';

export function Home({ onNavigate, onAddToCart }) {
  const { ref: productsHeadRef, classNames: productsHeadClasses } = useScrollReveal('slideUp');
  const { ref: productsTabRef, classNames: productsTabClasses } = useScrollReveal('slideUp');
  const { ref: productsRef, classNames: productsClasses } = useScrollReveal('fade');
  const { ref: benefitsRef, classNames: benefitsClasses } = useScrollReveal('floatLeft');
  const { ref: partnersRef, classNames: partnersClasses } = useScrollReveal('floatRight');
  const { ref: newsRef, classNames: newsClasses } = useScrollReveal('slideUp');
  const { ref: ctaBannerRef, classNames: ctaBannerClasses } = useScrollReveal('fade');

  // Auto-scroll marquee
  const { containerRef: marqueeContainer, trackRef: marqueeTrack, handleMouseEnter, handleMouseLeave } = useAutoScroll({
    isVertical: false,
    pauseOnHover: true,
  });
  return (
    <div>
      {/* ── HERO BANNER ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} style={{ backgroundImage: `url(${landing})` }}>
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <span className="tag tag-green" style={{ marginBottom: 18, display: 'inline-flex' }}>
            🌴 Nền tảng xanh từ miền Tây
          </span>
          <h1 className={styles.heroTitle}>
            Sản phẩm xơ dừa miền Tây<br />Giải pháp xanh cho nông nghiệp
          </h1>
          <p className={styles.heroDesc}>
            Kết nối trực tiếp doanh nghiệp địa phương.<br />
            <strong>Minh bạch · Thân thiện môi trường · Dễ đặt hàng.</strong>
          </p>
          <div className={styles.heroCta}>
            <button className={styles.ctaLearnBtn} onClick={() => onNavigate('products')}>
              Xem sản phẩm
            </button>
            <button className={styles.ctaGhost}>
              Tìm hiểu lợi ích
            </button>
          </div>
        </div>
        {/* Floating badge */}
        <div className={styles.heroBadge}>
          <span style={{ fontSize: 28 }}>🌱</span>
          <div>
            <div style={{ fontWeight: 700, color: 'var(--green-deep)', fontSize: 14 }}>Eco Certified</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>100% tái chế từ dừa</div>
          </div>
        </div>
      </section>

      {/* ── KPI STRIP ── */}
      <section className={styles.kpiStrip}>
        {KPI_STATS.map((k, i) => (
          <div key={i} className={styles.kpiItem}>
            <span className={styles.kpiValue}>{k.value}</span>
            <span className={styles.kpiLabel}>{k.label}</span>
          </div>
        ))}
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className={styles.section}>
        <div className={`${styles.sectionHead} ${productsHeadClasses}`} ref={productsHeadRef}>
          <span className="section-label">✦ Nổi bật ✦</span>
          <h2 className="section-title">Sản phẩm tiêu biểu</h2>
          <p className="section-subtitle">Những sản phẩm xơ dừa chất lượng cao được người mua yêu thích nhất</p>
        </div>

        {/* Category filter tabs */}
        <div className={`${styles.tabs} ${productsTabClasses}`} ref={productsTabRef}>
          {['Tất cả', 'Chậu xơ dừa', 'Than gáo dừa', 'Mụn dừa', 'Handmade'].map((t) => (
            <button key={t} className={`${styles.tabBtn} ${t === 'Tất cả' ? styles.tabActive : ''}`}>{t}</button>
          ))}
        </div>

        <div className={`${styles.productGrid} ${productsClasses}`} ref={productsRef}>
          {PRODUCTS.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onView={() => onNavigate('product-detail')}
              onAddToCart={() => onAddToCart(p)}
            />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <button className="btn btn-outline" onClick={() => onNavigate('products')}>
            Xem tất cả sản phẩm →
          </button>
        </div>
      </section>

      {/* ── WHY US (Lợi ích môi trường) ── */}
      <section className={styles.benefits}>
        <div className={`${styles.benefitsInner} ${benefitsClasses}`} ref={benefitsRef}>
          <span className="section-label" style={{ color: 'var(--green-pale)' }}>✦ Vì sao chọn CoCoGreen ✦</span>
          <h2 className={styles.benefitsTitle}>Lợi ích cho môi trường & nông nghiệp</h2>
          <p style={{ color: 'rgba(255,255,255,.7)', marginBottom: 48, fontSize: 15 }}>Từ phế phẩm dừa đến giải pháp nông nghiệp bền vững</p>
          <div className={styles.benefitsGrid}>
            {[
              { title: '100% Tái chế', desc: 'Toàn bộ sản phẩm từ phế phẩm dừa, không phát sinh rác thải mới.' },
              { title: 'Tiết kiệm nước', desc: 'Xơ dừa giữ ẩm gấp 8–10 lần so với đất, giảm tưới tiêu đáng kể.' },
              { title: 'Cải tạo đất', desc: 'Bổ sung vi chất tự nhiên, cải thiện cấu trúc đất trồng lâu dài.' },
              { title: 'Hỗ trợ địa phương', desc: 'Mua hàng trực tiếp từ hợp tác xã và doanh nghiệp miền Tây.' },
            ].map((b) => (
              <div key={b.title} className={styles.benefitCard}>
                <h4 className={styles.benefitTitle}>{b.title}</h4>
                <p className={styles.benefitDesc}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNER MARQUEE ── */}
      <section className={styles.partnerSection}>
        <div className={partnersClasses} ref={partnersRef}>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <span className="section-label">✦ Doanh nghiệp liên kết ✦</span>
          </div>
          <div
            className={styles.marqueeWrap}
            ref={marqueeContainer}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.marqueeTrack} ref={marqueeTrack}>
              {[...PARTNERS, ...PARTNERS].map((name, i) => (
                <div key={i} className={styles.partnerChip}>
                  <ImgPlaceholder width={36} height={36} label="Logo" />
                  <span className={styles.partnerName}>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWS PREVIEW ── */}
      <section className={styles.section}>
        <div className={newsClasses} ref={newsRef}>
          <div className={styles.newsHeader}>
            <div>
              <span className="section-label">✦ Kiến thức & Tin tức ✦</span>
              <h2 className="section-title">Bài viết mới nhất</h2>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => onNavigate('news')}>Xem tất cả</button>
          </div>
          <div className={styles.newsGrid}>
            {NEWS.slice(0, 3).map((n) => (
              <NewsCard key={n.id} article={n} onClick={() => onNavigate('news')} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <div className={`${styles.ctaBanner} ${ctaBannerClasses}`} ref={ctaBannerRef}>
        <div className={styles.ctaBannerInner}>
          <div>
            <span className="tag" style={{ background: 'rgba(255,255,255,.15)', color: 'var(--green-pale)', marginBottom: 14, display: 'inline-flex' }}>
              🎁 Ưu đãi đặc biệt
            </span>
            <h2 className={styles.ctaBannerTitle}>Đặt hàng lần đầu — Giảm 10%</h2>
            <p className={styles.ctaBannerDesc}>
              Đăng ký tài khoản và nhận ngay mã giảm giá 10% cho đơn hàng đầu tiên. Áp dụng cho tất cả sản phẩm.
            </p>
          </div>
          <div className={styles.ctaBannerActions}>
            <button className={styles.ctaGhost}>Đăng ký ngay</button>
            <button className={styles.ctaLearnBtn}>Tìm hiểu thêm</button>
          </div>
        </div>
      </div>
    </div>
  );
}
