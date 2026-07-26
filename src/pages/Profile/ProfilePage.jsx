import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  AddressTab,
  LogoutTab,
  OrdersTab,
  PasswordTab,
  ProfileHeader,
  ProfileTab,
} from './components';
import { defaultTab, profileTabs, userProfileData } from './profileData';
import styles from './ProfilePage.module.css';

function ProfilePage() {
  const [searchParams] = useSearchParams();
  const initialProfileForm = useMemo(
    () => ({
      fullName: userProfileData.profile.fullName,
      email: userProfileData.profile.email,
      phone: userProfileData.profile.phone,
      birthday: userProfileData.profile.birthday,
    }),
    [],
  );
  const [profileForm, setProfileForm] = useState(initialProfileForm);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const currentTab = searchParams.get('tab') || defaultTab;
  const validTab = profileTabs.some((tab) => tab.key === currentTab) ? currentTab : defaultTab;

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

  const renderTab = () => {
    switch (validTab) {
      case 'address':
        return <AddressTab addresses={userProfileData.addresses} />;
      case 'orders':
        return <OrdersTab orders={userProfileData.orders} />;
      case 'password':
        return <PasswordTab values={passwordForm} onChange={handlePasswordChange} />;
      case 'logout':
        return <LogoutTab userName={userProfileData.profile.fullName} />;
      case 'profile':
      default:
        return (
          <ProfileTab
            summary={userProfileData.profile}
            formValues={profileForm}
            onChange={handleProfileChange}
          />
        );
    }
  };

  return (
    <div className={styles.page}>
      <ProfileHeader user={userProfileData.profile} activeTab={validTab} />
      {renderTab()}
    </div>
  );
}

export default ProfilePage;
