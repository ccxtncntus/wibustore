import "./slider.css";
import SliderImgs from "./SliderImgs";
import ListMore from "./ListMore";
import { useEffect, useState } from "react";
import * as SliderService from "../../services/SliderService";

const Slider = () => {
  const [List, setList] = useState([]);
  const [ListMores, setListMores] = useState([]);
  useEffect(() => {
    const run = async () => {
      const listSlider = await SliderService.list();
      setListMores(listSlider.slice(-2));
      setList(listSlider.slice(0, -2));
    };
    run();
  }, []);
  return (
    <div className="silder">
      <div className="col-md-8">
        <SliderImgs List={List} />
      </div>
      <div className="col-md-4">
        <ListMore ListMores={ListMores} />
      </div>
    </div>
  );
};

export default Slider;
