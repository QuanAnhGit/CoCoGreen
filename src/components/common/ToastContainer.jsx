// ============================================================
// COCOGREEN – ToastContainer Component
// ============================================================

import styles from './ToastContainer.module.css';

export function ToastContainer({ toasts }) {
  return (
    <div className={styles.toastContainer}>
      {toasts.map((t) => (
        <div key={t.id} className="toast">{t.message}</div>
      ))}
    </div>
  );
}