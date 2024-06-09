/* eslint-disable react-hooks/exhaustive-deps */
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MessageList } from 'react-chat-elements';
import { NavLink, useParams } from 'react-router-dom';
import * as ChatsService from '../../../services/ChatsService';
import { useEffect, useState, useContext } from 'react';
import Asend from './Asend';
import { HOST } from '../../../configs/DataEnv';
import Swal from 'sweetalert2';
// import { UContexts } from '../../../components/context/UserContext';
const Achat = () => {
  const { user_id } = useParams();
  const [first, setfirst] = useState([]);
  const [isMes, setisMes] = useState(false);
  const [User, setUser] = useState(null);
  const [mes, setMes] = useState([]);

  const handleViewImg = (i) => {
    Swal.fire({
      imageUrl: `${HOST}/uploads/${i}`,
      showConfirmButton: false,
      imageWidth: '100%',
    });
  };
  //   const messageListReference = createRef();

  //   useEffect(() => {
  //     if (messageListReference.current) {
  //       messageListReference.current.scrollTop =
  //         messageListReference.current.scrollHeight;
  //     }
  //   }, [mes]);

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
  const run = async () => {
    const users = await ChatsService.index();
    console.log(users);
    setfirst(users);
  };
  useEffect(() => {
    run();
  }, []);

  useEffect(() => {
    if (user_id) {
      runm(user_id);
      setisMes(true);
      return;
    }
    setisMes(false);
  }, [user_id]);

  const runm = async (user_id) => {
    const chat = await ChatsService.getUser_id(user_id);
    if (chat.original) {
      setMes(chat.original);
    }
  };

  const handleUser = (i) => {
    setUser(i);
  };
  return (
    <Container fluid>
      <Row>
        <Col xs={3}>
          {first.length == 0 && <div>Không có phản hồi từ người dùng</div>}
          {first.length > 0 &&
            first.map((i, index) => (
              <NavLink
                onClick={() => handleUser(i)}
                to={'/admin/chats/' + i.user_id}
                key={index}
                style={{
                  background:
                    user_id && user_id == i.user_id
                      ? 'rgb(255, 255, 255)'
                      : 'rgb(230, 230, 230)',
                  padding: 8,
                  borderRadius: 8,
                }}
                className="d-flex flex-row align-items-center gap-3 fixa mt-1"
              >
                <img
                  src="https://i.pinimg.com/736x/d1/da/63/d1da635864ae706e228343227a61a28e.jpg"
                  alt=""
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                />
                <span>{i.name}</span>
              </NavLink>
            ))}
        </Col>
        <Col style={{ position: 'relative', minHeight: '85vh' }}>
          {/* <div
            style={{
              width: '100%',
              height: '100%',
              background: 'rgb(230, 230, 230)',
              zIndex: 12,
              position: 'absolute',
              borderRadius: 12,
              padding: 20,
              textAlign: 'center',
            }}
          >
            loading...
          </div> */}
          {isMes && (
            <div style={{ height: '75vh', borderRadius: 8 }}>
              {User && (
                <h5>
                  {User.name} - {User.email}
                </h5>
              )}

              <div
                //   ref={messageListReference}
                className="message-list-container"
                style={{ overflowY: 'auto', maxHeight: '100%' }}
              >
                <MessageList
                  className="message-list"
                  lockable={true}
                  toBottomHeight={'100%'}
                  dataSource={mes.map((message) => ({
                    position: message.role == 1 ? 'right' : 'left',
                    type: 'text',
                    text: message.text ? message.text : renderImg(message.imgs),
                    date: message.created_at,
                  }))}
                />
              </div>
            </div>
          )}
          {!isMes && (
            <img
              src="https://i.pinimg.com/736x/83/28/57/832857260dfbdaa31d00dea01c1a2c09.jpg"
              alt=""
              className="w-100"
              style={{ height: '90vh', objectFit: 'cover' }}
            />
          )}
          {user_id && <Asend Userc={User} run={runm} user_id={user_id} />}
        </Col>
      </Row>
    </Container>
  );
};

export default Achat;
