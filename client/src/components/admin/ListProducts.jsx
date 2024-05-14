import Form from 'react-bootstrap/Form';
import { Button, message, Popconfirm } from 'antd';
import Table from 'react-bootstrap/Table';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import * as CategoryService from '../../services/CategoryService';
import * as ProductService from '../../services/ProductService';
import EditProductAdmin from '../modal/EditProductAdmin';
import Pagination from '@mui/material/Pagination';
import { CountPage } from '../../helpers/FormatNumber';
import UserAddPriceModal from './adminModal/UserAddPriceModal';
const ListProducts = () => {
  const { register, watch } = useForm();
  const [listCate, setlistCate] = useState([]);
  const [listProductCate, setlistProductCate] = useState([]);
  const [delSuccess, setdelSuccess] = useState(false);
  const [loading, setloading] = useState(false);
  const [Cate, setCate] = useState(0);
  const [CountAll, setCountAll] = useState(1);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const listC = async () => {
      // console.log(watch("category"));
      try {
        const data = await CategoryService.List(1);
        data.status == 200 && setlistCate(data.data.data);
        if (Cate == 0) {
          const dataProCategory = await ProductService.ListAdmin(page);
          if (dataProCategory.status === 200) {
            setlistProductCate(dataProCategory.data.data);
            setCountAll(dataProCategory.count);
          } else {
            setlistProductCate([]);
          }
        } else {
          const dataProCategory = await ProductService.listProCategoryAdmin(
            Cate,
            page
          );
          if (dataProCategory.status === 200) {
            setlistProductCate(dataProCategory.data.data);
            setCountAll(dataProCategory.count);
          } else {
            setlistProductCate([]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    listC();
    return () => {};
  }, [delSuccess, loading, Cate, page]);

  const confirm = async (item) => {
    const del = await ProductService.delProduct(item.id);
    setdelSuccess((pre) => !pre);
    message.success('Delete success');
  };
  const cancel = () => {
    message.warning('Hủy xóa');
  };
  const [show, setShow] = useState(false);
  const [dataProduct, setdataProduct] = useState([]);
  const handleEdit = (item) => {
    setdataProduct(item);
    setShow(true);
  };
  const handleShow = () => {
    setShow(false);
  };
  const handleLoad = () => {
    setloading((pre) => !pre);
  };
  const handleChaneAll = (e) => {
    setCate(e.target.value);
  };
  const handleChange = (event, value) => {
    setPage(value);
  };
  const [itemAddprice, setitemAddprice] = useState('');
  const handleAddPrice = (item) => {
    setitemAddprice(item);
    setModalShow(true);
  };
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <EditProductAdmin
        show={show}
        onShow={handleShow}
        onLoad={handleLoad}
        dataProduct={dataProduct}
      />
      <div className="row">
        <div className="col-md-6">
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => handleChaneAll(e)}
          >
            <option value={'0'}>All</option>
            {listCate.length > 0 &&
              listCate.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
          </Form.Select>
        </div>
      </div>
      {/* list data */}
      {listProductCate.length > 0 ? (
        <div style={{ padding: 12 }} className="row">
          <Table bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Depcription</th>
                <th>Quantity</th>
                {/* <th>Price</th> */}
                <th>Status</th>
                <th>*</th>
              </tr>
            </thead>
            <tbody>
              {listProductCate.length > 0 &&
                listProductCate.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                    {/* <td>{item.price} đ</td> */}
                    <td>{item.status}</td>

                    <td>
                      <Popconfirm
                        title="Delete the category"
                        description="Are you sure to delete this category?"
                        onConfirm={() => confirm(item)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button danger>Delete</Button>
                      </Popconfirm>
                      <Button
                        className="m-1"
                        onClick={() => handleEdit(item)}
                        type="primary"
                      >
                        Edit
                      </Button>
                      <UserAddPriceModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        itemAddprice={itemAddprice}
                      />
                      <Button
                        className="m-1"
                        onClick={() => handleAddPrice(item)}
                        type="primary "
                        ghost
                      >
                        Giá
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <span>
          <br /> There are not products ...
        </span>
      )}
      {CountPage(CountAll) > 1 && (
        <Pagination
          count={CountPage(CountAll)}
          page={page}
          onChange={handleChange}
          color="primary"
          style={{ float: 'right' }}
        />
      )}
    </>
  );
};

export default ListProducts;
