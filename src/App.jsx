// ============================================================
// COCOGREEN – App.jsx
// Root component: state management + page routing
// ============================================================

import { useState } from 'react';

// Layout
import { Header }  from './components/layout/Header';
import { Footer }  from './components/layout/Footer';

// Pages
import { Home }           from './pages/Home';
import { Products }       from './pages/Products';
import { ProductDetail }  from './pages/ProductDetail';
import { Favorites }      from './pages/Favorites';
import { News }           from './pages/News';
import { Cart }           from './pages/Cart';
import { Dashboard }      from './pages/Dashboard';
import { OrderCenter }    from './pages/Dashboard/OrderCenter';

// Hooks
import { useCart }  from './hooks/useCart';
import { useToast } from './hooks/useToast';

// Global styles
import './styles/globals.css';

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

  const { cartItems, addToCart, removeFromCart, updateQty, totalItems, totalPrice } = useCart();
  const { toasts, showToast } = useToast();

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast(`✅ Đã thêm "${product.name}" vào giỏ hàng`);
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
      />

      <main style={{ flex: 1 }} className="animate-scaleIn" key={currentPage}>
        {renderPage()}
      </main>

      <Footer onNavigate={navigate} />
      <ToastContainer toasts={toasts} />
    </div>
  );
}
