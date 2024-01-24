import React from "react";
import { NavLink } from "react-router-dom";

const CheckOutSuccess = () => {
  return (
    <div>
      Bạn đã đặt hàng thành công
      <NavLink to={"/"}> trang chủ</NavLink>
      <br />
      <NavLink to={"/shop"}> Tiếp tục mua hàng</NavLink>
    </div>
  );
};

export default CheckOutSuccess;
