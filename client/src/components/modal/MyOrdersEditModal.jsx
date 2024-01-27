// import Button from "react-bootstrap/Button";
import { Button, message } from "antd";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import * as OrdersService from "../../services/OrdersService";
const MyOrdersEditModal = (props) => {
  const { show, onHide, Edit } = props;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    const run = async () => {
      if (Edit !== "") {
        setValue("address", Edit.address);
        setValue("phoneNumbers", Edit.phoneNumbers);
      }
    };
    run();
  }, [Edit, setValue]);
  const onSubmit = async (data) => {
    const updateAddress = await OrdersService.updateAddress(
      Edit.id,
      data.address,
      data.phoneNumber
    );
    console.log(updateAddress);
    onHide();
    message.success("Sửa thông tin thành công");
  };
  const handleHide = () => {
    setValue("address", Edit.address);
    onHide();
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
          {Edit != "" && (
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* địa chỉ */}
              <div className="mt-2">Địa chỉ</div>
              <input
                defaultValue={Edit.address}
                className="form-control mt-2"
                {...register("address", { required: true })}
              />
              {errors.example && (
                <p className="text-danger">This field is required</p>
              )}
              {/* số điện thoại */}
              <div className="mt-2">Số điện thoại</div>
              <input
                defaultValue={Edit.phoneNumbers}
                className="form-control mt-2"
                {...register("phoneNumber", { required: true })}
              />
              {errors.exampleRequired && (
                <p className="text-danger">This field is required</p>
              )}

              <input
                type="submit"
                className="btn btn-secondary mt-3"
                value={"Xác nhận"}
              />
            </form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button type="primary" onClick={handleHide}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyOrdersEditModal;
