import { useContext, useEffect, useRef, useState } from "react";
import { CategoriesContexts } from "../../components/context/CategoriesContexts";
import * as SliderService from "../../services/SliderService";
import * as CategoryService from "../../services/CategoryService";
import { Button, message, Popconfirm } from "antd";
import { HOST } from "../../configs/DataEnv";
const SlidersAdmin = () => {
  const { ListCategories } = useContext(CategoriesContexts);
  const [listCate, setlistCate] = useState([]);
  const [path, setpath] = useState("/shop");
  const [img, setimg] = useState("");
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [blob, setblob] = useState(null);
  const refForcus = useRef(null);
  const [ListSlides, setListSlides] = useState([]);
  const [Load, setLoad] = useState(false);
  const [Edit, setEdit] = useState("");
  const [isEdit, setisEdit] = useState(false);
  // path
  useEffect(() => {
    const run = async () => {
      if (ListCategories.status === 200) {
        setlistCate(ListCategories.data.data);
      } else {
        const data = await CategoryService.List(1);
        data.status === 200 && setlistCate(data.data.data);
      }
    };
    run();
  }, [ListCategories]);
  useEffect(() => {
    const run = async () => {
      const list = await SliderService.list();
      setListSlides(list);
    };
    run();
  }, [Load]);
  const FormatPath = (path) => {
    const newPath = path.replace(/ /g, "-").toLowerCase();
    return newPath;
  };
  const handleStart = () => {
    setblob(null);
    setpath("/shop");
    setimg("");
    setEdit("");
    settitle("");
    setcontent("");
  };
  const handleAdd = async () => {
    const formData = new FormData();
    formData.append("img", img[0]);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("path", path);
    const i = await SliderService.add(formData);
    if (i.status === 200) {
      setLoad((pre) => !pre);
      handleStart();
      message.success("Add success");
      refForcus.current.focus();
    }
  };
  const handleDelImg = () => {
    setimg("");
    setblob(null);
  };
  const handleImg = (e) => {
    const i = e.target.files;
    setimg(i);
    setblob(URL.createObjectURL(i[0]));
  };
  // del
  const confirmDel = async (i) => {
    const index = ListSlides.findIndex((item) => item.id === i.id);
    ListSlides.splice(index, 1);
    const del = await SliderService.del(i.id);
    if (del.status === 200) {
      message.success(del.message);
      setListSlides([...ListSlides]);
      return;
    }
    message.error(del.message);
  };
  const cancel = () => {};
  // edit
  const FormatIdCate = (data) => {
    const id = data.split("/");
    return id.pop();
  };
  const [imgOld, setimgOld] = useState("");
  const [idEdit, setidEdit] = useState(null);
  const handleEdit = (i) => {
    window.scrollTo(0, 0);
    setidEdit(i.id);
    settitle(i.title);
    setcontent(i.content);
    setpath(i.path);
    setEdit(i);
    setimg(i.img);
    setimgOld(i.img);
    setisEdit(true);
  };
  const handleEditSuccess = async () => {
    if (img != "") {
      if (img[0] == 1) {
        console.log("không đổi img");
      } else {
        const formData = new FormData();
        formData.append("img", img[0]);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("path", path);
        formData.append("imgOld", imgOld);
        formData.append("idEdit", idEdit);
        const i = await SliderService.edit(formData);
        if (i.status === 200) {
          setLoad((pre) => !pre);
          handleStart();
          message.success("Add success");
          refForcus.current.focus();
          setisEdit(false);
        }
      }
    } else {
      console.log("không đổi img");
      console.log(title);
      console.log(content);
      console.log(path);
      setisEdit(false);
    }
  };
  const handleEditCancel = () => {
    handleStart();
    setEdit(null);
    setisEdit(false);
  };
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label
            className="btn btn-secondary"
            htmlFor="sliderImg"
            style={{ margin: "20px 0" }}
          >
            Add img
          </label>
          <input
            style={{ display: "none" }}
            type="file"
            className="form-control"
            id="sliderImg"
            onChange={(e) => handleImg(e)}
          />
          <br />
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              style={{ height: 260, width: "100%", objectFit: "cover" }}
              src={
                blob
                  ? blob
                  : Edit
                  ? HOST + "/uploads/" + Edit.img
                  : "https://i.pinimg.com/originals/70/bd/ca/70bdca6c2315a811b35cda5c95d9cc0a.jpg"
              }
              alt=""
            />
            <span
              style={{ position: "absolute", right: 10, top: 10 }}
              onClick={handleDelImg}
            >
              <i
                style={{
                  fontSize: "1.2rem",
                }}
                className="fa-solid fa-circle-xmark"
              ></i>
            </span>
          </div>
          {/* <p className="text-danger" style={{ margin: 0 }}>
            Đây là img mặc định, bạn chưa tải img
          </p> */}
        </div>
      </div>
      {/*  */}
      <div className="col-md-6">
        <div className="form-group">
          <label>Title</label>
          <input
            ref={refForcus}
            type="text"
            className="form-control"
            placeholder="Title..."
            value={title}
            onChange={(e) => settitle(e.target.value)}
          />
        </div>
        <div className="form-group mt-4">
          <label>Content</label>
          <textarea
            className="form-control"
            rows="3"
            value={content}
            onChange={(e) => setcontent(e.target.value)}
          ></textarea>
        </div>
        <div className="form-group mt-4">
          <label>Path</label>
          <select
            className="form-control"
            onChange={(e) => setpath(e.target.value)}
          >
            <option value={"/shop"}>Shop</option>
            {listCate.length > 0 &&
              listCate.map((item, index) => (
                <option
                  selected={Edit && FormatIdCate(Edit.path) == item.id}
                  key={index}
                  value={`/shop/${FormatPath(item.name)}/${item.id}`}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        {!isEdit ? (
          <button className="btn btn-primary mt-4" onClick={handleAdd}>
            Add
          </button>
        ) : (
          <>
            <button
              className="btn btn-success mt-4"
              onClick={handleEditSuccess}
            >
              Edit
            </button>{" "}
            <button
              className="btn btn-secondary mt-4"
              onClick={handleEditCancel}
            >
              Cancel
            </button>
          </>
        )}
      </div>
      {ListSlides.length > 0 ? (
        <table className="table mt-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">img</th>
              <th scope="col">title</th>
              <th scope="col">cotent</th>
              <th scope="col">path</th>
              <th scope="col">#</th>
            </tr>
          </thead>
          <tbody>
            {ListSlides.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    src={HOST + "/uploads/" + item.img}
                    alt=""
                    style={{ width: 280, height: 220, objectFit: "contain" }}
                  />
                </td>
                <td>{item.title}</td>
                <td>{item.content}</td>
                <td>{item.path}</td>
                <td>
                  <Popconfirm
                    title="Delete the slide??"
                    description="Are you sure to delete this slide?"
                    onConfirm={() => confirmDel(item)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger>Delete</Button>
                  </Popconfirm>{" "}
                  <Button type="dashed" onClick={() => handleEdit(item)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "Hãy thêm slider..."
      )}
    </div>
  );
};

export default SlidersAdmin;
