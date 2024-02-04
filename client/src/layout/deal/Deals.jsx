import "./deals.css";
import Cart from "../../components/product/Cart";
import ProductLoading from "../../components/loadingProduct/ProductLoading";
import * as ProductService from "../../services/ProductService";
import { useEffect, useState } from "react";
const Deal = () => {
  const [ListHot, setListHot] = useState([]);
  const test = [1, 2];
  useEffect(() => {
    const run = async () => {
      const list = await ProductService.ListHot(1, "desc");
      if (list.status === 200) {
        setListHot(list.data.data);
        return;
      }
      setListHot([]);
    };
    run();
  }, []);

  return (
    <>
      <div className="deals">
        <div className="deals_titte" style={{ textAlign: "center" }}>
          <h5>Deals & Hot</h5>
          <p>Today's deals and more</p>
        </div>
        <div className="deals_content row mt-5">
          <div className="col-md-6">1</div>
          {ListHot.length > 0
            ? ListHot.map((item, index) => (
                <div className="col-md-3" key={index}>
                  <Cart item={item} />
                </div>
              ))
            : test.map((item, index) => (
                <div className="col-md-3" key={index}>
                  <ProductLoading />
                </div>
              ))}
        </div>
        <div className="deals_button mt-5" style={{ textAlign: "center" }}>
          <button>Shop more ...</button>
        </div>
      </div>
    </>
  );
};

export default Deal;
