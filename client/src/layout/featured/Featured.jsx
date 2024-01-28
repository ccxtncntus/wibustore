import { useState } from "react";
import "./featured.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Cart from "../../components/product/Cart";
const Featured = () => {
  const [Data, setData] = useState(0);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
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
  return (
    <div className="featured">
      <div className="featured_title">
        <span
          className={Data === 0 && "featured_title_active"}
          onClick={() => setData(0)}
        >
          Featured
        </span>
        <span
          className={Data === 1 && "featured_title_active"}
          onClick={() => setData(1)}
        >
          Sale
        </span>
      </div>
      <div className="featured_listSp mt-4">
        <Carousel responsive={responsive} showDots={true}>
          <Cart />
          <Cart />
          <Cart />
          <Cart />
          <Cart />
          <Cart />
        </Carousel>
      </div>
    </div>
  );
};

export default Featured;
