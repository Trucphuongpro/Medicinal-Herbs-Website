import ActionButton from './ActionButton';
import styles from './AdminShared.module.css';

function ConfirmDialog({
  open,
  title = 'Xác nhận thao tác',
  description,
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className={styles.dialogBackdrop} role="presentation">
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="confirm-dialog-title">
        <h3 id="confirm-dialog-title" className={styles.dialogTitle}>
          {title}
        </h3>
        <p className={styles.dialogText}>{description}</p>
        <div className={styles.dialogActions}>
          <ActionButton tone="ghost" onClick={onCancel}>
            {cancelText}
          </ActionButton>
          <ActionButton tone="danger" onClick={onConfirm}>
            {confirmText}
          </ActionButton>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
