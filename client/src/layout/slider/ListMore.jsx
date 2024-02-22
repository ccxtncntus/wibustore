import { NavLink } from "react-router-dom";
import "./listmore.css";
import { useEffect, useState } from "react";
import { HOST } from "../../configs/DataEnv";
const ListMore = (props) => {
  const { ListMores } = props;
  const [ListM, setListM] = useState([]);
  useEffect(() => {
    if (ListMores.length > 0) {
      setListM(ListMores);
    }
  }, [ListMores]);
  return (
    <div className="listmore_slider">
      {ListM.length > 0
        ? ListM.map((i, index) => {
            return (
              <div className="listmore_slider_child span1" key={index}>
                <img src={HOST + "/uploads/" + i.img} alt="" />
                <span>
                  <NavLink to={i.path}>Shop now</NavLink>
                  <i className="fa-solid fa-arrow-right-long"></i>
                </span>
              </div>
            );
          })
        : null}
      {/* <div className="listmore_slider_child span1">
        <img
          src="https://statics.pancake.vn/web-media/f8/5b/47/18/7cc0f71648f372175cf1d68c9e9d292b54b58418cca3e218639c9933.jpg"
          alt=""
        />
        <span>
          <NavLink>Shop now</NavLink>
          <i className="fa-solid fa-arrow-right-long"></i>
        </span>
      </div>
      <div className="listmore_slider_child span1">
        <img
          src="https://statics.pancake.vn/web-media/a8/c7/a9/f6/6b3405b1bb40567a57eab5b14d115d699ba13b8b3e38314a08dcf251.jpg"
          alt=""
        />
        <span>
          <NavLink>Shop now</NavLink>
          <i className="fa-solid fa-arrow-right-long"></i>
        </span>
      </div> */}
    </div>
  );
};

export default ListMore;
