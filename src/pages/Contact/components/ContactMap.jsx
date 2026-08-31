import { FiExternalLink, FiMapPin } from 'react-icons/fi';
import { companyInfo } from '../contactData';
import styles from './ContactMap.module.css';

// Lay dia chi tu contactData de ban do luon khop voi phan thong tin lien he.
const address =
  companyInfo.find((item) => item.title === 'Địa chỉ')?.value ?? 'Măng Đen, Kon Tum';

const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`;
const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

function ContactMap() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.card}>
          <div className={styles.header}>
            <div className={styles.headerText}>
              <span className={styles.eyebrow}>
                <FiMapPin size={14} aria-hidden="true" />
                Vị trí cửa hàng
              </span>
              <h2 className={styles.title}>Ghé thăm chúng tôi</h2>
              <p className={styles.address}>{address}</p>
            </div>

            <a
              href={directionsUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.action}
            >
              Chỉ đường
              <FiExternalLink size={15} aria-hidden="true" />
            </a>
          </div>

          <div className={styles.mapBox}>
            <iframe
              title={`Bản đồ vị trí: ${address}`}
              src={embedUrl}
              className={styles.frame}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactMap;
