/* eslint-disable react-hooks/exhaustive-deps */
import Badge from '@mui/material/Badge';
import ChatIcon from '@mui/icons-material/Chat';
import { useContext, useEffect, useState } from 'react';
import { UContexts } from '../context/UserContext';
import ModalChat from './ModalChat';
import { useNavigate } from 'react-router-dom';
import Pusher from 'pusher-js';
import { message } from 'antd';
const BtnShowChat = () => {
  const navigate = useNavigate();
  const { User } = useContext(UContexts);
  const [show, setShow] = useState(false);
  const [Number, setNumber] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => {
    if (User.role == 'admin') {
      navigate('/admin/chats');
      return;
    }
    setShow(true);
  };
  useEffect(() => {
    const pusher = new Pusher('3c30b00645ce31e7d36e', {
      cluster: 'ap1',
    });
    const channel = pusher.subscribe('test');
    const handleMessage = (data) => {
      if (User.role == 'admin') {
        setNumber(true);
      }
    };
    channel.bind('message', handleMessage);
    return () => {
      channel.unbind('message', handleMessage);
      pusher.unsubscribe('test');
    };
  }, [Number]);
  return (
    <>
      {/* <Badge badgeContent={Number} color="primary" onClick={handleShow}>
        <ChatIcon color="rgb(0, 139, 232)" className="icon" />
      </Badge> */}
      <div style={{ position: 'relative' }}>
        <button onClick={handleShow} className="btn p-1">
          <ChatIcon color="rgb(0, 139, 232)" className="icon" />
        </button>
        {Number && (
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 50,
              background: 'rgb(0, 139, 232',
              position: 'absolute',
              right: 0,
              top: 4,
            }}
          ></div>
        )}
      </div>

      <ModalChat
        placement={'end'}
        show={show}
        handleClose={handleClose}
        User={User}
      />
    </>
  );
};

export default BtnShowChat;
