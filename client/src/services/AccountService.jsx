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

export {
  login,
  register,
  changePass,
  authen,
  tokenComfirm,
  delTokenComfirm,
  changePassWithToken,
};
