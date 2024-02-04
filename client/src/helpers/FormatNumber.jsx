import { utils, writeFile } from "xlsx";

const FormatNumber = (num) => {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ";
};
const CountPage = (count) => {
  const c = Math.ceil(count / 12);
  return c;
};
const OrderStatus = (status) => {
  switch (status) {
    case "0":
      return "Tất cả";
    case "pending":
      return "Chờ xác nhận";
    case "confirm":
      return "Xác nhận";
    case "beingShipped":
      return "Đang giao hàng";
    case "successfully":
      return "Đã nhận hàng";
    case "cancel":
      return "Hủy";
    default:
      return "Chờ xác nhận";
  }
};
const FormatDay = (time) => {
  var d = new Date(time);
  return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
};
const Status = [
  "0",
  "pending",
  "confirm",
  "beingShipped",
  "successfully",
  "cancel",
];
const ExportExcel = (data, nameSheet, nameXlsx) => {
  const wb = utils.book_new();
  const ws = utils.json_to_sheet(data);
  // const ws2 = utils.json_to_sheet(ListOrder);
  utils.book_append_sheet(wb, ws, `${nameSheet}`);
  // utils.book_append_sheet(wb, ws2, "s2");
  writeFile(wb, `${nameXlsx}.xlsx`);
};

const validateEmail = (data) => {
  let isEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (data == "") {
    return "Không bỏ trống";
  }
  if (!isEmail.test(data)) {
    return "Không đúng email";
  }
  return "";
};
const validate = (data) => {
  if (data == "") {
    return "Không bỏ trống";
  }
  return "";
};

export {
  FormatNumber,
  OrderStatus,
  Status,
  CountPage,
  FormatDay,
  ExportExcel,
  validateEmail,
  validate,
};
