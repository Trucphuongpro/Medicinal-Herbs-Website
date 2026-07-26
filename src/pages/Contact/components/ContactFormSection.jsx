import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';
import SectionHeader from '../../../components/common/SectionHeader';
import styles from './ContactFormSection.module.css';

function ContactFormSection() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.intro}>
          <SectionHeader
            eyebrow="Liên hệ"
            title="Kết nối với chúng tôi để được tư vấn về dược liệu và quà tặng sức khỏe."
            description="Biểu mẫu này chỉ là UI mock để hoàn thiện giao diện, chưa gửi dữ liệu đi đâu."
          />

          <div className={styles.noteCard}>
            <strong>Phản hồi nhanh trong giờ làm việc</strong>
            <p>Thích hợp cho các câu hỏi về sản phẩm, đơn hàng, quà biếu hoặc tư vấn chọn danh mục phù hợp.</p>
          </div>
        </div>

        <form className={styles.form}>
          <div className={styles.grid}>
            <Input label="Họ và tên" name="fullName" placeholder="Nguyễn Văn A" />
            <Input label="Email" name="email" type="email" placeholder="you@example.com" />
            <Input label="Số điện thoại" name="phone" placeholder="0901234567" />
            <Input label="Chủ đề" name="subject" placeholder="Tư vấn sản phẩm" />
            <Input
              label="Nội dung"
              name="message"
              placeholder="Chia sẻ nhu cầu của bạn..."
              wrapperClassName={styles.full}
            />
          </div>

          <Button className={styles.submitButton}>Gửi liên hệ</Button>
        </form>
      </div>
    </section>
  );
}

export default ContactFormSection;
