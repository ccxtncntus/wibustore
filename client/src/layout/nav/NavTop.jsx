import { useEffect, useState } from 'react';
import './navtop.css';
import UserModal from '../../components/modal/UserModal';
import { useCookies } from 'react-cookie';
import { useContext } from 'react';
import { UContexts } from '../../components/context/UserContext';
import Notification from '../../components/admin/Notification';
const NavTop = () => {
  const [cookie, setCookie] = useCookies(['token', 'path_end']);
  const { User } = useContext(UContexts);
  const [Name, setName] = useState(null);
  const [ShowUser, setShowUser] = useState(false);

  useEffect(() => {
    setName(User != '' ? User.name : null);
  }, [User]);

  const handleCloseUsers = () => setShowUser(false);
  const handleShowModalUser = () => {
    setCookie('path_end', window.location.pathname, { path: '/' });
    setShowUser(true);
  };
  return (
    <div>
      <div className="container navtop">
        <UserModal
          placement={'end'}
          show={ShowUser}
          onClose={handleCloseUsers}
        />
        <span className="navtop_none">
          <i className="fa-solid fa-phone"></i> <span>Hotline: 0327297102</span>
        </span>
        <span onClick={handleShowModalUser}>
          <span>{Name || 'Đăng nhập | Đăng kí'}</span>{' '}
          <i className="fa-solid fa-user"></i>
        </span>
      </div>
      <hr className="m-0" />
    </div>
  );
};

export default NavTop;
