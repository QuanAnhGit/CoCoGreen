// ============================================================
// COCOGREEN – Footer Component
// ============================================================

import { ImgPlaceholder } from '../common/ImgPlaceholder';
import styles from './Footer.module.css';

const FOOTER_LINKS = [
  {
    title: 'Sản phẩm',
    links: ['Chậu xơ dừa', 'Than gáo dừa', 'Mụn dừa', 'Handmade'],
  },
  {
    title: 'Hỗ trợ',
    links: ['Chính sách đổi trả', 'Hướng dẫn mua', 'Thanh toán', 'Vận chuyển'],
  },
  {
    title: 'Liên hệ',
    links: ['📍 Mekong Delta, VN', '📞 0909 123 456', '✉️ hello@cocogreen.vn', '⏰ 8h–17h, T2–T7'],
  },
];

export function Footer({ onNavigate }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Brand column */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <ImgPlaceholder width={140} height={50} label="Logo trắng" />
          </div>
          <p className={styles.tagline}>
            Kết nối trực tiếp doanh nghiệp địa phương miền Tây. Sản phẩm xanh
            từ dừa — Bền vững cho nông nghiệp Việt.
          </p>
          <div className={styles.social}>
            {['📘', '📸', '▶️'].map((ic, i) => (
              <button key={i} className={styles.socialBtn}>{ic}</button>
            ))}
          </div>
        </div>

        {/* Links columns */}
        {FOOTER_LINKS.map((col) => (
          <div key={col.title}>
            <h4 className={styles.colTitle}>{col.title}</h4>
            <ul className={styles.linkList}>
              {col.links.map((link) => (
                <li key={link} className={styles.linkItem}>{link}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <span>© 2026 CoCoGreen. Bảo lưu mọi quyền.</span>
        <span>Thiết kế với 🌿 cho nông nghiệp xanh Việt Nam</span>
      </div>
    </footer>
  );
}
