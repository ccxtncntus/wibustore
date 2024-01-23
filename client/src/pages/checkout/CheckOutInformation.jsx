import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as CheckOutService from "../../services/CheckOutService";
import * as ShoppingCartsService from "../../services/ShoppingCartsService";
import { useNavigate } from "react-router-dom";
const CheckOutInformation = (props) => {
  const natigate = useNavigate();
  const { Carts, User, Totail } = props;
  const [value, setValue] = useState(0);
  const handleChange = (e) => {
    setValue(e.target.checked);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (value) {
      console.log("VNpay");
    } else {
      console.log({ Carts: Carts });
      const address = data.address + ", " + data.huyen + ", " + data.tinh;
      const Totails = Totail + 30000;
      const addOrders = await CheckOutService.create(
        User.id,
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
              Number(item.quantity)
            );
            // await ShoppingCartsService.productBuyed(item.id, item.quantity);
            console.log("Detail created:", da);
          } catch (error) {
            console.error("Error creating detail:", error);
            return;
          }
        });
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
              name="pay"
              onClick={(e) => handleChange(e)}
              onChange={(e) => handleChange(e)}
              value={0}
              checked
              id="cash"
            />
            <label style={{ marginLeft: 4 }} htmlFor="cash">
              Thanh toán khi nhận hàng
            </label>
          </span>
          <span>
            <input
              type="radio"
              name="pay"
              id="creditcart"
              onClick={(e) => handleChange(e)}
              onChange={(e) => handleChange(e)}
              value={1}
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
            value={"Mua"}
          />
        </div>
      </form>
    </div>
  );
};

export default CheckOutInformation;
