import './deals.css';
import { Link } from 'react-router-dom';
import imgSale from '/sale.jpg';
const Deal = () => {
  return (
    <>
      <div className="deals">
        <img className="w-100" src={imgSale} alt="" />
        <Link to={''} className="deals_link btn-5">
          Mua ngay
        </Link>
      </div>
    </>
  );
};

export default Deal;
