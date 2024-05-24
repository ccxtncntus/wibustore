import './listfrature.css';
import { Link } from 'react-router-dom';
const ListFratured = () => {
  return (
    <div className="listfrature_vip">
      <div className="listfrature container">
        <div style={{ textAlign: 'center' }}>
          <h5>
            Danh mục <span className="vip">đặc sắc</span>
          </h5>
          <span className="d-block mb-2">Danh mục được xem nhiều nhất</span>
        </div>
        <div className="row">
          <div className="col-md-6 p-1 listfrature_col">
            <div className="danhmuc_vip">
              <img
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
                src="https://i.pinimg.com/originals/3c/d9/90/3cd990f3de4da601b6bb8be867489c8b.jpg"
                alt=""
              />
              <Link to={''} className="listfrature_btn btn-5">
                Mua ngay
              </Link>
            </div>
            <div className="danhmuc_vip">
              <img
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
                src="https://i.pinimg.com/originals/47/05/c7/4705c78aef50055eaf171e5cc003f346.jpg"
                alt=""
              />
              <Link to={''} className="listfrature_btn btn-5">
                Mua ngay
              </Link>
            </div>
          </div>
          <div className="col-md-6 p-1 listfrature_col">
            <div className="danhmuc_vip">
              <img
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
                src="https://i.pinimg.com/originals/e5/5a/e5/e55ae52fb0368ae791b76296d0c3bd2b.jpg"
                alt=""
              />
              <Link to={''} className="listfrature_btn btn-5">
                Mua ngay
              </Link>
            </div>
            <div className="danhmuc_vip">
              <img
                className="w-100 h-100"
                style={{ objectFit: 'cover' }}
                src="https://i.pinimg.com/originals/44/ae/09/44ae092a4e174756de8d950236b6e7e6.png"
                alt=""
              />
              <Link to={''} className="listfrature_btn btn-5">
                Mua ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListFratured;
