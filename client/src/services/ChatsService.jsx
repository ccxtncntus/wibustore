import * as request from '../configs/Axios';

const index = async () => {
  const res = await request.GET(`/api/chats`);
  return res;
};
const getUser_id = async (user_id) => {
  const res = await request.GET(`/api/chats/${user_id}`);
  return res;
};

const update = async (user_id) => {
  const res = await request.POST(`/api/chats`, {
    user_id: user_id,
  });
  return res;
};

// const edit = async (name, status, id) => {
//   const res = await request.PUT(`/api/categorys/edit/${id}`, {
//     name: name,
//     status: status,
//   });
//   return res;
// };
// const del = async (id) => {
//   const res = await request.DELETE(`/api/categorys/delete/${id}`);
//   return res;
// };

export { index, update, getUser_id };
