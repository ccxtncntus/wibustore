import "./dashboard.css";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import AnimatedNumber from "animated-number-react";
import Dashboardetail from "./Dashboardetail";
import DashboardBest from "./DashboardBest";
const DashBoard = () => {
  const [Data, setData] = useState({
    labels: ["thứ 2", "thứ 3", "thứ 4", "thứ 5", "thứ 6", "thứ 7", "Chủ nhật"],
    data: [32000, 48000, 162000, 0, 18000, 36000, 44000],
  });
  const d1 = {
    labels: ["thứ 2", "thứ 3", "thứ 4", "thứ 5", "thứ 6", "thứ 7", "Chủ nhật"],
    data: [32000, 48000, 162000, 0, 18000, 36000, 44000],
  };
  const d2 = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
    data: [
      32000, 48000, 162000, 0, 18000, 36000, 44000, 44000, 44000, 44000, 44000,
      44000,
    ],
  };
  const handeSelect = (e) => {
    if (e.target.value == "Tháng") {
      setData(d2);
    } else {
      setData(d1);
    }
  };
  return (
    <div className="dashboard">
      <h5 style={{ color: " rgb(67, 93, 118)" }}>Tổng quan</h5>

      <div className="row chart_mid">
        <div className="chart col-md-8">
          <div>Thống kê doanh thu</div>
          <Form.Select
            aria-label="Default select example"
            style={{ width: 100 }}
            onChange={(e) => handeSelect(e)}
            defaultValue={"Ngày"}
            className="mt-2"
          >
            <option value="Tuần">Tuần</option>
            <option value="Tháng">Tháng</option>
          </Form.Select>
          <Bar
            data={{
              labels: Data.labels,
              datasets: [
                {
                  label: "Doanh thu (đ)",
                  data: Data.data,
                  borderRadius: 2,
                  backgroundColor: "rgb(67, 93, 118)",
                },
              ],
            }}
          />
        </div>
        <div className="col-md-4">
          <Dashboardetail />
          <DashboardBest />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
