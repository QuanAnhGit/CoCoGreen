// ============================================================
// COCOGREEN – NewsCard Component
// ============================================================

import { ImgPlaceholder } from '../common/ImgPlaceholder';
import { truncate }        from '../../utils/format';
import styles from './NewsCard.module.css';

export function NewsCard({ article, onClick }) {
  return (
    <article className={styles.card} onClick={onClick}>
      <div className={styles.imgWrap}>
        <ImgPlaceholder height={200} label="600×300px" />
        <span className={`tag tag-green ${styles.tag}`}>{article.tag}</span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.desc}>{truncate(article.desc, 100)}</p>
        <div className={styles.footer}>
          <span>📅 {article.date}</span>
          <span className={styles.readMore}>Đọc thêm →</span>
        </div>
      </div>
    </article>
  );
}
