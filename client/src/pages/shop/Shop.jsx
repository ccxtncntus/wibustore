import { useEffect, useState } from "react";
import ShopNav from "../../components/shopcom/ShopNav";
import ShopProducts from "../../components/shopcom/shopProducts";
import * as CategoriesServices from "../../services/CategoryService";
import * as ProductsServices from "../../services/ProductService";
const Shop = () => {
  const [cate, SetCate] = useState("");
  const [productCate, setproductCate] = useState("");
  const setPC = (i) => {
    setproductCate(i);
  };
  useEffect(() => {
    const listCate = async () => {
      const list = await CategoriesServices.List(1);
      SetCate(list.data.data);
    };
    listCate();
  }, []);
  const [Products, setProducts] = useState("");

  useEffect(() => {
    const products = async () => {
      if (productCate != "") {
        // console.log(productCate.id);
        const list = await ProductsServices.listProCategory(productCate.id, 1);
        setProducts(list);
      }
    };
    products();
  }, [productCate]);
  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-3">
          <ShopNav cate={cate} setPC={setPC} />
        </div>
        <div className="col-md-9">
          <ShopProducts Products={Products} />
        </div>
      </div>
    </div>
  );
};

export default Shop;
