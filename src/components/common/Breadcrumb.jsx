// ============================================================
// COCOGREEN – Breadcrumb Component
// ============================================================

import styles from './Breadcrumb.module.css';

/**
 * @param {Array<{label: string, onClick?: function}>} items
 */
export function Breadcrumb({ items = [] }) {
  return (
    <nav className={styles.breadcrumb} aria-label="breadcrumb">
      {items.map((item, index) => (
        <span key={index} className={styles.item}>
          {index > 0 && <span className={styles.sep}>/</span>}
          {item.onClick ? (
            <button className={styles.link} onClick={item.onClick}>
              {item.label}
            </button>
          ) : (
            <span className={styles.current}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
