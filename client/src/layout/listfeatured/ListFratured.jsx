import "./listfrature.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Cart from "../../components/product/Cart";
import { useState } from "react";
const ListFratured = () => {
  const [Selects, setSelects] = useState(0);
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
    <div className="listfrature">
      <div className="listfrature_title">
        <h5>ListFratured</h5>
        <ul>
          <li
            className={Selects === 0 && "listfrature_title_active"}
            onClick={() => setSelects(0)}
          >
            All
          </li>
          <li>HxH</li>
          <li>One piece</li>
          <li>Fairy tail</li>
          <li>Vip</li>
        </ul>
      </div>
      <div className="listfrature_products">
        {/* <div className="featured_listSp mt-4"> */}
        <Carousel responsive={responsive} showDots={true}>
          <Cart />
          <Cart />
          <Cart />
          <Cart />
          <Cart />
          <Cart />
          <Cart />
          <Cart />
          <Cart />
        </Carousel>
        {/* </div> */}
      </div>
    </div>
  );
};

export default ListFratured;
