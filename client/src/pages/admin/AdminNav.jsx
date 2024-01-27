import { NavLink, useNavigate } from "react-router-dom";
import img from "../../../public/hayate.png";
// import "./adminnav.css";
const AdminNav = () => {
  const navigate = useNavigate();
  const handleOut = () => {
    navigate("/");
  };
  return (
    <>
      <div className="admin_nav_logo">
        <i className="fa-solid fa-ghost"></i>
        <span>WibuStore</span>
      </div>
      <ul className="list-group admin_nav_ul">
        <NavLink to={"dashboard"} className="list-group-item">
          Dashboard
        </NavLink>
        <NavLink to={"products"} className="list-group-item">
          Products
        </NavLink>
        <NavLink to={"list-products"} className="list-group-item">
          List products
        </NavLink>
        <NavLink to={"categories"} className="list-group-item">
          Categories
        </NavLink>
        <NavLink to={"/45"} className="list-group-item">
          Tài khoản
        </NavLink>
        <NavLink to={"/"} className="list-group-item">
          Orders
        </NavLink>
        <div className="admin_nav_out">
          <img src={img} alt="" />
          <p onClick={handleOut}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Thoát
          </p>
        </div>
      </ul>
    </>
  );
};

export default AdminNav;
