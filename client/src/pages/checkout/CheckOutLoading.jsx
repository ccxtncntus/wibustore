// import { useEffect, useState, useContext } from 'react';
// import * as CheckOutService from '../../services/CheckOutService';
// import * as ShoppingCartsService from '../../services/ShoppingCartsService';
// import { useNavigate } from 'react-router-dom';
// import { Contexts } from '../../components/context/Contexts';
// import { UContexts } from '../../components/context/UserContext';
// import * as NotificationService from '../../services/NotificationService';
// import { message } from 'antd';

// const CheckOutLoading = () => {
//   const { delCard } = useContext(Contexts);
//   const navigate = useNavigate();
function parseURLParams(url) {
  var queryStart = url.indexOf('?') + 1,
    queryEnd = url.indexOf('#') + 1 || url.length + 1,
    query = url.slice(queryStart, queryEnd - 1),
    pairs = query.replace(/\+/g, ' ').split('&'),
    parms = {},
    i,
    n,
    v,
    nv;

  if (query === url || query === '') return;

  for (i = 0; i < pairs.length; i++) {
    nv = pairs[i].split('=', 2);
    n = decodeURIComponent(nv[0]);
    v = decodeURIComponent(nv[1]);

    if (!parms.hasOwnProperty(n)) parms[n] = [];
    parms[n].push(nv.length === 2 ? v : null);
  }
  return parms;
}
//   useEffect(() => {
//     const run = async () => {
//       const path = window.location.href;
//       const urlParams = parseURLParams(path);

//       if (
//         urlParams?.vnp_ResponseCode[0] &&
//         urlParams?.vnp_ResponseCode[0] === '00'
//       ) {
//         const carts = JSON.parse(localStorage.getItem('carts'));
//         const phone = localStorage.getItem('phone');
//         const address = localStorage.getItem('address');
//         const userid = localStorage.getItem('userid');
//         const Totails = urlParams?.vnp_Amount[0];

//         if (carts && phone && address) {
//           const addOrders = await CheckOutService.create(
//             userid,
//             address,
//             1,
//             phone,
//             Totails
//           );

//           if (addOrders && addOrders.status === 200) {
//             for (const item of carts) {
//               try {
//                 const da = await CheckOutService.createDetail(
//                   addOrders.lastID,
//                   item.idProduct,
//                   item.name,
//                   item.price - item.saleoff,
//                   Number(item.quantity),
//                   item.img
//                 );

//                 if (da.status === 200 && item.id !== 0) {
//                   await delCard(item);
//                   await ShoppingCartsService.productBuyed(
//                     item.idProduct,
//                     Number(item.quantity)
//                   );
//                   await ShoppingCartsService.delCart(item.id);
//                 }
//               } catch (error) {
//                 console.error('Error creating detail:', error);
//                 return;
//               }
//             }

//             await NotificationService.sendMess('notification');
//             localStorage.removeItem('carts');
//             localStorage.removeItem('phone');
//             localStorage.removeItem('address');
//             localStorage.removeItem('userid');
//             navigate('/check-out/success');
//           }
//         } else {
//           console.log('Có lỗi xảy ra');
//         }
//       } else {
//         console.log('Thanh toán thất bại');
//       }
//     };

