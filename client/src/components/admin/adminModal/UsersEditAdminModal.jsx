import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as AccountService from "../../../services/AccountService";
import { message } from "antd";
const UsersEditAdminModal = (props) => {
  const { onHide, show, onRun, useredit } = props;
  const [Password, setPassword] = useState("");
  const [PasswordConfirm, setPasswordConfirm] = useState("");
  const [err, seterr] = useState("");
  const validate = (data) => {
    if (data == "") {
      return "Không bỏ trống";
    }
    return "";
  };
  const validateConfirm = (p1, p2) => {
    if (p1 == "") {
      return "Không bỏ trống";
    }
    if (p1.toLowerCase() != p2.toLowerCase()) {
      return "Nhập lại không đúng";
    }
    return "";
  };
  const changePass = () => {
    seterr({
      Password: validate(Password),
      PasswordConfirm: validateConfirm(PasswordConfirm, Password),
    });
  };
  useEffect(() => {
    if (show) {
      seterr("");
      setPassword("");
      setPasswordConfirm("");
    }
  }, [show]);

  useEffect(() => {
    const run = async () => {
      try {
        const check = [...new Set(Object.values(err))];
        if (check.length == 1 && check[0] == "") {
          const data = await AccountService.editOfAd(useredit.id, Password);
          data.status === 200 && message.success("Edit thành công");
          seterr("");
          onHide();
        }
      } catch (error) {
        console.log(error);
      }
    };
    run();
  }, [err]);
  return (
    <div>
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h5>{useredit != "" && useredit.email}</h5>
          <div className="row">
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
              <label>Password Confirm</label>
              <input
                type="text"
                className="form-control"
                placeholder="..."
                value={PasswordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
              <p className="text-danger">
                {err.PasswordConfirm != "" && err.PasswordConfirm}
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={changePass}>
            Change
          </button>
          <Button className="btn btn-secondary" onClick={onHide}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default UsersEditAdminModal;
