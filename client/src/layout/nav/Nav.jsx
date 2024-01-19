import "./nav.css";
import Badge from "@mui/material/Badge";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Link, useNavigate } from "react-router-dom";
import CardModal from "../../components/modal/CardModal";
import Menu from "./Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserModal from "../../components/modal/UserModal";
import { Contexts } from "../../components/context/Contexts";
import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import * as AccountService from "../../services/AccountService";
const Nav = () => {
  const navigate = useNavigate();
  const { cardNumber } = useContext(Contexts);
  const [showCard, setShowCard] = useState(false);
  const [ShowUser, setShowUser] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token", "path_end"]);
  const handleShowModalCard = async () => {
    if (Object.values(cookies).length > 0) {
      const lo = await AccountService.authen(cookies.token);
      if (lo.status == 200) {
        console.log("đã đăng nhập");
        setShowCard(true);
        cookies.path_end && console.log(cookies.path_end);
        return;
      }
      setCookie("path_end", window.location.pathname, { path: "/" });
      navigate("/login");
      console.log("Lỗi người dùng");
      return;
    }
    setCookie("path_end", window.location.pathname, { path: "/" });
    navigate("/login");
    console.log("Chưa đăng nhập");
  };
  const handleClose = () => setShowCard(false);
  const handleShowModalUser = () => {
    setCookie("path_end", window.location.pathname, { path: "/" });
    setShowUser(true);
  };
  const handleCloseUsers = () => setShowUser(false);

  return (
    <div className="nav container-fluit">
      <CardModal placement={"end"} show={showCard} onClose={handleClose} />
      <UserModal placement={"end"} show={ShowUser} onClose={handleCloseUsers} />
      <div className="nav_logo">
        <Link to={"/"}>Wibushop</Link>
      </div>
      <Menu />
      <div className="nav_icon">
        <span>
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm..."
          />
        </span>
        <span className="nav_icon_notification" onClick={handleShowModalCard}>
          <Badge badgeContent={cardNumber.length} color="primary">
            <LocalMallIcon color="action" />
          </Badge>
        </span>
        <span className="nav_icon_notification" onClick={handleShowModalUser}>
          <AccountCircleIcon color="action" sx={{ fontSize: 26 }} />
        </span>
      </div>
    </div>
  );
};

export default Nav;
