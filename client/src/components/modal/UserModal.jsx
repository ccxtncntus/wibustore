import { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./cardmodal.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import * as AccountService from "../../services/AccountService";
const UserModal = ({ placement, show, onClose }) => {
  const [Loading, setLoading] = useState(false);
  const [cookies, setCookie, removeToken] = useCookies(["token"]);
  const [IsLogin, setIsLogin] = useState(false);
  const [IsAdmin, setIsAdmin] = useState(false);
  const natigate = useNavigate();
  useEffect(() => {
    const uModal = async () => {
      if (show) {
        if (Object.values(cookies).length > 0) {
          setLoading(true);
          const isLogin = await AccountService.authen(cookies.token);
          setIsLogin(isLogin.status === 200 ? true : false);
          setIsAdmin(isLogin.data.role == "user" ? false : true);
          setIsAdmin;
          setLoading(false);
          console.log();
          return;
        }
        setIsLogin(false);
      }
    };
    uModal();
  }, [show]);

  const logOut = async () => {
    await removeToken(["token"]);
    await removeToken(["path_end"]);
    onClose();
    await natigate("/");
  };
  return (
    <>
      <Offcanvas show={show} onHide={onClose} placement={placement}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Users</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {!Loading ? (
            <div>
              <div className="list-group">
                {IsLogin ? (
                  <>
                    {IsAdmin && (
                      <NavLink
                        to={"/admin/categories"}
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
                      <li
                        to={"/3"}
                        className="list-group-item list-group-item-action"
                      >
                        Quản lí đơn hàng
                      </li>
                    )}
                    <li
                      to={"/3"}
                      className="list-group-item list-group-item-action"
                    >
                      Đổi mật khẩu
                    </li>
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
          ) : (
            "Đang tải..."
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default UserModal;