// ============================================================
// COCOGREEN – Favorites Page
// ============================================================

import { ProductCard } from '../../components/ui/ProductCard';
import { PRODUCTS }    from '../../data/mockData';
import styles from './Favorites.module.css';

export function Favorites({ onNavigate, onAddToCart }) {
  const favorites = PRODUCTS.slice(0, 4); // Demo – sẽ từ state/API sau

  if (!favorites.length) {
    return (
      <div className="page-wrapper">
        <div className="empty-state">
          <div className="empty-state-icon">♡</div>
          <h2 className="empty-state-title">Chưa có sản phẩm yêu thích</h2>
          <p className="empty-state-desc">Nhấn ♡ trên sản phẩm để lưu vào danh sách yêu thích của bạn.</p>
          <button className="btn btn-primary" onClick={() => onNavigate('products')}>
            Khám phá sản phẩm →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className={styles.header}>
        <div>
          <span className="section-label">✦ Danh sách của bạn ✦</span>
          <h1 className="section-title" style={{ margin: 0 }}>Sản phẩm yêu thích</h1>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
          {favorites.length} sản phẩm đã lưu
        </p>
      </div>

      <div className={styles.grid}>
        {favorites.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onView={() => onNavigate('product-detail')}
            onAddToCart={() => onAddToCart(p)}
          />
        ))}
      </div>
    </div>
  );
}
