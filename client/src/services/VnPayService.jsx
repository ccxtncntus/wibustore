import * as request from "../configs/Axios";

const pay = async (ma, money) => {
  const res = await request.POST(`/api/vnpay`, {
    ma: ma,
    money: money,
  });
  return res;
};
export { pay };
