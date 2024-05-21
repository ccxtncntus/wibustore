import './postAdmin.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { useState, useContext, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { KEYEDITOR } from '../../../configs/DataEnv';
import * as BlogServices from '../../../services/BlogServices';
import { UContexts } from '../../context/UserContext';
const PostAdmin = () => {
  const { User } = useContext(UContexts);
  const editorRef = useRef(null);

  const [imgBlob, setimgBlob] = useState('');
  const [Datapost, setDatapost] = useState({
    title: '',
    description: '',
    img: '',
  });
  const handleChageData = (e) => {
    const { name, value } = e.target;
    setDatapost({ ...Datapost, [name]: value });
  };
  const handleFile = async (e) => {
    setimgBlob(URL.createObjectURL(e.target.files[0]));
    setDatapost({ ...Datapost, img: e.target.files[0] });
  };
  const handleDelBlob = () => {
    URL.revokeObjectURL(imgBlob);
    setimgBlob('');
    setDatapost({ ...Datapost, img: '' });
  };
  const validate = (data) => {
    if (Object.values(data).some((value) => value == '')) {
      return false;
    }
    return true;
  };
  const reload = () => {
    editorRef.current.setContent('');
    setimgBlob('');
    setDatapost({
      title: '',
      description: '',
      img: '',
    });
    window.scroll({
      top: 0,
      behavior: 'instant',
    });
  };

  const log = async (e) => {
    e.preventDefault();
    if (editorRef && editorRef.current) {
      if (editorRef.current.getContent() != '') {
        const check = validate(Datapost);
        const content = editorRef.current.getContent();
        if (check) {
          const formdata = new FormData();
          formdata.append('user_id', User.id);
          formdata.append('img', Datapost.img);
          formdata.append('title', Datapost.title);
          formdata.append('description', Datapost.description);
          formdata.append('content', content);
          const add = await BlogServices.updateImgtest(formdata);
          if (add.status == 200) {
            alert('Thêm bài viết thành công');
            reload();
            return;
          }
          alert('Có lỗi xảy ra xin thử lại sau');
        }
        alert('Không bỏ trống bất cứ trường nào');
        return;
      }
      alert('Không bỏ trống bất cứ trường nào');
    }
    return;
  };

  return (
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
                <Image accept="image/*" className="mt-2 w-25" src={imgBlob} />
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
                initialValue={''}
                // initialValue={Datapost.content}
              />
              <button className="btn btn-primary mt-4" onClick={log}>
                Add
              </button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PostAdmin;
