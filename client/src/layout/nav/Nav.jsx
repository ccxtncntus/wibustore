import "./nav.css";
import Badge from "@mui/material/Badge";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Link } from "react-router-dom";
import CardModal from "../../components/modal/CardModal";
import Menu from "./Menu";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import UserModal from "../../components/modal/UserModal";
const Nav = () => {
  const [showCard, setShowCard] = useState(false);
  const handleShowModalCard = () => {
    setShowCard(true);
  };
  const handleClose = () => setShowCard(false);

  const [ShowUser, setShowUser] = useState(false);
  const handleShowModalUser = () => {
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
          <Badge badgeContent={1} color="primary">
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
