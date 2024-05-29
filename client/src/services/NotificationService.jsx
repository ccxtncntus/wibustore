import * as request from '../configs/Axios';

const sendMess = async (username) => {
  const res = await request.POST(`/api/sendNotifi`, {
    username: username,
  });
  return res;
};
const comment = async (username, idProduct) => {
  const res = await request.POST(`/api/comment`, {
    username: username,
    idProduct: idProduct,
  });
  return res;
};
export { sendMess, comment };
