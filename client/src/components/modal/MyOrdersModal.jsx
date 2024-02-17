import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { HOST } from "../../configs/DataEnv";
import { FormatNumber } from "../../helpers/FormatNumber";
import { useNavigate } from "react-router-dom";
const MyOrdersModal = (props) => {
  const { show, onHide, ListOfOrder, select } = props;
  const navigate = useNavigate();
  useEffect(() => {
    if (show) {
      console.log(ListOfOrder);
    }
  }, [show]);
  const handleBuyAgain = (i) => {
    console.log({ id_product: i.product_id });
    navigate("/carts", { state: { id_product: i.product_id } });
    onHide();
  };
  return (
    <>
      <Modal
        show={show}
        onHide={() => onHide()}
        size="xl"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Chi tiết đơn hàng
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table hover>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {ListOfOrder.length > 0 ? (
                ListOfOrder.map((item, index) => (
                  <tr key={index}>
                    <td className="modalMyOrdersImg">
                      <img src={HOST + "/uploads/" + item.img} />
                      <span>{item.name}</span>
                    </td>
                    <td>{item.quantitybuy}</td>
                    <td>{FormatNumber(item.price)}</td>
                    <td>{FormatNumber(item.price * item.quantitybuy)}</td>
                    {select ? (
                      <td>
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleBuyAgain(item)}
                        >
                          Mua lại
                        </button>
                      </td>
                    ) : null}
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="modalMyOrdersImg">
                    <img src="https://i.pinimg.com/564x/63/e1/24/63e12424c7773b98e52af988c02a8f1c.jpg" />
                    <span>*</span>
                  </td>
                  <td>*</td>
                  <td>*</td>
                  <td>*</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MyOrdersModal;
