import * as request from "../configs/Axios";

const pay = async () => {
  const res = await request.POST(`/api/vnpay`);
  return res;
};
export { pay };
