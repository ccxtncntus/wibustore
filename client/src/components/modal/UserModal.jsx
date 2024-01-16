import { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./cardmodal.css";
import { NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";
const UserModal = ({ placement, show, onClose }) => {
  const [cookies, setCookie, removeToken] = useCookies(["token"]);
  useEffect(() => {
    if (show) {
      console.log(show);
    }
  }, [show]);

  const logOut = async () => {
    await removeToken(["token"]);
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
              <NavLink
                to={"/login"}
                className="list-group-item list-group-item-action"
                onClick={() => onClose()}
              >
                Đăng nhập
              </NavLink>
              <NavLink
                to={"/admin/categories"}
                className="list-group-item list-group-item-action"
              >
                Admin
              </NavLink>
              <NavLink
                to={"/3"}
                className="list-group-item list-group-item-action"
              >
                Quản lí đơn hàng
              </NavLink>
              <li
                to={"/4"}
                className="list-group-item list-group-item-action"
                onClick={() => logOut()}
              >
                Đăng xuất
              </li>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default UserModal;
