import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import "./sliderimg.css";
import { NavLink } from "react-router-dom";
const SliderImgs = () => {
  const data = [
    {
      img: "https://statics.pancake.vn/web-media/b4/bc/55/d5/20a66562c81b15093b28d201b184df701f68060300b72c061deab517.jpg",
      title: "vip nhất",
      content: "siêu nhân gao biến hình",
      path: "shop",
    },
    {
      img: "https://statics.pancake.vn/web-media/5f/5c/63/be/b3d04437e541a3ea74033ef1a731fc851749d896110e3efeb6e9f8d2.jpg",
      title: "vip nhì",
      content: "Bạn là ai",
    },
    {
      img: "https://statics.pancake.vn/web-media/b1/52/fa/4f/ee7fbe82b60d5bcd8d955c594477fdc74d358be8b315a6b5e57245de.jpg",
      title: "vip ba",
      content: "nothing",
    },
    {
      img: "https://statics.pancake.vn/web-media/b1/52/fa/4f/ee7fbe82b60d5bcd8d955c594477fdc74d358be8b315a6b5e57245de.jpg",
      title: "vip ba",
      content: "nothing",
    },
  ];
  return (
    <div className="sliderImgs">
      <Carousel fade>
        {data &&
          data.map((item, index) => {
            return (
              <Carousel.Item key={index}>
                <Image src={item.img} thumbnail />
                <Carousel.Caption>
                  <div className="sliderImgs_title">
                    <NavLink to={item.path}>{item.title}</NavLink>
                    <p>{item.content}</p>
                  </div>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
      </Carousel>
    </div>
  );
};

export default SliderImgs;
