// ============================================================
// COCOGREEN – Header Component
// ============================================================

import { useState, useEffect } from 'react';
import { ImgPlaceholder } from '../common/ImgPlaceholder';
import logo from '../../data/logo.jpg';
import chatIcon from '../../data/chat.png';
import styles from './Header.module.css';

const NAV_LINKS = [
  { label: 'Trang chủ', page: 'home' },
  { label: 'Sản phẩm', page: 'products' },
  { label: 'Tin tức', page: 'news' },
  { label: 'Yêu thích', page: 'favorites' },
  // { label: 'DN Dashboard', page: 'dashboard' },
  // { label: 'Đơn hàng', page: 'orders' },
];

export function Header({ currentPage, onNavigate, cartCount = 0, onChatToggle, chatOpen }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
  }, []);

  return (
    <header className={styles.header}>
      {/* Top announcement bar */}
      <div className={styles.topBar}>
        🌴 Sản phẩm xanh từ miền Tây — Minh bạch · Thân thiện môi trường · Dễ đặt hàng
      </div>

      <div className={styles.inner}>
        {/* Logo */}
        <div className={styles.logo} style={{ backgroundImage: `url(${logo})` }} onClick={() => onNavigate('home')}>
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

      {/* Floating Chat Button */}
      <button className={styles.chatBtn} onClick={() => onChatToggle(true)} style={{ backgroundImage: `url(${chatIcon})` }}>
      </button>
    </header>
  );
}
