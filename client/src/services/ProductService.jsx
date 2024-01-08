import * as request from "../configs/Axios";

const List = async (page) => {
  const res = await request.GET(`/api/products?pageNumber=${page}`);
  return res;
};

const onceProduct = async (value) => {
  const res = await request.GET(`/api/products/once/${value}`);
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

const listProCategory = async (id, page) => {
  const res = await request.GET(`/api/products/listPro/${id}`, {
    pageNumber: page,
  });
  return res;
};

const delProduct = async (id) => {
  const res = await request.DELETE(`/api/products/delete/${id}`);
  return res;
};

const edit = async (formData, id) => {
  const res = await request.POST(`/api/products/edit/${id}`, formData);
  return res;
};

export { List, update, listProCategory, delProduct, edit, onceProduct };
