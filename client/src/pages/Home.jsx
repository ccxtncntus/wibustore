import { useEffect, useState } from "react";
import { AutoComplete } from "antd";
import "./home.css";
import * as ProductService from "../services/ProductService";
const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});
import { HOST } from "../configs/DataEnv";
const Home = () => {
  const [options, setOptions] = useState([]);
  const getPanelValue = (searchText) =>
    !searchText
      ? []
      : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(false);
  const onSelect = async (data) => {
    setloading(true);
    setproducts([]);
    const datas = await ProductService.onceProduct(data.trim());
    if (datas.length === 0) {
      console.log("Không có sản phẩm phù hợp");
    } else {
      datas.map((item) => {
        const words = item.all_images.split(",");
        setproducts((prevProducts) => [
          ...prevProducts,
          { ...item, all_images: words },
        ]);
      });
    }
    setloading(false);
  };
  useEffect(() => {
    if (products.length > 0) {
      console.log(products);
    }
  }, [products]);
  return (
    <>
      <div
        style={{
          textAlign: "center",
          padding: 20,
        }}
      >
        <h5>Sreach</h5>
        <AutoComplete
          options={options}
          style={{
            width: 200,
          }}
          onSelect={onSelect}
          onSearch={(text) => setOptions(getPanelValue(text))}
          placeholder="input here"
        />
        <div>Product</div>
      </div>
      <div className="home_product">
        {!loading ? (
          <>
            {products.length > 0
              ? products.map((item, index) => (
                  <div className="home_pro_child" key={index}>
                    {item.all_images.length === 1 ? (
                      <img src={HOST + "/uploads/" + item.all_images} alt="" />
                    ) : (
                      <img
                        src={HOST + "/uploads/" + item.all_images[0]}
                        alt=""
                      />
                    )}
                    <div>
                      {item.name} <span>{item.status}</span>
                    </div>
                    <div>
                      {item.price - item.saleoff} đ {"   "}
                      <s>{item.price} đ</s>
                    </div>
                  </div>
                ))
              : "Không có sản phẩm"}
          </>
        ) : (
          "loading"
        )}
      </div>
    </>
  );
};
export default Home;
