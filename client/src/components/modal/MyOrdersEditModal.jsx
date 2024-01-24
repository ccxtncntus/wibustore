// import Button from "react-bootstrap/Button";
import { Button, message } from "antd";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
const MyOrdersEditModal = (props) => {
  const { show, onHide } = props;
  // useEffect(() => {
  //   if (show) {
  //     console.log("run");
  //   }
  //   return () => {};
  // }, [show]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    onHide();
    message.success("Sửa thông tin thành công");
  };
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Sửa thông tin
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <div>Tình trạng</div>
            <select {...register("status")} className="form-control">
              <option value="Chờ xử lí">Chờ xử lí</option>
              <option value="Xác nhận">Xác nhận</option>
              <option value="Đang vận chuyển">Đang vận chuyển</option>
              <option value="Đã nhận hàng">Đã nhận hàng</option>
            </select> */}
            {/* <p className="text-danger"></p> */}
            <div className="mt-2">Địa chỉ</div>
            <input
              defaultValue="test"
              className="form-control mt-2"
              {...register("example", { required: true })}
            />
            {errors.example && (
              <p className="text-danger">This field is required</p>
            )}
            {/* số điện thoại */}
            <div className="mt-2">Số điện thoại</div>
            <input
              defaultValue="test"
              className="form-control mt-2"
              {...register("exampleRequired", { required: true })}
            />
            {errors.exampleRequired && (
              <p className="text-danger">This field is required</p>
            )}

            <input type="submit" className="btn btn-secondary mt-3" />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="primary" onClick={onHide}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyOrdersEditModal;
