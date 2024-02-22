import { useEffect, useState } from "react";
import AnimatedNumber from "animated-number-react";
import { FormatNumber } from "../../../helpers/FormatNumber";

const Dashboarđetail = ({ order }) => {
  return (
    <div className="overview_all">
      Khác
      <div className="overview row">
        <div className="row">
          <div className="col-md overview_child">
            <span>
              <span>Doanh thu ngày</span>
              <div>
                {/* <AnimatedNumber
                  value={
                    orders && FormatNumber(Number(order.moneyToday[0].total))
                  }
                  formatValue={(value) => value.toFixed(0)}
                  duration={1500}
                /> */}
                {order && FormatNumber(Number(order.moneyToday[0].total))}
              </div>
            </span>
            <i
              style={{ fontSize: "1.2rem" }}
              className="fa-solid fa-hand-holding-dollar"
            ></i>
          </div>
          <div className="col-md overview_child">
            <span>
              <span>Tổng doanh thu</span>
              <div>
                {/* <AnimatedNumber
                  value={150}
                  duration={2000}
                  formatValue={(value) => value.toFixed(0)}
                /> */}
                {order && FormatNumber(Number(order.moneyAll[0].total))}
              </div>
            </span>
            <i
              style={{ fontSize: "1.2rem" }}
              className="fa-solid fa-sack-dollar"
            ></i>
          </div>
        </div>
        <div className="row">
          <div className="col-md overview_child">
            <span>
              <span>Số người dùng</span>
              <div>
                <AnimatedNumber
                  value={order && order.countUser}
                  duration={5000}
                  formatValue={(value) => value.toFixed(0)}
                />
              </div>
            </span>
            <i style={{ fontSize: "1.2rem" }} className="fa-solid fa-user"></i>
          </div>
          <div className="col-md overview_child">
            <span>
              <span>Tổng số sản phẩm</span>

              <div>
                <AnimatedNumber
                  value={order && order.countProducts}
                  duration={2000}
                  formatValue={(value) => value.toFixed(0)}
                />
              </div>
            </span>
            <i
              style={{ fontSize: "1.2rem" }}
              className="fa-brands fa-product-hunt"
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboarđetail;
