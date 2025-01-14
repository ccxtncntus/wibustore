import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { Button, message, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  Status,
  OrderStatus,
  CountPage,
  FormatNumber,
  ExportExcel,
} from "../../helpers/FormatNumber";
import * as OrdersService from "../../services/OrdersService";
import * as ProductService from "../../services/ProductService";
import * as MailService from "../../services/MailService";
import Dropdown from "react-bootstrap/Dropdown";
import AdminOrdersModal from "../../components/modal/AdminOrdersModal";
const OrderAdmin = () => {
  const [page, setPage] = useState(1);
  const [ListOrder, setListOrder] = useState([]);
  const [CountAll, setCountAll] = useState(1);
  const [SelectAll, setSelectAll] = useState(Status[0]);
  const [isOk, setisOk] = useState(false);
  const [Load, setLoad] = useState(false);
  const [listView, setlistView] = useState([]);
  const [show, setShow] = useState(false);
  // change status
  const handleSelect = async (data) => {
    const { e, item } = data;
    const status = e.target.value;
    if (status == "confirm") {
      const newOj = {
        name: item.name,
        address: item.address,
        phoneNumbers: item.phoneNumbers,
        totail: FormatNumber(item.totail),
      };
      OrdersService.listsOfOrder(item.id)
        .then((result) => {
          const dataDetail = result.message;
          const newdataDetail = dataDetail.map((i) => {
            return {
              name: i.name,
              quantitybuy: i.quantitybuy,
              price: FormatNumber(i.price),
              totail: FormatNumber(i.price * i.quantitybuy),
            };
          });
          return MailService.senOrders(item.email, newOj, newdataDetail);
        })
        .then((i) => {
          message.success("Thông tin đơn hàng đã được gửi tới người mua");
          return OrdersService.updateStatusOrder(item.id, status);
        })
        .then((i) => {
          console.log(i);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      return;
    }
    if (status == "successfully") {
      const promises = listView.map((item) => {
        return ProductService.updateBought(item.product_id, item.quantitybuy);
      });
      const upStatus = OrdersService.updateStatusOrder(item.id, status);
      Promise.all([promises, upStatus])
        .then(() => {
          message.success("Cập nhật thông tin thành công");
        })
        .catch((error) => {
          console.error("Error:", error);
          message.danger("Có lỗi xảy ra xin thử lại sau");
        });
      return;
    }

    const upStatus = await OrdersService.updateStatusOrder(item.id, status);
    upStatus.status === 200 && message.success(upStatus.message);
  };
  // change List
  const handleSelectAll = (e) => {
    setSelectAll(e.target.value);
  };
  // del
  const confirm = async (e) => {
    const index = ListOrder.findIndex((i) => i.id == e.id);
    const del = await OrdersService.delOrder(e.id);
    ListOrder.splice(index, 1);
    setListOrder([...ListOrder]);
    del.status === 200 && message.success("Delete order success");
  };
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    const run = async () => {
      if (SelectAll == Status[0]) {
        const ListAll = await OrdersService.ListAll(page);
        setListOrder(ListAll[0].data);
        setCountAll(ListAll.count);
      } else {
        const ListAll = await OrdersService.ListOfStatus(SelectAll, page);
        setListOrder(ListAll[0].data);
        setCountAll(ListAll.count);
      }
    };
    run();
  }, [page, SelectAll]);
  // nothing
  const cancel = () => {};
  const style = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  };
  // export
  const hanldeExportOnePage = () => {
    const newArray = ListOrder.map(
      ({ name, email, address, phoneNumbers, totail, status }) => ({
        name,
        email,
        address,
        phoneNumbers,
        totail: FormatNumber(totail),
        status: OrderStatus(status),
      })
    );
    // export
    ExportExcel(newArray, "shheet1", "WibuStoreOrders");
  };
  const hanldeExportAll = async () => {
    const dAll = await OrdersService.ListAlls();
    console.log(dAll);
    const newArray = dAll.map(
      ({ name, email, address, phoneNumbers, totail, status }) => ({
        name,
        email,
        address,
        phoneNumbers,
        totail: FormatNumber(totail),
        status: OrderStatus(status),
      })
    );
    // export
    ExportExcel(newArray, "shheet1", "WibuStoreOrderAll");
  };

  const handleViewOrders = async (i) => {
    const l = await OrdersService.listsOfOrder(i.id);
    l.status == 200 && setlistView(l.message);
    setShow(true);
  };
  useEffect(() => {
    if (listView.length > 0) {
      console.log(listView);
    }
  }, [listView]);
  const handleHide = () => {
    setShow(false);
  };
  return (
    <>
      <div style={style}>
        <AdminOrdersModal
          show={show}
          onHide={handleHide}
          ListOfOrder={listView}
        />
        <Form.Select
          aria-label="Default select"
          defaultValue={null}
          onChange={(e) => handleSelectAll(e)}
          style={{ width: 200 }}
          className="mb-2"
        >
          {Status.map((item, index) => (
            <option value={item} key={index}>
              {OrderStatus(item)}
            </option>
          ))}
        </Form.Select>
        {/* <button className="btn btn-primary" onClick={hanldeExport}>
        
        </button> */}
        <Dropdown>
          <Dropdown.Toggle variant="secondary">
            export <i className="fa-solid fa-download"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={hanldeExportOnePage}>
              This page
            </Dropdown.Item>
            <Dropdown.Item onClick={hanldeExportAll}>All orders</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {ListOrder.length > 0 ? (
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Khách hàng</th>
              <th>Địa chỉ</th>
              <th>Thanh toán</th>
              <th>Tổng tiền</th>
              <th>Trang thái</th>
              <th>Ngày tạo</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {ListOrder.map((item, index) => (
              <tr key={index}>
                <td onClick={() => handleViewOrders(item)}>{index + 1}</td>
                <td onClick={() => handleViewOrders(item)}>{item.name}</td>
                <td onClick={() => handleViewOrders(item)}>{item.address}</td>
                <td onClick={() => handleViewOrders(item)}>
                  {item.pay == 0 ? "Khi nhận hàng" : "VN PAY"}
                </td>
                <td onClick={() => handleViewOrders(item)}>
                  {FormatNumber(item.totail)}
                </td>
                <td>
                  <Form.Select
                    aria-label="Default select"
                    onChange={(e) => handleSelect({ e: e, item: item })}
                  >
                    {Status.map(
                      (items, index) =>
                        items != "0" && (
                          <option
                            value={items}
                            key={index}
                            selected={items == item.status}
                          >
                            {OrderStatus(items)}
                          </option>
                        )
                    )}
                  </Form.Select>
                </td>
                <td>{item.created_at}</td>
                <td>
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={() => confirm(item)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger>Delete</Button>
                  </Popconfirm>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        "Không có đơn hàng nào..."
      )}
      {CountPage(CountAll) > 1 && (
        <Stack style={{ float: "right" }}>
          <Pagination
            count={CountPage(CountAll)}
            page={page}
            variant="outlined"
            color="primary"
            onChange={handleChange}
          />
        </Stack>
      )}
    </>
  );
};

export default OrderAdmin;
