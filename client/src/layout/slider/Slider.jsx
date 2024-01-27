import "./slider.css";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
const Slider = ({ imgs }) => {
  return (
    <div className="silder">
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

export default Slider;
