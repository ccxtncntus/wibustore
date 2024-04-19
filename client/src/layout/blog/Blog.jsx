// import './blog.css';
// const Blog = () => {
//   return <div className="blog container">Blog</div>;
// };

// export default Blog;

import { useEffect, useState, useContext } from 'react';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Cart from '../../components/product/Cart';
import ProductLoading from '../../components/loadingProduct/ProductLoading';
import * as ProductService from '../../services/ProductService';
import { ProHomeContexts } from '../../components/context/ProductHomeContex';
import { Link } from 'react-router-dom';
import CartBlog from './CartBlog';
const Blog = () => {
  const { ProductsHome } = useContext(ProHomeContexts);
  const test = [1, 2, 3, 4];
  const [ListFeatured, setListFeatured] = useState([]);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  useEffect(() => {
    const run = async () => {
      if (ProductsHome) {
        // console.log(ProductsHome);
        setListFeatured(ProductsHome.data.data);
      } else {
        const listFeatured = await ProductService.List(1, 'desc');
        setListFeatured(
          listFeatured.status === 200 ? listFeatured.data.data : []
        );
      }
    };
    run();
  }, [ProductsHome]);

  return (
    <>
      <hr />
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
    </>
  );
};

export default Blog;
