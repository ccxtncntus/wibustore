/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Table from 'react-bootstrap/Table';
import './carts.css';
import { useContext, useEffect, useState } from 'react';
import { UContexts } from '../../components/context/UserContext';
import { Contexts } from '../../components/context/Contexts';
import { FormatNumber } from '../../helpers/FormatNumber';
import { HOST } from '../../configs/DataEnv';
import * as ShoppingCartService from '../../services/ShoppingCartsService';
import * as ProductService from '../../services/ProductService';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, message, Popconfirm } from 'antd';

const Carts = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { User } = useContext(UContexts);
  const { delCardByModal } = useContext(Contexts);
  const [isCheck, setisCheck] = useState([]);
  const [ListCart, setListCart] = useState([]);
  const FormatImg = (imgs) => {
    const img = imgs.split(',')[0];
    return img;
  };
  useEffect(() => {
    const chay = async () => {
      // console.log(state);
      if (state) {
        if (state.list) {
          const { list } = state;
          setListCart(list);
        }
        if (state.id_product) {
          const { id_product } = state;
          const data = await ProductService.productId(id_product);
          if (data.status == 200) {
            const product = data.data[0];
            const i = FormatImg(product.all_images);
            const newItem = {
              id: 0,
              idProduct: product.id,
              img: i,
              name: product.name,
              price: product.price,
              quantity: 1,
              saleoff: product.saleoff,
            };
            // console.log(newItem);
            setListCart([newItem]);
          }
        }
      } else {
        if (User) {
          const lists = await ShoppingCartService.listOfUser(User.id);
          setListCart(lists);
        }
      }
    };
    chay();
  }, [User]);

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
    setisCheck(e.target.checked ? ListCart : []);
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
    const update = await ShoppingCartService.updateQuantity(
      item.id,
      e.target.value
    );
    // console.log(update);
    ListCart[index].quantity = e.target.value;
    setListCart([...ListCart]);
  };
  const handleCheckOut = () => {
    // console.log(isCheck);
    navigate('/check-out', { state: { listCart: isCheck } });
  };

  const confirm = async (i) => {
    delCardByModal(i);
    await ShoppingCartService.delCart(i.id);
    const del = ListCart.filter((item) => item.id !== i.id);
    setListCart(del);
    message.success('Xóa thành công');
  };
  const cancel = () => {};
  return (
    <div className="carts mt-2">
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
                        src={HOST + '/uploads/' + item.img}
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
                      <Popconfirm
                        title="Delete the product"
                        description="Xóa sản phẩm này khỏi giỏ hàng?"
                        onConfirm={() => confirm(item)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button danger>
                          <i className="fa-solid fa-trash-can"></i>
                        </Button>
                      </Popconfirm>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="4"></td>
                <td>
                  Giá trị tổng:
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
        </>
      ) : (
        'Không có sản phẩm'
      )}
    </div>
  );
};
export default Carts;
