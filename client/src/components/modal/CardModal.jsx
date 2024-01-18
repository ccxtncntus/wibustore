import { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./cardmodal.css";
import * as Helpers from "../../helpers/FormatNumber";
import { Contexts } from "../../components/context/Contexts";
import { useContext } from "react";

const CardModal = ({ placement, show, onClose }) => {
  const { delCard, cardNumber } = useContext(Contexts);

  const handleDel = (i) => {
    delCard(i.Product);
    // console.log(i.Product);
  };
  return (
    <>
      <Offcanvas show={show} onHide={onClose} placement={placement}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Card</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cardNumber.length > 0
            ? cardNumber.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="cardModal">
                      <div>
                        <span>
                          {item.Product.name} {item.number}
                          {" * "}
                          {Helpers.FormatNumber(
                            item.Product.price - item.Product.saleoff
                          )}
                        </span>
                        <p>
                          {Helpers.FormatNumber(
                            (item.Product.price - item.Product.saleoff) *
                              item.number
                          )}
                        </p>
                      </div>
                      <img
                        src="https://i.pinimg.com/564x/7a/c8/28/7ac828473bbd28aa710d0291d41fb68e.jpg"
                        alt=""
                      />
                      <i
                        onClick={() => handleDel(item)}
                        className="fa-regular fa-circle-xmark"
                      ></i>
                    </div>
                    <hr />
                  </div>
                );
              })
            : "Không có sản phẩm trong đây"}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CardModal;
