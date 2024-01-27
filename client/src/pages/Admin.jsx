import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import * as AccountService from "../services/AccountService";
import { useCookies } from "react-cookie";
import AdminNav from "./admin/AdminNav";
import "./admin/admincontent.css";
import "./admin/adminnav.css";
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
    <div className="container-fluit admin">
      {!Loading ? (
        IsAdmin ? (
          <div className="row">
            <div className="col-md-2">
              <div className="admin_nav">
                <AdminNav />
              </div>
            </div>
            <div className="col-md-10 admin_content">
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
