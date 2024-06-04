import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as ProductService from '../../services/ProductService';
import { HOST } from '../../configs/DataEnv';
const ProductsTrend = () => {
  const [isHover, setisHover] = useState(false);
  const [iHover, setiHover] = useState('');
  const handleHover = (i) => {
    setiHover(i);
    setisHover(true);
  };
  const handleLeave = () => {
    setisHover(false);
  };
  const [trends, setTrends] = useState([]);
  useEffect(() => {
    const run = async () => {
      const trend = await ProductService.trend();
      setTrends(trend.data);
    };
    run();
  }, []);
  const handleClick = () => {
    window.scroll({
      top: 0,
      behavior: 'instant',
    });
  };
  return (
    <>
      {trends.map((i, index) => (
        <NavLink
          key={index}
          to={`/shop/${i.id}`}
          className={'fixa d-flex gap-2 mt-2'}
          onMouseEnter={() => handleHover(i)}
          onMouseLeave={handleLeave}
          onClick={handleClick}
        >
          <img
            src={HOST + '/uploads/' + i.img}
            alt=""
            style={{ width: '50%' }}
          />
          <div>
            <span
              className="d-block"
              style={{
                color:
                  isHover && iHover.id == i.id ? 'rgb(0, 139, 232)' : 'gray',
                objectFit: 'cover',
              }}
            >
              {i.name}
            </span>
            <span
              style={{
                color:
                  isHover && iHover.id == i.id ? 'rgb(0, 139, 232)' : 'gray',
              }}
            >
              Đã bán : {i.bought}
            </span>
          </div>
        </NavLink>
      ))}
    </>
  );
};

export default ProductsTrend;
