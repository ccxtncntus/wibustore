import * as request from "../configs/Axios";

const getOrder = async () => {
  const res = await request.GET(`/api/dashboard`);
  return res;
};
const getBest = async () => {
  const res = await request.GET(`/api/dashboard/getBest`);
  return res;
};
const getData = async () => {
  const res = await request.GET(`/api/dashboard/getData`);
  return res;
};
export { getOrder, getBest, getData };
