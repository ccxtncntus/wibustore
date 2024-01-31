import * as request from "../configs/Axios";

const login = async (email, password) => {
  const res = await request.POST(`/api/login`, {
    email: email,
    password: password,
  });
  return res;
};
const register = async (email, name, password) => {
  const res = await request.POST(`/api/register`, {
    email: email,
    name: name,
    password: password,
  });
  return res;
};

const changePass = async (email, password, passwordOld) => {
  const res = await request.PATCH(`/api/changePass`, {
    email: email,
    passwordOld: passwordOld,
    password: password,
  });
  return res;
};
const authen = async (token) => {
  const res = await request.POST(`/api/authentication`, {
    token: token,
  });
  return res;
};
const tokenComfirm = async (email, token) => {
  const res = await request.POST(`/api/checkTokenConfirm`, {
    email: email,
    token: token,
  });
  return res;
};
const delTokenComfirm = async (email, token) => {
  const res = await request.DELETE(
    `/api/delTokenConfirm?email=${email}&token=${token}`
  );
  return res;
};
const changePassWithToken = async (email, password) => {
  const res = await request.POST(`/api/changePassWithToken`, {
    email: email,
    password: password,
  });
  return res;
};
// admin
const listAll = async (page) => {
  const res = await request.GET(`/api/account/${page}`);
  return res;
};
const listOfRole = async (role, page) => {
  const res = await request.GET(`/api/account/listUserStatus/${role}/${page}`);
  return res;
};
const updateRole = async (id, role) => {
  const res = await request.PATCH(`/api/account/changeRole`, {
    id: id,
    role: role,
  });
  return res;
};
const delUser = async (id) => {
  const res = await request.DELETE(`/api/account/delUser/${id}`);
  return res;
};
const registerOfAd = async (email, name, password, role) => {
  const res = await request.POST(`/api/account/registerOfAd`, {
    email: email,
    name: name,
    password: password,
    role: role,
  });
  return res;
};
const editOfAd = async (id, password) => {
  const res = await request.POST(`/api/account/editOfAd`, {
    id: id,
    password: password,
  });
  return res;
};
export {
  login,
  register,
  changePass,
  authen,
  tokenComfirm,
  delTokenComfirm,
  changePassWithToken,
  // admin
  listAll,
  listOfRole,
  updateRole,
  delUser,
  registerOfAd,
  editOfAd,
};
