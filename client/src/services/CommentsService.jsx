import * as request from '../configs/Axios';

const get = async () => {
  const res = await request.GET(`/api/comments`);
  return res;
};
const getLimit = async () => {
  const res = await request.GET(`/api/comments/limit`);
  return res;
};
const getP = async (id) => {
  const res = await request.GET(`/api/comments/product/${id}`);
  return res;
};
const getLimitP = async (id) => {
  const res = await request.GET(`/api/comments/productlimit/${id}`);
  return res;
};
const destroy = async (id) => {
  const res = await request.DELETE(`/api/comments/${id}`);
  return res;
};
const recomment = async (id, recomments) => {
  const res = await request.PATCH(`/api/comments/${id}`, {
    recomments,
  });
  return res;
};

const insert = async (formData) => {
  const res = await request.POST(`/api/comments`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};
export { get, getLimit, insert, destroy, recomment, getP, getLimitP };
