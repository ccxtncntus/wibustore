import * as request from "../configs/Axios";

const sendMess = async (username) => {
  const res = await request.POST(`/api/sendNotifi`, {
    username: username,
  });
  return res;
};
export { sendMess };
