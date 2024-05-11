/* eslint-disable no-unused-vars */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useContext } from 'react';
import { message } from 'antd';
import * as ProductsServices from '../../services/ProductService';
import { FillterProducts } from '../context/FillterContext';

const ShopFillter = () => {
  const { ListFillter, setListFillter } = useContext(FillterProducts);

  const [filters, setfilters] = useState({
    first: 0,
    second: 0,
  });
  const validate = (a, b) => {
    if (a < 0 || b < 1) {
      return false;
    }
    if (a == b) {
      return false;
    }
    if (a > b) {
      return false;
    }
    return true;
  };
  const handleFilter = async () => {
    if (validate(filters.first, filters.second)) {
      const f = filters.first == 0 ? 1000 : filters.first * 1000;
      const s = filters.second * 1000;
      const ListBetween = await ProductsServices.ListBetween(f, s);
      ListBetween?.status == 400
        ? setListFillter([])
        : setListFillter(ListBetween);
      return;
    }
    message.warning('Giá không hợp lệ');
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Control
          type="number"
          placeholder="Từ..."
          onChange={(e) =>
            setfilters({ ...filters, first: Number(e.target.value) })
          }
        />
        <Form.Control
          type="number"
          placeholder="Tới..."
          className="mt-1"
          onChange={(e) =>
            setfilters({ ...filters, second: Number(e.target.value) })
          }
        />
        <Button variant="primary" className="mt-2" onClick={handleFilter}>
          Lọc
        </Button>
      </Form.Group>
    </Form>
  );
};

export default ShopFillter;
