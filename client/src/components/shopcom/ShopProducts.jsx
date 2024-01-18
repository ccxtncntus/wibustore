import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "./shopproductschild.css";
import * as ProductsServices from "../../services/ProductService";
const ShopProducts = ({ Products }) => {
  const [ListProducts, setListProducts] = useState([]);
  const path = window.location.pathname;
  const [pathOk, setpathOk] = useState("");
  useEffect(() => {
    setpathOk(path);
  }, [path]);
  useEffect(() => {
    if (Products !== "") {
      setListProducts(Products.data.data);
    }
    return () => {};
  }, [Products]);

  function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ";
  }

  return (
    <>
      <div className="w-25">
        <Form.Select aria-label="Default select example">
          <option>Sorting default</option>
          <option value="2">Sort by price: low to high</option>
          <option value="3">Sort by price: high to low</option>
        </Form.Select>
      </div>
      {ListProducts.length > 0 ? (
        <div className="shop_products mt-2">
          {ListProducts.map((item, index) => (
            <div className="shop_product_child" key={index}>
              <img
                src="https://i.pinimg.com/564x/6b/c8/43/6bc843572895746afca2772add4f9e97.jpg"
                alt=""
              />
              <NavLink to={pathOk + "/" + item.id}>{item.name}</NavLink>
              <div>
                {currencyFormat(item.price - item.saleoff)}{" "}
                <strike className="shop_product_child_sale">
                  {item.saleoff > 0 && currencyFormat(item.price)}
                </strike>
              </div>
              {item.saleoff > 0 && (
                <div className="shop_product_child_sale_icon">sale</div>
              )}
              {/* <i className="fa-regular fa-heart shop_product_child_heart"></i>   */}
            </div>
          ))}
        </div>
      ) : (
        "Tạm thời hết sản phẩm"
      )}
    </>
  );
};

export default ShopProducts;
