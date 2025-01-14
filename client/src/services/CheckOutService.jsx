import * as request from "../configs/Axios";

const create = async (user_id, address, pay, phoneNumbers, totail) => {
  const res = await request.POST(`/api/orders/create`, {
    user_id: user_id,
    address: address,
    pay: pay,
    phoneNumbers: phoneNumbers,
    totail: totail,
  });
  return res;
};
const createDetail = async (
  order_id,
  product_id,
  name,
  price,
  quantitybuy,
  img
) => {
  const res = await request.POST(`/api/ordersDetails/create`, {
    order_id: order_id,
    product_id: product_id,
    name: name,
    price: price,
    quantitybuy: quantitybuy,
    img: img,
  });
  return res;
};
export { create, createDetail };
