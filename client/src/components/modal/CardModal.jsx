import { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./cardmodal.css";
const CardModal = ({ placement, show, onClose }) => {
  const [Cards, setCards] = useState([]);
  useEffect(() => {
    if (show) {
      console.log(show);
    }
  }, [show]);
  return (
    <>
      <Offcanvas show={show} onHide={onClose} placement={placement}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Card</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {Cards.length > 0 ? (
            <div>
              <div className="cardModal">
                <span>name số lượng-đơn giá</span>
                <img
                  src="https://i.pinimg.com/564x/7a/c8/28/7ac828473bbd28aa710d0291d41fb68e.jpg"
                  alt=""
                />
                <i className="fa-regular fa-circle-xmark"></i>
              </div>
              <hr />
            </div>
          ) : (
            "Không có sản phẩm trong đây"
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CardModal;
