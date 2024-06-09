import Badge from '@mui/material/Badge';
import ChatIcon from '@mui/icons-material/Chat';
import { useContext, useState } from 'react';
import { UContexts } from '../context/UserContext';
import Button from 'react-bootstrap/Button';
import ModalChat from './ModalChat';
import { useNavigate } from 'react-router-dom';
const BtnShowChat = () => {
  const navigate = useNavigate();
  const { User } = useContext(UContexts);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => {
    if (User.role == 'admin') {
      navigate('/admin/chats');
      return;
    }
    setShow(true);
  };
  return (
    <>
      <Badge badgeContent={0} color="primary" onClick={handleShow}>
        <ChatIcon color="rgb(0, 139, 232)" className="icon" />
      </Badge>
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
