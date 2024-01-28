import "./slider.css";
import SliderImgs from "./SliderImgs";
import ListMore from "./ListMore";
const Slider = () => {
  return (
    <div className="silder">
      <div className="col-md-8">
        <SliderImgs />
      </div>
      <div className="col-md-4">
        <ListMore />
      </div>
    </div>
  );
};

export default Slider;
