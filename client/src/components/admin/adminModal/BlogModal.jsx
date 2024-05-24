/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { useRef, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { HOST, KEYEDITOR } from '../../../configs/DataEnv';
import * as BlogServices from '../../../services/BlogServices';
import { message } from 'antd';
const BlogModal = (props) => {
  const [data, setdata] = useState('');
  useEffect(() => {
    setdata(props.edit);
    setDatapost({
      title: props.edit.title,
      description: props.edit.description,
      img: props.edit.fimg,
    });
  }, []);
  const validate = (data) => {
    if (Object.values(data).some((value) => value == '')) {
      return false;
    }
    return true;
  };
  const handleEdit = async () => {
    const check = validate(Datapost);
    if (!check || editorRef.current.getContent() == '') {
      alert('Không bỏ trống thông tin');
      return;
    }
    if (imgBlob == '') {
      const content = editorRef.current.getContent();
      //   console.log(data.id);
      const { title, description } = Datapost;
      //   console.log(title, description);
      //   console.log(content);
      const dataNoImg = await BlogServices.updateDefault(
        data.id,
        title,
        description,
        content
      );
      if (dataNoImg.status == 200) {
        message.success('Sửa bài viết thành công');
        props.onHide();
        return;
      }
      message.success('Có lỗi xảy ra xin thử lại');
      return;
    }
    const content = editorRef.current.getContent();
    const formdata = new FormData();
    const { img, title, description } = Datapost;
    formdata.append('img', img);
    formdata.append('title', title);
    formdata.append('description', description);
    formdata.append('content', content);
    const edit = await BlogServices.updateHasImg(formdata, data.id);
    if (edit.status == 200) {
      message.success('Sửa bài viết thành công');
      props.onHide();
      return;
    }
    message.danger('Có lỗi rảy ra xin thử lại sau');
  };
  const [imgBlob, setimgBlob] = useState('');

  const handleFile = async (e) => {
    setimgBlob(URL.createObjectURL(e.target.files[0]));
    setDatapost({ ...Datapost, img: e.target.files[0] });
  };
  const handleDelBlob = () => {
    URL.revokeObjectURL(imgBlob);
    setimgBlob('');
    setDatapost({ ...Datapost, img: '' });
  };
  const [Datapost, setDatapost] = useState({
    title: '',
    description: '',
    img: '',
  });
  const handleChageData = (e) => {
    const { name, value } = e.target;
    setDatapost({ ...Datapost, [name]: value });
  };
  const editorRef = useRef(null);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Container fluid>
          <Row>
            <Col>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={Datapost.title}
                    onChange={handleChageData}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={Datapost.description}
                    onChange={handleChageData}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Featured image</Form.Label>
                  <Form.Control type="file" onChange={(e) => handleFile(e)} />
                  {imgBlob != '' && (
                    <Button
                      onClick={handleDelBlob}
                      className="mt-2"
                      variant="danger"
                    >
                      Xóa
                    </Button>
                  )}
                  <br />
                  {imgBlob != '' && (
                    <Image
                      accept="image/*"
                      className="mt-2 w-25"
                      src={imgBlob}
                    />
                  )}
                  {Datapost.img != '' && imgBlob == '' && (
                    <Button
                      onClick={handleDelBlob}
                      className="mt-2"
                      variant="danger"
                    >
                      Xóa
                    </Button>
                  )}
                  <br />
                  {Datapost.img != '' && imgBlob == '' && (
                    <Image
                      accept="image/*"
                      className="mt-2 w-25"
                      src={`${HOST}/uploads/${Datapost.img}`}
                    />
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Content</Form.Label>
                  <Editor
                    apiKey={KEYEDITOR}
                    onInit={(_evt, editor) => (editorRef.current = editor)}
                    init={{
                      plugins:
                        'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
                      toolbar:
                        'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                      tinycomments_mode: 'embedded',
                      tinycomments_author: 'Author name',
                      mergetags_list: [
                        { value: 'First.Name', title: 'First Name' },
                        { value: 'Email', title: 'Email' },
                      ],
                      ai_request: (request, respondWith) =>
                        respondWith.string(() =>
                          Promise.reject('See docs to implement AI Assistant')
                        ),
                    }}
                    // value
                    // initialValue={''}

                    initialValue={data.content}
                  />
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Hủy
        </Button>{' '}
        <Button variant="success" onClick={handleEdit}>
          Sửa
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BlogModal;
