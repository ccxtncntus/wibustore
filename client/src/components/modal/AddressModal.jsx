import { useEffect, useRef, useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import * as GHNService from "../../services/GHN";
import { UContexts } from "../../components/context/UserContext";
const AddressModal = (props) => {
  const { User } = useContext(UContexts);
  const { onHide, show, editAddress } = props;
  const f = useRef();
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Tinh, setTinh] = useState([]);
  const [TinhSelect, setTinhSelect] = useState(null);
  const [Huyen, setHuyen] = useState([]);
  const [HuyenSelect, setHuyenSelect] = useState(null);
  const [Xa, setXa] = useState([]);
  const [XaSelect, setXaSelect] = useState(null);
  const [Address, setAddress] = useState("");

  const start = () => {
    setName("");
    setPhone("");
    setTinhSelect(null);
    setHuyenSelect(null);
    setXaSelect(null);
    setAddress("");
  };
  useEffect(() => {
    const run = async () => {
      if (show) {
        f.current.focus();
        start();
        const data = await GHNService.getTinh();
        if (data.data.code == 200) {
          const dataTinh = data.data.data;
          const newArr = dataTinh.map((item) => ({
            ProvinceID: item.ProvinceID,
            ProvinceName: item.ProvinceName,
          }));
          setTinh(newArr);
        }
      }
    };
    run();
  }, [show]);
  const options = [{ value: "", label: "" }];
  const handleTinh = (e) => {
    setTinhSelect(e);
  };
  const handleHuyen = (e) => {
    setHuyenSelect(e);
  };
  const handleXa = (e) => {
    setXaSelect(e);
  };
  useEffect(() => {
    const run = async () => {
      if (TinhSelect) {
        const data = await GHNService.getHuyen(TinhSelect.value);
        if (data.data.code == 200) {
          const dataHuyen = data.data.data;
          const newArr = dataHuyen.map((item) => ({
            DistrictID: item.DistrictID,
            DistrictName: item.DistrictName,
          }));
          setHuyen(newArr);
        }
      }
    };
    run();
  }, [TinhSelect]);
  useEffect(() => {
    const run = async () => {
      if (HuyenSelect) {
        const data = await GHNService.getXa(HuyenSelect.value);
        if (data.data.code == 200) {
          const dataXa = data.data.data;
          const newArr = dataXa.map((item) => ({
            WardCode: item.WardCode,
            WardName: item.WardName,
          }));
          setXa(newArr);
        }
      }
    };
    run();
  }, [HuyenSelect]);

  const handleAdd = () => {
    console.log(User);
    console.log(Name);
    console.log(Phone);
    console.log(TinhSelect);
    console.log(HuyenSelect);
    console.log(XaSelect);
    console.log(Address);
    // onHide();
  };
  return (
    <div>
      <Modal {...props} size="lg" centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col md-6">
              <label>Tên</label>
              <input
                ref={f}
                type="text"
                className="form-control"
                placeholder="Người nhận.."
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="col md-6">
              <label>Số điện thoại</label>
              <input
                type="email"
                className="form-control"
                placeholder="0..."
                value={Phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col md-4">
              <label>
                Tỉnh{" "}
                {editAddress == true && (
                  <span style={{ fontWeight: 500 }}>Đăk Nông</span>
                )}
              </label>
              <Select
                onChange={handleTinh}
                options={
                  Tinh.length > 0
                    ? Tinh.map((i) => ({
                        value: i.ProvinceID,
                        label: i.ProvinceName,
                      }))
                    : options
                }
              />
            </div>
            <div className="col md-4">
              <label>
                Huyện{" "}
                {editAddress == true && (
                  <span style={{ fontWeight: 500 }}>epo</span>
                )}
              </label>
              <Select
                onChange={handleHuyen}
                options={
                  Huyen.length > 0
                    ? Huyen.map((i) => ({
                        value: i.DistrictID,
                        label: i.DistrictName,
                      }))
                    : options
                }
              />
            </div>
            <div className="col md-4">
              <label>
                Xã{" "}
                {editAddress == true && (
                  <span style={{ fontWeight: 500 }}>namdong</span>
                )}
              </label>
              <Select
                onChange={handleXa}
                options={
                  Xa.length > 0
                    ? Xa.map((i) => ({
                        value: i.WardCode,
                        label: i.WardName,
                      }))
                    : options
                }
              />
            </div>
          </div>
          <div className="mt-4">
            <label>Địa chỉ</label>
            <textarea
              type="text"
              className="form-control"
              placeholder="Nhập địa chỉ.."
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={onHide}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={() => handleAdd()}>
            Add
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddressModal;
