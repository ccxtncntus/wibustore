import { utils, writeFile } from 'xlsx';

const FormatNumber = (num) => {
  return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' đ';
};

const Count = (count, chia) => {
  const c = Math.ceil(count / chia);
  return c;
};
const CountPage = (count) => {
  const c = Math.ceil(count / 12);
  return c;
};
const OrderStatus = (status) => {
  switch (status) {
    case '0':
      return 'Tất cả';
    case 'pending':
      return 'Chờ xác nhận';
    case 'confirm':
      return 'Xác nhận';
    case 'beingShipped':
      return 'Đang giao hàng';
    case 'successfully':
      return 'Đã nhận hàng';
    case 'cancel':
      return 'Hủy';
    default:
      return 'Chờ xác nhận';
  }
};
const FormatDay = (time) => {
  var d = new Date(time);
  return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
};

// function formatDate(d) {
//   var date = new Date(d);
//   var hours = date.getHours();
//   var minutes = date.getMinutes();
//   var ampm = hours >= 12 ? 'pm' : 'am';
//   hours = hours % 12;
//   hours = hours ? hours : 12; // the hour '0' should be '12'
//   minutes = minutes < 10 ? '0' + minutes : minutes;
//   var strTime = hours + ':' + minutes + ' ' + ampm;
//   return (
//     date.getMonth() +
//     1 +
//     '/' +
//     date.getDate() +
//     '/' +
//     date.getFullYear() +
//     '  ' +
//     strTime
//   );
// }

const Status = [
  '0',
  'pending',
  'confirm',
  'beingShipped',
  'successfully',
  'cancel',
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
  if (data == '') {
    return 'Không bỏ trống';
  }
  if (!isEmail.test(data)) {
    return 'Không đúng email';
  }
  return '';
};
const validate = (data) => {
  if (data == '') {
    return 'Không bỏ trống';
  }
  return '';
};
const returnMinPrice = (data) => {
  // console.log(data);
  const jsonArray = JSON.parse(data);
  const uniqueArray = Array.from(new Set(jsonArray.map(JSON.stringify))).map(
    JSON.parse
  );
  const minPriceElement = uniqueArray.reduce((min, current) =>
    min.price < current.price ? min : current
  );
  return minPriceElement;
};
const returnPrice = (data) => {
  const jsonArray = JSON.parse(data);
  const uniqueArray = Array.from(new Set(jsonArray.map(JSON.stringify))).map(
    JSON.parse
  );
  for (let i = 0; i < uniqueArray.length; i++) {
    for (let x = 0; x < uniqueArray.length - 1 - i; x++) {
      if (uniqueArray[x].price > uniqueArray[x + 1].price) {
        [uniqueArray[x], uniqueArray[x + 1]] = [
          uniqueArray[x + 1],
          uniqueArray[x],
        ];
      }
    }
  }
  return uniqueArray;
  // return uniqueArray;
};
const returnImgs = (data) => {
  const imageUrls = data;
  const imageUrlArray = imageUrls.split(',');
  const uniqueImageUrlSet = new Set(imageUrlArray);
  const uniqueImageUrlArray = Array.from(uniqueImageUrlSet);
  return uniqueImageUrlArray;
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
  returnMinPrice,
  returnImgs,
  returnPrice,
  Count,
};
