import { useEffect, useState } from 'react';
import './post.css';
import PostChild from './PostChild';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import * as BlogServices from '../../services/BlogServices';
import { Count } from '../../helpers/FormatNumber';
import Loading from '../../components/loading/Loading';
const Posts = () => {
  const [page, setPage] = useState(1);
  const [loading, setloading] = useState(false);
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const [counts, setcounts] = useState(1);
  const [listBlogs, setlistBlogs] = useState([]);
  useEffect(() => {
    const run = async () => {
      window.scroll({
        top: 0,
        behavior: 'instant',
      });
      setloading(true);
      const blogs = await BlogServices.List(page);
      setloading(false);
      const { data, total } = blogs;
      setcounts(Count(total, 4) >= 2 ? Count(total, 4) : 0);
      setlistBlogs(data);
    };
    run();
  }, [page]);

  return (
    <div className="posts_vip pb-2">
      {loading && <Loading />}
      {!loading && (
        <div className="posts container mt-2">
          <h4>Blog</h4>
          <div className="row">
            {listBlogs.map((item, index) => (
              <div className="col-md-6" key={index}>
                <PostChild item={item} />
              </div>
            ))}
          </div>
          <div className="posts_stack d-flex justify-content-center">
            <Stack spacing={2}>
              <Pagination
                onChange={handleChangePage}
                color="primary"
                count={counts}
                page={page}
              />
            </Stack>
          </div>
        </div>
      )}
    </div>
  );
};
export default Posts;
