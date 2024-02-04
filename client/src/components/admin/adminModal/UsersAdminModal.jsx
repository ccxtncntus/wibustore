import { useEffect, useState, memo } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as AccountService from "../../../services/AccountService";
import { message } from "antd";
const UsersAdminModal = (props) => {
  const { onHide, show, onRun } = props;
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [Role, setRole] = useState("user");
  const [err, seterr] = useState("");
  const validateEmail = (data) => {
    let isEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (data == "") {
      return "Không bỏ trống";
    }
    if (!isEmail.test(data)) {
      return "Không đúng email";
    }
    return "";
  };
  const validate = (data) => {
    if (data == "") {
      return "Không bỏ trống";
    }
    return "";
  };
  const addUser = () => {
    seterr({
      Email: validateEmail(Email),
      Name: validate(Name),
      Password: validate(Password),
    });
  };
  useEffect(() => {
    if (show) {
      seterr("");
      setEmail("");
      setName("");
      setPassword("");
    }
  }, [show]);

  useEffect(() => {
    const run = async () => {
      try {
        const check = [...new Set(Object.values(err))];
        if (check.length == 1 && check[0] == "") {
          const registerOfAd = await AccountService.registerOfAd(
            Email,
            Name,
            Password,
            Role
          );
          registerOfAd.status && message.success("Đăn kí thành công");
          onRun();
          seterr("");
          onHide();
        }
      } catch (error) {
        console.log(error.response.data.message);
        message.error(
          error.response.data.message == "The email has already been taken."
            ? "Email đã tồn tại"
            : error.response.data.message
        );
      }
    };
    run();
  }, [err]);
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Email</label>
                <input
                  autoComplete="true"
                  id="email"
                  type="email"
                  className="form-control"
                  placeholder="Email..."
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-danger">{err.Email != "" && err.Email}</p>
              </div>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  placeholder="Your name..."
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                />
                <p className="text-danger">{err.Name != "" && err.Name}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Password</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="..."
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-danger">
                  {err.Password != "" && err.Password}
                </p>
              </div>
              <div className="form-group">
                <label>Role</label>
                <select
                  className="form-select"
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user" selected>
                    User
                  </option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={addUser}>
            Add
          </button>
          <Button className="btn btn-secondary" onClick={onHide}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default memo(UsersAdminModal);
