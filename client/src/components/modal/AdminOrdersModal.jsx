import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { HOST } from "../../configs/DataEnv";
import { FormatNumber } from "../../helpers/FormatNumber";
const MyOrdersModal = (props) => {
  const { show, onHide, ListOfOrder, select } = props;
  // useEffect(() => {
  //   if (show) {
  //     console.log(ListOfOrder);
  //   }
  // }, [show]);
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
                    <td>
                      <img
                        style={{ width: 160 }}
                        src={HOST + "/uploads/" + item.img}
                      />{" "}
                      <span style={{ fontWeight: 500 }}>{item.name}</span>
                    </td>
                    <td>{item.quantitybuy}</td>
                    <td>{FormatNumber(item.price)}</td>
                    <td>{FormatNumber(item.price * item.quantitybuy)}</td>
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
