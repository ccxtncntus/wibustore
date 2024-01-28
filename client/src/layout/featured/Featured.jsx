import { useState } from "react";
import "./featured.css";
const Featured = () => {
  const [Data, setData] = useState(0);
  return (
    <div className="featured">
      <div className="featured_title">
        <span
          className={Data === 0 && "featured_title_active"}
          onClick={() => setData(0)}
        >
          Featured
        </span>
        <span
          className={Data === 1 && "featured_title_active"}
          onClick={() => setData(1)}
        >
          Sale
        </span>
      </div>
      <div className="featured_listSp">{Data}</div>
    </div>
  );
};

export default Featured;
