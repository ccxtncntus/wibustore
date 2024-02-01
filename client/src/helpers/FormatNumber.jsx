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
export { FormatNumber, OrderStatus, Status, CountPage, FormatDay };
