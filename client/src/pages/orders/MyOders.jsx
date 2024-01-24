import "./myorders.css";
import Table from "react-bootstrap/Table";
import { Button, message, Popconfirm } from "antd";
import { useState } from "react";
import MyOrdersModal from "../../components/modal/MyOrdersModal";
import MyOrdersEditModal from "../../components/modal/MyOrdersEditModal";
const MyOders = () => {
  const confirm = async () => {
    message.success("Hủy thành công");
  };
  const cancel = () => {};
  const [show, setShow] = useState(false);
  const handleHide = () => {
    setShow(false);
  };
  const [showEdit, setShowEdit] = useState(false);
  const handleHideEdit = () => {
    setShowEdit(false);
  };
  return (
    <div className="my_orders">
      <MyOrdersModal show={show} onHide={handleHide} />
      <MyOrdersEditModal show={showEdit} onHide={handleHideEdit} />
      <div className="my_orders_title">
        <h4>Lịch sử mua hàng</h4>
        <span>Đơn hàng chi tiết</span>
      </div>
      <hr />
      <div className="my_orders_body row">
        <div>
          {" "}
          <Table hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Tình trạng</th>
                <th>Địa chỉ</th>
                <th>Số điện thọai</th>
                <th>Thanh toán</th>
                <th>Số tiền</th>
                <th>#</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td onClick={() => setShow(true)}>M-1*</td>
                <td onClick={() => setShow(true)}>Đang xử lí</td>
                <td onClick={() => setShow(true)}>
                  Thông 10 - nam dong - cư jut
                </td>
                <td onClick={() => setShow(true)}>037297102</td>
                <td onClick={() => setShow(true)}>Khi nhận hàng</td>
                <td onClick={() => setShow(true)}>150.000đ</td>
                <td>
                  <Popconfirm
                    // title="Delete the product"
                    description="Hủy đơn hàng này?"
                    onConfirm={() => confirm()}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger>Hủy</Button>
                  </Popconfirm>{" "}
                  <Button onClick={() => setShowEdit(true)} primary>
                    Sửa
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default MyOders;
