import { useEffect, useState } from "react";
import "./featured.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Cart from "../../components/product/Cart";
import ProductLoading from "../../components/loadingProduct/ProductLoading";
import * as ProductService from "../../services/ProductService";
import AOS from "aos";
import "aos/dist/aos.css";

const Featured = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  }, []);
  const [Data, setData] = useState(0);
  const test = [1, 2, 3, 4];
  const [ListFeatured, setListFeatured] = useState([]);
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
  useEffect(() => {
    const run = async () => {
      if (Data == 0) {
        const listFeatured = await ProductService.List(1, "desc");
        setListFeatured(
          listFeatured.status === 200 ? listFeatured.data.data : []
        );
        return;
      }
      const listFeatured = await ProductService.ListSale(1, "desc");
      setListFeatured(
        listFeatured.status === 200 ? listFeatured.data.data : []
      );
    };
    run();
  }, [Data]);
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
      <div className="featured_listSp mt-4" data-aos="fade-up">
        <Carousel responsive={responsive} showDots={ListFeatured.length > 4}>
          {ListFeatured.length > 0
            ? ListFeatured.map((item, index) => (
                <Cart key={index} item={item} />
              ))
            : test.map((item, index) => <ProductLoading key={index} />)}
        </Carousel>
      </div>
    </div>
  );
};

export default Featured;
