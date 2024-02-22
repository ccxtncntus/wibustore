import * as request from "../configs/Axios";

const List = async (id) => {
  const res = await request.GET(`/api/address/${id}`);
  return res;
};
const add = async (
  user_id,
  name,
  phone,
  tinh,
  huyen,
  xa,
  district_id,
  ward_code,
  address
) => {
  const res = await request.POST(`/api/address/${user_id}/add`, {
    user_id: user_id,
    name: name,
    phone: phone,
    tinh: tinh,
    huyen: huyen,
    xa: xa,
    district_id: district_id,
    ward_code: ward_code,
    address: address,
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
const editPut = async (
  id,
  name,
  phone,
  tinh,
  huyen,
  xa,
  district_id,
  ward_code,
  address
) => {
  // id address
  const res = await request.PUT(`/api/address/updatePut/${id}`, {
    name: name,
    phone: phone,
    tinh: tinh,
    huyen: huyen,
    xa: xa,
    district_id: district_id,
    ward_code: ward_code,
    address: address,
  });
  return res;
};
const changeName = async (id, name) => {
  const res = await request.POST(`/api/changeName/${id}`, {
    name: name,
  });
  return res;
};
const getDefault = async (idUser) => {
  const res = await request.GET(`/api/address/getDefault/${idUser}`);
  return res;
};

export {
  List,
  add,
  deleteA,
  setDefault,
  editPatch,
  editPut,
  changeName,
  getDefault,
};
