import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { HOST } from "../../configs/DataEnv";

const MyOrdersModal = (props) => {
  const { show, onHide } = props;
  useEffect(() => {
    if (show) {
      console.log("run");
    }
    return () => {};
  }, [show]);

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
              <tr>
                <td className="modalMyOrdersImg">
                  <img src="https://i.pinimg.com/564x/63/e1/24/63e12424c7773b98e52af988c02a8f1c.jpg" />
                  <span>123</span>
                </td>
                <td>3</td>
                <td>50.000đ</td>
                <td>50.000đ</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MyOrdersModal;
