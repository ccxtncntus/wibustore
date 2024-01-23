import Table from "react-bootstrap/Table";
import "./carts.css";
import { useContext, useEffect, useState } from "react";
import { Contexts } from "../../components/context/Contexts";
import { FormatNumber } from "../../helpers/FormatNumber";
import { HOST } from "../../configs/DataEnv";
import * as ShoppingCartService from "../../services/ShoppingCartsService";
import { useNavigate } from "react-router-dom";
const Carts = () => {
  const navigate = useNavigate();
  const { cardNumber } = useContext(Contexts);
  const [isCheck, setisCheck] = useState([]);
  const [ListCart, setListCart] = useState([]);
  useEffect(() => {
    cardNumber.length > 0 && setListCart(cardNumber);
  }, [cardNumber]);

  const handleChange = (e) => {
    const is = isCheck.some((item) => item === e);
    if (is) {
      const data = isCheck.filter((item) => item !== e);
      setisCheck(data);
    } else {
      setisCheck([...isCheck, e]);
    }
  };
  const handleCheckAll = (e) => {
    setisCheck(e.target.checked ? cardNumber : []);
  };
  const [AllTotail, setAllTotail] = useState(0);
  useEffect(() => {
    if (isCheck.length > 0) {
      let a = 0;
      isCheck.map((item) => {
        a += (item.price - item.saleoff) * item.quantity;
      });
      setAllTotail(a);
    } else {
      setAllTotail(0);
    }
    return () => {};
  }, [isCheck, ListCart]);

  const handleQuantity = async (data) => {
    const { e, index, item } = data;
    const product = await ShoppingCartService.iProduct(item.name);
    if (e.target.value <= 0) {
      e.target.value = 1;
    }
    if (product.quantity < e.target.value) {
      e.target.value = product.quantity;
    }
    ListCart[index].quantity = e.target.value;
    setListCart([...ListCart]);
  };
  const handleDelCart = async (i) => {
    console.log({ del: i });
    // const data = ListCart.filter((item) => item !== i);
    // setListCart(data);
  };
  const handleCheckOut = () => {
    // console.log(isCheck);
    navigate("/check-out", { state: { listCart: isCheck } });
  };
  return (
    <div className="carts container mt-2">
      {ListCart.length > 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheckAll(e)}
                    checked={isCheck.length === ListCart.length}
                  />
                </th>
                <th>Sản Phẩm</th>
                <th>Đơn Giá</th>
                <th>Số Lượng</th>
                <th>Số tiền</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {ListCart.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        onChange={() => handleChange(item)}
                        checked={isCheck.some((i) => i === item)}
                      />
                    </td>
                    <td className="carts_img">
                      <img
                        src={HOST + "/uploads/" + item.img}
                        alt={item.name}
                      />
                      <span>{item.name}</span>
                    </td>
                    <td>{FormatNumber(item.price - item.saleoff)}</td>

                    <td>
                      <input
                        defaultValue={item.quantity}
                        onBlur={(e) =>
                          handleQuantity({ e: e, index: index, item: item })
                        }
                        type="number"
                        className="form-control"
                        style={{ width: 80 }}
                      />
                    </td>
                    <td>
                      {FormatNumber(
                        (item.price - item.saleoff) * item.quantity
                      )}
                    </td>
                    <td>
                      <i
                        className="fa-solid fa-trash-can"
                        onClick={() => handleDelCart(item)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className="carts_footer">
            {" "}
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>
                    Tổng thanh toán:
                    <p style={{ margin: 0 }}>{FormatNumber(AllTotail)}</p>
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={handleCheckOut}
                      disabled={!isCheck.length}
                    >
                      Mua ngay
                    </button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </>
      ) : (
        "Không có sản phẩm"
      )}
    </div>
  );
};
export default Carts;
