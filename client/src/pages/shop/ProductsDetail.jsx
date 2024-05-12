import './productdetail.css';
import { useEffect, useState, useContext } from 'react';
import { HOST } from '../../configs/DataEnv';
import { Contexts } from '../../components/context/Contexts';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { UContexts } from '../../components/context/UserContext';
import { message } from 'antd';
import { FormatNumber } from '../../helpers/FormatNumber';
import * as ShoppingCartsService from '../../services/ShoppingCartsService';
import * as ProductsService from '../../services/ProductService';
import LoadingConponent from '../../components/loading/Loading';
import LoginModal from '../../components/modal/LoginModal';
import Cart from '../../components/product/Cart';
import ProductLoading from '../../components/loadingProduct/ProductLoading';
const ProductsDetail = () => {
  const paths = useParams();
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'path_end']);
  const { addCard, delCard, cardNumber } = useContext(Contexts);
  const { User } = useContext(UContexts);
  const [Product, setProduct] = useState('');
  const [ListImg, setListImg] = useState([]);
  const [ViewImg, setViewImg] = useState(0);
  const [IsLogin, setIsLogin] = useState(false);
  const [IdUser, setIdUser] = useState('');
  const [ListRandom, setListRandom] = useState([]);
  const test = [1, 2, 3, 4];
  useEffect(() => {
    const run = async () => {
      if (paths && paths.idProduct) {
        const data = await ProductsService.productId(paths.idProduct);

        setProduct(data.data[0]);

        const ran = await ProductsService.ListRandom(data.data[0].id);
        ran.status === 200 ? setListRandom(ran.data) : setListRandom([]);
        const imgs = data.data[0].all_images.split(',');
        setListImg(imgs);
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
      addCard(Product);
      const chay = await ShoppingCartsService.add(
        IdUser,
        Product.id,
        img,
        value
      );
      chay.status === 200 && message.success(chay.message);
    } else {
      setModalShow(true);
    }
  };
  return (
    <div className="productDetail">
      1
      <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
      {Product !== '' ? (
        <>
          <div className="row mt-4 productDetail_img">
            <div className="product_detail col-md-6">
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
            <div className="col-md-6 product_detail_titles">
              <div className="product_detail_title">{Product.name}</div>
              <div className="product_detail_price">
                {FormatNumber(Product.price - Product.saleoff)}{' '}
                {Product.saleoff > 0 && (
                  <span style={{ fontSize: '1.2rem', color: 'gray' }}>
                    <del>{FormatNumber(Product.price)}</del>
                  </span>
                )}
              </div>
              <div>{Product.description}</div>
              <div>
                Kho {Product.quantity} ({Product.status})
              </div>
              <div className="product_detail_quantity">
                <p>Số lượng</p>
                <input
                  className="form-control w-25"
                  type="number"
                  value={value}
                  onChange={(e) => handleChangeQuantity(e)}
                />
              </div>
              <div>
                <button
                  className="btn btn-primary"
                  onClick={handleAddcard}
                  disabled={
                    value > 0 && value <= Product.quantity ? false : true
                  }
                >
                  Thêm vào giỏ hàng
                </button>{' '}
              </div>
            </div>
          </div>
          <div className="mt-5 product_detail_more">
            <p>Sản phẩm liên quan</p>
            <div className="product_detail_more_list mb-4 row">
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
      ) : (
        <LoadingConponent />
      )}
    </div>
  );
};

export default ProductsDetail;
