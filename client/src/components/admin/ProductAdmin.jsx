import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import './productadmin.css';
import * as ProductService from '../../services/ProductService';
import * as CategoryService from '../../services/CategoryService';
import { useEffect, useState } from 'react';
import { message } from 'antd';
import TTesst from './tesst';

const ProductAdmin = () => {
  const [Description, setDescription] = useState('');
  const [ErrorDe, setErrorDe] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setFocus,
    setValue,
  } = useForm();
  const [imgBlob, setimgBlob] = useState([]);
  const validateDe = (de) => {
    if (de.trim() == '') {
      setErrorDe('không bỏ trống');
      return false;
    }
    setErrorDe('');

    return true;
  };
  const onSubmit = async (data) => {
    try {
      if (validateDe(Description)) {
        const formData = new FormData();
        const arr = Object.values(data.imgs);
        arr.map((item) => {
          formData.append('images[]', item);
        });
        formData.append('name', data.name.trim());
        formData.append('category_id', data.category.trim());
        formData.append('description', Description.trim());
        // formData.append('price', data.price.trim());
        formData.append('quantity', data.quantity.trim());
        // formData.append('saleoff', data.sale.trim());
        formData.append('status', data.status.trim());
        const addProduct = await ProductService.update(formData);
        console.log(addProduct);
        if (addProduct.status === 200) {
          message.success('Add success!');
        }
        reset();
        setFocus('name');
        setDescription('');
        setimgBlob([]);
        return;
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
  useEffect(() => {
    const numberImg = watch('imgs').length;
    if (numberImg > 0) {
      const arr = Object.values(watch('imgs'));
      const newImg = arr.map((item) => URL.createObjectURL(item));
      setimgBlob(newImg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch('imgs')]);

  const HandleDelBlob = (item, index) => {
    const arr = Object.values(watch('imgs'));
    arr.splice(index, 1);
    setValue('imgs', arr, { shouldValidate: true });
    URL.revokeObjectURL(item);
    const chay = imgBlob.filter((img) => img !== item);
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
              {...register('name', {
                required: 'Name is required',
                pattern: {
                  value: /^\S.*\S$/,
                  message: 'No space',
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
              {...register('category', {
                required: 'Category is required',
              })}
            >
              <option value="">--- Chọn ---</option>
              {listCategory.length > 0 &&
                listCategory.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
            </Form.Select>
            {errors.category && (
              <p className="text-danger" role="alert">
                {errors.category?.message}
              </p>
            )}
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
          <Form.Control
            multiple
            style={{ display: 'none' }}
            id="file_product"
            type="file"
            {...register('imgs', {
              required:
                watch('imgs') && Object.values(watch('imgs')).length > 0
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
          <TTesst setDescription={setDescription} />
          {ErrorDe.trim() !== '' && (
            <p className="text-danger" role="alert">
              Không bỏ trống
            </p>
          )}
        </Form.Group>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Product name"
              {...register('quantity', {
                required: 'Quantity is required',
                min: {
                  value: 0,
                  message: 'lớn hơn 0',
                },
              })}
            />
            {errors.quantity && (
              <p className="text-danger" role="alert">
                {errors.quantity?.message}
              </p>
            )}
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3">
            <Form.Label>status</Form.Label>
            <Form.Select defaultValue={'Còn hàng'} {...register('status')}>
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
