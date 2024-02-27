import { useEffect, useState, useContext } from "react";

import "./featured.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Cart from "../../components/product/Cart";
import ProductLoading from "../../components/loadingProduct/ProductLoading";
import * as ProductService from "../../services/ProductService";
import { ProHomeContexts } from "../../components/context/ProductHomeContex";
const Featured = () => {
  const { ProductsHome } = useContext(ProHomeContexts);
  const [Data, setData] = useState(null);
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
      if (ProductsHome) {
        setListFeatured(ProductsHome.data.data);
        return;
      }
    };
    run();
  }, [ProductsHome]);

  useEffect(() => {
    const run = async () => {
      if (Data == 0) {
        if (ProductsHome) {
          setListFeatured(ProductsHome.data.data);
        } else {
          const listFeatured = await ProductService.List(1, "desc");
          setListFeatured(
            listFeatured.status === 200 ? listFeatured.data.data : []
          );
        }
        return;
      }
      if (Data && Data != 0) {
        const listFeatured = await ProductService.ListSale(1, "desc");
        setListFeatured(
          listFeatured.status === 200 ? listFeatured.data.data : []
        );
      }
    };
    run();
  }, [Data]);
  return (
    <div className="featured">
      <div className="featured_title">
        <span
          className={
            Data === 0 || Data == null ? "featured_title_active" : undefined
          }
          onClick={() => setData(0)}
        >
          Featured
        </span>
        <span
          className={Data === 1 ? "featured_title_active" : undefined}
          onClick={() => setData(1)}
        >
          Sale
        </span>
      </div>
      <div className="featured_listSp mt-4">
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
