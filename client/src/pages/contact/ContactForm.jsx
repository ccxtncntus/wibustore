import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { message } from 'antd';
const ContactForm = () => {
  const [formDataa, setFormData] = useState({
    email: '',
    name: '',
    phoneNumber: '',
    content: '',
  });
  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formDataa, [name]: value });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const re = /^\d{10}$/; // Giả sử số điện thoại có 10 chữ số
    return re.test(phoneNumber);
  };

  const handleSubmit = () => {
    const { email, name, phoneNumber, content } = formDataa;

    if (!validateEmail(email)) {
      message.error('Email không hợp lệ');
      return;
    }

    if (!name) {
      message.error('Tên không được để trống');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      message.error('Số điện thoại không hợp lệ');
      return;
    }

    if (!content) {
      message.error('Nội dung không được để trống');
      return;
    }

    const data = new FormData();
    data.append('email', formDataa.email);
    data.append('name', formDataa.name);
    data.append('phoneNumber', formDataa.phoneNumber);
    data.append('content', formDataa.content);
    try {
      fetch(
        'https://script.google.com/macros/s/AKfycbxu0KiExoA2bF59CF6w8ORkicziR0YkbGTIDshTpRz-L1FSLUWvaajl4A2Jo_IVNYPB/exec',
        {
          method: 'POST',
          body: data,
          muteHttpExceptions: true,
          mode: 'no-cors',
        }
      );
      setFormData({
        email: '',
        name: '',
        phoneNumber: '',
        content: '',
      });
      message.success('Thông tin của bạn đã được gửi tới shop');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="form mt-4">
      <Row>
        <Col>
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              name="email"
              onChange={handleForm}
              type="email"
              placeholder="name@example.com"
              value={formDataa.email}
            />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel controlId="floatingInput" label="Tên" className="mb-3">
            <Form.Control
              name="name"
              onChange={handleForm}
              type="text"
              placeholder="Your name"
              value={formDataa.name}
            />
          </FloatingLabel>
        </Col>
      </Row>
      <FloatingLabel controlId="floatingPassword" label="Số điện thoại">
        <Form.Control
          name="phoneNumber"
          onChange={handleForm}
          type="text"
          placeholder="Số điện thoại"
          value={formDataa.phoneNumber}
        />
      </FloatingLabel>
      <Form.Control
        as="textarea"
        rows={3}
        placeholder="Bình luận"
        className="mt-3"
        name="content"
        onChange={handleForm}
        value={formDataa.content}
      />
      <Row>
        <Col>
          <button
            className="btn btn_contact mt-3"
            style={{ width: '22%', height: 50 }}
            onClick={handleSubmit}
          >
            Gửi
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default ContactForm;
