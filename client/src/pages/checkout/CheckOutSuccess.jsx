import { useEffect, useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './checkout.css';
import img from '/success.png';
import bg from '/checkoutSuccess.jpg';
import { UContexts } from '../../components/context/UserContext';
import * as OrdersService from '../../services/OrdersService';
const CheckOutSuccess = () => {
  const { User } = useContext(UContexts);
  const [buySuccess, setbuySuccess] = useState(true);
  useEffect(() => {
    const currentUrl = window.location.href;
    const urlParams = new URLSearchParams(currentUrl);
    const vnp_Status = urlParams.get('vnp_TransactionStatus');
    if (!vnp_Status) return;
    if (vnp_Status != '00') {
      setbuySuccess(false);
      if (User) {
        OrdersService.LastOrder(User.id)
          .then((i) => {
            console.log(i);
          })
          .catch((e) => {
            console.error(e);
          });
      }
    }
  }, [User]);
  return (
    <div
      className="CheckOutSuccess"
      style={{
        background: `URL(
          ${bg}
        ) center/cover no-repeat`,
      }}
    >
      <div>{buySuccess && <img src={img} />}</div>
      <p style={{ textAlign: 'center' }} className="text-light">
        {buySuccess
          ? 'Bạn đã đặt hàng thành công!'
          : 'Có lỗi xảy ra thử lại sau'}
      </p>
      <div style={{ textAlign: 'center' }}>
        <NavLink className={'btn btn-secondary'} to={'/'}>
          Trang chủ
        </NavLink>{' '}
        {buySuccess && (
          <NavLink className={'btn btn-primary'} to={'/shop'}>
            Tiếp tục mua hàng
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default CheckOutSuccess;
