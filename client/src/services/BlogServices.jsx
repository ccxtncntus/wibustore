/* eslint-disable react-refresh/only-export-components */
import * as request from '../configs/Axios';

const List = async (id) => {
  const res = await request.GET(`/api/address/${id}`);
  return res;
};
const updateImgtest = async (formdata) => {
  const res = await request.POST(`/api/blogs`, formdata, {
    headers: { 'content-type': 'multipart/form-data' },
  });
  return res;
};
export { List, updateImgtest };
