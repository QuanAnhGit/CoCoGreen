// ============================================================
// COCOGREEN – App.jsx
// Root component: state management + page routing
// ============================================================

import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

// Layout
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// UI Components
import { Chat } from './components/ui/Chat';

// Common Components
import { ToastContainer } from './components/common/ToastContainer';
import { Tutorial } from './components/common/Tutorial';

// Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Favorites } from './pages/Favorites';
import { News } from './pages/News';
import { Cart } from './pages/Cart';
import { Dashboard } from './pages/Dashboard';
import { OrderCenter } from './pages/Dashboard/OrderCenter';
import { Success } from './pages/Success';
import { Landing } from './pages/Landing';

// Hooks
import { useCart } from './hooks/useCart';
import { useToast } from './hooks/useToast';

// Global styles
import './styles/globals.css';
import styles from './App.module.css';

// ── Main App ─────────────────────────────────────────────────
const PAGE_PATHS = {
  home: '/',
  products: '/products',
  'product-detail': '/product-detail',
  favorites: '/favorites',
  news: '/news',
  cart: '/cart',
  dashboard: '/dashboard',
  orders: '/orders',
  orderSuccess: '/orderSuccess',
  landing: '/landing',
  login: '/'
};

const PATH_TO_PAGE = {
  '/': 'home',
  '/products': 'products',
  '/product-detail': 'product-detail',
  '/favorites': 'favorites',
  '/news': 'news',
  '/cart': 'cart',
  '/dashboard': 'dashboard',
  '/orders': 'orders',
  '/orderSuccess': 'orderSuccess',
  '/landing': 'landing',
  '/login': 'home'
};

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const { cartItems, addToCart, removeFromCart, updateQty, totalItems, totalPrice } = useCart();
  const { toasts, showToast } = useToast();

  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = PATH_TO_PAGE[location.pathname] ?? 'home';

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedCoCoGreen');
    if (!hasVisited) {
      setShowTutorial(true);
    }
  }, []);

  const handleNavigate = (page) => {
    navigate(PAGE_PATHS[page] ?? '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product, qty = 1) => {
    addToCart(product, qty);
    showToast(`✅ Đã thêm "${product.name}" vào giỏ hàng`);
  };

  const handleChatToggle = (open) => {
    setChatOpen(open);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {currentPage !== 'landing' && (
        <Header
          currentPage={currentPage}
          onNavigate={handleNavigate}
          cartCount={totalItems}
          onChatToggle={handleChatToggle}
          chatOpen={chatOpen}
        />
      )}

      <main style={{ flex: 1 }} className="animate-fadeInDown" key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home onNavigate={handleNavigate} onAddToCart={handleAddToCart} />} />
          <Route path="/products" element={<Products onNavigate={handleNavigate} onAddToCart={handleAddToCart} />} />
          <Route path="/product-detail" element={<ProductDetail onNavigate={handleNavigate} onAddToCart={handleAddToCart} />} />
          <Route path="/favorites" element={<Favorites onNavigate={handleNavigate} onAddToCart={handleAddToCart} />} />
          <Route path="/news" element={<News />} />
          <Route path="/cart" element={
            <Cart
              cartItems={cartItems}
              onRemove={removeFromCart}
              onUpdateQty={updateQty}
              totalPrice={totalPrice}
              onNavigate={handleNavigate}
              onClearCart={() => {
                cartItems.forEach(item => removeFromCart(item.id));
              }}
            />
          } />
          <Route path="/orderSuccess" element={<Success onNavigate={handleNavigate} />} />
          <Route path="/dashboard" element={<Dashboard onNavigate={handleNavigate} />} />
          <Route path="/landing" element={<Landing onNavigate={handleNavigate} />} />
          <Route path="/orders" element={<OrderCenter />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Chat open={chatOpen} onClose={() => setChatOpen(false)} />

      {currentPage !== 'landing' && <Footer onNavigate={handleNavigate} />}
      <ToastContainer toasts={toasts} />

      <Tutorial
        showTutorial={showTutorial}
        x = {15}
        y = {30}
        arrow_options='trh'
        onClose={() => {
          setShowTutorial(false);
          localStorage.setItem('hasVisitedCoCoGreen', 'true');
        }}
      />
    </div>
  );
}