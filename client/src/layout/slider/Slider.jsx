import './slider.css';
import SliderImgs from './SliderImgs';
import { useEffect, useState } from 'react';
import * as SliderService from '../../services/SliderService';
const Slider = () => {
  const [List, setList] = useState([]);
  useEffect(() => {
    const run = async () => {
      if (localStorage.getItem('sliders')) {
        const parseImgs = localStorage.getItem('sliders');
        const dataImg = JSON.parse(parseImgs);
        setList(dataImg);
      } else {
        const listSlider = await SliderService.list();
        const dataImg = JSON.stringify(listSlider);
        localStorage.setItem('sliders', dataImg);
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
