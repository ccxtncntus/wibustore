/* eslint-disable react-hooks/exhaustive-deps */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { NavLink, useParams } from 'react-router-dom';

import './postdetail.css';
import { useEffect, useState } from 'react';
import * as BlogServices from '../../../services/BlogServices';
import parse from 'html-react-parser';
import { HOST } from '../../../configs/DataEnv';
const PostDetail = () => {
  const path = useParams();
  const [blog, setblog] = useState([]);
  useEffect(() => {
    const run = async () => {
      window.scroll({
        top: 0,
        behavior: 'instant',
      });
      const data = await BlogServices.once(path.idPost);
      setblog(data);
    };
    run();
  }, []);

  return (
    <Container fluid className="postDetail pt-2">
      {blog.length > 0 && (
        <>
          <Row>
            <Col
              style={{ maxWidth: '95%', margin: '0 auto', textAlign: 'center' }}
            >
              <Image className="w-75" src={HOST + '/uploads/' + blog[0].fimg} />
            </Col>
          </Row>
          <h1
            className="mt-2"
            style={{ maxWidth: '50%', margin: '0 auto', textAlign: 'center' }}
          >
            {blog[0].title}
          </h1>
          <Row />
          <Col style={{ maxWidth: '50%', margin: '0 auto' }} className="mt-4">
            {parse(blog[0].content)}
          </Col>
          <Row>
            <Col
              style={{
                maxWidth: '50%',
                margin: '0 auto',
                fontStyle: 'italic',
                color: 'gray',
              }}
            >
              Xuất bản: {blog[0].created_at}
            </Col>
          </Row>
          <Row>
            <Col
              style={{ maxWidth: '75%', margin: '0 auto', textAlign: 'center' }}
              className="mt-4"
            >
              <NavLink to={'/posts'} className="d-block fixa m-4 h5">
                <i className="fa-solid fa-arrow-left"></i> Quay lại{' '}
                <span className="vip">Blogs</span>
              </NavLink>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default PostDetail;
