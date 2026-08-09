import { useEffect, useState } from 'react';
import { FiEdit2, FiEye, FiLock } from 'react-icons/fi';
import {
  ActionButton,
  ConfirmDialog,
  DataTable,
  PageHeader,
  StatusBadge,
} from '../../components/admin';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import Loading from '../../components/common/Loading';
import userService from '../../services/user.service';
import { mapApiUserToAdminRow } from './utils';
import styles from '../../components/admin/AdminShared.module.css';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await userService.getAll();
      setUsers((response || []).map(mapApiUserToAdminRow));
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể tải danh sách người dùng.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleToggleStatus = async () => {
    if (!selectedUser) return;

    try {
      await userService.updateStatus(selectedUser.id, {
        is_active: !selectedUser.isActive,
      });
      setSelectedUser(null);
      await loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể cập nhật trạng thái tài khoản.');
    }
  };

  const handleToggleRole = async (user) => {
    try {
      await userService.update(user.id, {
        role: user.rawRole === 'ADMIN' ? 'USER' : 'ADMIN',
      });
      await loadUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể cập nhật vai trò người dùng.');
    }
  };

  if (loading) {
    return <Loading fullScreen text="Đang tải người dùng..." />;
  }

  if (error && !users.length) {
    return <ErrorState message={error} onRetry={loadUsers} />;
  }

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
    { key: 'role', label: 'Vai trò', render: (row) => row.rawRole },
    { key: 'status', label: 'Trạng thái', render: (row) => <StatusBadge status={row.status} /> },
    {
      key: 'actions',
      label: 'Action',
      render: (row) => (
        <div className={styles.actions}>
          <ActionButton tone="ghost" icon={<FiEye aria-hidden="true" />} onClick={() => window.alert(`ID: ${row.id}\nEmail: ${row.email}\nRole: ${row.rawRole}\nStatus: ${row.status}`)}>Xem</ActionButton>
          <ActionButton tone="secondary" icon={<FiEdit2 aria-hidden="true" />} onClick={() => handleToggleRole(row)}>
            {row.rawRole === 'ADMIN' ? 'Hạ quyền' : 'Nâng quyền'}
          </ActionButton>
          <ActionButton tone="danger" icon={<FiLock aria-hidden="true" />} onClick={() => setSelectedUser(row)}>
            {row.isActive ? 'Khóa tài khoản' : 'Mở tài khoản'}
          </ActionButton>
        </div>
      ),
    },
  ];

  return (
    <section className={styles.page}>
      <PageHeader
        title="Quản lý người dùng"
        subtitle="Danh sách người dùng đang lấy trực tiếp từ backend, hỗ trợ đổi quyền và khóa hoặc mở tài khoản."
      />

      {error ? <ErrorState message={error} /> : null}

      <div className={styles.sectionCard}>
        <DataTable
          columns={columns}
          data={users}
          emptyState={
            <EmptyState
              title="Chưa có người dùng"
              description="Backend hiện chưa trả về người dùng nào."
            />
          }
        />
      </div>
      <ConfirmDialog
        open={Boolean(selectedUser)}
        title={selectedUser?.isActive ? 'Khóa tài khoản' : 'Mở lại tài khoản'}
        description={selectedUser ? `${selectedUser.isActive ? 'Khóa' : 'Mở lại'} tài khoản của ${selectedUser.name}?` : ''}
        confirmText={selectedUser?.isActive ? 'Khóa tài khoản' : 'Mở lại tài khoản'}
        onCancel={() => setSelectedUser(null)}
        onConfirm={handleToggleStatus}
      />
    </section>
  );
}

export default UsersPage;
