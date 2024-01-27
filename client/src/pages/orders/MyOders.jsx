import "./myorders.css";
import Table from "react-bootstrap/Table";
import { Button, message, Popconfirm } from "antd";
import { useState, useContext, useEffect } from "react";
import MyOrdersModal from "../../components/modal/MyOrdersModal";
import MyOrdersEditModal from "../../components/modal/MyOrdersEditModal";
import { UContexts } from "../../components/context/UserContext";
import * as OrdersService from "../../services/OrdersService";
import { FormatNumber } from "../../helpers/FormatNumber";
const MyOders = () => {
  const { User } = useContext(UContexts);
  const [ListOrders, setListOrders] = useState([]);
  const [Edit, setEdit] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [Load, setLoad] = useState(false);
  useEffect(() => {
    const run = async () => {
      if (User) {
        const data = await OrdersService.List(User.id);
        data.status === 200 && setListOrders(data.message);
      }
    };
    run();
  }, [User, showEdit, Load]);

  const confirm = async (i) => {
    const status = "Hủy";
    const changeStatus = await OrdersService.updateStatusOrder(i.id, status);
    console.log(changeStatus);
    message.success("Hủy thành công");
    setLoad((pre) => !pre);
  };
  const handleEditOrder = (i) => {
    setEdit(i);
    setShowEdit(true);
  };
  useEffect(() => {}, [Edit]);
  const [ListOfOrder, setListOfOrder] = useState([]);
  const handleViewOrderDetail = async (i) => {
    const l = await OrdersService.listsOfOrder(i.id);
    l.status === 200 && setListOfOrder(l.message);
    setShow(true);
  };
  // -------
  const cancel = () => {};
  const handleHide = () => {
    setShow(false);
  };
  const handleHideEdit = () => {
    setShowEdit(false);
  };
  // xóa- khôi phục
  const confirmDel = async (i) => {
    const del = await OrdersService.delOrder(i.id);
    console.log(del);
    setLoad((pre) => !pre);
  };
  const handleRestoreOrder = async (i) => {
    const status = "Chờ xử lí";
    const changeStatusRestore = await OrdersService.updateStatusOrder(
      i.id,
      status
    );
    console.log(changeStatusRestore);
    setLoad((pre) => !pre);
    message.success("Khôi phuc thành công");
  };
  return (
    <div className="my_orders">
      <MyOrdersModal
        show={show}
        onHide={handleHide}
        ListOfOrder={ListOfOrder}
      />
      <MyOrdersEditModal show={showEdit} onHide={handleHideEdit} Edit={Edit} />
      <div className="my_orders_title">
        <h4>Lịch sử mua hàng</h4>
        <span>Đơn hàng chi tiết</span>
      </div>
      <hr />
      <div className="my_orders_body row">
        <div>
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
              {ListOrders.length > 0 &&
                ListOrders.map((item, index) => (
                  <tr key={index}>
                    <td onClick={() => handleViewOrderDetail(item)}>
                      M-{item.id}
                    </td>
                    <td onClick={() => handleViewOrderDetail(item)}>
                      {item.status}
                    </td>
                    <td onClick={() => handleViewOrderDetail(item)}>
                      {item.address}
                    </td>
                    <td onClick={() => handleViewOrderDetail(item)}>
                      {item.phoneNumbers}
                    </td>
                    <td onClick={() => handleViewOrderDetail(item)}>
                      {item.pay == 0 ? "Khi nhận hàng" : "VN PAY"}
                    </td>
                    <td onClick={() => setShow(true)}>
                      {FormatNumber(item.totail)}
                    </td>
                    {item.status != "Hủy" && item.status != "Chờ xử lí" ? (
                      <td></td>
                    ) : item.status !== "Hủy" ? (
                      <td>
                        {item.pay == 0 && (
                          <Popconfirm
                            // title="Delete the product"
                            description="Hủy đơn hàng này?"
                            onConfirm={() => confirm(item)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button danger>Hủy</Button>
                          </Popconfirm>
                        )}

                        <Button
                          className="m-1"
                          onClick={() => handleEditOrder(item)}
                          type="primary"
                        >
                          Sửa
                        </Button>
                      </td>
                    ) : (
                      <td>
                        {item.pay == 0 && (
                          <Popconfirm
                            // title="Delete the product"
                            description="Hủy đơn hàng này?"
                            onConfirm={() => confirmDel(item)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button danger>Xóa</Button>
                          </Popconfirm>
                        )}

                        <Button
                          className="m-1"
                          onClick={() => handleRestoreOrder(item)}
                          type="primary"
                        >
                          Khôi Phục
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default MyOders;
