import { useForm } from "react-hook-form";
import { useEffect, useState, useContext } from "react";
import * as CheckOutService from "../../services/CheckOutService";
import * as ShoppingCartsService from "../../services/ShoppingCartsService";
import * as pay from "../../services/VnPayService";
import { useNavigate, useParams } from "react-router-dom";
import { Contexts } from "../../components/context/Contexts";
import { UContexts } from "../../components/context/UserContext";
const CheckOutInformation = (props) => {
  const { User } = useContext(UContexts);
  // useEffect(() => {
  //   // http://localhost:5173/check-out
  //   // ?vnp_Amount=35000000
  //   // &vnp_BankCode=NCB
  //   // &vnp_BankTranNo=VNP14291669
  //   // &vnp_CardType=ATM
  //   // &vnp_OrderInfo=Thanh+to%C3%A1n+h%C3%B3a+%C4%91%C6%A1n
  //   // &vnp_PayDate=20240125002913
  //   // &vnp_ResponseCode=00
  //   // &vnp_TmnCode=QSY6QCVM&vnp_TransactionNo=14291669
  //   // &vnp_TransactionStatus=00
  //   // &vnp_TxnRef=Mt-2dsddssds
  //   // &vnp_SecureHash=db8c420ec15d77be72cf878e6137e54cc195740f9d7d0083af833c32aa90ec7e7bfcefb4fab58e254b7a58c55304de6e0a92f4a617201317c6b56b73bfc526fc
  //   const currentUrl = window.location.href;
  //   const urlParams = new URLSearchParams(currentUrl);
  //   const vnp_BankCode = urlParams.get("vnp_BankCode");
  //   const vnp_BankTranNo = urlParams.get("vnp_BankTranNo");
  //   const vnp_CardType = urlParams.get("vnp_OrderInfo");
  //   console.log("Mã ngân hàng:", vnp_BankCode);
  //   console.log("Số giao dịch ngân hàng:", vnp_BankTranNo);
  //   console.log("Số giao dịch ngân hàng:", vnp_CardType);
  // }, []);

  // const handleVN = async () => {
  //   const da = await pay.pay();
  //   console.log(da);
  // };
  const { delCard } = useContext(Contexts);
  const natigate = useNavigate();
  const { Carts, Totail } = props;
  const UserProps = props.User;
  const [value, setValue] = useState(0);
  const [Loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (value == 1) {
      console.log("Thanh toán bằng VN Pay");
    } else {
      setLoading(true);
      // console.log(Carts);
      const address = data.address + ", " + data.huyen + ", " + data.tinh;
      const Totails = Totail + 30000;
      // console.log(address);
      // console.log(Totails);
      const addOrders = await CheckOutService.create(
        UserProps.id,
        address,
        value,
        data.phoneNumber,
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
              // bớt số lượng trong product
              delCard(item);
              await ShoppingCartsService.productBuyed(
                item.idProduct,
                Number(item.quantity)
              );
              // xóa trong giỏ hàng
              await ShoppingCartsService.delCart(item.id);
            }
          } catch (error) {
            console.error("Error creating detail:", error);
            return;
          }
        });
        setLoading(false);
        natigate("/check-out/success");
      }
    }
  };
  return (
    <div className="checkout_information_user col-md-6">
      <h3>Thông tin khách hàng</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* họ tên */}
        <div>Họ tên</div>
        <input
          placeholder="Họ và tên"
          className="form-control"
          defaultValue={User.name}
          {...register("name", { required: true })}
        />
        {errors.name && <span className="text-danger">Không bỏ trống</span>}
        {/* Số điện thọai */}
        <div>Số điện thoại</div>
        <input
          placeholder="Nhập số điện thoại"
          className="form-control"
          {...register("phoneNumber", { required: true })}
        />
        {errors.phoneNumber && (
          <span className="text-danger">Không bỏ trống</span>
        )}
        {/* Tỉnh thành */}
        <div>Tỉnh thành</div>
        <input
          className="form-control"
          {...register("tinh", { required: true })}
        />
        {errors.tinh && <span className="text-danger">Không bỏ trống</span>}
        {/* quận huyện */}
        <div>Quận huyện</div>
        <input
          className="form-control"
          {...register("huyen", { required: true })}
        />
        {errors.huyen && <span className="text-danger">Không bỏ trống</span>}
        {/* địa chỉ */}
        <div>Địa chỉ</div>
        <input
          className="form-control"
          {...register("address", { required: true })}
        />
        {errors.address && <span className="text-danger">Không bỏ trống</span>}
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
            value={!Loading ? "Mua" : "loading..."}
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
