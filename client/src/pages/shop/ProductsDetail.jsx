/* eslint-disable no-unused-vars */
import './productdetail.css';
import { useEffect, useState, useContext } from 'react';
import { HOST } from '../../configs/DataEnv';
import { Contexts } from '../../components/context/Contexts';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { UContexts } from '../../components/context/UserContext';
import { message } from 'antd';
import {
  FormatNumber,
  returnImgs,
  returnMinPrice,
  returnPrice,
} from '../../helpers/FormatNumber';
import * as ShoppingCartsService from '../../services/ShoppingCartsService';
import * as ProductsService from '../../services/ProductService';
import LoadingConponent from '../../components/loading/Loading';
import LoginModal from '../../components/modal/LoginModal';
import Cart from '../../components/product/Cart';
import ProductLoading from '../../components/loadingProduct/ProductLoading';

import parse from 'html-react-parser';
import Accordion from 'react-bootstrap/Accordion';
import { Collapse } from 'antd';
import Evaluate from './evaluate/Evaluate';

const ProductsDetail = () => {
  const paths = useParams();
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'path_end']);
  const { addCard } = useContext(Contexts);
  const { User } = useContext(UContexts);
  const [Product, setProduct] = useState('');
  const [ListImg, setListImg] = useState([]);
  const [ViewImg, setViewImg] = useState(0);
  const [IsLogin, setIsLogin] = useState(false);
  const [IdUser, setIdUser] = useState('');
  const [ListRandom, setListRandom] = useState([]);
  const test = [1, 2, 3, 4];
  const [Prices, setPrices] = useState([]);
  const [Prii, setPrii] = useState(null);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const run = async () => {
      if (paths && paths.idProduct) {
        setloading(true);
        const data = await ProductsService.productId(paths.idProduct);
        setProduct(data.data[0]);
        const pri = returnPrice(data.data[0].price_and_saleoff);
        setPrices(pri);
        setPrii(pri[0]);

        const imageUrls = data.data[0].all_images;
        const dataImgs = returnImgs(imageUrls);
        setListImg(dataImgs);

        const ran = await ProductsService.ListRandom(data.data[0].id);
        ran.status === 200 ? setListRandom(ran.data) : setListRandom([]);
        setloading(false);
      }
      if (Object.values(User) == '') {
        // kiểm tra đăng nhập chưa
        setIsLogin(false);
      } else {
        setIdUser(User.id);
        setIsLogin(true);
      }
    };
    run();
  }, [User, paths]);

  const handleView = (index) => {
    setViewImg(index);
  };

  const [value, setValue] = useState(1);
  const handleChangeQuantity = (e) => {
    setValue(e.target.value);
  };
  const [modalShow, setModalShow] = useState(false);

  const handleAddcard = async () => {
    if (IsLogin) {
      const img = Product.all_images.split(',')[0];
      const test1 = {
        idProduct: Product.id,
        idPrice: Prii.id_addPrice,
      };
      console.log(test1);
      // return;
      addCard(test1);
      const chay = await ShoppingCartsService.add(
        IdUser,
        Product.id,
        Prii.id_addPrice,
        img,
        value
      );
      chay.status === 200 && message.success(chay.message);
    } else {
      setModalShow(true);
    }
  };

  const items = [
    {
      key: '1',
      label: <h6>Giao hàng</h6>,
      children: (
        <div>
          {' '}
          <p>
            Wibu&nbsp;lu&ocirc;n hướng đến việc cung cấp dịch vụ vận chuyển tốt
            nhất với mức ph&iacute; cạnh tranh cho tất cả c&aacute;c đơn
            h&agrave;ng m&agrave; qu&yacute; kh&aacute;ch đặt với ch&uacute;ng
            t&ocirc;i. Ch&uacute;ng t&ocirc;i hỗ trợ giao h&agrave;ng tr&ecirc;n
            to&agrave;n quốc với ch&iacute;nh s&aacute;ch giao h&agrave;ng cụ
            thể như sau:
          </p>
          <p>
            <strong>
              01. Thời gian ho&agrave;n thiện v&agrave; giao h&agrave;ng
            </strong>
            &nbsp;
          </p>
          <ul>
            <li style={{ listStyleType: 'inherit' }}>
              Khu vực nội th&agrave;nh H&agrave; Nội: Ho&agrave;n thiện sản phẩm
              v&agrave; giao h&agrave;ng trong 3-5 ng&agrave;y l&agrave;m việc.
            </li>
            <li style={{ listStyleType: 'inherit' }}>
              Khu vực ngo&agrave;i H&agrave; Nội:&nbsp;Ho&agrave;n thiện sản
              phẩm v&agrave; giao h&agrave;ng&nbsp;trong khoảng&nbsp;7-10
              ng&agrave;y l&agrave;m việc.
            </li>
            <li style={{ listStyleType: 'inherit' }}>
              <em>
                Wibustore&nbsp;sẽ b&aacute;o&nbsp;trước thời gian giao
                h&agrave;ng cho kh&aacute;ch h&agrave;ng ở c&aacute;c tỉnh,
                th&agrave;nh phố kh&aacute;c.
              </em>
            </li>
          </ul>
          <p>
            <strong>02. Khu vực giao h&agrave;ng</strong>
            <br />
            Wibustore&nbsp;giao h&agrave;ng v&agrave; chấp nhận thanh
            to&aacute;n sau khi nhận h&agrave;ng tr&ecirc;n to&agrave;n quốc.
          </p>
          <div>
            <strong>04. Dịch vụ giao h&agrave;ng</strong>
            <br />
            Wibustore&nbsp;sử dụng c&aacute;c dịch vụ giao h&agrave;ng
            chuy&ecirc;n nghiệp để giao h&agrave;ng tới qu&yacute; kh&aacute;ch
            h&agrave;ng được nhanh v&agrave; tốt nhất như: Viettel, EM
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="productDetail_vip">
      {loading && <LoadingConponent />}
      <div className="productDetail pt-4 container">
        <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
        {Product == '' && <LoadingConponent />}
        {Product !== '' && (
          <>
            <div className="row productDetail_img">
              <div className="product_detail col-md-7">
                {ListImg.length > 0 && (
                  <div className="row">
                    <div className="product_detail_listimg col-md-2">
                      {ListImg.map((item, index) => {
                        return (
                          <img
                            key={index}
                            src={HOST + '/uploads/' + item}
                            alt=""
                            onClick={() => handleView(index)}
                            className={
                              index === ViewImg
                                ? 'product_detail_listimg_boder'
                                : null
                            }
                          />
                        );
                      })}
                    </div>
                    <div className="col-md-10 product_detail_imgPro">
                      <img src={HOST + '/uploads/' + ListImg[ViewImg]} alt="" />
                    </div>
                  </div>
                )}
              </div>
              {/* title */}
              <div className="col-md-5 product_detail_titles">
                <span style={{ fontSize: '.9rem', fontStyle: 'italic' }}>
                  wibustore
                </span>
                <h1 className="m-0">{Product.name}</h1>
                <div className="product_detail_price mt-3">
                  {Prii && FormatNumber(Prii.price - Prii.saleoff)}{' '}
                  {Prii.saleoff > 0 && (
                    <span style={{ fontSize: '1.2rem', color: 'gray' }}>
                      <del>{FormatNumber(Prii.price)}</del>
                    </span>
                  )}
                </div>

                <div>
                  <span style={{ fontSize: '.9rem' }}>
                    Đã bao gồm thuế. Phí vận chuyển được tính khi thanh toán.
                  </span>
                  <p className="mt-3 mb-1">Kích thước (cm)</p>
                  <div>
                    {Prices.length > 0 &&
                      Prices.map((item, index) => (
                        <button
                          className={
                            item.size == Prii.size
                              ? 'btn product_detail_btn_un product_detail_btn_active'
                              : 'btn product_detail_btn_un'
                          }
                          key={index}
                          onClick={() => setPrii(item)}
                        >
                          {item.size}
                        </button>
                      ))}
                  </div>
                </div>
                {/* <div>
                  Kho {Product.quantity} ({Product.status})
                </div> */}
                <div className="product_detail_quantity mt-3">
                  <p className="m-0 p-0">Số lượng</p>
                  <input
                    style={{ width: '30%' }}
                    className="form-control mt-1"
                    type="number"
                    value={value}
                    onChange={(e) => handleChangeQuantity(e)}
                  />
                </div>
                <div>
                  <button
                    className="btn btn_add_product mt-3"
                    onClick={handleAddcard}
                    disabled={
                      value > 0 && value <= Product.quantity ? false : true
                    }
                  >
                    Thêm vào giỏ hàng
                  </button>{' '}
                  {/* description */}
                  <div className="mt-4">{parse(Product.description)}</div>
                </div>
                <Collapse items={items} />
              </div>
            </div>
            {/* more */}
            <hr />
            <Evaluate product={Product} />
            <hr />
            <div className="product_detail_more">
              <p className="text-center h4">
                Sản phẩm <span className="vip">liên quan</span>
              </p>
              <span className="d-block text-center">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              </span>
              <div className="product_detail_more_list row mt-2">
                {ListRandom.length > 0
                  ? ListRandom.map((item, index) => (
                      <div className="col-md-3" key={index}>
                        <Cart item={item} />
                      </div>
                    ))
                  : test.map((item, index) => (
                      <div className="col-md-3" key={index}>
                        <ProductLoading />
                      </div>
                    ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsDetail;
