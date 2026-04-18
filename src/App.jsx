// ============================================================
// COCOGREEN – App.jsx
// Root component: state management + page routing
// ============================================================

import { useState, useEffect } from 'react';

// Layout
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

// UI Components
import { Chat } from './components/ui/Chat';

// Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Favorites } from './pages/Favorites';
import { News } from './pages/News';
import { Cart } from './pages/Cart';
import { Dashboard } from './pages/Dashboard';
import { OrderCenter } from './pages/Dashboard/OrderCenter';

// Hooks
import { useCart } from './hooks/useCart';
import { useToast } from './hooks/useToast';

// Global styles
import './styles/globals.css';
import styles from './App.module.css';

// ── Toast Component ──────────────────────────────────────────
function ToastContainer({ toasts }) {
  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {toasts.map((t) => (
        <div key={t.id} className="toast">{t.message}</div>
      ))}
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [chatOpen, setChatOpen] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  const { cartItems, addToCart, removeFromCart, updateQty, totalItems, totalPrice } = useCart();
  const { toasts, showToast } = useToast();

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedCoCoGreen');
    if (!hasVisited) {
      setShowTutorial(true);
    }
  }, []);

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product, qty = 1) => {
    addToCart(product, qty);
    showToast(`✅ Đã thêm "${product.name}" vào giỏ hàng`);
  };

  const handleChatToggle = (open) => {
    setChatOpen(open);
  };

  // ── Page renderer ─────────────────────────────────────────
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigate} onAddToCart={handleAddToCart} />;

      case 'products':
        return <Products onNavigate={navigate} onAddToCart={handleAddToCart} />;

      case 'product-detail':
        return <ProductDetail onNavigate={navigate} onAddToCart={handleAddToCart} />;

      case 'favorites':
        return <Favorites onNavigate={navigate} onAddToCart={handleAddToCart} />;

      case 'news':
        return <News />;

      case 'cart':
        return (
          <Cart
            cartItems={cartItems}
            onRemove={removeFromCart}
            onUpdateQty={updateQty}
            totalPrice={totalPrice}
            onNavigate={navigate}
          />
        );

      case 'dashboard':
        return <Dashboard onNavigate={navigate} />;

      case 'orders':
        return <OrderCenter />;

      default:
        return <Home onNavigate={navigate} onAddToCart={handleAddToCart} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        currentPage={currentPage}
        onNavigate={navigate}
        cartCount={totalItems}
        onChatToggle={handleChatToggle}
        chatOpen={chatOpen}
      />

      <main style={{ flex: 1 }} className="animate-scaleIn" key={currentPage}>
        {renderPage()}
      </main>

      <Chat open={chatOpen} onClose={() => setChatOpen(false)} />

      <Footer onNavigate={navigate} />
      <ToastContainer toasts={toasts} />

      {/* Tutorial Overlay */}
      {showTutorial && (
        <div
          className={styles.tutorialOverlay}
          onClick={() => {
            setShowTutorial(false);
            localStorage.setItem('hasVisitedCoCoGreen', 'true');
          }}
        >
          <div
            className={styles.tutorialMessage}
            onClick={(e) => e.stopPropagation()}
          >
            <p>
              Chào mừng bạn đến với CoCoGreen! Nhấp vào nút AI để trò chuyện với Sylvie - trợ lý ảo của chúng tôi.
            </p>
            <button
              className={styles.tutorialButton}
              onClick={() => {
                setShowTutorial(false);
                localStorage.setItem('hasVisitedCoCoGreen', 'true');
              }}
            >
              Đã hiểu
            </button>
            <div className={styles.tutorialArrow}></div>
          </div>
        </div>
      )}
    </div>
  );
}
