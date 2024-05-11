import { Link, NavLink } from 'react-router-dom';
import './menu.css';
const Menu = () => {
  return (
    <div>
      <ul className="nav_menu">
        <NavLink to={'/'}>Trang chủ</NavLink>
        <NavLink to={'/shop'}>
          Sản phẩm <i className="fa-solid fa-angle-down"></i>
        </NavLink>
        {/* <NavLink to={'/shop'}>Sale</NavLink> */}
        {/* <NavLink to={'/posts'}>Bài viết</NavLink> */}
        <Link to={'/'}>Bài viết</Link>
        {/* <NavLink to={'/contact'}>Liên hệ</NavLink> */}
        <Link to={'/'}>Liên hệ</Link>
      </ul>
    </div>
  );
};
export default Menu;
