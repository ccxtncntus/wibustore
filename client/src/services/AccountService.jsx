import * as request from "../configs/Axios";

const login = async (email, password) => {
  const res = await request.POST(`/api/login`, {
    email: email,
    password: password,
  });
  return res;
};
export { login };