//     // const run = async () => {
//     //   const path = window.location.href;
//     //   const urlParams = parseURLParams(path);
//     //   if (
//     //     urlParams?.vnp_ResponseCode[0] &&
//     //     urlParams?.vnp_ResponseCode[0] == '00'
//     //   ) {
//     //     const carts = JSON.parse(localStorage.getItem('carts'));
//     //     const phone = localStorage.getItem('phone');
//     //     const address = localStorage.getItem('address');
//     //     const userid = localStorage.getItem('userid');
//     //     const Totails = urlParams?.vnp_Amount[0];
//     //     if (carts && phone && address) {
//     //       const addOrders = await CheckOutService.create(
//     //         userid,
//     //         address,
//     //         1,
//     //         phone,
//     //         Totails
//     //       );
//     //       if (addOrders && addOrders.status === 200) {
//     //         carts.map(async (item) => {
//     //           try {
//     //             const da = await CheckOutService.createDetail(
//     //               addOrders.lastID,
//     //               item.idProduct,
//     //               item.name,
//     //               item.price - item.saleoff,
//     //               Number(item.quantity),
//     //               item.img
//     //             );
//     //             if (da.status === 200) {
//     //               if (item.id != 0) {
//     //                 // bớt số lượng trong product
//     //                 delCard(item);
//     //                 await ShoppingCartsService.productBuyed(
//     //                   item.idProduct,
//     //                   Number(item.quantity)
//     //                 );
//     //                 // xóa trong giỏ hàng
//     //                 await ShoppingCartsService.delCart(item.id);
//     //               }
//     //               await NotificationService.sendMess('notification');
//     //               localStorage.removeItem('carts');
//     //               localStorage.removeItem('phone');
//     //               localStorage.removeItem('address');
//     //               localStorage.removeItem('userid');
//     //               natigate('/check-out/success');
//     //             }
//     //           } catch (error) {
//     //             console.error('Error creating detail:', error);
//     //             return;
//     //           }
//     //         });
//     //       }
//     //     }
//     //     console.log('Có lỗi xảy ra');
//     //   } else {
//     //     console.log('Thanh toán thất bại');
//     //   }
//     // };
//     run();
//   }, []);

//   return <div style={{ minHeight: '80vh' }}>Đang kiểm tra...</div>;
// };

// export default CheckOutLoading;

import { useEffect, useContext, useState } from 'react';
import * as CheckOutService from '../../services/CheckOutService';
import * as ShoppingCartsService from '../../services/ShoppingCartsService';
import { useNavigate } from 'react-router-dom';
import { Contexts } from '../../components/context/Contexts';
import * as NotificationService from '../../services/NotificationService';

const CheckOutLoading = () => {
  const { delCard } = useContext(Contexts);
  const navigate = useNavigate();
  const [test1, settest1] = useState(false);

  const [cartss, setcarts] = useState(null);
  const [phones, setphones] = useState(null);
  const [addresss, setaddresss] = useState(null);
  const [userids, setuserids] = useState(null);
  const [tong, settong] = useState(null);
  useEffect(() => {
    const run = async () => {
      const path = window.location.href;
      const urlParams = parseURLParams(path);
      if (
        urlParams?.vnp_ResponseCode[0] &&
        urlParams?.vnp_ResponseCode[0] === '00'
      ) {
        const carts = JSON.parse(localStorage.getItem('carts'));
        const phone = localStorage.getItem('phone');
        const address = localStorage.getItem('address');
        if (carts && phone && address) {
          setcarts(JSON.parse(localStorage.getItem('carts')));
          setphones(localStorage.getItem('phone'));
          setaddresss(localStorage.getItem('address'));
          setuserids(localStorage.getItem('userid'));
          settong(urlParams?.vnp_Amount[0]);

          settest1(true);
          localStorage.removeItem('carts');
          localStorage.removeItem('phone');
          localStorage.removeItem('address');
          localStorage.removeItem('userid');
        }
      } else {
        console.log('Thanh toán thất bại');
      }
    };
    run();
  }, []);
  useEffect(() => {
    const run = async () => {
      if (test1) {
        console.log(100);
        const addOrders = await CheckOutService.create(
          userids,
          addresss,
          1,
          phones,
          tong
        );
        if (addOrders && addOrders.status === 200) {
          for (const item of cartss) {
            try {
              const da = await CheckOutService.createDetail(
                addOrders.lastID,
                item.idProduct,
                item.name,
                item.price - item.saleoff,
                Number(item.quantity),
                item.img
              );
              if (da.status === 200 && item.id !== 0) {
                delCard(item);
                await ShoppingCartsService.productBuyed(
                  item.idProduct,
                  Number(item.quantity)
                );
                await ShoppingCartsService.delCart(item.id);
              }
            } catch (error) {
              console.error('Error creating detail:', error);
              return;
            }
          }
          await NotificationService.sendMess('notification');
          navigate('/check-out/success');
        }
      }
    };
    run();
  }, [test1]);

  return <div style={{ minHeight: '80vh' }}>Đang kiểm tra...</div>;
};

export default CheckOutLoading;
