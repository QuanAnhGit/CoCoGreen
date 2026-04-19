// ============================================================
// COCOGREEN – Page 8: Tin tức & Kiến thức
// ============================================================

import { useState } from 'react';
import { ImgPlaceholder } from '../../components/common/ImgPlaceholder';
import { NewsCard } from '../../components/ui/NewsCard';
import { NEWS } from '../../data/mockData';
import styles from './News.module.css';

export function News() {
  const [selected, setSelected] = useState(null);

  // ── Article detail view ──
  if (selected) {
    return (
      <div className={styles.detailWrapper}>
        <button className={styles.backBtn} style={{ marginBottom: 24 }} onClick={() => setSelected(null)}>
          ← Quay lại danh sách
        </button>
        <span className="tag tag-green" style={{ margin: '0 0 14px 10px', display: 'inline-flex' }}>
          {selected.tag}
        </span>
        <h1 className={styles.detailTitle}>{selected.title}</h1>
        <div className={styles.detailMeta}>
          <span>📅 {selected.date}</span>
          <span>👁️ {selected.views?.toLocaleString()} lượt xem</span>
          <span>⏱️ {selected.readTime} phút đọc</span>
        </div>
        <div className={styles.detailImg}>
          <ImgPlaceholder height={340} label="Ảnh bài viết — 840×340px" />
        </div>
        <div className={styles.detailBody}>
          <p className={styles.detailDesc}>{selected.desc}</p>
          <p>Trong bối cảnh nền nông nghiệp hiện đại đang dần chuyển dịch sang hướng phát triển bền vững và thân thiện với môi trường, việc lựa chọn giá thể trồng cây đóng vai trò vô cùng quan trọng. Đối với canh tác hữu cơ, cuộc tranh luận giữa việc sử dụng giá thể xơ dừa sinh học và đất trồng thông thường (thường đi kèm với phân bón hóa học) vẫn luôn là một chủ đề nóng hổi. Để tìm ra câu trả lời cho câu hỏi "Lựa chọn nào tốt hơn?", chúng ta cần phân tích một cách toàn diện về ưu và nhược điểm của từng loại.</p>
          <h3 className={styles.detailSubtitle}>Đất trồng thông thường (Đất hóa học): Lợi thế và Hạn chế</h3>
          <p>Đất trồng truyền thống là môi trường tự nhiên quen thuộc nhất đối với người làm vườn. Khi kết hợp với các loại phân bón hóa học, loại đất này mang lại những ưu điểm nhất định nhưng cũng tiềm ẩn nhiều rủi ro cho dài hạn.</p>
          <p><strong>Ưu điểm:</strong> Lợi thế lớn nhất của đất trồng thông thường là sự dồi dào về hệ vi sinh vật bản địa và các khoáng chất cơ bản (tùy thuộc vào vùng đất). Khi được bổ sung phân bón hóa học, cây trồng thường hấp thụ dưỡng chất rất nhanh, mang lại kết quả tăng trưởng tức thời và rõ rệt. Ngoài ra, đất tự nhiên thường có độ nặng nhất định, giúp giữ vững gốc cho các loại cây thân gỗ lớn hoặc cây lâu năm.</p>
          <p><strong>Nhược điểm:</strong> Điểm yếu lớn nhất của đất trồng hóa học nằm ở tính bền vững. Việc lạm dụng phân bón hóa học lâu ngày khiến đất bị thoái hóa, bạc màu, chai cứng và mất đi độ tơi xốp tự nhiên. Đất thông thường cũng chứa nhiều mầm bệnh, nấm nấm và cỏ dại tiềm ẩn, đòi hỏi người trồng phải sử dụng thêm thuốc trừ sâu. Về mặt vật lý, đất rất nặng, gây khó khăn cho quá trình vận chuyển và không tối ưu cho mô hình trồng rau sạch đô thị hay sân thượng.</p>
          <h3 className={styles.detailSubtitle}>Giá thể Xơ dừa: Ngôi sao mới của Canh tác Hữu cơ</h3>
          <p>Xơ dừa (coco coir) được chế biến từ vỏ trái dừa – một phụ phẩm nông nghiệp phổ biến. Qua quá trình xử lý chát (loại bỏ tanin và lignin), mụn xơ dừa trở thành một trong những giá thể tuyệt vời nhất cho nông nghiệp công nghệ cao.</p>
          <p><strong>Ưu điểm:</strong> Xơ dừa sở hữu khả năng giữ ẩm vô cùng xuất sắc (có thể giữ lượng nước gấp 8-10 lần trọng lượng của nó) đồng thời vẫn đảm bảo độ tơi xốp và thoáng khí hoàn hảo cho rễ cây phát triển. Rễ cây trồng trong xơ dừa thường bung mạnh và khỏe hơn hẳn so với đất bùn nhão. Đặc biệt, xơ dừa đã qua xử lý là một môi trường vô trùng, hoàn toàn không chứa mầm bệnh hay hạt cỏ dại. Độ pH của xơ dừa thường ở mức trung tính (5.5 - 6.8), rất lý tưởng cho việc hấp thụ dinh dưỡng của đa số các loại cây trồng. Cuối cùng, đây là vật liệu 100% hữu cơ, có thể tái tạo và phân hủy sinh học, không gây hại cho môi trường.</p>
          <p><strong>Nhược điểm:</strong> Bản thân xơ dừa là một giá thể trơ, nghĩa là nó gần như không chứa dinh dưỡng tự nhiên có sẵn cho cây. Do đó, người trồng bắt buộc phải chủ động cung cấp phân bón (ưu tiên phân hữu cơ, dung dịch thủy canh hoặc trùn quế) ngay từ giai đoạn đầu. Ngoài ra, nếu mua phải loại xơ dừa kém chất lượng, chưa được xả chát kỹ, lượng muối (EC) cao có thể làm "sót" và hỏng rễ cây.</p>
          <h3 className={styles.detailSubtitle}>Đánh giá trong Canh tác Hữu cơ: Ai là người chiến thắng?</h3>
          <p>Nếu đặt lên bàn cân của <strong>nông nghiệp hữu cơ và bền vững</strong>, giá thể xơ dừa rõ ràng là người chiến thắng thuyết phục. Nó giải quyết triệt để vấn đề thoái hóa đất và ô nhiễm nguồn nước ngầm do hóa chất nông nghiệp gây ra.</p>
          <p>Việc xơ dừa không có sẵn dinh dưỡng thoạt nhìn là một điểm yếu, nhưng trong canh tác hiện đại, đây lại là một lợi thế tuyệt đối. Nó cho phép người kỹ sư nông nghiệp hoặc người làm vườn kiểm soát 100% lượng dinh dưỡng nạp vào cây thông qua các loại phân bón hữu cơ có kiểm soát, tránh tình trạng dư thừa Nitrate hay ngộ độc vi lượng thường gặp ở đất tự nhiên.</p>
          <h3 className={styles.detailSubtitle}>Tổng kết</h3>
          <p>Đất trồng hóa học có thể mang lại sự tiện lợi ban đầu và tốc độ chớp nhoáng, nhưng nó đang dần phải nhường chỗ cho những giải pháp xanh hơn. Giá thể xơ dừa không chỉ là một sự thay thế hoàn hảo mà còn là bước tiến lớn giúp tối ưu hóa rễ cây, ngăn ngừa dịch bệnh và bảo vệ hệ sinh thái. Đối với những ai đam mê nông nghiệp sạch, canh tác hữu cơ hay trồng cây đô thị, đầu tư vào xơ dừa chất lượng cao là một quyết định thông minh, minh bạch và thân thiện với môi trường.</p>
        </div>
      </div>
    );
  }

  // ── Article list view ──
  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <span className="section-label">✦ Kiến thức & Xu hướng ✦</span>
          <h1 className="section-title">Tin tức & Kiến thức</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>
            Cập nhật kiến thức nông nghiệp, so sánh sản phẩm và xu hướng xanh
          </p>
        </div>
        {/* Tag filter */}
        <div className={styles.tagFilter}>
          {['Tất cả', 'So sánh', 'Môi trường', 'Hướng dẫn', 'Xu hướng'].map((t) => (
            <button key={t} className={`${styles.tagBtn} ${t === 'Tất cả' ? styles.tagActive : ''}`}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Featured article */}
      <div className={styles.featured} onClick={() => setSelected(NEWS[0])}>
        <div className={styles.featuredImg}>
          <ImgPlaceholder height="100%" label="Ảnh nổi bật — 700×420px" />
        </div>
        <div className={styles.featuredBody}>
          <span className="tag tag-green" style={{ marginBottom: 14, display: 'inline-flex' }}>
            ⭐ Nổi bật · {NEWS[0].tag}
          </span>
          <h2 className={styles.featuredTitle}>{NEWS[0].title}</h2>
          <p className={styles.featuredDesc}>{NEWS[0].desc}</p>
          <div className={styles.featuredMeta}>
            <span>📅 {NEWS[0].date}</span>
            <span>👁️ {NEWS[0].views?.toLocaleString()}</span>
            <span>⏱️ {NEWS[0].readTime} phút</span>
          </div>
          <button className={styles.readArticleBtn} style={{ marginTop: 20 }}>
            Đọc bài viết →
          </button>
        </div>
      </div>

      {/* Article grid */}
      <h3 className={styles.gridTitle}>Bài viết gần đây</h3>
      <div className={styles.newsGrid}>
        {NEWS.slice(1).map((n) => (
          <NewsCard key={n.id} article={n} onClick={() => setSelected(n)} />
        ))}
      </div>
    </div>
  );
}
