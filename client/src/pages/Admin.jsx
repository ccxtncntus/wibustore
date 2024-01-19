import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import * as AccountService from "../services/AccountService";
import { useCookies } from "react-cookie";
const Admin = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [IsAdmin, setIsAdmin] = useState(false);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    const adminCheck = async () => {
      setLoading(true);
      if (Object.values(cookies.length > 0)) {
        if (cookies.token) {
          const login = await AccountService.authen(cookies.token);
          if (login.status === 200) {
            login.data.role === "user"
              ? console.log("is not admin")
              : setIsAdmin(true);
          }
        }
      }
      setLoading(false);
    };
    adminCheck();
  }, []);
  return (
    <div className="container">
      {!Loading ? (
        IsAdmin ? (
          <div className="row mt-2">
            <div className="col-md-3">
              <ul className="list-group">
                <NavLink to={"products"} className="list-group-item">
                  Products
                </NavLink>
                <NavLink to={"list-products"} className="list-group-item">
                  List products
                </NavLink>
                <NavLink to={"categories"} className="list-group-item">
                  Categories
                </NavLink>
                <li className="list-group-item">Tài khoản</li>
                <li className="list-group-item">Thống kê</li>
                <li className="list-group-item">Đơn hàng</li>
                <NavLink to={"/"} className="list-group-item">
                  Thoát
                </NavLink>
              </ul>
            </div>
            <div className="col-md-9">
              <Outlet />
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>Bạn k đủ thẩm quyền</div>
        )
      ) : (
        "loading..."
      )}
    </div>
  );
};

export default Admin;
