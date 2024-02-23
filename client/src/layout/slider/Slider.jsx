import "./slider.css";
import SliderImgs from "./SliderImgs";
import ListMore from "./ListMore";
import { useEffect, useState, useContext } from "react";
import * as SliderService from "../../services/SliderService";
import { SliContexts } from "../../components/context/SliderContex";
const Slider = () => {
  const { slidersC, list } = useContext(SliContexts);
  const [List, setList] = useState([]);
  const [ListMores, setListMores] = useState([]);
  useEffect(() => {
    const run = async () => {
      if (slidersC.length > 0) {
        setListMores(slidersC.slice(-2));
        setList(slidersC.slice(0, -2));
      } else {
        const listSlider = await SliderService.list();
        list(listSlider);
        setListMores(listSlider.slice(-2));
        setList(listSlider.slice(0, -2));
      }
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
