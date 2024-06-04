import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import * as CategoryService from '../../services/CategoryService';
import { Button, message, Popconfirm } from 'antd';
const CategoriesAdmin = () => {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm();
  const [AddCate, setAddCate] = useState(false);
  const [Edit, setEdit] = useState(false);
  const [dataCate, setDataCate] = useState({
    CategoryName: '',
    id: '',
    Status: '1',
  });
  const onSubmit = async (data) => {
    // console.log(data);
    const namee = data.categoryName;
    const statuss = data.status;
    try {
      if (Edit) {
        const editCate = await CategoryService.edit(
          namee,
          statuss,
          dataCate.id
        );
        // console.log(editCate);
        message.success('Edit success');
      } else {
        const addCate = await CategoryService.update(namee, statuss);
        // console.log(addCate);
        message.success('Add success');
      }
      setDataCate({
        CategoryName: '',
        Status: '1',
        id: '',
      });
      setFocus('categoryName');
      reset();
      setEdit(false);
      setAddCate((pre) => !pre);
    } catch (error) {
      console.error('Error:', error.response.data.message);
      message.error(error.response.data.message);
    }
  };
  const [ListCategory, setListCategory] = useState(null);
  useEffect(() => {
    const listC = async () => {
      try {
        const data = await CategoryService.List(1);
        setListCategory(data.data.data);
      } catch (error) {
        // console.log(error.response.data);
      }
    };
    listC();
    return () => {};
  }, [AddCate]);
  const confirm = async (item) => {
    const addCate = await CategoryService.del(item.id);
    setAddCate((pre) => !pre);
    message.success(addCate.message);
  };
  const cancel = (item) => {
    message.error('Undelete');
  };
  const handleEdit = (item) => {
    reset();
    setEdit(true);
    setDataCate({
      CategoryName: item.name,
      Status: item.status,
      id: item.id,
    });
  };
  return (
    <div className="category_admin row">
      <div className="col-md-5">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Category name</Form.Label>
            <Form.Control
              defaultValue={dataCate.CategoryName}
              type="text"
              placeholder="..."
              {...register('categoryName', {
                required:
                  dataCate.CategoryName == '' ? false : 'Name is required',
                pattern: {
                  value: /^\S.*\S$/,
                  message: 'No space',
                },
              })}
            />
            {errors.categoryName && (
              <span className="text-danger">
                {errors.categoryName?.message}
              </span>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select defaultValue={dataCate.Status} {...register('status')}>
              <option value="1">Mở bán</option>
              <option value="0">Tạm ngưng</option>
            </Form.Select>
          </Form.Group>
          <div className="col-md-6"></div>
          <button type="submit" className="btn btn-success">
            {Edit ? 'Edit' : 'Add'}
          </button>
        </Form>
      </div>
      <div className="col-md-7">
        {ListCategory ? (
          <Table bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Status</th>
                <th>*</th>
              </tr>
            </thead>
            <tbody>
              {ListCategory.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.status ? 'Mở bán' : 'Tạm ngưng'}</td>
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
                    </Popconfirm>{' '}
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
        ) : (
          'Chưa có danh mục...'
        )}
      </div>
    </div>
  );
};

export default CategoriesAdmin;

// <span>{CategoryName}</span> <span> {isNaN(Status) ? "" : Status}</span>
