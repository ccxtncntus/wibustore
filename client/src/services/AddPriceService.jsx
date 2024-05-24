/* eslint-disable react-refresh/only-export-components */
import * as request from '../configs/Axios';

const List = async (product_id) => {
  const res = await request.GET(`/api/addprice/${product_id}`);
  return res;
};
const add = async (product_id, size, price, saleoff) => {
  const res = await request.POST(`/api/addprice`, {
    product_id: product_id,
    size: size,
    price: price,
    saleoff: saleoff,
  });
  return res;
};

const deletePrice = async (id) => {
  const res = await request.DELETE(`/api/addprice/${id}`);
  return res;
};
const editPrice = async (id, size, price, saleoff) => {
  const res = await request.PUT(`/api/addprice/${id}`, {
    size: size,
    price: price,
    saleoff: saleoff,
  });
  return res;
};
export { List, add, deletePrice, editPrice };
