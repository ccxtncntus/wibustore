import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import "./productadmin.css";
import * as ProductService from "../../services/ProductService";
import * as CategoryService from "../../services/CategoryService";
import { useEffect, useState } from "react";
import { message } from "antd";

const ProductAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setFocus,
  } = useForm();
  const onSubmit = async (data) => {
    // console.log(data.category);
    try {
      const formData = new FormData();
      const arr = Object.values(data.imgs);
      arr.map((item) => {
        formData.append("images[]", item);
      });
      formData.append("name", data.name.trim());
      formData.append("category_id", data.category.trim());
      formData.append("description", data.description.trim());
      formData.append("price", data.price.trim());
      formData.append("quantity", data.quantity.trim());
      formData.append("saleoff", data.sale.trim());
      formData.append("status", data.status.trim());
      const addProduct = await ProductService.update(formData);
      console.log(addProduct);
      if (addProduct.status === 200) {
        message.success("Add success!");
      }
      reset();
      setFocus("name");
    } catch (error) {
      console.error("Error:", error);
    }
    //   const addProductSuccess = await Promise.all([addProduct]);
  };
  const [listCategory, setlistCategory] = useState([]);
  useEffect(() => {
    const listC = async () => {
      try {
        const data = await CategoryService.List(1);
        setlistCategory(data.data.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    listC();
    return () => {};
  }, []);
  const price = watch("price");
  const lessThanPrice = (value) => {
    if (!isNaN(value) && !isNaN(price)) {
      return parseFloat(value) <= parseFloat(price) || "sale < price";
    }
    return true;
  };
  const [imgBlob, setimgBlob] = useState([]);
  useEffect(() => {
    const numberImg = watch("imgs").length;
    if (numberImg > 0) {
      const arr = Object.values(watch("imgs"));
      const newImg = arr.map((item) => URL.createObjectURL(item));
      setimgBlob(newImg);
    }
    return () => {};
  }, [watch("imgs")]);
  const HandleDelBlob = (item) => {
    console.log(watch("imgs"));
    URL.revokeObjectURL(item);
    const chay = imgBlob.filter((img) => img !== item);
    console.log(chay);
    setimgBlob(chay);
  };
  return (
    <div className="product_admin">
      <Form onSubmit={handleSubmit(onSubmit)} className="row">
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Product name"
              {...register("name", {
                required: "Name is required",
                pattern: {
                  value: /^\S.*\S$/,
                  message: "No space",
                },
              })}
            />
            {errors.name && (
              <p className="text-danger" role="alert">
                {errors.name?.message}
              </p>
            )}
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              aria-label="Default select example"
              {...register("category")}
            >
              <option>--Chọn--</option>
              {listCategory.length > 0 &&
                listCategory.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </div>
        <Form.Group className="mb-3">
          <Form.Label>Images</Form.Label>
          <br />
          <Form.Label htmlFor="file_product">
            <i style={{ fontSize: 30 }} className="fa-regular fa-image"></i>
          </Form.Label>
          <div className="product_admin_listimg">
            {imgBlob.length > 0 &&
              imgBlob.map((item, index) => (
                <span key={index}>
                  <span
                    style={{ position: "relative" }}
                    className="product_admin_img"
                  >
                    <img
                      style={{
                        height: 160,
                        margin: 2,
                        objectFit: "cover",
                      }}
                      src={item}
                      alt=""
                    />
                    <i
                      onClick={() => HandleDelBlob(item)}
                      style={{
                        position: "absolute",
                        top: -60,
                        right: 10,
                        fontSize: 20,
                      }}
                      className="fa-regular fa-circle-xmark"
                    ></i>
                  </span>
                </span>
              ))}
          </div>
          <Form.Control
            multiple
            style={{ display: "none" }}
            id="file_product"
            type="file"
            {...register("imgs", {
              required: "Img is required",
            })}
          />
          {errors.imgs && (
            <p className="text-danger" role="alert">
              {errors.imgs?.message}
            </p>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            {...register("description", {
              required: "description is required",
            })}
          />
          {errors.description && (
            <p className="text-danger" role="alert">
              {errors.description?.message}
            </p>
          )}
        </Form.Group>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Product name"
              {...register("quantity", {
                required: "Quantity is required",
                min: {
                  value: 0,
                  message: "lớn hơn 0",
                },
              })}
            />
            {errors.quantity && (
              <p className="text-danger" role="alert">
                {errors.quantity?.message}
              </p>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Sale off</Form.Label>
            <Form.Control
              type="number"
              placeholder="..."
              {...register("sale", {
                min: {
                  value: 0,
                  message: "Lớn hơn 0",
                },
                required: true,
                validate: {
                  lessThanPrice,
                },
              })}
            />
            {errors.sale && (
              <p className="text-danger" role="alert">
                {errors.sale?.message}
              </p>
            )}
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="..."
              {...register("price", { min: 1, required: "price is required" })}
            />
            {errors.price && (
              <p className="text-danger" role="alert">
                {errors.price?.message}
              </p>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>status</Form.Label>
            <Form.Select defaultValue={"Còn hàng"} {...register("status")}>
              <option value="Còn hàng">Còn hàng</option>
              <option value="Hết hàng">Hết hàng</option>
            </Form.Select>
          </Form.Group>
        </div>
        <button
          style={{ width: 120, marginLeft: 12 }}
          className="btn btn-primary"
          type="submit"
        >
          Add
        </button>
      </Form>
    </div>
  );
};

export default ProductAdmin;
