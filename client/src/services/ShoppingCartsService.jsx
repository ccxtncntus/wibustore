import * as request from "../configs/Axios";

const add = async (user_id, product_id, img, quantity) => {
  const res = await request.POST(`/api/shoppingcard/adOneProduct`, {
    user_id: user_id,
    product_id: product_id,
    img: img,
    quantity: quantity,
  });
  return res;
};
const listOfUser = async (user_id) => {
  const res = await request.GET(`/api/shoppingcard/listOfUser/${user_id}`);
  return res;
};
const iProduct = async (name) => {
  const res = await request.GET(`/api/shoppingcard/product?name=${name}`);
  return res;
};
const productBuyed = async (id, quantity) => {
  const res = await request.POST(`/api/shoppingcard/productBuyed`, {
    id: id,
    quantity: quantity,
  });
  return res;
};
const delCart = async (id) => {
  const res = await request.POST(`/api/shoppingcard/delCart`, {
    id: id,
  });
  return res;
};

export { add, listOfUser, delCart, iProduct, productBuyed };
