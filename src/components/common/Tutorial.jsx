// ============================================================
// COCOGREEN – Tutorial Component
// ============================================================

import styles from './Tutorial.module.css';

export function Tutorial({ showTutorial, onClose, x = 15, y = 30, arrow_options = 'trv' }) {
  if (!showTutorial) return null;

  const getArrowClass = (option) => {
    return styles[`arrow-${option}`] || styles['arrow-trv'];
  };

  return (
    <div className={styles.tutorialOverlay} onClick={onClose}>
      <div
        className={styles.tutorialMessage}
        onClick={(e) => e.stopPropagation()}
        style={{ top: y, right: x }}
      >
        <p>
          Chào mừng bạn đến với CoCoGreen! Nhấp vào nút AI để trò chuyện với Sylvie - trợ lý ảo của chúng tôi.
        </p>
        <button className={styles.tutorialButton} onClick={onClose}>
          Đã hiểu
        </button>
        <div className={`${styles.tutorialArrow} ${getArrowClass(arrow_options)}`}></div>
      </div>
    </div>
  );
}