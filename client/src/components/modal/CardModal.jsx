import { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./cardmodal.css";
import * as Helpers from "../../helpers/FormatNumber";
import { Contexts } from "../../components/context/Contexts";
import { useContext } from "react";
import { HOST } from "../../configs/DataEnv";
import * as ShoppingCartsService from "../../services/ShoppingCartsService";
import { useNavigate } from "react-router-dom";
const CardModal = ({ placement, show, onClose }) => {
  const { delCard, cardNumber } = useContext(Contexts);
  const natigate = useNavigate();
  // useEffect(() => {
  //   if (cardNumber.length > 0) {
  //     console.log(cardNumber);
  //   }
  // }, [show]);
  const handleDel = async (i) => {
    delCard(i);
    const del = await ShoppingCartsService.delCart(i.id);
    console.log(del);
  };
  let tong = 0;

  const handleBuy = () => {
    natigate("/carts");
    console.log("buy npw");
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
                {
                  tong += (item.price - item.saleoff) * item.quantity;
                }
                return (
                  <div key={index}>
                    <div className="cardModal">
                      <div>
                        <span>
                          {item.name} {item.quantity}
                          {" * "}
                          {Helpers.FormatNumber(item.price - item.saleoff)}
                        </span>
                        <p>
                          {Helpers.FormatNumber(
                            (item.price - item.saleoff) * item.quantity
                          )}
                        </p>
                      </div>
                      <img
                        src={HOST + "/uploads/" + item.img}
                        alt={item.name}
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
          <div>Tổng tiền: {Helpers.FormatNumber(tong)}</div>
          <button onClick={handleBuy} className={"btn btn-secondary mt-2"}>
            Giỏ hàng
          </button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CardModal;
