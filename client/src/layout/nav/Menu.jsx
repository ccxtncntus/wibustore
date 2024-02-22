import { NavLink } from "react-router-dom";
import "./menu.css";
const Menu = () => {
  return (
    <div>
      <ul className="nav_menu">
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/shop"}>Products</NavLink>
        <NavLink to={"/posts"}>Blog</NavLink>
        <NavLink to={"/contact"}>Contact us</NavLink>
      </ul>
    </div>
  );
};
export default Menu;
