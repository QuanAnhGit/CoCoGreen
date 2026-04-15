// ============================================================
// COCOGREEN – Page 6: Trung tâm đơn hàng (Doanh nghiệp)
// ============================================================

import { useState }       from 'react';
import { ORDERS, ORDER_STATUS, ORDER_NEXT_STATUS } from '../../data/mockData';
import { formatCurrency } from '../../utils/format';
import styles from './OrderCenter.module.css';

export function OrderCenter() {
  const [orders, setOrders] = useState(ORDERS);
  const [filter, setFilter] = useState('ALL');

  // Chuyển trạng thái kế tiếp (theo ràng buộc nghiệp vụ)
  const advanceStatus = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== orderId) return o;
        const next = ORDER_NEXT_STATUS[o.status];
        return next ? { ...o, status: next } : o;
      })
    );
  };

  const filtered = orders.filter((o) => filter === 'ALL' || o.status === filter);
  const countOf  = (s) => orders.filter((o) => o.status === s).length;

  return (
    <div className="page-wrapper">
      <h1 className="section-title" style={{ marginBottom: 6 }}>Trung tâm đơn hàng</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 28, fontSize: 14 }}>
        Theo dõi và xử lý đơn hàng của doanh nghiệp
      </p>

      {/* ── Status Filter Tabs ── */}
      <div className={styles.tabs}>
        {['ALL', 'PENDING', 'CONFIRMED', 'SHIPPING', 'COMPLETED'].map((s) => {
          const info  = ORDER_STATUS[s];
          const count = s === 'ALL' ? orders.length : countOf(s);
          return (
            <button
              key={s}
              className={`${styles.tabBtn} ${filter === s ? styles.tabActive : ''}`}
              onClick={() => setFilter(s)}
            >
              {s === 'ALL' ? 'Tất cả' : info?.label}
              <span className={`${styles.badge} ${filter === s ? styles.badgeActive : ''}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Orders Table ── */}
      <div className={styles.tableWrap}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Sản phẩm</th>
              <th>SL</th>
              <th>Tổng tiền</th>
              <th>Ngày đặt</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => {
              const status = ORDER_STATUS[o.status];
              const nextS  = ORDER_NEXT_STATUS[o.status];
              const nextInfo = nextS ? ORDER_STATUS[nextS] : null;
              return (
                <tr key={o.id}>
                  <td style={{ fontWeight: 700, color: 'var(--green-mid)', fontSize: 13 }}>{o.id}</td>
                  <td style={{ fontSize: 13 }}>{o.customer}</td>
                  <td style={{ fontSize: 13, maxWidth: 180 }}>{o.product}</td>
                  <td style={{ fontSize: 13 }}>{o.qty}</td>
                  <td style={{ fontSize: 13, fontWeight: 700 }}>{formatCurrency(o.total)}</td>
                  <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>{o.date}</td>
                  <td>
                    <span
                      style={{
                        background: status?.bg,
                        color: status?.color,
                        padding: '5px 12px',
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 700,
                        fontFamily: 'var(--font-body)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {status?.label}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {nextInfo && (
                        <button
                          className={styles.advanceBtn}
                          onClick={() => advanceStatus(o.id)}
                        >
                          → {nextInfo.label}
                        </button>
                      )}
                      <button className={styles.detailBtn}>Chi tiết</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Business Rules Notice ── */}
      <div className={styles.ruleNotice}>
        ⚠️ <strong>Quy tắc chuyển trạng thái: </strong>
        Không thể hủy đơn đã COMPLETED · SHIPPING không thể quay về CONFIRMED · 24h chưa xác nhận sẽ nhận nhắc nhở tự động.
      </div>
    </div>
  );
}
