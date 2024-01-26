import * as request from "../configs/Axios";

const List = async (userID) => {
  const res = await request.GET(`/api/orders/listOfUser/${userID}`);
  return res;
};
const updateAddress = async (id, address, phoneNumbers) => {
  const res = await request.POST(`/api/orders/updateAddress`, {
    id: id,
    address: address,
    phoneNumbers: phoneNumbers,
  });
  return res;
};
const updateStatusOrder = async (id, status) => {
  const res = await request.PATCH(`/api/orders/updateStatusOrder`, {
    id: id,
    status: status,
  });
  return res;
};
const delOrder = async (id) => {
  const res = await request.DELETE(`/api/orders/delOrder/${id}`);
  return res;
};
const listsOfOrder = async (idOrder) => {
  const res = await request.GET(`/api/ordersDetails/listsOfOrder/${idOrder}`);
  return res;
};

export { List, updateAddress, updateStatusOrder, delOrder, listsOfOrder };
