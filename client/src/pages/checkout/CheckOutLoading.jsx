import { useEffect, useContext, useState } from 'react';
import * as CheckOutService from '../../services/CheckOutService';
import * as ShoppingCartsService from '../../services/ShoppingCartsService';
import { useNavigate } from 'react-router-dom';
import { Contexts } from '../../components/context/Contexts';
import * as NotificationService from '../../services/NotificationService';
import './checkout.css';
import { message } from 'antd';

const parseURLParams = (url) => {
  var queryStart = url.indexOf('?') + 1,
    queryEnd = url.indexOf('#') + 1 || url.length + 1,
    query = url.slice(queryStart, queryEnd - 1),
    pairs = query.replace(/\+/g, ' ').split('&'),
    parms = {},
    i,
    n,
    v,
    nv;
  if (query === url || query === '') return;
  for (i = 0; i < pairs.length; i++) {
    nv = pairs[i].split('=', 2);
    n = decodeURIComponent(nv[0]);
    v = decodeURIComponent(nv[1]);
    if (!parms.hasOwnProperty(n)) parms[n] = [];
    parms[n].push(nv.length === 2 ? v : null);
  }
  return parms;
};

const CheckOutLoading = () => {
  const { delCard, setAll } = useContext(Contexts);
  const navigate = useNavigate();
  const [isPay, setIsPay] = useState(false);
  const [isFalse, setFalse] = useState('Đang xử lí đơn hàng của bạn...');

  const [cartss, setcarts] = useState(null);
  const [phones, setphones] = useState(null);
  const [addresss, setaddresss] = useState(null);
  const [userids, setuserids] = useState(null);
  const [tong, settong] = useState(null);
  useEffect(() => {
    const run = async () => {
      const path = window.location.href;
      const urlParams = parseURLParams(path);
      if (
        urlParams?.vnp_ResponseCode[0] &&
        urlParams?.vnp_ResponseCode[0] === '00'
      ) {
        const carts = JSON.parse(localStorage.getItem('carts'));
        const phone = localStorage.getItem('phone');
        const address = localStorage.getItem('address');
        if (carts && phone && address) {
          setcarts(JSON.parse(localStorage.getItem('carts')));
          setphones(localStorage.getItem('phone'));
          setaddresss(localStorage.getItem('address'));
          setuserids(localStorage.getItem('userid'));
          settong(localStorage.getItem('tong'));

          setIsPay(true);
          localStorage.removeItem('carts');
          localStorage.removeItem('phone');
          localStorage.removeItem('address');
          localStorage.removeItem('userid');
          localStorage.removeItem('tong');
        }
      } else {
        setFalse('Thanh toán thất bại!');
      }
    };
    run();
  }, []);
  useEffect(() => {
    const run = async () => {
      if (isPay) {
        const addOrders = await CheckOutService.create(
          userids,
          addresss,
          1,
          phones,
          tong
        );
        if (addOrders && addOrders.status === 200) {
          for (const item of cartss) {
            try {
              const da = await CheckOutService.createDetail(
                addOrders.lastID,
                item.idProduct,
                item.name,
                item.price - item.saleoff,
                Number(item.quantity),
                item.img
              );
              if (da.status === 200 && item.id !== 0) {
                // delCard(item);
                await ShoppingCartsService.productBuyed(
                  item.idProduct,
                  Number(item.quantity)
                );
                await ShoppingCartsService.delCart(item.id);
              }
            } catch (error) {
              console.error('Error creating detail:', error);
              return;
            }
          }
          await NotificationService.sendMess('notification');
          setAll();
          navigate('/check-out/success');
        } else {
          message.error('Có lỗi xảy ra xin thử lại sau');
        }
      }
    };
    run();
  }, [isPay]);

  return (
    <div className="checkout_loading_vip">
      <div className="checkout_loading_vip_child">
        <div className="checkout_loading" style={{ minHeight: '80vh' }}>
          <h5 className="vip">
            {isFalse} <span className="loaderss"></span>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default CheckOutLoading;
