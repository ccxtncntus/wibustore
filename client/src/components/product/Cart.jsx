/* eslint-disable react/prop-types */
import './cart.css';
import {
  FormatNumber,
  returnMinPrice,
  // returnPrice,
} from '../../helpers/FormatNumber';
import { HOST } from '../../configs/DataEnv';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { UContexts } from '../../components/context/UserContext';
import { Contexts } from '../../components/context/Contexts';
import { message } from 'antd';
import * as ShoppingCartsService from '../../services/ShoppingCartsService';
const Cart = ({ item }) => {
  const { User } = useContext(UContexts);
  const { addCard } = useContext(Contexts);
  const da = useParams();
  const [path, setpath] = useState('/shop/');
  const format = (price, sale) => {
    return FormatNumber(price - sale);
  };
  const onceImg = (imgs) => {
    const img = imgs.split(',')[0].trim();
    return img;
  };
  useEffect(() => {
    if (Object.values(da) != '') {
      if (da.idcategory && da.category && da.pageCate) {
        setpath(
          '/shop/' +
            da.category +
            '/' +
            da.idcategory +
            '/page/' +
            da.pageCate +
            '/'
        );
        return;
      }
      if (da.idcategory && da.category) {
        setpath('/shop/' + da.category + '/' + da.idcategory + '/');
        return;
      }
    }
    setpath('/shop/');
  }, [da]);
  const handleAddCart = async (i) => {
    // add cart
    if (User) {
      const img = i.all_images.split(',')[0];
      // console.log(i);
      // console.log(returnMinPrice(item.price_and_saleoff));
      // return;
      const test1 = {
        idProduct: i.id,
        idPrice: returnMinPrice(item.price_and_saleoff).id_addPrice,
      };
      console.log(test1);
      addCard(test1);
      const chay = await ShoppingCartsService.add(
        User.id,
        i.id,
        returnMinPrice(item.price_and_saleoff).id_addPrice,
        img,
        1
      );
      chay.status === 200 && message.success(chay.message);
      return;
    }
    message.warning('Đăng nhập để thêm vào giỏ hàng');
  };

  const handletest = () => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  };
  return (
    <>
      {item ? (
        <div className="cart">
          <span className="cart_img">
            <img src={HOST + '/uploads/' + onceImg(item.all_images)} alt="" />
            <span className="cart_img_add" onClick={() => handleAddCart(item)}>
              Thêm vào giỏ hàng
            </span>
          </span>
          <NavLink
            to={path + item.id}
            style={{ display: 'block' }}
            className="mt-2"
            onClick={handletest}
          >
            {item.name || 'name'}
          </NavLink>
          <span style={{ display: 'block' }} className="mt-1">
            {format(
              returnMinPrice(item.price_and_saleoff).price,
              returnMinPrice(item.price_and_saleoff).saleoff
            )}{' '}
            {returnMinPrice(item.price_and_saleoff).saleoff > 0 && (
              <del style={{ fontSize: '.8rem' }}>
                {FormatNumber(returnMinPrice(item.price_and_saleoff).price)}
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
          <span style={{ display: 'block' }} className="mt-2">
            name
          </span>
          <span style={{ display: 'block' }} className="mt-1">
            10
          </span>
        </div>
      )}
    </>
  );
};

export default Cart;
