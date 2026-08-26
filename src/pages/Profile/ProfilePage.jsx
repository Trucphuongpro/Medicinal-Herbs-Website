import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import ErrorState from '../../components/common/ErrorState';
import Loading from '../../components/common/Loading';
import orderService from '../../services/order.service';
import userService from '../../services/user.service';
import { mapOrderToCard, mapProfile, toOrderList } from '../../utils/apiMappers';
import { clearTokens } from '../../utils/token';
import {
  AddressTab,
  LogoutTab,
  OrdersTab,
  PasswordTab,
  ProfileHeader,
  ProfileTab,
} from './components';
import { defaultTab, profileTabs } from './profileData';
import styles from './ProfilePage.module.css';

function ProfilePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userProfile, setUserProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMessage, setActionMessage] = useState('');
  const initialProfileForm = useMemo(
    () => ({
      fullName: userProfile?.fullName || '',
      email: userProfile?.email || '',
      phone: userProfile?.phone || '',
      birthday: userProfile?.birthday || '',
    }),
    [userProfile],
  );
  const [profileForm, setProfileForm] = useState(initialProfileForm);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const currentTab = searchParams.get('tab') || defaultTab;
  const validTab = profileTabs.some((tab) => tab.key === currentTab) ? currentTab : defaultTab;

  useEffect(() => {
    setProfileForm(initialProfileForm);
  }, [initialProfileForm]);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      setError('');
      const [profileResponse, ordersResponse] = await Promise.all([
        userService.getProfile(),
        orderService.getAll(),
      ]);

      const orderList = toOrderList(ordersResponse);
      setOrders(orderList.map(mapOrderToCard));
      setUserProfile(mapProfile(profileResponse, orderList));
    } catch (err) {
      setError(err.response?.data?.message || 'Không thể tải thông tin tài khoản.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfileData();
  }, []);

  const handleProfileChange = (field) => (event) => {
    setProfileForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handlePasswordChange = (field) => (event) => {
    setPasswordForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleProfileSubmit = () => {
    setActionMessage('Backend hiện chưa có endpoint cập nhật hồ sơ người dùng.');
  };

  const handlePasswordSubmit = () => {
    setActionMessage('Backend hiện chưa có endpoint đổi mật khẩu.');
  };

  const handleLogout = () => {
    clearTokens();
    navigate('/login');
  };

  if (loading) {
    return <Loading fullScreen text="Đang tải thông tin tài khoản..." />;
  }

  if (error && !userProfile) {
    return <ErrorState message={error} onRetry={loadProfileData} />;
  }

  const renderTab = () => {
    switch (validTab) {
      case 'address':
        return <AddressTab addresses={[]} />;
      case 'orders':
        return <OrdersTab orders={orders} />;
      case 'password':
        return <PasswordTab values={passwordForm} onChange={handlePasswordChange} onSubmit={handlePasswordSubmit} />;
      case 'logout':
        return <LogoutTab userName={userProfile.fullName} onLogout={handleLogout} />;
      case 'profile':
      default:
        return (
          <ProfileTab
            summary={userProfile}
            formValues={profileForm}
            onChange={handleProfileChange}
            onSubmit={handleProfileSubmit}
            message={actionMessage}
          />
        );
    }
  };

  return (
    <div className={styles.page}>
      <ProfileHeader user={userProfile} activeTab={validTab} />
      {renderTab()}
    </div>
  );
}

export default ProfilePage;
