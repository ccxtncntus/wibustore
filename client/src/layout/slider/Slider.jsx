import { useState } from "react";
import "./slider.css";

const Sli = ({ item }) => {
  const style = {
    backgroundImage: `url(${item})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-reapeat",
    backgroundPosition: "center",
  };
  return (
    <div style={style} className="slider_home_child">
      <h1>vippeo</h1>
      <p>gray</p>
    </div>
  );
};

const Slider = () => {
  const imgs = [
    "https://i.pinimg.com/originals/86/e3/34/86e3344c625be5db137c16d6d06e5ad3.jpg",
    "https://i.pinimg.com/originals/69/57/17/695717d16259cad47fd1a6c988405a71.jpg",
    "https://i.pinimg.com/originals/ed/fe/34/edfe34e2febdcc4cbc4bf3666b775bd3.jpg",
  ];
  const [d, setd] = useState(0);
  const handleChange = (i) => {
    if (i === 0) {
      setd(0);
    } else {
      let a = i * 100;
      setd(-a);
    }
  };
  return (
    <>
      <div className="slider_home">
        <div
          className="slider_home_cover"
          style={{
            transform: `translateX(${d}%)`,
            transition: `transform ease-in-out 0.4s`,
          }}
        >
          {imgs.map((item, index) => {
            return <Sli item={item} key={index} />;
          })}
        </div>
      </div>
      <div>
        {imgs.map((item, index) => {
          return (
            <i
              key={index}
              className="fa-regular fa-circle m-2"
              onClick={() => handleChange(index)}
            ></i>
          );
        })}
      </div>
    </>
  );
};

export default Slider;
