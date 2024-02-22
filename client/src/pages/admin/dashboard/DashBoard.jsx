import "./dashboard.css";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import AnimatedNumber from "animated-number-react";
import Dashboardetail from "./Dashboardetail";
import DashboardBest from "./DashboardBest";
import * as DashboardService from "../../../services/DashboardService";
const DashBoard = () => {
  const [Data, setData] = useState({
    labels: [],
    data: [],
  });

  const handeSelect = (e) => {
    if (e.target.value == "Tháng") {
      const newArr = {
        labels: Datas.dataLast12Months.map(
          (item) => item.month + " " + item.year
        ),
        data: Datas.dataLast12Months.map((item) => item.total[0].total || 0),
      };
      setData(newArr);
    } else {
      const newArr = {
        labels: Datas.dataLast7Days.map((item) => item.date),
        data: Datas.dataLast7Days.map((item) => item.total[0].total || 0),
      };
      setData(newArr);
    }
  };
  const [Best, setBest] = useState(null);
  const [Datas, setDatas] = useState(null);
  const [Order, setOrder] = useState(null);
  useEffect(() => {
    const run = async () => {
      const dataBest = await DashboardService.getBest();
      const dataData = await DashboardService.getData();
      const dataOrder = await DashboardService.getOrder();
      setBest(dataBest);
      setDatas(dataData);
      setOrder(dataOrder);
    };
    run();
  }, []);
  useEffect(() => {
    const run = async () => {
      if (Datas) {
        const newArr = {
          labels: Datas.dataLast7Days.map((item) => item.date),
          data: Datas.dataLast7Days.map((item) => item.total[0].total || 0),
        };
        setData(newArr);
      }
    };
    run();
  }, [Datas]);

  return (
    <div className="dashboard">
      <h5 style={{ color: " rgb(67, 93, 118)" }}>Tổng quan</h5>

      <div className="row chart_mid">
        <div className="chart col-md-8">
          <div>Thống kê doanh thu</div>
          <Form.Select
            aria-label="Default select example"
            style={{ width: 200 }}
            onChange={(e) => handeSelect(e)}
            defaultValue={"Ngày"}
            className="mt-2"
          >
            <option value="Tuần">7 ngày gần nhất</option>
            <option value="Tháng">12 Tháng gần nhất</option>
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
          <Dashboardetail order={Order} />
          <DashboardBest best={Best} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
