import "./myorders.css";
import Table from "react-bootstrap/Table";
import { Button, message, Popconfirm } from "antd";
import { useState, useContext, useEffect } from "react";
import MyOrdersModal from "../../components/modal/MyOrdersModal";
import MyOrdersEditModal from "../../components/modal/MyOrdersEditModal";
import { UContexts } from "../../components/context/UserContext";
import * as OrdersService from "../../services/OrdersService";
import * as ProductService from "../../services/ProductService";
import Pagination from "@mui/material/Pagination";

import {
  FormatNumber,
  OrderStatus,
  CountPage,
} from "../../helpers/FormatNumber";
const MyOders = () => {
  const { User } = useContext(UContexts);
  const [ListOrders, setListOrders] = useState([]);
  const [Edit, setEdit] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [Load, setLoad] = useState(false);
  const [CountAll, setCountAll] = useState(1);
  const [page, setPage] = useState(1);
  const [select, setselect] = useState(0);

  useEffect(() => {
    const run = async () => {
      if (User) {
        if (select) {
          console.log("all");
          const data = await OrdersService.ListOfUserAll(User.id, page);
          if (data.status === 200) {
            setListOrders(data.message.data);
            setCountAll(data.count);
          }
        } else {
          const data = await OrdersService.List(User.id, page);
          if (data.status === 200) {
            setListOrders(data.message.data);
            setCountAll(data.count);
          }
        }
      }
    };
    run();
  }, [User, showEdit, Load, page, select]);

  const confirm = async (i) => {
    const status = "cancel";
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
    const promises = ListOfOrder.map((item) => {
      return ProductService.updateQuantity(item.product_id, item.quantitybuy);
    });
    const update = OrdersService.delOrder(i.id);
    Promise.all([promises, update])
      .then(() => {
        setLoad((pre) => !pre);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleRestoreOrder = async (i) => {
    const status = "pending";
    const changeStatusRestore = await OrdersService.updateStatusOrder(
      i.id,
      status
    );
    console.log(changeStatusRestore);
    setLoad((pre) => !pre);
    message.success("Khôi phuc thành công");
  };
  // console.log(CountPage(CountAll));
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="my_orders">
      <MyOrdersModal
        select={select}
        show={show}
        onHide={handleHide}
        ListOfOrder={ListOfOrder}
      />
      <MyOrdersEditModal show={showEdit} onHide={handleHideEdit} Edit={Edit} />
      <h4>Lịch sử mua hàng</h4>
      <div className="my_orders_title">
        <span
          className={select == 0 ? "my_orders_all" : ""}
          onClick={() => setselect(0)}
        >
          Đơn hàng chi tiết
        </span>
        <div
          className={select == 1 ? "my_orders_all" : ""}
          onClick={() => setselect(1)}
        >
          Đã mua
        </div>
      </div>
      <hr />
      <div className="my_orders_body row">
        {ListOrders.length > 0 ? (
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
                        {OrderStatus(item.status)}
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
                      {item.status != "cancel" && item.status != "pending" ? (
                        <td></td>
                      ) : item.status == "pending" ? (
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
            {CountPage(CountAll) > 1 && (
              <Pagination
                count={CountPage(CountAll)}
                page={page}
                onChange={handleChange}
                color="primary"
                style={{ float: "right" }}
              />
            )}
          </div>
        ) : (
          "Bạn không có đơn hàng nào"
        )}
      </div>
    </div>
  );
};

export default MyOders;
