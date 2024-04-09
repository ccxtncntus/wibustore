import { useForm } from 'react-hook-form';
import { useEffect, useState, useContext } from 'react';
import * as CheckOutService from '../../services/CheckOutService';
import * as ShoppingCartsService from '../../services/ShoppingCartsService';
import * as pay from '../../services/VnPayService';
import { useNavigate } from 'react-router-dom';
import { Contexts } from '../../components/context/Contexts';
import { UContexts } from '../../components/context/UserContext';
import * as GHN from '../../services/GHN';
import * as AddressService from '../../services/AddressService';
import { FormatNumber } from '../../helpers/FormatNumber';
import BuyAddressModal from '../../components/modal/BuyAddressModal';
import * as NotificationService from '../../services/NotificationService';
import { message } from 'antd';

const CheckOutInformation = (props) => {
  const { User } = useContext(UContexts);
  const { delCard } = useContext(Contexts);
  const natigate = useNavigate();
  const { Carts, Totail } = props;

  const [value, setValue] = useState(0);
  const [Loading, setLoading] = useState(false);
  const [se, setse] = useState(false);
  const [feeShip, setfeeShip] = useState(0);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const { handleSubmit } = useForm();
  const [addressDefault, setaddressDefault] = useState(null);
  const onSubmit = async () => {
    if (!addressDefault || addressDefault.length == 0) {
      message.warning('Vui lòng cập nhật địa chỉ');
      return;
    }
    if (value == 1) {
      localStorage.setItem('carts', JSON.stringify(Carts));
      const ad = addressDefault[0];
      const address =
        ad.address + ', ' + ad.xa + ', ' + ad.huyen + ', ' + ad.tinh;
      localStorage.setItem('address', address);
      localStorage.setItem('phone', ad.phone);
      localStorage.setItem('userid', User.id);
      // vnpay
      // ---------------------------------------------------
      const Totails = Totail + feeShip;
      localStorage.setItem('tong', Totails);
      const ma = Math.floor(Math.random() * 99999);
      const da = await pay.pay(ma, Totails);
      window.location.assign(da.data);
    } else {
      // console.log(Totail + feeShip);
      if (!se) {
        const ad = addressDefault[0];
        setLoading(true);
        const address =
          ad.address + ', ' + ad.xa + ', ' + ad.huyen + ', ' + ad.tinh;
        const Totails = Totail + feeShip;
        const addOrders = await CheckOutService.create(
          User.id,
          address,
          value,
          ad.phone,
          Totails
        );
        if (addOrders && addOrders.status === 200) {
          Carts.map(async (item) => {
            try {
              const da = await CheckOutService.createDetail(
                addOrders.lastID,
                item.idProduct,
                item.name,
                item.price - item.saleoff,
                Number(item.quantity),
                item.img
              );
              if (da.status === 200) {
                if (item.id != 0) {
                  // bớt số lượng trong product
                  delCard(item);
                  await ShoppingCartsService.productBuyed(
                    item.idProduct,
                    Number(item.quantity)
                  );
                  // xóa trong giỏ hàng
                  await ShoppingCartsService.delCart(item.id);
                }
              }
            } catch (error) {
              console.error('Error creating detail:', error);
              return;
            }
          });
          NotificationService.sendMess('notification')
            .then((i) => {
              setLoading(false);
              natigate('/check-out/success');
            })
            .catch((e) => {
              setLoading(false);
              console.log(e);
            });
        }
      } else {
        console.log('mới');
      }
    }
  };
  useEffect(() => {
    const run = async () => {
      if (User) {
        if (!se) {
          const de = await AddressService.getDefault(User.id);
          setaddressDefault(de);
        } else {
          setfeeShip(0);
        }
      }
    };
    run();
  }, [User, se]);
  useEffect(() => {
    const run = async () => {
      if (addressDefault && addressDefault.length > 0) {
        const data = await GHN.fee(
          addressDefault[0].district_id,
          addressDefault[0].ward_code
        );
        if (data) {
          const end = data.data;
          end.code == 200 && setfeeShip(end.data.total);
        }
      }
    };
    run();
  }, [addressDefault]);
  const [modalShow, setModalShow] = useState(false);
  // console.log(addressDefault);
  const setAddress = (data) => {
    setaddressDefault(data);
  };
  return (
    <div className="checkout_information_user col-md-6">
      <BuyAddressModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        setad={setAddress}
      />
      <h3>Thông tin khách hàng</h3>
      <span>
        <span
          className="checkout_information_user_change"
          onClick={() => setse(false)}
          style={{ color: !se && 'rgb(0, 139, 232)' }}
        >
          Mặc định
        </span>{' '}
        -{' '}
        <span
          className="checkout_information_user_change"
          // onClick={() => setse(true)}
          onClick={() => setModalShow(true)}
          style={{ color: se && 'rgb(0, 139, 232)' }}
        >
          Mới
        </span>
      </span>
      {/* thêm */}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* họ tên */}
        <div className="addressuser_once">
          <hr />
          {addressDefault && addressDefault.length > 0 ? (
            <div className="addressuser_once_title">
              <p className="mb-2">
                <span style={{ fontWeight: 500 }}>
                  {addressDefault[0].name}
                </span>{' '}
                - {addressDefault[0].phone}
              </p>
              <p className="mb-2">{addressDefault[0].address}</p>
              <p className="mb-2">
                {addressDefault[0].xa} - {addressDefault[0].huyen} -{' '}
                {addressDefault[0].tinh}
              </p>
            </div>
          ) : (
            'Bạn chưa có địa chỉ mặc định hay thêm mới'
          )}
          <hr />
        </div>

        <div>Phí vận chuyển : {FormatNumber(feeShip)}</div>
        <div>
          <span style={{ fontWeight: 500 }}>Tổng tiền</span> :{' '}
          {FormatNumber(Totail + feeShip)}
        </div>
        <div className="checkout_information_user_radio">
          <span>
            <input
              type="radio"
              name="cash"
              onChange={(e) => handleChange(e)}
              value={0}
              checked={value == 0}
              id="cash"
            />
            <label style={{ marginLeft: 4 }} htmlFor="cash">
              Thanh toán khi nhận hàng
            </label>
          </span>
          <span>
            <input
              type="radio"
              name="vnpay"
              id="creditcart"
              onChange={(e) => handleChange(e)}
              value={1}
              checked={value == 1}
            />
            <label style={{ marginLeft: 4 }} htmlFor="creditcart">
              VN pay
            </label>
          </span>
        </div>
        <div>
          <input
            className="btn btn-secondary mt-2"
            type="submit"
            value={!Loading ? 'Mua' : 'loading...'}
            disabled={Loading}
          />
        </div>
      </form>

      {/* Button */}
    </div>
  );
};
// <button onClick={handleVN}>thanh toán</button>;
export default CheckOutInformation;
