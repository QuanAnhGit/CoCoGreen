// ============================================================
// COCOGREEN – Cart Page
// ============================================================

import { ImgPlaceholder } from '../../components/common/ImgPlaceholder';
import { formatCurrency } from '../../utils/format';
import styles from './Cart.module.css';

export function Cart({ cartItems, onRemove, onUpdateQty, totalPrice, onNavigate }) {
  if (!cartItems.length) {
    return (
      <div className="page-wrapper">
        <div className="empty-state">
          <div className="empty-state-icon">🛒</div>
          <h2 className="empty-state-title">Giỏ hàng trống</h2>
          <p className="empty-state-desc">Hãy thêm sản phẩm vào giỏ để tiến hành đặt hàng.</p>
          <button className="btn btn-primary" onClick={() => onNavigate('products')}>
            Xem sản phẩm ngay →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <h1 className="section-title" style={{ marginBottom: 8 }}>
        Giỏ hàng ({cartItems.length} sản phẩm)
      </h1>

      <div className={styles.layout}>
        {/* ── Item list ── */}
        <div className={styles.items}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.itemImg}>
                <ImgPlaceholder width={90} height={90} label="" />
              </div>
              <div className={styles.itemInfo}>
                <p className={styles.itemCategory}>{item.category}</p>
                <h4 className={styles.itemName}>{item.name}</h4>
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{item.supplier}</p>
              </div>
              <div className={styles.itemQty}>
                <button className={styles.qtyBtn} onClick={() => onUpdateQty(item.id, item.qty - 1)}>−</button>
                <span className={styles.qtyVal}>{item.qty}</span>
                <button className={styles.qtyBtn} onClick={() => onUpdateQty(item.id, item.qty + 1)}>+</button>
              </div>
              <div className={styles.itemPrice}>
                <strong>{formatCurrency(item.price * item.qty)}</strong>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {formatCurrency(item.price)} / sp
                </span>
              </div>
              <button className={styles.removeBtn} onClick={() => onRemove(item.id)}>🗑</button>
            </div>
          ))}
        </div>

        {/* ── Order summary ── */}
        <div className={styles.summary}>
          <h3 className={styles.summaryTitle}>Tóm tắt đơn hàng</h3>
          <div className={styles.summaryRow}>
            <span>Tạm tính</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Phí vận chuyển</span>
            <span style={{ color: 'var(--green-mid)', fontWeight: 700 }}>Miễn phí</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Giảm giá</span>
            <span style={{ color: '#c62828' }}>−0đ</span>
          </div>
          <div className={styles.summaryTotal}>
            <span>Tổng cộng</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>

          {/* Promo code */}
          <div className={styles.promoRow}>
            <input className="form-control" placeholder="Nhập mã giảm giá..." style={{ fontSize: 13 }} />
            <button className="btn btn-outline btn-sm" style={{ flexShrink: 0 }}>Áp dụng</button>
          </div>

          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 15, marginTop: 4 }}>
            Tiến hành đặt hàng →
          </button>
          <button
            className="btn btn-sm"
            style={{ width: '100%', justifyContent: 'center', background: 'none', border: 'none', color: 'var(--text-muted)', marginTop: 8 }}
            onClick={() => onNavigate('products')}
          >
            ← Tiếp tục mua sắm
          </button>
        </div>
      </div>
    </div>
  );
}
