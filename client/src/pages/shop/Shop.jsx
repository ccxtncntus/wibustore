import { useEffect, useState, useContext } from "react";
import ShopNav from "../../components/shopcom/ShopNav";
import ShopProducts from "../../components/shopcom/shopProducts";
import * as CategoriesServices from "../../services/CategoryService";
import * as ProductsServices from "../../services/ProductService";
import { useParams } from "react-router-dom";
import { CategoriesContexts } from "../../components/context/CategoriesContexts";
const Shop = () => {
  const { ListCategories } = useContext(CategoriesContexts);
  const paths = useParams();
  const [cate, SetCate] = useState("");
  const [productCate, setproductCate] = useState("");
  const [Products, setProducts] = useState("");
  const setPC = (i) => {
    setproductCate(i);
  };
  useEffect(() => {
    if (ListCategories !== "") {
      SetCate(ListCategories.data.data);
    }
  }, [ListCategories]);

  useEffect(() => {
    const listCate = async () => {
      if (Object.values(paths).length > 0) {
        const list = await ProductsServices.listProCategory(
          paths.idcategory,
          paths.pageCate ? paths.pageCate : 1
        );
        setProducts(list);
        if (paths.page) {
          const listAll = await ProductsServices.List(
            paths.page ? paths.page : 1
          );
          listAll.status === 200 ? setProducts(listAll) : setProducts("");
        }
      } else {
        const listAll = await ProductsServices.List(1);
        setProducts(listAll);
      }
    };
    listCate();
  }, [paths]);
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
