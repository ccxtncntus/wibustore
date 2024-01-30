import { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./cardmodal.css";
import * as Helpers from "../../helpers/FormatNumber";
import { Contexts } from "../../components/context/Contexts";
import { UContexts } from "../../components/context/UserContext";
import { useContext } from "react";
import { HOST } from "../../configs/DataEnv";
import * as ShoppingCartsService from "../../services/ShoppingCartsService";
import { useNavigate } from "react-router-dom";
const CardModal = ({ placement, show, onClose }) => {
  const { delCard } = useContext(Contexts);
  const { User } = useContext(UContexts);
  const [ListCarts, setListCarts] = useState([]);
  const [Load, setLoad] = useState(false);
  const natigate = useNavigate();
  useEffect(() => {
    const chay = async () => {
      if (User) {
        const list = await ShoppingCartsService.listOfUser(User.id);
        setListCarts(list);
      }
    };
    chay();
  }, [show, Load]);
  const handleDel = async (i) => {
    await ShoppingCartsService.delCart(i.id);
    delCard(i);
    setLoad((pre) => !pre);
  };
  let tong = 0;

  const handleBuy = () => {
    onClose();
    natigate("/carts", { state: { list: ListCarts } });
  };
  return (
    <>
      <Offcanvas show={show} onHide={onClose} placement={placement}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Card</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {ListCarts.length > 0
            ? ListCarts.map((item, index) => {
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
          <button
            onClick={handleBuy}
            className={"btn btn-secondary mt-2"}
            disabled={!ListCarts.length}
          >
            Giỏ hàng
          </button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CardModal;
