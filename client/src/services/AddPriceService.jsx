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

const deleteA = async (id) => {
  const res = await request.DELETE(`/api/address/delete/${id}`);
  return res;
};
const setDefault = async (id, idUser) => {
  const res = await request.PATCH(`/api/address/updateDefault/${id}/${idUser}`);
  return res;
};
const editPatch = async (id, name, phone, address) => {
  // id address
  const res = await request.PATCH(`/api/address/updatePatch/${id}`, {
    name: name,
    phone: phone,
    address: address,
  });
  return res;
};
export { List, add, deleteA, setDefault, editPatch };
