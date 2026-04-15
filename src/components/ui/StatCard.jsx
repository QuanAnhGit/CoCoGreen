// ============================================================
// COCOGREEN – StatCard Component (dùng trong Dashboard)
// ============================================================

import styles from './StatCard.module.css';

export function StatCard({ icon, label, value, change, up }) {
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <span className={styles.icon}>{icon}</span>
        {change && (
          <span className={`${styles.change} ${up ? styles.up : styles.down}`}>
            {change}
          </span>
        )}
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
