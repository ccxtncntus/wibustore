// import * as request from "../configs/Axios";
import axios from "axios";
import { TOKENG } from "../configs/DataEnv";
const getTinh = async () => {
  const res = await axios.get(
    `https://online-gateway.ghn.vn/shiip/public-api/master-data/province`,
    {
      headers: {
        token: TOKENG,
      },
    }
  );
  return res;
};
const getHuyen = async (province_id) => {
  const res = await axios.get(
    `https://online-gateway.ghn.vn/shiip/public-api/master-data/district`,
    {
      headers: {
        token: TOKENG,
      },
      params: {
        province_id: province_id,
      },
    }
  );
  return res;
};
const getXa = async (district_id) => {
  const res = await axios.get(
    `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward`,
    {
      headers: {
        token: TOKENG,
      },
      params: {
        district_id: district_id,
      },
    }
  );
  return res;
};
export { getTinh, getHuyen, getXa };
