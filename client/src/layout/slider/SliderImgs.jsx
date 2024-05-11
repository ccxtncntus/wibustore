import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import './sliderimg.css';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HOST } from '../../configs/DataEnv';
const SliderImgs = (props) => {
  const { List } = props;
  const [Lists, setLists] = useState([]);
  useEffect(() => {
    if (List.length > 0) {
      setLists(List);
    }
  }, [List]);
  return (
    <div className="sliderImgs">
      <Carousel fade>
        {Lists &&
          Lists.map((item, index) => {
            return (
              <Carousel.Item key={index}>
                <Image src={HOST + '/uploads/' + item.img} thumbnail />
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
