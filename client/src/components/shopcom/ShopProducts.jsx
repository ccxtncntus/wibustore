import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "./shopproductschild.css";
import * as ProductsServices from "../../services/ProductService";
import Card from "../../components/product/Cart";
import Pagination from "@mui/material/Pagination";
import { useParams } from "react-router-dom";
import ProductLoading from "../loadingProduct/ProductLoading";

const ShopProducts = () => {
  const pathParams = useParams();
  const [ListProducts, setListProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [PageAll, setPageAll] = useState(1);
  const [Sort, setSort] = useState("desc");
  const [Loading, setLoading] = useState(false);
  const test = [1, 2, 3, 4];
  const setDefault = () => {
    setPageAll(1);
    setListProducts([]);
  };
  const countPage = (count) => {
    return Math.ceil(count / 12);
  };

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      if (Object.values(pathParams) != "") {
        if (pathParams.page) {
          // shop có page
          const listAll = await ProductsServices.List(pathParams.page, Sort);
          if (listAll.status === 200) {
            setPageAll(countPage(listAll.count));
            setListProducts(listAll.data.data);
          } else {
            setDefault();
          }
          setLoading(false);

          return;
        }
        if (pathParams.idcategory && pathParams.pageCate) {
          // có danh mục và page
          const listOfCategoties = await ProductsServices.listProCategory(
            pathParams.idcategory,
            pathParams.pageCate,
            Sort
          );
          if (listOfCategoties.status === 200) {
            setPageAll(countPage(listOfCategoties.count));
            setListProducts(listOfCategoties.data.data);
          } else {
            setDefault();
          }
          setLoading(false);

          return;
        }
        if (pathParams.idcategory) {
          // có danh mục
          const listOfCategoties = await ProductsServices.listProCategory(
            pathParams.idcategory,
            1,
            Sort
          );
          if (listOfCategoties.status === 200) {
            setPageAll(countPage(listOfCategoties.count));
            setListProducts(listOfCategoties.data.data);
          } else {
            setDefault();
          }
          setLoading(false);

          return;
        }
      }
      // shop k page
      const listAll = await ProductsServices.List(page, Sort);
      if (listAll.status === 200) {
        setPageAll(countPage(listAll.count));
        setListProducts(listAll.data.data);
      }
      setLoading(false);
    };
    run();
  }, [pathParams, Sort, page]);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const handleChangeSort = (e) => {
    setSort(e.target.value);
  };

  return (
    <>
      <div className="w-25">
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => handleChangeSort(e)}
        >
          <option value="desc">Sorting default</option>
          <option value="asc">Price: low to high</option>
          <option value="desc">Price: high to low</option>
        </Form.Select>
      </div>
      <div className="ShopProducts_list row mt-2">
        {!Loading ? (
          ListProducts.length > 0 ? (
            ListProducts.map((item, index) => (
              <div className="ShopProducts_list_child col-md-3" key={index}>
                <Card item={item} />
              </div>
            ))
          ) : (
            "Tạm thời hết sản phẩm"
          )
        ) : (
          <>
            {test.map((item, index) => (
              <div className="ShopProducts_list_child col-md-3" key={index}>
                <ProductLoading />
              </div>
            ))}
          </>
        )}
      </div>
      <div className="Pagination">
        {PageAll > 1 && (
          <Pagination
            count={PageAll}
            page={page}
            onChange={handleChange}
            color="primary"
          />
        )}
      </div>
    </>
  );
};

export default ShopProducts;
