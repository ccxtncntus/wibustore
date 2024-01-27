import React from "react";
import { NavLink } from "react-router-dom";
import "./checkout.css";
import img from "../../../public/success.png";
const CheckOutSuccess = () => {
  return (
    <div className="CheckOutSuccess">
      <div>
        <img src={img} />
      </div>
      <p style={{ textAlign: "center" }} className="text-light">
        Bạn đã đặt hàng thành công!
      </p>
      <div style={{ textAlign: "center" }}>
        <NavLink className={"btn btn-secondary"} to={"/"}>
          Trang chủ
        </NavLink>{" "}
        <NavLink className={"btn btn-primary"} to={"/shop"}>
          Tiếp tục mua hàng
        </NavLink>
      </div>
    </div>
  );
};

export default CheckOutSuccess;
