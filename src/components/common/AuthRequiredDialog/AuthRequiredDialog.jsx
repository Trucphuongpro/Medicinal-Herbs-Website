import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../Button';
import styles from './AuthRequiredDialog.module.css';

/**
 * Hop thoai moi khach dang nhap khi ho cham vao mot chuc nang can tai khoan.
 * Ghi lai trang hien tai de sau khi dang nhap dua ho quay ve dung cho.
 */
function AuthRequiredDialog({
  open,
  onClose,
  title = 'Đăng nhập để mua hàng',
  description = 'Bạn cần đăng nhập để thêm sản phẩm vào giỏ và đặt hàng. Việc này chỉ mất một phút.',
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const goTo = (path) => {
    navigate(path, { state: { from: location.pathname } });
  };

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <span className={styles.icon} aria-hidden="true">
          🌿
        </span>
        <h2 id="auth-dialog-title" className={styles.title}>
          {title}
        </h2>
        <p className={styles.description}>{description}</p>

        <div className={styles.actions}>
          <Button fullWidth onClick={() => goTo('/login')}>
            Đăng nhập
          </Button>
          <Button variant="outline" fullWidth onClick={() => goTo('/register')}>
            Tạo tài khoản mới
          </Button>
        </div>

        <button ref={closeButtonRef} type="button" className={styles.dismiss} onClick={onClose}>
          Để sau
        </button>
      </div>
    </div>
  );
}

export default AuthRequiredDialog;
