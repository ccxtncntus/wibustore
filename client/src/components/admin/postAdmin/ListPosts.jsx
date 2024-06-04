/* eslint-disable react-hooks/exhaustive-deps */
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import BlogModal from '../adminModal/BlogModal';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import * as BlogServices from '../../../services/BlogServices';
import { Count } from '../../../helpers/FormatNumber';
import { message } from 'antd';
const ListPosts = () => {
  const [modalShow, setModalShow] = useState(false);
  const [isEdit, setisEdit] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setloading] = useState(false);
  const [count, setcount] = useState(0);
  const [blogs, setblogs] = useState([]);
  const [edit, setedit] = useState(null);
  useEffect(() => {
    const run = async () => {
      all();
    };
    run();
  }, [page]);
  const handleChangePage = (event, value) => {
    console.log(value);
    setPage(value);
  };
  // edit
  const handleEdit = (i) => {
    setedit(i);
    setisEdit(true);
    setModalShow(true);
  };
  const handleHide = () => {
    all();
    setModalShow(false);
    setisEdit(false);
  };
  // Xóa
  const handleDel = async (i) => {
    const check = prompt('Xác nhận xóa (y/n)');
    if (check == 'y') {
      const del = await BlogServices.del(i);
      if (del.status == 200) {
        message.success('Xóa thành công');
        all();
        return;
      }
      message.warning('Có lỗi xảy ra');
      return;
    }
    message.warning('Hủy Xóa');
  };
  const all = async () => {
    setloading(true);
    const blogs = await BlogServices.ListAdmin(page);
    const { data, total } = blogs;
    const countt = Count(total, 12);
    setcount(countt >= 2 ? countt : 0);
    setblogs(data);
    setloading(false);
  };
  // active
  const handleActive = async (i) => {
    const changeActive = prompt('Xác nhận thay đổi trạng thái (y/n)');
    if (changeActive == 'y') {
      const active = await BlogServices.changeActive(i);
      active.status == 200
        ? message.success('Thay đổi trạng thái thành công') && all()
        : message.danger('Có lỗi xảy ra');
      return;
    }
    message.warning('Hủy thay dổi');
  };
  return (
    <>
      {/* {loading && 'Đang xử lí...'} */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Tilte</th>
            <th>Description</th>
            <th>Active</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>
                <Button
                  variant={item.active ? 'success' : 'warning'}
                  onClick={() => handleActive(item.id)}
                >
                  {item.active ? 'true' : 'false'}
                </Button>
              </td>
              <td>
                {/* <Button variant="primary">Xem</Button>{' '} */}
                <Button variant="secondary" onClick={() => handleEdit(item)}>
                  Sửa
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDel(item.id)}>
                  Xóa
                </Button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="posts_stack d-flex justify-content-center">
        <Stack spacing={2}>
          <Pagination
            onChange={handleChangePage}
            color="primary"
            count={count}
          />
        </Stack>
      </div>
      {isEdit && (
        <BlogModal edit={edit} show={modalShow} onHide={() => handleHide()} />
      )}
    </>
  );
};

export default ListPosts;
