import { useState } from 'react';
import { FiEdit2, FiEye, FiLock } from 'react-icons/fi';
import {
  ActionButton,
  ConfirmDialog,
  DataTable,
  PageHeader,
  StatusBadge,
} from '../../components/admin';
import { users } from '../../mocks/adminData';
import styles from '../../components/admin/AdminShared.module.css';

function UsersPage() {
  const [selectedUser, setSelectedUser] = useState(null);

  const columns = [
    {
      key: 'avatar',
      label: 'Avatar / Họ tên',
      render: (row) => (
        <div className={styles.avatarRow}>
          <img className={styles.avatar} src={row.avatar} alt={row.name} />
          <div>
            <p className={styles.itemTitle}>{row.name}</p>
            <p className={styles.itemMeta}>{row.id}</p>
          </div>
        </div>
      ),
    },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Số điện thoại' },
    { key: 'role', label: 'Vai trò' },
    { key: 'status', label: 'Trạng thái', render: (row) => <StatusBadge status={row.status} /> },
    {
      key: 'actions',
      label: 'Action',
      render: (row) => (
        <div className={styles.actions}>
          <ActionButton tone="ghost" icon={<FiEye aria-hidden="true" />}>Xem</ActionButton>
          <ActionButton tone="secondary" icon={<FiEdit2 aria-hidden="true" />}>Sửa</ActionButton>
          <ActionButton tone="danger" icon={<FiLock aria-hidden="true" />} onClick={() => setSelectedUser(row)}>
            Khóa tài khoản
          </ActionButton>
        </div>
      ),
    },
  ];

  return (
    <section className={styles.page}>
      <PageHeader
        title="Quản lý người dùng"
        subtitle="Theo dõi tài khoản theo vai trò, trạng thái và các thao tác quản trị cơ bản."
      />
      <div className={styles.sectionCard}>
        <DataTable columns={columns} data={users} />
      </div>
      <ConfirmDialog
        open={Boolean(selectedUser)}
        title="Khóa tài khoản"
        description={selectedUser ? `Khóa tài khoản của ${selectedUser.name}? Đây là tương tác mock để hoàn thiện UI.` : ''}
        confirmText="Khóa tài khoản"
        onCancel={() => setSelectedUser(null)}
        onConfirm={() => setSelectedUser(null)}
      />
    </section>
  );
}

export default UsersPage;
