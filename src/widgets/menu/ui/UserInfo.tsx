import { useNavigate } from '@tanstack/react-router';
import { USER } from '@/shared/mock';
import { deleteAllCookies } from '@/shared/utils/cookie';
import {
  userInfo,
  userInfoImage,
  userInfoContent,
  userInfoContentName,
  userInfoContentEmail,
  logoutButton,
} from '@/widgets/menu/styles';

export default function UserInfo() {
  const { name, email, image } = USER;
  const navigate = useNavigate();

  const handleLogout = () => {
    deleteAllCookies();
    navigate({ to: '/login' });
  };

  return (
    <div className={userInfo}>
      <img className={userInfoImage} src={image} alt='user' />
      <div className={userInfoContent}>
        <p className={userInfoContentName}>{name}</p>
        <p className={userInfoContentEmail}>{email}</p>
      </div>
      <button className={logoutButton} onClick={handleLogout}>
        로그아웃
      </button>
    </div>
  );
}
