import * as request from "../configs/Axios";

const List = async (page) => {
  const res = await request.GET(
    `/api/categorys?pageNumber=${page}`
    //  {
    //   headers: {
    //     // Adding a token to the request headers for authentication
    //     // token:,
    //     Authorization:
    //       "Bearer 15|rzi6R4uzCRx32pAFHm5ZkGR2LCTU7J8zIvekgkRfd69329cc",
    //   },
    // }
  );
  return res;
};

const update = async (name, status) => {
  const res = await request.POST(`/api/categorys`, {
    name: name,
    status: status,
  });
  return res;
};
const edit = async (name, status, id) => {
  const res = await request.PUT(`/api/categorys/edit/${id}`, {
    name: name,
    status: status,
  });
  return res;
};
const del = async (id) => {
  const res = await request.DELETE(`/api/categorys/delete/${id}`);
  return res;
};

export { List, update, edit, del };
