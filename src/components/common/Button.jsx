// ============================================================
// COCOGREEN – Button Component
// ============================================================

import styles from './Button.module.css';

/**
 * @param {'primary'|'outline'|'gold'|'ghost'|'danger'} variant
 * @param {'sm'|'md'|'lg'} size
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  style = {},
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[styles.btn, styles[variant], styles[size], fullWidth ? styles.full : '', className].join(' ')}
      style={style}
    >
      {children}
    </button>
  );
}
