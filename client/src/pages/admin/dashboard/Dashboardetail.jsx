import React from "react";
import AnimatedNumber from "animated-number-react";

const Dashboarđetail = () => {
  return (
    <div className="overview_all">
      Khác
      <div className="overview row">
        <div className="row">
          <div className="col-md overview_child">
            <span>
              <span>Doanh thu ngày</span>
              <div>
                <AnimatedNumber
                  value={150}
                  formatValue={(value) => value.toFixed(0)}
                  duration={2000}
                />
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
                <AnimatedNumber
                  value={150}
                  duration={2000}
                  formatValue={(value) => value.toFixed(0)}
                />
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
                  value={150}
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
                  value={150}
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
