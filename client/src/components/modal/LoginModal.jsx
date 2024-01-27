import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
function LoginModal(props) {
  const natigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token", "path_end"]);
  const { onHide } = props;
  const handleLogin = () => {
    onHide();
    console.log(window.location.pathname);
    setCookie("path_end", window.location.pathname, { path: "/" });
    natigate("/login");
  };
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Bạn cần đăng nhập</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button onClick={handleLogin}>Xác nhận</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal;
