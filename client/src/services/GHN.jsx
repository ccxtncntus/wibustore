// import * as request from "../configs/Axios";
import axios from "axios";
import { TOKENG, SHOPID } from "../configs/DataEnv";
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
const fee = async (district_id, ward_code) => {
  const res = await axios.get(
    `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee`,
    {
      headers: {
        token: TOKENG,
        "Content-Type": "application / json",
        ShopId: SHOPID,
      },
      params: {
        service_type_id: 2,
        to_district_id: district_id,
        to_ward_code: ward_code,
        height: 1,
        length: 1,
        weight: 1000,
        width: 1,
        insurance_value: 0,
        coupon: null,
        items: [],
      },
    }
  );
  return res;
};
export { getTinh, getHuyen, getXa, fee };
