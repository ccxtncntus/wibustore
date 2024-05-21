/* eslint-disable react-refresh/only-export-components */
import * as request from '../configs/Axios';

const List = async (page) => {
  const res = await request.GET(`/api/blogs/page/${page}`);
  return res;
};
const updateImgtest = async (formdata) => {
  const res = await request.POST(`/api/blogs`, formdata, {
    headers: { 'content-type': 'multipart/form-data' },
  });
  return res;
};
// #
const updateDefault = async (id, title, description, content) => {
  const res = await request.PATCH(`/api/blogs/update/${id}`, {
    title: title,
    description: description,
    content: content,
  });
  return res;
};
const updateHasImg = async (formdata, id) => {
  const res = await request.POST(`/api/blogs/update/${id}`, formdata, {
    headers: { 'content-type': 'multipart/form-data' },
  });
  return res;
};

const ListAdmin = async (page) => {
  const res = await request.GET(`/api/blogs/admin/${page}`);
  return res;
};
const changeActive = async (id) => {
  const res = await request.PATCH(`/api/blogs/${id}`);
  return res;
};
const del = async (id) => {
  const res = await request.DELETE(`/api/blogs/${id}`);
  return res;
};
export {
  List,
  updateImgtest,
  ListAdmin,
  del,
  updateDefault,
  updateHasImg,
  changeActive,
};
