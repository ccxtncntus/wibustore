/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as AddPriceService from '../../../services/AddPriceService';
import { message } from 'antd';
import { FormatNumber } from '../../../helpers/FormatNumber';
const UserAddPriceModal = (props) => {
  const [item, setitem] = useState('');
  const [size, setsize] = useState({
    size: '',
    price: '',
    saleoff: '',
  });
  const resetAll = () => {
    setsize({
      size: '',
      price: '',
      saleoff: '',
    });
  };

  useEffect(() => {
    const run = async () => {
      if (props.itemAddprice !== '') {
        setListPrices([]);
        resetAll();
        setitem(props.itemAddprice);
        handleView();
      }
    };
    run();
  }, [props.itemAddprice]);
  const validateSize = (a, b, c) => {
    if (a.trim() == '' || b.trim() == '' || c.trim() == '') {
      alert('Không bỏ trống');
      return false;
    }
    if (b < 1) {
      alert('Không nhỏ hơn 1');
      return false;
    }
    if (c < 0) {
      alert('Không nhỏ hơn 0');
      return false;
    }
    if (Number(b) <= Number(c)) {
      alert('Sale nhỏ hơn giá');
      return false;
    }
    return true;
  };
  const handleAdd = async () => {
    // console.log(item.id);
    // console.log(size);
    const check = validateSize(size.size, size.price, size.saleoff);
    if (check) {
      // console.log('Thêm thành công');
      const checkAdd = await AddPriceService.add(
        item.id,
        size.size,
        Number(size.price * 1000),
        Number(size.saleoff * 1000)
      );
      if (checkAdd.status == 200) {
        message.success('Thêm thành công');
        handleView();
        resetAll();
      } else {
        message.success('Có lỗi xảy ra thử lại sau');
      }
      return;
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setsize((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  const handleDel = async (item) => {
    const del = prompt('Xác nhận xóa (y/n)');
    if (del == 'y') {
      const del = await AddPriceService.deletePrice(item);
      if (del.status == 200) {
        message.success('Xóa thành công');
        handleView();
        return;
      }
      message.error('Có lỗi xảy ra xin thử lại sau');
      return;
    }
    message.warning('Hủy xóa');
  };
  const [ListPrices, setListPrices] = useState([]);
  const handleView = async () => {
    const data = await AddPriceService.List(item.id);
    setListPrices(data);
    data.length == 0 && message.warning('Chưa thêm giá cho sản phẩm 😒');
  };
  // edit
  const [idEdit, setidEdit] = useState(null);
  const [isEdit, setisEdit] = useState(false);

  const handleEdit = (i) => {
    setidEdit(i.id);
    setisEdit(true);
    setsize({
      size: i.size,
      price: i.price,
      saleoff: i.saleoff,
    });
  };
  const handleEditSucces = async () => {
    const checkEdit = await AddPriceService.editPrice(
      idEdit,
      size.size,
      size.price,
      size.saleoff
    );
    if (checkEdit.status == 200) {
      message.success('Sửa thành công');
      setisEdit(false);
      resetAll();
      handleView();
      return;
    }
    message.error('Có lỗi xảy ra xin thử lại sau');
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {item.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Kích thước 1x1 cm</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Kích thước"
                  name="size"
                  value={size.size}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Giá 000đ</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Giá"
                  name="price"
                  value={size.price}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Khuyến mãi 000đ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Khuyến mãi"
                  name="saleoff"
                  value={size.saleoff}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          {isEdit ? (
            <Button variant="success" onClick={handleEditSucces}>
              Edit
            </Button>
          ) : (
            <Button variant="primary" onClick={handleAdd}>
              Add
            </Button>
          )}
        </Form>
        <hr />
        <Table striped bordered hover className="mt-2">
          <thead>
            <tr>
              <th>#</th>
              <th>Kích thước</th>
              <th>Giá</th>
              <th>Sale</th>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {ListPrices.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.size}</td>
                <td>{FormatNumber(item.price)}</td>
                <td>{FormatNumber(item.saleoff)}</td>
                <td>
                  <Button variant="success" onClick={() => handleEdit(item)}>
                    Sửa
                  </Button>{' '}
                  <Button variant="danger" onClick={() => handleDel(item.id)}>
                    Xóa
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserAddPriceModal;
