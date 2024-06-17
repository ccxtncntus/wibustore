/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createRef, useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { MessageList } from 'react-chat-elements';
import BtnSend from './BtnSend';
import * as ChatsService from '../../services/ChatsService';
import { HOST } from '../../configs/DataEnv';
import Swal from 'sweetalert2';
import Pusher from 'pusher-js';
import { message } from 'antd';
const ModalChat = ({ show, handleClose, placement, User }) => {
  useEffect(() => {
    if (show) {
      run();
    }
  }, [show]);
  const [mes, setMes] = useState([]);
  const run = async () => {
    const chat = await ChatsService.getUser_id(User.id);
    if (chat.original) {
      setMes(chat.original);
    }
  };

  const renderImg = (imgs) => {
    const parsedImgs = JSON.parse(imgs);
    return parsedImgs.map((i, index) => (
      <img
        key={index}
        src={`${HOST}/uploads/${i}`}
        alt={i}
        className="p-2 hh"
        style={{ width: 120, height: 160, objectFit: 'cover' }}
        onClick={() => handleViewImg(i)}
      />
    ));
  };
  const handleViewImg = (i) => {
    Swal.fire({
      imageUrl: `${HOST}/uploads/${i}`,
      showConfirmButton: false,
      imageWidth: '100%',
    });
  };
  const messageListReference = createRef();

  useEffect(() => {
    if (messageListReference.current) {
      messageListReference.current.scrollTop =
        messageListReference.current.scrollHeight;
    }
  }, [mes]);
  useEffect(() => {
    const pusher = new Pusher('3c30b00645ce31e7d36e', {
      cluster: 'ap1',
    });
    const channel = pusher.subscribe('comment');
    const handleMessage = (data) => {
      console.log(data);
      if (User.id == data.idProduct && show != true) {
        console.log(show);
        message.success('bạn có tin nhắn từ admin');
      }
      if (User.id == data.idProduct) {
        run();
      }
    };
    channel.bind('message', handleMessage);
    return () => {
      channel.unbind('message', handleMessage);
      pusher.unsubscribe('comment');
    };
  }, [show]);
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement={placement}
      className={'w-50'}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          {User.name} - {User.email} to <span className="vip">Admin</span>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ background: 'gray' }}>
        <div
          ref={messageListReference}
          className="message-list-container"
          style={{ overflowY: 'auto', maxHeight: '100%' }}
        >
          <MessageList
            className="message-list"
            lockable={true}
            toBottomHeight={'100%'}
            dataSource={mes.map((message) => ({
              position: message.role == 0 ? 'right' : 'left',
              type: 'text',
              text: message.text ? message.text : renderImg(message.imgs),
              date: message.created_at,
            }))}
          />
        </div>
      </Offcanvas.Body>
      <BtnSend User={User} run={run} />
    </Offcanvas>
  );
};

export default ModalChat;
