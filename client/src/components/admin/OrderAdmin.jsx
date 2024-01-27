import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { Button, message, Popconfirm } from "antd";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const OrderAdmin = () => {
  const selects = [
    "Tất cả",
    "Chờ xử lí",
    "Xác nhận",
    "Đang vẫn chuyển",
    "Nhận hàng thành công",
    "Hủy",
  ];
  const handleSelect = (e) => {
    console.log(e.target.value);
  };
  const handleSelectAll = (e) => {
    console.log(e.target.value);
  };
  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    console.log(value);
    setPage(value);
  };
  return (
    <>
      <Form.Select
        aria-label="Default select"
        defaultValue={null}
        onChange={(e) => handleSelectAll(e)}
        style={{ width: 200 }}
        className="mb-2"
      >
        {selects.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </Form.Select>
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
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>
              <Form.Select
                aria-label="Default select"
                defaultValue={null}
                onChange={(e) => handleSelect(e)}
              >
                {selects.map(
                  (item, index) =>
                    item !== "Tất cả" && (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    )
                )}
              </Form.Select>
            </td>
            <td>@mdo</td>
            <td>
              {" "}
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            </td>
          </tr>
        </tbody>
      </Table>
      <Stack style={{ float: "right" }}>
        <Pagination
          count={10}
          page={page}
          variant="outlined"
          color="primary"
          onChange={handleChange}
        />
      </Stack>
    </>
  );
};

export default OrderAdmin;
