import { useEffect, useState } from 'react';
import './post.css';
import PostChild from './PostChild';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const Posts = () => {
  const [page, setPage] = useState(1);
  const handleChangePage = (event, value) => {
    console.log(value);
    setPage(value);
  };
  return (
    <div className="posts_vip pb-2">
      <div className="posts container mt-2">
        <h4>Blog</h4>
        <div className="row">
          <div className="col-md-6">
            <PostChild />
          </div>
          <div className="col-md-6">
            <PostChild />
          </div>
          <div className="col-md-6">
            <PostChild />
          </div>
          <div className="col-md-6">
            <PostChild />
          </div>
        </div>
        <div className="posts_stack d-flex justify-content-center">
          <Stack spacing={2}>
            <Pagination
              onChange={handleChangePage}
              color="primary"
              count={10}
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};
export default Posts;
