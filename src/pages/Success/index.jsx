// ============================================================
// COCOGREEN – Order Success Page
// ============================================================

import styles from './Success.module.css';

export function Success({ onNavigate }) {
  return (
    <div className="page-wrapper">
      <div className={styles.container}>
        <div className={styles.icon}>✓</div>
        <h1 className={styles.title}>Đặt hàng thành công!</h1>
        <p className={styles.message}>
          Cảm ơn bạn đã chọn CoCoGreen. Đơn hàng của bạn đã được tiếp nhận và sẽ sớm được xử lý.
        </p>
        <p className={styles.details}>
          Chúng tôi sẽ liên hệ với bạn trong 24 giờ để xác nhận chi tiết đơn hàng.
        </p>
        <button className={styles.homeBtn} onClick={() => onNavigate('home')}>
          ← Về trang chủ
        </button>
      </div>
    </div>
  );
}
