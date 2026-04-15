// ============================================================
// COCOGREEN – ProductCard Component
// ============================================================

import { ImgPlaceholder } from '../common/ImgPlaceholder';
import { formatCurrency }  from '../../utils/format';
import styles from './ProductCard.module.css';

/**
 * @param {Object}   product
 * @param {Function} onView       – click vào card
 * @param {Function} onAddToCart
 * @param {Function} onFavorite
 */
export function ProductCard({ product, onView, onAddToCart, onFavorite }) {
  const { name, category, price, oldPrice, rating, reviews, badge, region } = product;

  return (
    <article className={styles.card} onClick={onView}>
      {/* Image */}
      <div className={styles.imgWrap}>
        <ImgPlaceholder height={200} label="400×400px" />
        {badge && <span className={styles.badge}>{badge}</span>}
        <button
          className={styles.favBtn}
          onClick={(e) => { e.stopPropagation(); onFavorite?.(); }}
          aria-label="Yêu thích"
        >
          ♡
        </button>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <p className={styles.meta}>{category} · {region}</p>
        <h3 className={styles.title}>{name}</h3>

        <div className={styles.priceRow}>
          <span className={styles.price}>{formatCurrency(price)}</span>
          {oldPrice > 0 && (
            <span className={styles.oldPrice}>{formatCurrency(oldPrice)}</span>
          )}
        </div>

        <div className={styles.rating}>
          <span className="stars">{'★'.repeat(Math.floor(rating))}</span>
          <span> {rating} ({reviews})</span>
        </div>

        <button
          className={styles.cartBtn}
          onClick={(e) => { e.stopPropagation(); onAddToCart?.(); }}
        >
          🛒 Thêm vào giỏ
        </button>
      </div>
    </article>
  );
}
