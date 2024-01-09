import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./home.css";
import * as ProductService from "../services/ProductService";
const Crawl = () => {
  const [crawl, setCrawl] = useState([]);
  const [p, setp] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductService.crawl(p);
        // const data = [...response];
        setCrawl([...response]);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [p]);

  return (
    <>
      <div>
        <NavLink to="/" className={"btn btn-success"}>
          home
        </NavLink>
      </div>
      page
      <input
        type="number"
        className="m-2"
        value={p}
        onChange={(e) => setp(e.target.value)}
      />
      <div className="crawl">
        {crawl.length > 0
          ? crawl.map((item, index) => (
              <div className="crawl_child" key={index}>
                <img src={item.img} alt="" />
                <div>{item.name}</div>
              </div>
            ))
          : "Đang tải..."}
      </div>
    </>
  );
};

export default Crawl;
