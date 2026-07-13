import { Link, NavLink } from 'react-router-dom';
import { FiShoppingCart, FiUser } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';
import SearchBar from '../../common/SearchBar';
import { APP_NAME } from '../../../config';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>
          <FaLeaf size={24} aria-hidden="true" />
          {APP_NAME}
        </Link>

        <nav className={styles.nav} aria-label="Menu chính">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
          >
            Cửa hàng
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
          >
            Giới thiệu
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
          >
            Liên hệ
          </NavLink>
        </nav>

        <div className={styles.searchWrapper}>
          <SearchBar />
        </div>

        <div className={styles.actions}>
          <Link to="/cart" className={styles.iconLink} aria-label="Giỏ hàng">
            <FiShoppingCart size={20} />
          </Link>
          <Link to="/profile" className={styles.iconLink} aria-label="Tài khoản">
            <FiUser size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
