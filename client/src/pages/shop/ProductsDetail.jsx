import { useEffect, useState } from "react";
import * as ProductsService from "../../services/ProductService";
import "./productdetail.css";
import { HOST } from "../../configs/DataEnv";
import { Contexts } from "../../components/context/Contexts";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import LoginModal from "../../components/modal/LoginModal";
import * as AccountService from "../../services/AccountService";
import * as ShoppingCartsService from "../../services/ShoppingCartsService";
import { useCookies } from "react-cookie";
import { message } from "antd";
import { UContexts } from "../../components/context/UserContext";
const ProductsDetail = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token", "path_end"]);
  const { addCard, delCard, cardNumber } = useContext(Contexts);
  const { User } = useContext(UContexts);
  const data = window.location.pathname;
  const datas = data.split("/").pop();
  const [Product, setProduct] = useState("");
  const [ListImg, setListImg] = useState([]);
  const [ViewImg, setViewImg] = useState(0);
  const [IsLogin, setIsLogin] = useState(false);
  const [IdUser, setIdUser] = useState("");
  useEffect(() => {
    const run = async () => {
      const data = await ProductsService.productId(datas);
      setProduct(data.data[0]);
      const imgs = data.data[0].all_images.split(",");
      setListImg(imgs);
      if (Object.values(cookies.length > 0)) {
        if (cookies.token) {
          const login = await AccountService.authen(cookies.token);
          if (login.status === 200) {
            setIsLogin(true);
            setIdUser(login.data.id);
          } else {
            setIsLogin(false);
          }
        }
      }
    };
    run();
  }, []);

  const handleView = (index) => {
    setViewImg(index);
  };

  function currencyFormat(num) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " đ";
  }
  const [value, setValue] = useState(1);
  const handleChangeQuantity = (e) => {
    setValue(e.target.value);
  };
  const [modalShow, setModalShow] = useState(false);
  const handleAddcard = async () => {
    if (IsLogin) {
      const img = Product.all_images.split(",")[0];
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
  // const handleBuyNow = () => {
  //   IsLogin ? console.log("Mua ngay") : setModalShow(true);
  //   // console.log(cardNumber);
  // };
  return (
    <div className="container">
      <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
      {Product !== "" ? (
        <>
          <div className="row mt-5">
            <div className="col-md-6">
              <div className="product_detail">
                {ListImg.length > 0 && (
                  <>
                    <div className="product_detail_listimg">
                      {ListImg.map((item, index) => {
                        return (
                          <img
                            key={index}
                            src={HOST + "/uploads/" + item}
                            alt=""
                            onClick={() => handleView(index)}
                            className={
                              index === ViewImg
                                ? "product_detail_listimg_boder"
                                : null
                            }
                          />
                        );
                      })}
                    </div>
                    <img src={HOST + "/uploads/" + ListImg[ViewImg]} alt="" />
                  </>
                )}
              </div>
            </div>
            <div className="col-md-6 product_detail_titles">
              <div className="product_detail_title">{Product.name}</div>
              <div className="product_detail_price">
                {currencyFormat(Product.price - Product.saleoff)}
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
                </button>{" "}
                {/* <button
                  className="btn btn-secondary"
                  disabled={
                    value > 0 && value <= Product.quantity ? false : true
                  }
                  onClick={handleBuyNow}
                >
                  Mua ngay
                </button> */}
              </div>
            </div>
          </div>
          <div className="mt-5">Sản phẩm liên quan</div>
        </>
      ) : (
        "loading..."
      )}
    </div>
  );
};

export default ProductsDetail;
