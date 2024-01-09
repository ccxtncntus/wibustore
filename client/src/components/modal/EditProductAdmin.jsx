import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import * as ProductService from "../../services/ProductService";
import * as imgsService from "../../services/imgsService";
import { message } from "antd";
import { HOST } from "../../configs/DataEnv";
import "../admin/productadmin.css";
const EditProductAdmin = (props) => {
  const { show, onShow, dataProduct, onLoad } = props;
  const [dataTest, setdataTest] = useState({});
  const [imgs, setimgs] = useState([]);
  const [blob, setblob] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setimgDelete([]);
      setblob([]);
      setimgs([]);
      setloading(true);
      await setdataTest(dataProduct);
      //   console.log(dataProduct);
      const imgs = await imgsService.List(dataProduct.id);
      setimgs(imgs);
      setloading(false);
    };
    fetch();
  }, [props]);

  const {
    register,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm();
  const [imgDelete, setimgDelete] = useState([]);
  const HandleDelBlob = (item, index) => {
    if (typeof item === "object") {
      setimgDelete((pre) => [...pre, item.url]);
      setimgs(imgs.filter((img) => img.url !== item.url));
    } else {
      const arr = Object.values(dataTest.img[0]);
      arr.splice(index, 1);
      setValue("imgs", arr, { shouldValidate: true });
      URL.revokeObjectURL(item);
    }
  };

  const check = () => {
    if (Object.keys(dataTest).length <= 0) return;
    if (
      dataTest.name.trim() === "" ||
      dataTest.description.trim() === "" ||
      dataTest.quantity === "" ||
      dataTest.price === "" ||
      dataTest.saleoff === ""
    ) {
      return false;
    } else if (Number(dataTest.price) < Number(dataTest.saleoff)) {
      return false;
    } else if (
      Number(dataTest.price) < 1 ||
      Number(dataTest.saleoff) < 0 ||
      Number(dataTest.quantity) < 1
    ) {
      return false;
    } else {
      return true;
    }
  };
  const handleEditPro = async () => {
    const validate = check();
    console.log(validate);
    if (validate) {
      try {
        if (imgDelete.length > 0) {
          const data = await imgsService.deleteListImg(imgDelete);
          console.log(data);
        }
        const formData = new FormData();
        if (dataTest.img) {
          const arr = Object.values(dataTest.img[0]);
          // console.log(arr);
          arr.map((item) => {
            formData.append("images[]", item);
          });
        }
        formData.append("name", dataTest.name);
        formData.append("description", dataTest.description);
        formData.append("price", dataTest.price);
        formData.append("quantity", dataTest.quantity);
        formData.append("saleoff", dataTest.saleoff);
        formData.append("status", dataTest.status);
        const addProduct = await ProductService.edit(formData, dataTest.id);
        console.log(addProduct);
        if (addProduct.status === 200) {
          message.success("Add success!");
          onShow();
          onLoad();
        }
        reset();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  useEffect(() => {
    if (watch("imgs")) {
      setdataTest({
        ...dataTest,
        img: [watch("imgs")],
      });
      setloading(true);
      const arr = Object.values(watch("imgs"));
      const data = arr.map((item) => URL.createObjectURL(item));
      setblob(data);
      setloading(false);
    }
  }, [watch("imgs")]);

  const checkSale = () => {
    if (Object.keys(dataTest).length > 0 && dataTest.saleoff == "") {
      return "Không bỏ trống";
    } else if (dataTest.saleoff < 0) {
      return "Số lớn hơn 0";
    } else if (Number(dataTest.price) < Number(dataTest.saleoff)) {
      return "Sale không lớn hơn hoặc bằng giá";
    } else {
      return true;
    }
  };

  const checkNumber = (data) => {
    if (Object.keys(dataTest).length > 0 && data === "") {
      return "Không bỏ trống";
    } else if (data < 1) {
      return "Tối thiểu là 1";
    } else {
      return true;
    }
  };

  // function currencyFormat(num) {
  //   return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ";
  // }
  // console.log(currencyFormat(100000)); // $2,665.00

  return (
    <div>
      <Modal
        show={show}
        fullscreen={true}
        onHide={() => {
          reset();
          onShow();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <Form.Label>Name</Form.Label>
              <input
                className="form-control"
                type="text"
                value={dataTest.name}
                onChange={(e) =>
                  setdataTest({ ...dataTest, name: e.target.value })
                }
              />
              <p className="text-danger" role="alert">
                {Object.keys(dataTest).length > 0 &&
                  dataTest.name.trim() == "" &&
                  "Không bỏ trống"}
              </p>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>status</Form.Label>
                <select
                  className="form-select"
                  defaultValue={dataTest.status}
                  onChange={(e) =>
                    setdataTest({
                      ...dataTest,
                      status: e.target.value,
                    })
                  }
                >
                  <option value="Còn hàng">Còn hàng</option>
                  <option value="Hết hàng">Hết hàng</option>
                </select>
              </Form.Group>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Images</Form.Label>
              <br />
              <Form.Label htmlFor="file_product">
                <i style={{ fontSize: 30 }} className="fa-regular fa-image"></i>
              </Form.Label>
              {!loading && (
                <div className="product_admin_listimg">
                  {imgs.length > 0 &&
                    imgs.map((item, index) => (
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
                            src={
                              imgs.length > 0 && HOST + "/uploads/" + item.url
                            }
                            alt=""
                          />
                          <i
                            onClick={() => HandleDelBlob(item, index)}
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
                  {/* blob */}
                  {blob.length > 0 &&
                    blob.map((item, index) => (
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
                            onClick={() => HandleDelBlob(item, index)}
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
              )}
              <input
                multiple
                style={{ display: "none" }}
                id="file_product"
                type="file"
                {...register("imgs", {
                  required:
                    watch("imgs") &&
                    Object.values(watch("imgs")).length > 0 &&
                    imgs.length > 0
                      ? false
                      : "img is required",
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
              <textarea
                className="form-control"
                placeholder="..."
                id="floatingTextarea2"
                style={{ height: "100px" }}
                defaultValue={dataTest.description}
                onChange={(e) =>
                  setdataTest({
                    ...dataTest,
                    description: e.target.value,
                  })
                }
              ></textarea>
              <p className="text-danger" role="alert">
                {Object.keys(dataTest).length > 0 &&
                  dataTest.description.trim() == "" &&
                  "Không bỏ trống"}
              </p>
            </Form.Group>

            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <input
                  className="form-control"
                  type="number"
                  defaultValue={dataTest.quantity}
                  onChange={(e) =>
                    setdataTest({
                      ...dataTest,
                      quantity: e.target.value,
                    })
                  }
                />
                <p className="text-danger" role="alert">
                  {checkNumber(dataTest.quantity)}
                </p>
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <input
                  className="form-control"
                  type="number"
                  defaultValue={dataTest.price}
                  onChange={(e) =>
                    setdataTest({
                      ...dataTest,
                      price: e.target.value,
                    })
                  }
                />
                <p className="text-danger" role="alert">
                  {checkNumber(dataTest.price)}
                </p>
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label>Sale off</Form.Label>
                <input
                  className="form-control"
                  type="number"
                  defaultValue={dataTest.saleoff}
                  onChange={(e) =>
                    setdataTest({
                      ...dataTest,
                      saleoff: e.target.value,
                    })
                  }
                />
                <p className="text-danger" role="alert">
                  {checkSale()}
                </p>
              </Form.Group>
            </div>
            <Button
              style={{ width: 120, marginLeft: 12 }}
              variant="secondary"
              onClick={() => {
                reset();
                onShow();
              }}
            >
              Close
            </Button>
            <Button
              style={{ width: 120, marginLeft: 12 }}
              variant="primary"
              onClick={handleEditPro}
              disabled={!check()}
            >
              Save
            </Button>
          </div>
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditProductAdmin;
