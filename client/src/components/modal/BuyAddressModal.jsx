import { useEffect, useRef, useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import * as GHNService from '../../services/GHN';
import * as AddressService from '../../services/AddressService';
import { UContexts } from '../context/UserContext';
import { message } from 'antd';
const BuyAddressModal = (props) => {
  const { User } = useContext(UContexts);
  const { onHide, show } = props;
  const f = useRef();
  const [Name, setName] = useState('');
  const [Phone, setPhone] = useState('');
  const [Tinh, setTinh] = useState([]);
  const [TinhSelect, setTinhSelect] = useState(null);
  const [Huyen, setHuyen] = useState([]);
  const [HuyenSelect, setHuyenSelect] = useState(null);
  const [Xa, setXa] = useState([]);
  const [XaSelect, setXaSelect] = useState(null);
  const [Address, setAddress] = useState('');

  const start = () => {
    setName('');
    setPhone('');
    setTinhSelect(null);
    setHuyenSelect(null);
    setXaSelect(null);
    setAddress('');
  };
  useEffect(() => {
    const run = async () => {
      if (show) {
        start();
        f.current.focus();
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
  const options = [{ value: '', label: '' }];
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

  const handleAdd = async () => {
    if (
      Name == '' ||
      Phone == '' ||
      !TinhSelect ||
      !HuyenSelect ||
      !XaSelect ||
      Address == ''
    ) {
      message.warning('Không bỏ trống thông tin');
      return;
    }
    const { setad } = props;
    const newAd = {
      address: Address,
      district_id: HuyenSelect.value,
      huyen: HuyenSelect.label,
      name: Name,
      phone: Phone,
      status: '1',
      tinh: TinhSelect.label,
      ward_code: XaSelect.value,
      xa: XaSelect.label,
    };

    setad([newAd]);

    const addA = await AddressService.add(
      User.id,
      Name,
      Phone,
      TinhSelect.label,
      HuyenSelect.label,
      XaSelect.label,
      HuyenSelect.value,
      XaSelect.value,
      Address
    );
    if (addA.status === 200) {
      message.success(addA.message);
      onHide();
    } else {
      message.warning(addA.message);
    }
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
              <label>Tỉnh</label>
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
              <label>Huyện</label>
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
              <label>Xã</label>
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
            Thêm
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default BuyAddressModal;
