import * as request from "../configs/Axios";

const List = async (page) => {
  const res = await request.GET(`/api/products?pageNumber=${page}`);
  return res;
};

const productId = async (id) => {
  const res = await request.GET(`/api/products/${id}`);
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
const crawl = async (p) => {
  const res = await request.GET(`/api/crawl/${p}`);
  return res;
};
const crawlDetail = async (path) => {
  const res = await request.GET(`/api/crawl/detail/products/${path}`);
  return res;
};

export {
  List,
  update,
  listProCategory,
  delProduct,
  edit,
  onceProduct,
  crawl,
  crawlDetail,
  productId,
};
