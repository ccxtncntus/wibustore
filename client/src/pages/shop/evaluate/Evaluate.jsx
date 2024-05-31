/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useContext } from 'react';
import './evaluate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ImgEvaluate from './ImgEvaluate';
import { UContexts } from '../../../components/context/UserContext';
import * as NotificationService from '../../../services/NotificationService';
import * as CommentsService from '../../../services/CommentsService';
import { useParams, Link } from 'react-router-dom';
import Pusher from 'pusher-js';
import { message } from 'antd';
import { HOST } from '../../../configs/DataEnv';
import Swal from 'sweetalert2';
import toxic from '../../../../toxic.json';

const Evaluate = ({ product }) => {
  const { User } = useContext(UContexts);
  const [rating, setRating] = useState(0);
  const [isEvalute, setisEvalute] = useState(false);
  const [content, setcontent] = useState('');
  const [files, setfiles] = useState([]);
  const [isValidate, setisValidate] = useState(false);

  const handleClick = (index) => {
    setisEvalute(true);
    setRating(index + 1);
  };
  const [errDic, seterrDic] = useState(false);
  const handleSend = async () => {
    if (User) {
      setisValidate(true);
      seterrDic(false);
      if (content == '') {
        return;
      }
      const validate = Object.keys(toxic).some((v) =>
        content.toLowerCase().includes(v.replaceAll('_', ' '))
      );
      if (validate) {
        seterrDic(true);
        return;
      }
      if (files.length < 1) {
        let formData = new FormData();
        formData.append('user_id', User.id);
        formData.append('product_id', product.id);
        formData.append('comments', content);
        formData.append('stars', rating);
        const comment = await CommentsService.insert(formData);
        if (comment.status == 200) {
          delFile();
          reset();
          message.success('Bạn đã bình luận sản phẩm');
          renderComment();
          await NotificationService.comment(User.name, product.id);
          return;
        }
        message.warning('Có lỗi xảy ra xin thử lại sau');
        setisValidate(false);
        return;
      }
      let formData = new FormData();
      formData.append('user_id', User.id);
      formData.append('product_id', product.id);
      formData.append('comments', content);
      formData.append('stars', rating);
      // formData.append('imgs', files);
      for (let i = 0; i < files.length; i++) {
        formData.append(`imgs[${i}]`, files[i]);
      }
      const comment = await CommentsService.insert(formData);
      if (comment.status == 200) {
        delFile();
        reset();
        message.success('Bạn đã bình luận sản phẩm');
        renderComment();
        await NotificationService.comment(User.name, product.id);
        return;
      }
      message.warning('Có lỗi xảy ra xin thử lại sau');
      setisValidate(false);
      return;
    }
    message.warning('Vui lòng đăng nhập để bình luận thực hiện chức năng này');
  };

  const [imgsBlob, setimgsBlob] = useState([]);
  const handleFiles = (e) => {
    const files = e.target.files;
    setfiles(files);
    const list = [];
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      list.push(URL.createObjectURL(element));
    }
    setimgsBlob(list);
  };

  const reset = () => {
    setisEvalute(false);
    setisValidate(false);
    setRating(0);
    setcontent('');
  };

  const delFile = () => {
    imgsBlob.map((item) => {
      URL.revokeObjectURL(item);
    });
    setfiles([]);
    setimgsBlob([]);
  };
  const [comments, setComments] = useState([]);
  const renderComment = async () => {
    const cs = await CommentsService.getLimitP(product.id);
    setComments(cs);
  };

  // product.id;
  // const datas = useParams();
  // real time
  useEffect(() => {
    renderComment();
    const pusher = new Pusher('3c30b00645ce31e7d36e', {
      cluster: 'ap1',
    });
    const channel = pusher.subscribe('comment');
    const handleMessage = (data) => {
      if (data.idProduct == product.id) {
        data.username != User?.name && renderComment();
      }
    };
    channel.bind('message', handleMessage);
    return () => {
      channel.unbind('message', handleMessage);
      pusher.unsubscribe('comment');
    };
  }, []);

  // const handleComment = async () => {
  //   if (User) {
  //     await NotificationService.comment(User.name, datas.idProduct);
  //     return;
  //   }
  //   message.warning('Vui lòng đăng nhập để bình luận thực hiện chức năng này');
  // };
  function formatDate(d) {
    var date = new Date(d);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return (
      date.getMonth() +
      1 +
      '/' +
      date.getDate() +
      '/' +
      date.getFullYear() +
      '  ' +
      strTime
    );
  }
  const [viewAll, setviewAll] = useState(false);
  const renderCommentAll = async () => {
    const cs = await CommentsService.getP(product.id);
    setComments(cs);
  };
  const handleView = () => {
    setviewAll((pre) => !pre);
    if (viewAll) {
      renderComment();
      return;
    }
    renderCommentAll();
  };
  const handleDelComment = async (id) => {
    const check = prompt('Xác nhận xóa (y/n)');
    if (check == 'y') {
      const checkc = await CommentsService.destroy(id);
      if (checkc.status == 200) {
        message.success('Xóa thành công');
        renderComment();
        await NotificationService.comment(User.name, product.id);
        return;
      }
      message.warning('Có lỗi xảy ra xin thử lại sau');
      return;
    }
  };
  // recomment
  const [reComments, setreComments] = useState('');
  const [contentRe, setcontentRe] = useState('');
  const handleRecomment = (id) => {
    if (id.recomments) {
      setcontentRe(id.recomments);
    }
    setreComments(id);
  };
  const handleRecommenSuccess = async () => {
    const rec = await CommentsService.recomment(reComments.id, contentRe);
    if (rec.status == 200) {
      message.success('Phản hồi thành công');
      renderComment();
      setreComments('');
      setcontentRe('');
      await NotificationService.comment(User.name, product.id);
      return;
    }
    message.warning('Có lỗi xảy ra xin thử lại sau');
  };
  const handleViewImg = (i) => {
    Swal.fire({
      imageUrl: `${HOST}/uploads/${i}`,
      showConfirmButton: false,
      imageWidth: '100%',
    });
  };
  return (
    <>
      <div className="h4 text-center">
        <span className="vip">Đánh giá</span> sản phẩm
      </div>
      <div className="star-rating text-center">
        {[...Array(5)].map((_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={solidStar}
            className={index < rating ? 'active' : ''}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      {isEvalute && (
        <div className="evaluate_content">
          <Form>
            <Form.Group className="mb-3">
              <label>Hình ảnh sản phẩm</label>
              <br />
              <label htmlFor="evaluate_file">
                <i
                  className="fa-solid fa-circle-plus p-2"
                  style={{ marginRight: 8 }}
                />
              </label>
              {imgsBlob.length > 0 && (
                <i
                  onClick={delFile}
                  className="fa-solid fa-circle-xmark p-2"
                  style={{ background: 'red', border: '1px solid red' }}
                />
              )}
              <Form.Control
                onChange={handleFiles}
                className="d-none"
                id="evaluate_file"
                type="file"
                multiple
              />
            </Form.Group>
            {/* imgs */}
            <ImgEvaluate imgsblob={imgsBlob} />
            {/* ---- */}
            <Form.Group className="mb-3 mt-2">
              <Form.Label htmlFor="textarea_evaluate">Nội dung</Form.Label>
              <Form.Control
                id="textarea_evaluate"
                as="textarea"
                rows={3}
                placeholder="Đánh giá của bạn"
                onChange={(e) => {
                  setcontent(e.target.value);
                  setisValidate(false);
                }}
              />
              {isValidate && content == '' && (
                <label style={{ fontSize: '0.9rem' }} className="text-danger">
                  Không bỏ trống
                </label>
              )}
              {isValidate && errDic == true && (
                <label style={{ fontSize: '0.9rem' }} className="text-danger">
                  Từ không hợp lệ
                </label>
              )}
            </Form.Group>
            <div style={{ textAlign: 'right' }}>
              <Button
                variant="secondary"
                onClick={() => {
                  setisEvalute(false);
                  setisValidate(false);
                  setRating(0);
                }}
              >
                Hủy
              </Button>{' '}
              <Button onClick={handleSend}>Bình luận</Button>
            </div>
          </Form>
        </div>
      )}
      <>
        <hr />
        {comments.length == 0 && 'Sản phẩm chưa có bình luận nào'}
        {comments.length > 0 &&
          comments.map((item, index) => (
            <div className={'mt-4'} key={index}>
              <Link
                href="#"
                style={{ fontSize: '1.1rem' }}
                className="m-0 p-0 fixa d-block"
              >
                {item.user_name}{' '}
                <span style={{ fontSize: '.8rem' }}>
                  {formatDate(item.updated_at)}
                </span>
              </Link>
              <span>
                {Array.from({ length: item.stars }).map((_, index) => (
                  <i key={index} className="fa-solid fa-star vip"></i>
                ))}
              </span>
              <p className="m-0 p-0 fixa">{item.comments}</p>
              <div>
                {item.imgs &&
                  JSON.parse(item.imgs).map((i, index) => (
                    <img
                      key={index}
                      src={HOST + '/uploads/' + i}
                      alt={i}
                      style={{ height: 80, marginRight: 4 }}
                      onClick={() => handleViewImg(i)}
                      className="hh"
                    />
                  ))}

                {(item.recomments || item?.recomments == '') && (
                  <p
                    className={'p-2 m-0 mt-2 text-bg-light'}
                    style={{ borderRadius: 4 }}
                  >
                    <span>Phản Hồi Của shop</span>
                    <span className={'d-block'} style={{ fontSize: '.9rem' }}>
                      {item.recomments}
                    </span>
                  </p>
                )}
              </div>

              {User && (item.user_id == User.id || User.role == 'admin') && (
                <button
                  className="text-danger btn"
                  style={{ fontSize: '.9rem', marginRight: 8 }}
                  onClick={() => handleDelComment(item.id)}
                >
                  Xóa
                </button>
              )}

              {User && User.role == 'admin' && (
                <button
                  className="vip btn"
                  style={{ fontSize: '.9rem' }}
                  onClick={() => handleRecomment(item)}
                >
                  Phản hồi
                </button>
              )}
              {reComments.id == item.id && (
                <>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Phản hồi của shop"
                      value={contentRe}
                      onChange={(e) => setcontentRe(e.target.value)}
                    />
                  </div>
                  <button
                    className="vip btn btn-success mt-1"
                    style={{ fontSize: '.9rem' }}
                    onClick={() => handleRecommenSuccess()}
                    disabled={contentRe.trim() == ''}
                  >
                    Xác nhận
                  </button>
                  <button
                    className="vip btn btn-secondary mt-1"
                    style={{ fontSize: '.9rem', marginLeft: 4 }}
                    onClick={() => {
                      setreComments('');
                      setcontentRe('');
                    }}
                  >
                    Hủy
                  </button>
                </>
              )}
            </div>
          ))}
      </>
      <span
        className="d-block mt-4 viph"
        style={{ textDecoration: 'underline' }}
        onClick={handleView}
      >
        {viewAll ? 'Ẩn bớt' : 'Xem thêm'}
      </span>
    </>
  );
};

export default Evaluate;
