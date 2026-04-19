// ============================================================
// COCOGREEN – Page 2: Danh sách sản phẩm
// ============================================================

import { useState } from 'react';
import { ProductCard }  from '../../components/ui/ProductCard';
import { Breadcrumb }   from '../../components/common/Breadcrumb';
import { PRODUCTS, CATEGORIES, REGIONS } from '../../data/mockData';
import { filterProducts } from '../../utils/format';
import styles from './Products.module.css';

const PRICE_OPTIONS = [
  'Dưới 100.000đ',
  '100.000 – 300.000đ',
  '300.000 – 500.000đ',
  'Trên 500.000đ',
];
const STATUS_OPTIONS = ['Còn hàng', 'Giảm giá', 'Sản phẩm mới'];

export function Products({ onNavigate, onAddToCart }) {
  const [search,  setSearch]  = useState('');
  const [sortBy,  setSortBy]  = useState('default');
  const [filters, setFilters] = useState({ price: [], category: [], region: [], status: [] });

  const toggle = (key, val) =>
    setFilters((f) => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter((x) => x !== val) : [...f[key], val],
    }));

  const clearAll = () =>
    setFilters({ price: [], category: [], region: [], status: [] });

  const products = filterProducts(PRODUCTS, filters, search, sortBy);

  return (
    <div className="page-wrapper">
      {/* ── Header ── */}
      <Breadcrumb
        items={[
          { label: 'Trang chủ', onClick: () => onNavigate('home') },
          { label: 'Sản phẩm' },
        ]}
      />

      <div className={styles.pageHeader}>
        <h1 className="section-title" style={{ margin: 0 }}>Danh sách sản phẩm</h1>
        <div className={styles.controls}>
          {/* Search */}
          <div className={styles.searchWrap}>
            <input
              className='form-control'
              placeholder="Tìm sản phẩm, doanh nghiệp..."
              style={{ width: 300 }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* Sort */}
          <select
            className="form-control"
            style={{ width: 200 }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Sắp xếp: Mặc định</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
            <option value="newest">Mới nhất</option>
            <option value="rating">Đánh giá cao nhất</option>
            <option value="hot">Bán chạy</option>
          </select>
        </div>
      </div>

      <div className={styles.layout}>
        {/* ── SIDEBAR ── */}
        <aside className={styles.sidebar}>
          <div className={styles.filterBox}>
            <div className={styles.filterHeader}>
              <h3 className={styles.filterMainTitle}>🔧 Bộ lọc</h3>
              <button className={styles.clearBtn} onClick={clearAll}>Xóa tất cả</button>
            </div>

            {[
              { title: '💰 Khoảng giá', key: 'price',    options: PRICE_OPTIONS },
              { title: '📦 Danh mục',   key: 'category', options: CATEGORIES },
              { title: '📍 Khu vực',    key: 'region',   options: REGIONS },
              { title: '📊 Tình trạng', key: 'status',   options: STATUS_OPTIONS },
            ].map((section) => (
              <div className={styles.filterSection} key={section.key}>
                <div className={styles.filterTitle}>{section.title}</div>
                {section.options.map((opt) => (
                  <label className={styles.filterItem} key={opt}>
                    <input
                      type="checkbox"
                      checked={filters[section.key].includes(opt)}
                      onChange={() => toggle(section.key, opt)}
                      style={{ accentColor: 'var(--green-mid)', width: 16, height: 16 }}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            ))}

            <button
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Áp dụng bộ lọc
            </button>
          </div>
        </aside>

        {/* ── PRODUCT GRID ── */}
        <div className={styles.content}>
          <p className={styles.resultCount}>
            Hiển thị 1–{products.length} / 350 sản phẩm
          </p>
          <div className={styles.grid}>
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onView={() => onNavigate('product-detail')}
                onAddToCart={() => onAddToCart(p)}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button className="page-btn">‹</button>
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} className={`page-btn${n === 1 ? ' active' : ''}`}>{n}</button>
            ))}
            <button className="page-btn">···</button>
            <button className="page-btn">18</button>
            <button className="page-btn">›</button>
          </div>
        </div>
      </div>
    </div>
  );
}
