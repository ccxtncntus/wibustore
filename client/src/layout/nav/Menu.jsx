import { NavLink } from 'react-router-dom';
import './menu.css';
const Menu = () => {
  return (
    <div>
      <ul className="nav_menu">
        <NavLink to={'/'}>Trang chủ</NavLink>
        <NavLink to={'/shop'}>Sản phẩm</NavLink>
        <NavLink to={'/posts'}>Bài viết</NavLink>
        <NavLink to={'/contact'}>Liên hệ</NavLink>
      </ul>
    </div>
  );
};
export default Menu;
