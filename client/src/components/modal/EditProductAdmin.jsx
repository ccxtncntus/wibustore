/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import * as ProductService from '../../services/ProductService';
import * as imgsService from '../../services/imgsService';
import { message } from 'antd';
import { HOST } from '../../configs/DataEnv';
import '../admin/productadmin.css';
import TTesst from '../admin/tesst';
const EditProductAdmin = (props) => {
  const { show, onShow, dataProduct, onLoad } = props;
  const [dataTest, setdataTest] = useState({});
  const [imgs, setimgs] = useState([]);
  const [blob, setblob] = useState([]);
  const [loading, setloading] = useState(false);
  const [Description, setDescription] = useState('');
  useEffect(() => {
    const fetch = async () => {
      if (show) {
        setimgDelete([]);
        setblob([]);
        setimgs([]);
        setloading(true);
        setdataTest(dataProduct);
        console.log(dataProduct);
        setDescription(dataProduct.description);

        const imgs = await imgsService.List(dataProduct.id);
        setimgs(imgs);
        setloading(false);
      }
    };
    fetch();
  }, [show]);

  const {
    register,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm();
  const [imgDelete, setimgDelete] = useState([]);
  const HandleDelBlob = (item, index) => {
    if (typeof item === 'object') {
      setimgDelete((pre) => [...pre, item.url]);
      setimgs(imgs.filter((img) => img.url !== item.url));
    } else {
      const arr = Object.values(dataTest.img[0]);
      arr.splice(index, 1);
      setValue('imgs', arr, { shouldValidate: true });
      URL.revokeObjectURL(item);
    }
  };

  const check = () => {
    if (Object.keys(dataTest).length <= 0) return;
    if (
      dataTest.name.trim() == '' ||
      dataTest.description.trim() == '' ||
      dataTest.quantity == ''
    ) {
      return false;
    } else if (Number(dataTest.quantity) < 1) {
      return false;
    } else {
      return true;
    }
  };
  const [errDesc, seterrDesc] = useState(false);
  const checkDes = (data) => {
    if (data.trim() == '') {
      seterrDesc(true);
      return false;
    }
    seterrDesc(false);
    return true;
  };
  const handleEditPro = async () => {
    const validate = check();
    const checkDe = checkDes(Description);
    if (validate && checkDe) {
      try {
        if (imgDelete.length > 0) {
          const data = await imgsService.deleteListImg(imgDelete);
          console.log(data);
        }
        const formData = new FormData();
        if (dataTest.img) {
          const arr = Object.values(dataTest.img[0]);
          arr.map((item) => {
            formData.append('images[]', item);
          });
        }
        formData.append('name', dataTest.name);
        formData.append('description', Description);
        formData.append('quantity', dataTest.quantity);
        formData.append('status', dataTest.status);
        const addProduct = await ProductService.edit(formData, dataTest.id);
        console.log(addProduct);
        if (addProduct.status === 200) {
          message.success('Edit success!');
          onShow();
          onLoad();
        }
        reset();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  useEffect(() => {
    if (watch('imgs')) {
      setdataTest({
        ...dataTest,
        img: [watch('imgs')],
      });
      setloading(true);
      const arr = Object.values(watch('imgs'));
      const data = arr.map((item) => URL.createObjectURL(item));
      setblob(data);
      setloading(false);
    }
  }, [watch('imgs')]);

  const checkNumber = (data) => {
    if (Object.keys(dataTest).length > 0 && data === '') {
      return 'Không bỏ trống';
    } else if (data < 1) {
      return 'Tối thiểu là 1';
    } else {
      return true;
    }
  };
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
            <div className="col-md-4">
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
                  dataTest.name.trim() == '' &&
                  'Không bỏ trống'}
              </p>
            </div>
            <div className="col-md-4">
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
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <input
                  className="form-control"
                  type="number"
                  value={dataTest.quantity}
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
                          style={{ position: 'relative' }}
                          className="product_admin_img"
                        >
                          <img
                            style={{
                              height: 160,
                              margin: 2,
                              objectFit: 'cover',
                            }}
                            src={
                              imgs.length > 0 && HOST + '/uploads/' + item.url
                            }
                            alt=""
                          />
                          <i
                            onClick={() => HandleDelBlob(item, index)}
                            style={{
                              position: 'absolute',
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
                          style={{ position: 'relative' }}
                          className="product_admin_img"
                        >
                          <img
                            style={{
                              height: 160,
                              margin: 2,
                              objectFit: 'cover',
                            }}
                            src={item}
                            alt=""
                          />
                          <i
                            onClick={() => HandleDelBlob(item, index)}
                            style={{
                              position: 'absolute',
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
                style={{ display: 'none' }}
                id="file_product"
                type="file"
                {...register('imgs', {
                  required:
                    watch('imgs') &&
                    Object.values(watch('imgs')).length > 0 &&
                    imgs.length > 0
                      ? false
                      : 'img is required',
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
              <TTesst
                setDescription={setDescription}
                description={Description}
              />
              {errDesc && (
                <p className="text-danger" role="alert">
                  Không bỏ trống
                </p>
              )}
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
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
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditProductAdmin;
