// ============================================================
// COCOGREEN – Header Component
// ============================================================

import { useState, useEffect } from 'react';
import { ImgPlaceholder } from '../common/ImgPlaceholder';
import styles from './Header.module.css';

const NAV_LINKS = [
  { label: 'Trang chủ',    page: 'home' },
  { label: 'Sản phẩm',     page: 'products' },
  { label: 'Tin tức',      page: 'news' },
  { label: 'Yêu thích',    page: 'favorites' },
  { label: 'DN Dashboard', page: 'dashboard' },
  { label: 'Đơn hàng',     page: 'orders' },
];

export function Header({ currentPage, onNavigate, cartCount = 0 }) {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      {/* Top announcement bar */}
      <div className={styles.topBar}>
        🌴 Sản phẩm xanh từ miền Tây — Minh bạch · Thân thiện môi trường · Dễ đặt hàng
      </div>

      <div className={styles.inner}>
        {/* Logo */}
        <div className={styles.logo} onClick={() => onNavigate('home')}>
          <ImgPlaceholder width={130} height={46} label="Logo CoCoGreen" />
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          {NAV_LINKS.map((link) => (
            <button
              key={link.page}
              className={`${styles.navLink} ${currentPage === link.page ? styles.active : ''}`}
              onClick={() => onNavigate(link.page)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <button className={styles.loginBtn} onClick={() => onNavigate('login')}>
            Đăng nhập
          </button>
          <button className={styles.cartBtn} onClick={() => onNavigate('cart')}>
            🛒
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
