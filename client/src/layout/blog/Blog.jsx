// import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import CartBlog from './CartBlog';
import './blog.css';
const Blog = () => {
  return (
    <div className="blogLayout_vip">
      {/* <hr /> */}
      <div className="featured container p-0">
        <div className="featured_title">
          <h5>
            Bài viết <span className="vip">mới</span>
          </h5>
          <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</span>
        </div>
        <Link to={'#'} className="views_all vip">
          Xem tất cả <i className="fa-solid fa-angles-right"></i>
        </Link>
        <div className="mt-3 row">
          <div className="col-4">
            <CartBlog />
          </div>
          <div className="col-4">
            <CartBlog />
          </div>
          <div className="col-4">
            <CartBlog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
