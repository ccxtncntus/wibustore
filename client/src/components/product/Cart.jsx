import "./cart.css";
import { FormatNumber } from "../../helpers/FormatNumber";
import { HOST } from "../../configs/DataEnv";
import { NavLink } from "react-router-dom";
const Cart = ({ item }) => {
  const format = (price, sale) => {
    return FormatNumber(price - sale);
  };
  const onceImg = (imgs) => {
    const img = imgs.split(",")[0].trim();
    return img;
  };
  return (
    <>
      {item ? (
        <div className="cart">
          <span className="cart_img">
            <img src={HOST + "/uploads/" + onceImg(item.all_images)} alt="" />
            <span className="cart_img_add">Thêm vào giỏ hàng</span>
          </span>
          <NavLink
            to={`/shop/${item.id}`}
            style={{ display: "block" }}
            className="mt-2"
          >
            {item.name || "name"}
          </NavLink>
          <span style={{ display: "block" }} className="mt-1">
            {format(item.price, item.saleoff)}{" "}
            {item.saleoff > 0 && (
              <del style={{ fontSize: ".8rem" }}>
                {FormatNumber(item.price)}
              </del>
            )}
          </span>
        </div>
      ) : (
        <div className="cart">
          <span className="cart_img">
            <img
              src="https://statics.pancake.vn/web-media/97/56/bd/d7/cb5e8af680015e534fe0f910e38212aeb10d8e53ecaa2997ba88e15b.jpg"
              alt=""
            />
            <span className="cart_img_add">Thêm vào giỏ hàng</span>
          </span>
          <span style={{ display: "block" }} className="mt-2">
            name
          </span>
          <span style={{ display: "block" }} className="mt-1">
            10
          </span>
        </div>
      )}
    </>
  );
};

export default Cart;
