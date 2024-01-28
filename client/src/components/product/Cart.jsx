import "./cart.css";
const Cart = () => {
  return (
    <div className="cart">
      <span className="cart_img">
        <img
          src="https://statics.pancake.vn/web-media/97/56/bd/d7/cb5e8af680015e534fe0f910e38212aeb10d8e53ecaa2997ba88e15b.jpg"
          alt=""
        />
        <span className="cart_img_add">Thêm vào giỏ hàng</span>
      </span>
      <span style={{ display: "block" }} className="mt-2">
        Name
      </span>
      <span style={{ display: "block" }} className="mt-1">
        Giá
      </span>
    </div>
  );
};

export default Cart;
