import * as request from "../configs/Axios";

const list = async () => {
  const res = await request.GET(`/api/sliders`);
  return res;
};
const add = async (formData) => {
  const res = await request.POST(`/api/sliders/add`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};
const edit = async (formData) => {
  const res = await request.POST(`/api/sliders/edit`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};
const del = async (id) => {
  const res = await request.DELETE(`/api/sliders/delSlider/${id}`);
  return res;
};

export { add, list, del, edit };
