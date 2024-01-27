import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./menu.css";
import PostsMenu from "../../components/menuchild/PostsMenu";
import ProductsMenu from "../../components/menuchild/ProductsMenu";
const Menu = () => {
  const [hovering, sethovering] = useState(null);
  const [popoverLeft, setpopoverLeft] = useState(null);
  return (
    <div>
      <ul className="nav_menu">
        <NavLink
          onMouseEnter={() => {
            sethovering(null);
          }}
          to={"/"}
        >
          Trang chủ
        </NavLink>
        <NavLink
          onMouseEnter={(e) => {
            sethovering(0);
            setpopoverLeft(e.currentTarget.offsetLeft);
          }}
          to={"/shop"}
        >
          Shop
        </NavLink>
        <NavLink
          onMouseEnter={() => {
            sethovering(null);
          }}
          to={"/posts"}
        >
          Bài viết
        </NavLink>
        <NavLink
          onMouseEnter={() => {
            sethovering(null);
          }}
          to={"/contact"}
        >
          Lên hệ
        </NavLink>
        <div
          onMouseLeave={() => {
            sethovering(null);
          }}
          style={{
            left: popoverLeft - 200 || 0,
            zIndex: 999,
          }}
          className={
            hovering !== null
              ? "nav_hover"
              : "opacity-0 pointer-events nav_hover_s"
          }
        >
          {hovering === 0 && <ProductsMenu />}
        </div>
      </ul>
    </div>
  );
};

export default Menu;
