import "./addressuser.css";
import AddressModal from "../../components/modal/AddressModal";
import { useState } from "react";

const AddressUser = () => {
  const [modalShow, setModalShow] = useState(false);
  const [EditAddress, setEditAddress] = useState(false);
  const handleAddAddress = () => {
    setEditAddress(false);
    setModalShow(true);
  };
  const handleEditAddress = () => {
    setEditAddress(true);
    setModalShow(true);
  };
  return (
    <div className="addressuser">
      <AddressModal
        show={modalShow}
        editAddress={EditAddress}
        onHide={() => setModalShow(false)}
      />
      <div className="addressuser_title">
        <h5>Địa chỉ của tôi</h5>
        <button onClick={handleAddAddress}>
          <i className="fa-solid fa-plus"></i> Thêm địa chỉ
        </button>
      </div>
      <hr />
      <div className="addressuser_list">
        <div className="addressuser_once">
          <div className="addressuser_once_title">
            <p className="mb-2">
              <span style={{ fontWeight: 500 }}>Sos</span> - 0327297102
            </p>
            <p className="mb-2">Thôn 10</p>
            <p className="mb-2">Xã Nam Dong, Huyện Cư Jút, Đắk Nông</p>
            <div className="addressuser_once_title_default">Mặc định</div>
          </div>
          <div className="addressuser_once_change">
            <p className="mb-2">
              <span onClick={handleEditAddress}>Cập nhật</span> -{" "}
              <span>Xóa</span>
            </p>
            <button disabled className="mb-2 btn">
              Mặc định
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressUser;
