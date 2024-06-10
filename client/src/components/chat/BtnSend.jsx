/* eslint-disable react/prop-types */
import { MdAddAPhoto } from 'react-icons/md';
import { FaDeleteLeft } from 'react-icons/fa6';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { createRef, useEffect, useRef, useState } from 'react';
import { Button } from 'react-chat-elements';
import { message } from 'antd';
import * as ChatsService from '../../services/ChatsService';
import * as ChatDetailService from '../../services/ChatDetailService';
import * as NotificationService from '../../services/NotificationService';
import { IoMdSend } from 'react-icons/io';
const BtnSend = ({ User, run }) => {
  const [value, setvalue] = useState('');
  const [imgs, setimgs] = useState('');
  const [blobs, setblobs] = useState([]);
  const forcus = useRef();
  //   file
  const handleFiles = (e) => {
    const files = e.target.files;
    setimgs(files);
    const test = [];
    Object.values(files).forEach(function (img) {
      test.push(URL.createObjectURL(img));
    });
    setblobs(test);
  };
  const handleDelFiles = () => {
    blobs.map((item) => {
      URL.revokeObjectURL(item);
    });
    setblobs([]);
  };
  const reset = () => {
    setvalue('');
    setimgs('');
    setblobs([]);
  };
  const handleSendFiles = async () => {
    // console.log(imgs);
    // return;
    // console.log(blobs);
    try {
      const chat_id = await ChatsService.update(User.id);
      let data = new FormData();
      data.append('user_id', User.id);
      data.append('chat_id', chat_id);
      for (let i = 0; i < imgs.length; i++) {
        data.append(`imgs[${i}]`, imgs[i]);
      }
      data.append('role', 0);
      const chatDetail = await ChatDetailService.updateI(data);
      if (chatDetail.status == 200) {
        reset();
        await NotificationService.comment(User.name, User.id);
      }
      run();
    } catch (error) {
      console.log(error);
    }
  };
  //   text
  // ...

  // ...
  const handleSendText = async () => {
    try {
      if (value.trim() == '') {
        message.warning('Không bỏ trống');
        return;
      }
      const text = value.trim();
      const chat_id = await ChatsService.update(User.id);
      const chatDetail = await ChatDetailService.update(
        User.id,
        chat_id,
        text,
        false
      );
      // chat
      if (chatDetail.status == 200) {
        reset();
        run();
        await NotificationService.comment(User.name, User.id);
      }
      if (forcus.current) {
        forcus.current.focus();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Offcanvas.Header className="p-3" style={{ width: '95%' }}>
      {blobs.length == 0 && (
        <label htmlFor="file_chat" style={{ padding: 5 }}>
          <MdAddAPhoto style={{ fontSize: '1.5rem' }} className="hh" />
        </label>
      )}
      <input
        type="file"
        id="file_chat"
        style={{ display: 'none' }}
        multiple
        accept="image/*"
        onChange={(e) => handleFiles(e)}
      />
      {blobs.length > 0 && (
        <>
          <label style={{ padding: 5 }}>
            <FaDeleteLeft
              style={{ fontSize: '1.5rem' }}
              className="hh text-danger"
              onClick={handleDelFiles}
            />
          </label>
          <div
            className="d-flex flex-row w-100 flex-wrap"
            style={{ background: 'gray', borderRadius: 4, marginRight: 8 }}
          >
            {blobs.map((i, index) => (
              <img
                key={index}
                src={i}
                alt={i}
                className="p-1"
                style={{ width: 120, objectFit: 'cover' }}
              />
            ))}
          </div>
          <button className="btn p-1" onClick={handleSendFiles}>
            <IoMdSend style={{ fontSize: '1.8rem' }} />
          </button>
        </>
      )}
      {blobs.length == 0 && (
        <>
          <textarea
            ref={forcus}
            type="text"
            value={value}
            onChange={(e) => setvalue(e.target.value)}
            className="form-control"
            placeholder="Nhập tin nhắn..."
            rows={1}
          />
          <button
            className="btn p-1"
            onClick={handleSendText}
            disabled={value == ''}
          >
            <IoMdSend style={{ fontSize: '1.8rem' }} />
          </button>
        </>
      )}
    </Offcanvas.Header>
  );
};

export default BtnSend;
