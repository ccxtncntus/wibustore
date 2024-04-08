import * as request from '../configs/Axios';

const List = async (page, sort) => {
  const res = await request.GET(
    `/api/products?pageNumber=${page}&sort=${sort}`
  );
  return res;
};
const ListSale = async (page, sort) => {
  const res = await request.GET(
    `/api/products/sale?pageNumber=${page}&sort=${sort}`
  );
  return res;
};
const ListHot = async (page, sort) => {
  const res = await request.GET(
    `/api/products/hot?pageNumber=${page}&sort=${sort}`
  );
  return res;
};
const ListBetween = async (first, second) => {
  const res = await request.GET(`/api/products/number`, {
    first: first,
    second: second,
  });
  return res;
};

const ListRandom = async (id) => {
  const res = await request.GET(`/api/products/random/${id}`);
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
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};
const updateQuantity = async (id, quantity) => {
  const res = await request.PATCH(`/api/products/updateQuantity/${id}`, {
    quantity: quantity,
  });
  return res;
};
const updateBought = async (id, quantity) => {
  const res = await request.PATCH(`/api/products/updateBought/${id}`, {
    quantity: quantity,
  });
  return res;
};

const listProCategory = async (id, page, sort) => {
  const res = await request.GET(
    `/api/products/listPro/${id}?pageNumber=${page}&sort=${sort}`
  );
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
  ListSale,
  ListHot,
  ListRandom,
  updateQuantity,
  updateBought,
  ListBetween,
};
