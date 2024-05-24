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
const Evaluate = ({ product }) => {
  const { User } = useContext(UContexts);
  const [rating, setRating] = useState(0);
  const [isEvalute, setisEvalute] = useState(false);
  const [content, setcontent] = useState('');
  const [files, setfiles] = useState([]);
  const [isValidate, setisValidate] = useState(false);
  const handleClick = (index) => {
    setisEvalute(true);
    console.log(index + 1);
    setRating(index + 1);
  };
  const handleSend = () => {
    setisValidate(true);
    if (content == '') {
      return;
    }
    console.log(files.length);
    if (files.length == 0) {
      console.log({
        type: 'Không có img',
        content: content,
        star: rating,
        product_id: product.id,
        user_id: User.id,
      });
      setisValidate(false);
      return;
    }
    console.log({
      type: 'Có img',
      content: content,
      star: rating,
      img: files,
      product_id: product.id,
      user_id: User.id,
    });
    setisValidate(false);
  };

  const [imgsBlob, setimgsBlob] = useState([]);
  const handleFiles = (e) => {
    const files = e.target.files;
    const list = [];
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      list.push(URL.createObjectURL(element));
    }
    setimgsBlob(list);
    var result = Object.keys(files).map((key) => files[key]);
    setfiles(result);
  };
  const delFile = (index) => {
    files.splice(index, 1);
    setfiles(files);
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
                <i className="fa-solid fa-circle-plus p-2" />
                {/* <i className="fa-solid fa-circle-xmark p-2" /> */}
              </label>
              <Form.Control
                onChange={handleFiles}
                className="d-none"
                id="evaluate_file"
                type="file"
                multiple
              />
            </Form.Group>
            {/* imgs */}
            <ImgEvaluate
              imgsblob={imgsBlob}
              setimgsblob={setimgsBlob}
              delfile={delFile}
            />
            {/* ---- */}
            <Form.Group className="mb-3 mt-2">
              <Form.Label htmlFor="textarea_evaluate">Nội dung</Form.Label>
              <Form.Control
                id="textarea_evaluate"
                as="textarea"
                rows={3}
                placeholder="Đánh giá của bạn"
                onChange={(e) => setcontent(e.target.value)}
              />
              {isValidate && content == '' && (
                <label style={{ fontSize: '0.9rem' }} className="text-danger">
                  Không bỏ trống
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
    </>
  );
};

export default Evaluate;
