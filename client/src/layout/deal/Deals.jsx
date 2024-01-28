import "./deals.css";
import Cart from "../../components/product/Cart";
const Deal = () => {
  return (
    <>
      <div className="deals">
        <div className="deals_titte" style={{ textAlign: "center" }}>
          <h5>Deals & Hot</h5>
          <p>Today's deals and more</p>
        </div>
        <div className="deals_content row mt-5">
          <div className="col-md-6">1</div>
          <div className="col-md-3">
            <Cart />
          </div>
          <div className="col-md-3">
            <Cart />
          </div>
        </div>
        <div className="deals_button mt-5" style={{ textAlign: "center" }}>
          <button>Shop more ...</button>
        </div>
      </div>
    </>
  );
};

export default Deal;
