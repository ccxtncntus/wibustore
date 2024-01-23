import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { FormatNumber } from "../../helpers/FormatNumber";
import { useLocation } from "react-router-dom";
import { HOST } from "../../configs/DataEnv";
const CheckOutCart = (props) => {
  const { onTotail } = props;
  const { state } = useLocation();
  const [Buy, setBuy] = useState([]);
  const [Totail, setTotail] = useState(0);
  useEffect(() => {
    if (state) {
      const { listCart } = state;
      setBuy(listCart);
    }
    return () => {};
  }, []);
  useEffect(() => {
    if (Buy.length > 0) {
      let t = 0;
      Buy.map((item) => {
        t += (item.price - item.saleoff) * item.quantity;
      });
      setTotail(t);
      onTotail(t);
    }
    return () => {};
  }, [Buy]);
  return (
    <div className="checkout_shopping_cart col-md-6">
      <h3>Giỏ hàng</h3>
      <div className="checkout_cart">
        <Table striped hover>
          <thead>
            <tr>
              <th style={{ color: "gray" }}>Sản phẩm</th>
              <th style={{ color: "gray" }}>Đơn giá</th>
              <th style={{ color: "gray" }}>Số luợng</th>
              <th style={{ color: "gray" }}>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {Buy.length > 0 ? (
              Buy.map((item, index) => (
                <tr key={index}>
                  <td className="checkout_cart_child">
                    <img src={HOST + "/uploads/" + item.img} alt="" />
                    <span>{item.name}</span>
                  </td>
                  <td>{FormatNumber(item.price - item.saleoff)}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {FormatNumber((item.price - item.saleoff) * item.quantity)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="checkout_cart_child">
                  <img
                    src="https://i.pinimg.com/736x/e0/f7/a7/e0f7a7952a8ea87cfaa14d49ef0c6ef5.jpg"
                    alt=""
                  />
                  <span>Name</span>
                </td>
                <td>{FormatNumber(0)}</td>
                <td>{0}</td>
                <td>{FormatNumber(0)}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <div className="checkout_temporary mt-2">
        <table className="table">
          <tbody>
            <tr>
              <td>Tạm tính:</td>
              <td className="checkout_temporary_money">
                {FormatNumber(Totail)}
              </td>
            </tr>
            <tr>
              <td>Phí vận chuyển:</td>
              <td className="checkout_temporary_money">30.000 đ</td>
            </tr>
            <tr>
              <td>Thành tiền:</td>
              <td className="checkout_temporary_money">
                {FormatNumber(Totail + 30000)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default CheckOutCart;
