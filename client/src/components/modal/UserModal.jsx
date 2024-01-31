import { useEffect, useState, useContext } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./cardmodal.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import * as AccountService from "../../services/AccountService";
import { UContexts } from "../../components/context/UserContext";
const UserModal = ({ placement, show, onClose }) => {
  const { User } = useContext(UContexts);
  const [Loading, setLoading] = useState(false);
  const [cookies, setCookie, removeToken] = useCookies(["token"]);
  const [IsLogin, setIsLogin] = useState(false);
  const [IsAdmin, setIsAdmin] = useState(false);
  const natigate = useNavigate();
  useEffect(() => {
    const uModal = async () => {
      if (show) {
        if (User) {
          setIsLogin(true);
          setIsAdmin(User.role == "user" ? false : true);
        } else {
          setIsLogin(false);
        }
      }
    };
    uModal();
  }, [show]);

  const logOut = async () => {
    await removeToken(["token"]);
    await removeToken(["path_end"]);
    onClose();
    // await natigate("/login");
  };
  const handleClose = () => {
    onClose();
  };
  return (
    <>
      <Offcanvas show={show} onHide={onClose} placement={placement}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Users</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <div className="list-group">
              {IsLogin ? (
                <>
                  {IsAdmin && (
                    <NavLink
                      to={"/admin/dashboard"}
                      className="list-group-item list-group-item-action"
                    >
                      Admin
                    </NavLink>
                  )}

                  <li
                    to={"/3"}
                    className="list-group-item list-group-item-action"
                  >
                    Trang cá nhân
                  </li>
                  {!IsAdmin && (
                    <NavLink
                      onClick={handleClose}
                      to={"/my-orders"}
                      className="list-group-item list-group-item-action"
                    >
                      Đơn hàng của bạn
                    </NavLink>
                  )}

                  <NavLink
                    to={"/changepass"}
                    className="list-group-item list-group-item-action"
                  >
                    Đổi mật khẩu
                  </NavLink>
                  <li
                    className="list-group-item list-group-item-action"
                    onClick={() => logOut()}
                  >
                    Đăng xuất
                  </li>
                </>
              ) : (
                <NavLink
                  to={"/login"}
                  className="list-group-item list-group-item-action"
                  onClick={() => onClose()}
                >
                  Đăng nhập
                </NavLink>
              )}
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default UserModal;
