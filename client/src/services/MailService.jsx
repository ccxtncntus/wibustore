import * as request from "../configs/Axios";

const sendPass = async (email) => {
  const res = await request.POST(`/api/sendPass`, {
    email: email,
  });
  return res;
};
export { sendPass };
