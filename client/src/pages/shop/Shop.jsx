import { useEffect, useState, useContext } from "react";
import ShopNav from "../../components/shopcom/ShopNav";
import ShopProducts from "../../components/shopcom/shopProducts";
import "./shop.css";
import { CategoriesContexts } from "../../components/context/CategoriesContexts";
const Shop = () => {
  const { ListCategories } = useContext(CategoriesContexts);
  const [cate, SetCate] = useState("");
  useEffect(() => {
    if (ListCategories !== "") {
      SetCate(ListCategories.data.data);
    }
  }, [ListCategories]);
  return (
    <div className="container mt-4 shop">
      <div className="row">
        <div className="col-md-3">
          <ShopNav cate={cate} />
        </div>
        <div className="col-md-9">
          <ShopProducts />
        </div>
      </div>
    </div>
  );
};

export default Shop;
