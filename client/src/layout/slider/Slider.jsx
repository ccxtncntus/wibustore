import './slider.css';
import SliderImgs from './SliderImgs';
import { useEffect, useState, useContext } from 'react';
import * as SliderService from '../../services/SliderService';
import { SliContexts } from '../../components/context/SliderContex';
const Slider = () => {
  const { slidersC, list } = useContext(SliContexts);
  const [List, setList] = useState([]);
  useEffect(() => {
    const run = async () => {
      if (slidersC.length > 0) {
        setList(slidersC);
      } else {
        const listSlider = await SliderService.list();
        list(listSlider);
        setList(listSlider);
      }
    };
    run();
  }, []);
  return (
    <div className="silder p-0">
      <div className="col-md-12">
        <SliderImgs List={List} />
      </div>
    </div>
  );
};

export default Slider;
