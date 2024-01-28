import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import "./sliderimg.css";
const SliderImgs = () => {
  // <h3>First slide label</h3>
  // <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
  let imgs = [
    "https://statics.pancake.vn/web-media/b4/bc/55/d5/20a66562c81b15093b28d201b184df701f68060300b72c061deab517.jpg",
    "https://statics.pancake.vn/web-media/b1/52/fa/4f/ee7fbe82b60d5bcd8d955c594477fdc74d358be8b315a6b5e57245de.jpg",
    "https://statics.pancake.vn/web-media/5f/5c/63/be/b3d04437e541a3ea74033ef1a731fc851749d896110e3efeb6e9f8d2.jpg",
  ];

  return (
    <div className="sliderImgs">
      <Carousel fade>
        {imgs &&
          imgs.map((img, index) => {
            return (
              <Carousel.Item key={index}>
                <Image src={img} thumbnail />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
      </Carousel>
    </div>
  );
};

export default SliderImgs;
