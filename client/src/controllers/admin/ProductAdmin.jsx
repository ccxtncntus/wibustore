import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import "./productadmin.css";
import * as ProductService from "../../services/ProductService";

const ProductAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const onSubmit = async (data) => {
    const formData = new FormData();
    const arr = Object.values(data.imgs);
    arr.map((item) => {
      formData.append("images[]", item);
    });
    const img = await ProductService.update(formData);
    console.log(img);
  };

  //   useEffect(() => {
  //     const chay = async () => {
  //       const data = await ProductService.List(1);
  //       console.log(data.data.data);
  //     };
  //     chay();
  //     return () => {};
  //   }, []);

  const price = watch("price");
  const lessThanPrice = (value) => {
    if (!isNaN(value) && !isNaN(price)) {
      return parseFloat(value) <= parseFloat(price) || "sale shount < price";
    }
    return true;
  };

  return (
    <div className="product_admin">
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Product name"
            {...register("name", {
              required: "Name is required",
              pattern: /^\S.*\S$/,
            })}
          />
          {errors.name && (
            <p className="text-danger" role="alert">
              {errors.name?.message}
            </p>
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select defaultValue={1} {...register("categoty")}>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </Form.Group> */}

        <Form.Group className="mb-3">
          <Form.Label>Images</Form.Label>
          <br />
          <Form.Label htmlFor="file_product">
            <i style={{ fontSize: 30 }} className="fa-regular fa-image"></i>
          </Form.Label>
          <div className="product_admin_listimg">
            <span
              style={{ position: "relative" }}
              className="product_admin_img"
            >
              <img
                style={{
                  height: 160,
                  margin: 2,
                }}
                src="https://i.pinimg.com/564x/80/31/aa/8031aa071aaac32e984379809fe43018.jpg"
                alt=""
              />
              <i
                style={{
                  position: "absolute",
                  top: -60,
                  right: 10,
                  fontSize: 20,
                }}
                className="fa-regular fa-circle-xmark"
              ></i>
            </span>
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
          {errors.name && (
            <p className="text-danger" role="alert">
              {errors.name?.message}
            </p>
          )}
        </Form.Group>

        {/*    <Form.Group className="mb-3">
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
        <Form.Group className="mb-3">
          <Form.Label>status</Form.Label>
          <Form.Select defaultValue={"Còn hàng"} {...register("status")}>
            <option value="Còn hàng">Còn hàng</option>
            <option value="Hết hàng">Hết hàng</option>
          </Form.Select>
        </Form.Group> */}
        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </Form>
    </div>
  );
};

export default ProductAdmin;
