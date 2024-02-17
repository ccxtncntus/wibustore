import * as request from "../configs/Axios";

// get
const ListAlls = async () => {
  const res = await request.GET(`/api/orders/all`);
  return res;
};
const ListAll = async (page) => {
  const res = await request.GET(`/api/orders/${page}`);
  return res;
};
const ListOfStatus = async (status, page) => {
  const res = await request.GET(`/api/orders/listOfStatus/${status}/${page}`);
  return res;
};
const List = async (userID, page) => {
  const res = await request.GET(`/api/orders/listOfUser/${userID}/${page}`);
  return res;
};
const ListOfUserAll = async (userID, page) => {
  const res = await request.GET(`/api/orders/listOfUserAll/${userID}/${page}`);
  return res;
};
// get detail
const listsOfOrder = async (idOrder) => {
  const res = await request.GET(`/api/ordersDetails/listsOfOrder/${idOrder}`);
  return res;
};
// edit
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
// del
const delOrder = async (id) => {
  const res = await request.DELETE(`/api/orders/delOrder/${id}`);
  return res;
};

export {
  List,
  updateAddress,
  updateStatusOrder,
  delOrder,
  listsOfOrder,
  ListAll,
  ListOfStatus,
  ListAlls,
  ListOfUserAll,
};
