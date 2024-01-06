import * as request from "../configs/Axios";

const List = async (page) => {
  const res = await request.GET(`/api/products?pageNumber=${page}`);
  return res;
};

const update = async (formData) => {
  const res = await request.POST(`/api/products`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};
export { List, update };
