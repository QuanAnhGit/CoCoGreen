// ============================================================
// COCOGREEN – useCart Hook
// Quản lý toàn bộ logic giỏ hàng
// ============================================================

import { useState } from 'react';

export function useCart() {
  const [cartItems, setCartItems] = useState([]);

  /** Thêm sản phẩm vào giỏ (nếu đã có thì tăng qty) */
  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  /** Xóa sản phẩm khỏi giỏ */
  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  /** Cập nhật số lượng */
  const updateQty = (productId, qty) => {
    if (qty < 1) return removeFromCart(productId);
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, qty } : item
      )
    );
  };

  /** Xóa toàn bộ giỏ */
  const clearCart = () => setCartItems([]);

  /** Tổng số lượng sản phẩm */
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);

  /** Tổng tiền */
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    totalItems,
    totalPrice,
  };
}
