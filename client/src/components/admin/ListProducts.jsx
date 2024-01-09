import Form from "react-bootstrap/Form";
import { Button, message, Popconfirm } from "antd";
import Table from "react-bootstrap/Table";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as CategoryService from "../../services/CategoryService";
import * as ProductService from "../../services/ProductService";
import EditProductAdmin from "../modal/EditProductAdmin";

const ListProducts = () => {
  const { register, watch } = useForm();

  const [err, seterr] = useState(false);
  const [listCate, setlistCate] = useState([]);
  const [listProductCate, setlistProductCate] = useState([]);
  const [delSuccess, setdelSuccess] = useState(false);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const listC = async () => {
      try {
        const data = await CategoryService.List(1);
        setlistCate(data.data.data);
        const idCategory = watch("category");
        const dataProCategory = await ProductService.listProCategory(
          idCategory,
          1
        );
        if (dataProCategory.data.data.length === 0) {
          seterr(true);
        } else {
          setlistProductCate(dataProCategory.data.data);
          seterr(false);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    listC();
    return () => {};
  }, [watch("category"), delSuccess, loading]);
  const confirm = async (item) => {
    const del = await ProductService.delProduct(item.id);
    console.log(del);
    setdelSuccess((pre) => !pre);
    message.success("Delete success");
  };
  const cancel = () => {
    message.error("Undelete");
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
            {...register("category", {
              required: "Category is required",
            })}
          >
            <option value={"0"}>--- Select ---</option>
            {listCate.length > 0 &&
              listCate.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
          </Form.Select>
        </div>
      </div>
      {!err ? (
        <div style={{ padding: 12 }} className="row">
          <Table bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Depcription</th>
                <th>Quantity</th>
                <th>Price</th>
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
                    <td>{item.price} đ</td>
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
    </>
  );
};

export default ListProducts;
