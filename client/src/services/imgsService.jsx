import * as request from "../configs/Axios";

const List = async (product_id) => {
  const res = await request.GET(`/api/imagesProduct/${product_id}`);
  return res;
};

const deleteListImg = async (imgs) => {
  // Route::delete('imagesProduct/del', [ImagesController::class, 'destroy']);
  const res = await request.DELETE(`/api/im/del/${imgs}`);
  return res;
};

// const update = async (formData) => {
//   const res = await request.POST(`/api/products`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return res;
// };

// const listProCategory = async (id, page) => {
//   const res = await request.GET(`/api/products/listPro/${id}`, {
//     pageNumber: page,
//   });
//   return res;
// };

// const delProduct = async (id) => {
//   const res = await request.DELETE(`/api/products/delete/${id}`);
//   return res;
// };

export { List, deleteListImg };
