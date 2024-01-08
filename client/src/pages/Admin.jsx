import { NavLink, Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="container">
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
            <li className="list-group-item">Thoát</li>
          </ul>
        </div>
        <div className="col-md-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
