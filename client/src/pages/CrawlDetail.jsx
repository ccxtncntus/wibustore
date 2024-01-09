import { useEffect, useState } from "react";
import * as ProductService from "../services/ProductService";
import parse from "html-react-parser";
import { NavLink } from "react-router-dom";

const CrawlDetail = () => {
  const [detail, setdetail] = useState([]);
  useEffect(() => {
    const path = window.location.pathname;
    const arr = path.split("/");
    const detail = async () => {
      const data = await ProductService.crawlDetail(arr[3]);
      var imgs = data.img.filter((a) => a.img.includes("statics.pancake"));
      data.img = imgs;
      setdetail([data]);
    };
    detail();
  }, []);
  // useEffect(() => {
  //   if (detail.length > 0) {
  //     console.log(detail[0]);
  //   }
  // }, [detail]);

  return (
    <>
      {" "}
      <NavLink className={"btn btn-success m-2"} to={"/crawl"}>
        quay lại
      </NavLink>
      <div className="crawl_detail row">
        <h3 className="mt-2" style={{ textAlign: "center" }}>
          Chi tiết sản phẩm
          <hr />
        </h3>{" "}
        {detail.length > 0 ? (
          <>
            <div className="col-md-6">
              {detail[0].img.map((item, index) => (
                <img
                  key={index}
                  style={{ height: 200, margin: 4 }}
                  src={item.img}
                />
              ))}
            </div>
            <div className="col-md-6">
              <h4 style={{ textAlign: "center" }}>{detail[0].name}</h4>
              <h5 className="text-primary"> Giá: {parse(detail[0].price)}</h5>
              <div>{parse(detail[0].information)}</div>
            </div>
          </>
        ) : (
          <span>Loading...</span>
        )}
        <div></div>
      </div>
    </>
  );
};

export default CrawlDetail;
