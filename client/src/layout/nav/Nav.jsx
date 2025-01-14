import './nav.css';
import Badge from '@mui/material/Badge';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Link, useNavigate } from 'react-router-dom';
import CardModal from '../../components/modal/CardModal';
import Menu from './Menu';
import { Contexts } from '../../components/context/Contexts';
import { UContexts } from '../../components/context/UserContext';
import { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import * as AccountService from '../../services/AccountService';
import SreachModal from '../../components/modal/SreachModal';
import Notification from '../../components/admin/Notification';
const Nav = () => {
  const navigate = useNavigate();
  const { cardNumber } = useContext(Contexts);
  const { User } = useContext(UContexts);
  const [showCard, setShowCard] = useState(false);
  const [showSreach, setshowSreach] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'path_end']);
  const handleShowModalCard = async () => {
    if (Object.values(cookies).length > 0) {
      const lo = await AccountService.authen(cookies.token);
      if (lo.status == 200) {
        // console.log("đã đăng nhập");
        setShowCard(true);
        // cookies.path_end && console.log(cookies.path_end);
        return;
      }
      setCookie('path_end', window.location.pathname, { path: '/' });
      navigate('/login');
      // console.log("Lỗi người dùng");
      return;
    }
    setCookie('path_end', window.location.pathname, { path: '/' });
    navigate('/login');
    // console.log("Chưa đăng nhập");
  };
  const handleShowModalSreach = async () => {
    setshowSreach(true);
  };
  const handleCloseSreach = () => setshowSreach(false);
  const handleClose = () => setShowCard(false);
  const [isAdmin, setisAdmin] = useState(false);
  useEffect(() => {
    if (User) {
      User.role == 'admin' ? setisAdmin(true) : setisAdmin(false);
    }
  }, [User]);

  return (
    <div className="nav_vip">
      <div className="nav container p-0">
        <SreachModal
          placement={'end'}
          show={showSreach}
          onClose={handleCloseSreach}
        />
        <CardModal placement={'end'} show={showCard} onClose={handleClose} />
        <div className="nav_logo">
          <Link to={'/'}>
            Wibu<span>store</span>
          </Link>
        </div>
        <Menu />
        <div className="nav_icon">
          <span onClick={handleShowModalSreach}>
            <i className="fa-solid fa-magnifying-glass icon"></i>
          </span>
          <Badge
            badgeContent={cardNumber}
            color="primary"
            onClick={handleShowModalCard}
          >
            <LocalMallIcon color="rgb(0, 139, 232)" className="icon" />
          </Badge>
          {isAdmin && <Notification />}
        </div>
      </div>
      <hr className="m-0" />
    </div>
  );
};

export default Nav;
