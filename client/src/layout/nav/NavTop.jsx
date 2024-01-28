import { useState } from "react";
import "./navtop.css";
import UserModal from "../../components/modal/UserModal";
import { useCookies } from "react-cookie";

const NavTop = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token", "path_end"]);
  const [Name, setName] = useState(null);
  const [ShowUser, setShowUser] = useState(false);
  const handleCloseUsers = () => setShowUser(false);
  const handleShowModalUser = () => {
    setCookie("path_end", window.location.pathname, { path: "/" });
    setShowUser(true);
  };
  return (
    <div className="navtop">
      <UserModal placement={"end"} show={ShowUser} onClose={handleCloseUsers} />
      <span className="navtop_none">
        <i className="fa-solid fa-phone"></i> <span>Hotline: 0327297102</span>
      </span>
      <span onClick={handleShowModalUser}>
        <span>{Name || "Đăng nhập | Đăng kí"}</span>{" "}
        <i className="fa-solid fa-user"></i>
      </span>
    </div>
  );
};

export default NavTop;
