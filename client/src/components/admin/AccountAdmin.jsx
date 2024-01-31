import { useEffect, useState, useCallback } from "react";
import { Button, Flex, message, Popconfirm } from "antd";
import Pagination from "@mui/material/Pagination";
import * as AccountService from "../../services/AccountService";
import UsersAdminModal from "../adminModal/UsersAdminModal";
import UsersEditAdminModal from "../adminModal/UsersEditAdminModal";

const AccountAdmin = () => {
  const [page, setPage] = useState(1);
  const [SelectAll, setSelectAll] = useState(0);
  const [ChangeRole, setChangeRole] = useState("user");
  const [ListUsers, setListUsers] = useState([]);
  const [CountAll, setCountAll] = useState(0);
  const [Del, setDel] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);
  const [Load, setLoad] = useState(false);
  // view
  const handleChangeAll = (e) => {
    setSelectAll(e.target.value);
  };
  const FormatDay = (time) => {
    var d = new Date(time);
    return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
  };
  const FormatAllCount = (count) => {
    return Math.ceil(count / 12);
  };
  useEffect(() => {
    const all = async () => {
      if (SelectAll == 0) {
        const list = await AccountService.listAll(page);
        setListUsers(list.list.data);
        setCountAll(list.count);
      } else {
        const list = await AccountService.listOfRole(SelectAll, page);
        setListUsers(list.list.data);
        setCountAll(list.count);
      }
    };
    all();
  }, [SelectAll, ChangeRole, page, Del, Load]);
  // change Role
  const handleChangeRole = async (data) => {
    const { e, item } = data;
    const update = await AccountService.updateRole(item.id, e.target.value);
    console.log(update);
    setChangeRole(e.target.value);
    message.success("Change success");
  };
  // edit
  const [userEdit, setuserEdit] = useState("");
  const handleEdit = (i) => {
    setuserEdit(i);
    setModalEditShow(true);
  };
  // del
  const confirmDel = async (e) => {
    const del = await AccountService.delUser(e.id);
    setDel((pre) => !pre);
    message.success("Click on Yes");
  };
  // add
  const run = () => {
    setLoad((pre) => !pre);
  };
  const handleAdd = useCallback(() => {
    setModalShow(true);
  }, []);
  // nothing
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const cancel = () => {};
  return (
    <div>
      <UsersAdminModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onRun={run}
      />
      <UsersEditAdminModal
        show={modalEditShow}
        onHide={() => setModalEditShow(false)}
        onRun={run}
        useredit={userEdit}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        className="mb-2"
      >
        <select
          className="form-select "
          style={{ width: 100 }}
          onChange={handleChangeAll}
        >
          <option value="0">All</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="ban">Ban</option>
        </select>
        <button
          style={{ float: "right" }}
          className="btn btn-secondary"
          onClick={handleAdd}
        >
          Add <i className="fa-solid fa-plus"></i>
        </button>
      </div>
      {ListUsers.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Email</th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Role</th>
              <th scope="col">created_at</th>
              <th scope="col">#</th>
            </tr>
          </thead>
          <tbody>
            {ListUsers.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.email}</td>
                <td>{item.name}</td>
                <td>{item.adsress || "Chưa cập nhật"}</td>
                <td>
                  <select
                    className="form-select"
                    onChange={(e) => handleChangeRole({ e: e, item: item })}
                    // value={item.role}
                  >
                    <option value="user" selected={item.role == "user"}>
                      User
                    </option>
                    <option value="admin" selected={item.role == "admin"}>
                      Admin
                    </option>
                    <option value="ban" selected={item.role == "ban"}>
                      Ban
                    </option>
                  </select>
                </td>
                <td>{FormatDay(item.created_at)}</td>
                <td>
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={() => confirmDel(item)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger>Delete</Button>
                  </Popconfirm>{" "}
                  <Button type="primary" ghost onClick={() => handleEdit(item)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "Không có user"
      )}
      {FormatAllCount(CountAll) > 1 && (
        <Pagination
          count={10}
          page={page}
          variant="outlined"
          color="primary"
          onChange={handleChangePage}
          style={{ float: "right" }}
        />
      )}
    </div>
  );
};

export default AccountAdmin;
