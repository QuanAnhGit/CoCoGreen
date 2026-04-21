// ============================================================
// COCOGREEN – Page 5: Dashboard Doanh nghiệp
// ============================================================

import { ImgPlaceholder } from '../../components/common/ImgPlaceholder';
import { StatCard }       from '../../components/ui/StatCard';
import { PRODUCTS, DASHBOARD_STATS } from '../../data/mockData';
import { formatCurrency } from '../../utils/format';
import styles from './Dashboard.module.css';

const TOP_PRODUCTS = [
  { name: 'Than gáo dừa 1kg',     sold: 445, revenue: 53400000, stock: 120 },
  { name: 'Chậu xơ dừa 20cm',     sold: 312, revenue: 14040000, stock: 45  },
  { name: 'Giỏ xơ dừa handmade',  sold: 189, revenue: 41580000, stock: 8   },
  { name: 'Mụn dừa nén khối 5kg', sold: 134, revenue: 11390000, stock: 200 },
];

const ACTIVITY = [
  { dot: '🟢', text: 'Đơn hàng #DH2025006 đã xác nhận',          time: '5 phút trước'  },
  { dot: '🟡', text: "Sản phẩm 'Mụn dừa 5kg' đang chờ duyệt",   time: '1 giờ trước'   },
  { dot: '🔵', text: 'Đơn hàng #DH2025005 đang giao',            time: '2 giờ trước'   },
  { dot: '⭐', text: 'Nhận được đánh giá 5 sao từ khách hàng',   time: '3 giờ trước'   },
  { dot: '🟠', text: "Tồn kho 'Giỏ handmade' còn 8 sản phẩm",   time: '5 giờ trước'   },
];

export function Dashboard({ onNavigate }) {
  return (
    <div className="page-wrapper">
      {/* ── Header ── */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className="section-title" style={{ marginBottom: 4 }}>Dashboard Doanh nghiệp</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
            HTX Dừa Xanh Trà Vinh · Cập nhật lúc 14:32 ngày 24/02/2026
          </p>
        </div>
        <button className={styles.addBtn} onClick={() => onNavigate('add-product')}>
          + Thêm sản phẩm
        </button>
      </div>

      {/* ── KPI Row ── */}
      <div className={styles.kpiGrid}>
        {DASHBOARD_STATS.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      {/* ── Mid row ── */}
      <div className={styles.midGrid}>
        {/* Top Products */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>📊 Sản phẩm bán chạy</h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Đã bán</th>
                <th>Doanh thu</th>
                <th>Tồn kho</th>
              </tr>
            </thead>
            <tbody>
              {TOP_PRODUCTS.map((p) => (
                <tr key={p.name}>
                  <td style={{ fontWeight: 500, fontSize: 13 }}>{p.name}</td>
                  <td style={{ fontSize: 13 }}>{p.sold}</td>
                  <td style={{ fontSize: 13, color: 'var(--green-mid)', fontWeight: 600 }}>
                    {formatCurrency(p.revenue)}
                  </td>
                  <td>
                    <span
                      className={p.stock < 10 ? 'tag tag-red' : 'tag tag-green'}
                      style={{ fontSize: 12 }}
                    >
                      {p.stock < 10 ? '⚠️ ' : ''}{p.stock}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Activity */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>🔔 Hoạt động gần đây</h3>
          {ACTIVITY.map((a, i) => (
            <div key={i} className={`${styles.activityItem} ${i < ACTIVITY.length - 1 ? styles.activityBorder : ''}`}>
              <span style={{ fontSize: 14, flexShrink: 0, marginTop: 2 }}>{a.dot}</span>
              <div>
                <div style={{ fontSize: 13, lineHeight: 1.4 }}>{a.text}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Product Management Table ── */}
      <div className={styles.card}>
        <div className={styles.tableHeader}>
          <h3 className={styles.cardTitle}>📦 Quản lý sản phẩm</h3>
          <div style={{ display: 'flex', gap: 10 }}>
            <input className="form-control" style={{ width: 200, fontSize: 13 }} placeholder="🔍 Tìm sản phẩm..." />
            <select className="form-control" style={{ width: 160, fontSize: 13 }}>
              <option>Tất cả trạng thái</option>
              <option>Đã duyệt</option>
              <option>Chờ duyệt</option>
            </select>
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Tồn kho</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((p) => (
              <tr key={p.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ borderRadius: 6, overflow: 'hidden', flexShrink: 0 }}>
                      <ImgPlaceholder width={36} height={36} label="" />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</span>
                  </div>
                </td>
                <td style={{ fontSize: 13 }}>{p.category}</td>
                <td style={{ fontSize: 13, fontWeight: 600, color: 'var(--green-mid)' }}>
                  {formatCurrency(p.price)}
                </td>
                <td>
                  <span
                    className={p.stock < 10 ? 'tag tag-red' : 'tag tag-green'}
                    style={{ fontSize: 12 }}
                  >
                    {p.stock < 10 ? '⚠️ ' : ''}{p.stock}
                  </span>
                </td>
                <td>
                  <span
                    className={p.approvalStatus === 'PENDING' ? 'tag tag-gold' : 'tag tag-green'}
                    style={{ fontSize: 12 }}
                  >
                    {p.approvalStatus}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn btn-sm" style={{ background: 'var(--cream-dark)', border: 'none', fontSize: 12 }}>Sửa</button>
                    <button className="btn btn-sm" style={{ background: '#fce4ec', border: 'none', fontSize: 12, color: '#c62828' }}>Ẩn</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
