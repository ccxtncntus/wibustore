import { useEffect, useState } from 'react';
import './featured.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Cart from '../../components/product/Cart';
import ProductLoading from '../../components/loadingProduct/ProductLoading';
import * as ProductService from '../../services/ProductService';
import { Link } from 'react-router-dom';
const Featured = () => {
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
      const listFeatured = await ProductService.List(1, 'desc');
      setListFeatured(
        listFeatured.status === 200 ? listFeatured.data.data : []
      );
    };
    run();
  }, []);
  return (
    <div className="featured_vip">
      <div className="featured container p-0">
        <div className="featured_title">
          <h5>
            Sản phẩm <span className="vip">mới</span>
          </h5>
          <span>Sản phẩm được cập nhật liên tục mỗi ngày</span>
        </div>
        <Link to={'/shop'} className="views_all vip">
          Xem tất cả <i className="fa-solid fa-angles-right"></i>
        </Link>
        <div className="featured_listSp mt-2">
          <Carousel responsive={responsive} showDots={ListFeatured.length > 4}>
            {ListFeatured.length > 0
              ? ListFeatured.map((item, index) => (
                  <Cart key={index} item={item} />
                ))
              : test.map((item, index) => <ProductLoading key={index} />)}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Featured;
