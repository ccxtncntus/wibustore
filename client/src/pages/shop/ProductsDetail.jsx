import { useEffect, useState } from "react";
import * as ProductsService from "../../services/ProductService";
import "./productdetail.css";
import { HOST } from "../../configs/DataEnv";
const ProductsDetail = () => {
  const data = window.location.pathname;
  const datas = data.split("/").pop();
  const [Product, setProduct] = useState("");
  const [ListImg, setListImg] = useState([]);
  const [ViewImg, setViewImg] = useState(0);

  useEffect(() => {
    const run = async () => {
      const data = await ProductsService.productId(datas);
      setProduct(data.data[0]);
      const imgs = data.data[0].all_images.split(",");
      setListImg(imgs);
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
  const handleAddcard = () => {
    const money = Number(value) * Number(Product.price - Product.saleoff);
    console.log(money);
  };
  const handleBuyNow = () => {
    const money = Number(value) * Number(Product.price - Product.saleoff);
    console.log(money);
  };
  return (
    <div className="container">
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
                <button
                  className="btn btn-secondary"
                  disabled={
                    value > 0 && value <= Product.quantity ? false : true
                  }
                  onClick={handleBuyNow}
                >
                  Mua ngay
                </button>
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
