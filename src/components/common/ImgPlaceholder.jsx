// ============================================================
// COCOGREEN – ImgPlaceholder Component
// Giữ chỗ cho ảnh thực – người dùng tự thêm ảnh sau
// ============================================================

import styles from './ImgPlaceholder.module.css';

/**
 * @param {number|string} width   – px hoặc "100%"
 * @param {number}        height  – px
 * @param {string}        label   – chú thích kích thước
 */
export function ImgPlaceholder({ width = '100%', height = 200, label = 'Ảnh sản phẩm' }) {
  return (
    <div
      className={styles.placeholder}
      style={{ width, height }}
    >
      <span className={styles.icon}>🌿</span>
      <span className={styles.label}>{label}</span>
      {typeof height === 'number' && (
        <span className={styles.size}>
          {typeof width === 'number' ? `${width}×${height}px` : `h: ${height}px`}
        </span>
      )}
    </div>
  );
}
