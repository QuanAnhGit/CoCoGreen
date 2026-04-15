// ============================================================
// COCOGREEN – UTILITY FUNCTIONS
// ============================================================

/**
 * Format số tiền sang VNĐ
 * @param {number} amount
 * @returns {string} "120.000đ"
 */
export const formatCurrency = (amount) =>
  amount.toLocaleString('vi-VN') + 'đ';

/**
 * Tính phần trăm giảm giá
 * @param {number} price
 * @param {number} oldPrice
 * @returns {number} 20
 */
export const calcDiscount = (price, oldPrice) =>
  oldPrice > 0 ? Math.round((1 - price / oldPrice) * 100) : 0;

/**
 * Render sao dựa trên rating
 * @param {number} rating  (ví dụ: 4.5)
 * @returns {string} "★★★★½"
 */
export const renderStars = (rating) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  return '★'.repeat(full) + (half ? '½' : '');
};

/**
 * Rút ngắn chuỗi
 * @param {string} str
 * @param {number} maxLength
 */
export const truncate = (str, maxLength = 60) =>
  str.length > maxLength ? str.slice(0, maxLength) + '…' : str;

/**
 * Lọc sản phẩm theo bộ lọc
 * @param {Array}  products
 * @param {Object} filters  { category, region, status, priceRange }
 * @param {string} search
 * @param {string} sortBy
 */
export const filterProducts = (products, filters, search = '', sortBy = 'default') => {
  let result = [...products];

  // Search
  if (search.trim()) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.supplier.toLowerCase().includes(q)
    );
  }

  // Category
  if (filters.category?.length) {
    result = result.filter((p) => filters.category.includes(p.category));
  }

  // Region
  if (filters.region?.length) {
    result = result.filter((p) => filters.region.includes(p.region));
  }

  // Sort
  switch (sortBy) {
    case 'price-asc':  result.sort((a, b) => a.price - b.price);   break;
    case 'price-desc': result.sort((a, b) => b.price - a.price);   break;
    case 'rating':     result.sort((a, b) => b.rating - a.rating); break;
    case 'hot':        result.sort((a, b) => b.reviews - a.reviews); break;
    default: break;
  }

  return result;
};
