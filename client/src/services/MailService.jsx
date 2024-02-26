import * as request from "../configs/Axios";

const sendPass = async (email) => {
  const res = await request.POST(`/api/sendPass`, {
    email: email,
  });
  return res;
};

const senOrders = async (email, orders, orderDetail) => {
  const res = await request.POST(`/api/sendOrders`, {
    email: email,
    orders: orders,
    orderDetail: orderDetail,
  });
  return res;
};

export { sendPass, senOrders };
