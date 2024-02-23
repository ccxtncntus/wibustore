import "./addressuser.css";
import AddressModal from "../../components/modal/AddressModal";
import { useEffect, useState, useContext } from "react";
import * as AddressService from "../../services/AddressService";
import { UContexts } from "../../components/context/UserContext";
import { Button, message, Popconfirm } from "antd";
const AddressUser = () => {
  const { User } = useContext(UContexts);
  const [modalShow, setModalShow] = useState(false);
  const [EditAddress, setEditAddress] = useState(false);
  const [EditData, setEditData] = useState(null);
  const [Load, setLoad] = useState(false);
  const handleAddAddress = () => {
    setEditData(null);
    setEditAddress(false);
    setModalShow(true);
  };
  const loadAgain = () => {
    setLoad((pre) => !pre);
  };
  const handleEditAddress = (i) => {
    setEditData(i);
    setEditAddress(true);
    setModalShow(true);
  };
  const [ListAddress, setListAddress] = useState([]);
  useEffect(() => {
    const run = async () => {
      const list = await AddressService.List(User.id);
      setListAddress(list);
    };
    run();
  }, [User, Load]);
  const confirm = async (i) => {
    console.log(i);
    const del = await AddressService.deleteA(i.id);
    if (del.status == 200) {
      message.success(del.message);
      loadAgain();
    }
  };
  const cancel = () => {};
  const handleDefault = async (i) => {
    console.log(User.id, i.id);
    const defaultA = await AddressService.setDefault(i.id, User.id);
    console.log(defaultA);
    loadAgain();
  };
  return (
    <div className="addressuser">
      <AddressModal
        editData={EditData}
        show={modalShow}
        editAddress={EditAddress}
        onHide={() => setModalShow(false)}
        loadAgain={loadAgain}
      />
      <div className="addressuser_title">
        <h5>Địa chỉ của tôi</h5>
        <button onClick={handleAddAddress}>
          <i className="fa-solid fa-plus"></i> Thêm địa chỉ
        </button>
      </div>
      <hr />
      <div className="addressuser_list">
        {ListAddress.length > 0
          ? ListAddress.map((i, index) => (
              <div className="addressuser_once" key={index}>
                <div className="addressuser_once_title">
                  <p className="mb-2">
                    <span style={{ fontWeight: 500 }}>{i.name}</span> -{" "}
                    {i.phone}
                  </p>
                  <p className="mb-2">{i.address}</p>
                  <p className="mb-2">
                    {i.xa + ", " + i.huyen + ", " + i.tinh}
                  </p>
                  {i.status == 1 && (
                    <div className="addressuser_once_title_default">
                      Mặc định
                    </div>
                  )}
                </div>
                <div className="addressuser_once_change">
                  <p className="mb-2">
                    <span onClick={() => handleEditAddress(i)}>Cập nhật</span> -{" "}
                    <Popconfirm
                      title="Delete the address"
                      description="Bạn muốn xóa đỉa chỉ này?"
                      onConfirm={() => confirm(i)}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger>Delete</Button>
                    </Popconfirm>
                  </p>
                  <button
                    disabled={i.status == 1 ? true : false}
                    className="mb-2 btn"
                    onClick={() => handleDefault(i)}
                  >
                    Mặc định
                  </button>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default AddressUser;
