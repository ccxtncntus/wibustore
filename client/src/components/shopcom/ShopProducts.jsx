/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import './shopproductschild.css';
import * as ProductsServices from '../../services/ProductService';
import Card from '../../components/product/Cart';
import Pagination from '@mui/material/Pagination';
import { useParams, useNavigate } from 'react-router-dom';
import ProductLoading from '../loadingProduct/ProductLoading';
import { FillterProducts } from '../context/FillterContext';
const ShopProducts = () => {
  const { ListFillter, setListFillter } = useContext(FillterProducts);

  const navigator = useNavigate();
  const pathParams = useParams();
  const [ListProducts, setListProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [PageAll, setPageAll] = useState(1);
  const [Sort, setSort] = useState('desc');
  const [Loading, setLoading] = useState(false);
  const test = [1, 2, 3, 4];
  // const [filterNumber, setfilterNumber] = useState(false);
  const setDefault = () => {
    setPageAll(1);
    setListProducts([]);
  };
  const countPage = (count) => {
    return Math.ceil(count / 12);
  };

  useEffect(() => {
    const run = async () => {
      setListFillter([]);
      if (pathParams?.idcategory == 0) {
        // console.log('sale');
        setLoading(true);
        const ListSale = await ProductsServices.ListSale(page, Sort);
        // console.log(ListSale);
        if (ListSale.status == 200) {
          setPageAll(1);
          setListProducts(ListSale.data.data);
          // console.log(ListSale.data.data);
          setLoading(false);
          return;
        }
        setLoading(false);
      }
      if (Object.values(pathParams) != '') {
        if (pathParams.page) {
          // shop có page
          setLoading(true);
          const listAll = await ProductsServices.List(pathParams.page, Sort);
          if (listAll.status === 200) {
            setPageAll(countPage(listAll.count));
            setListProducts(listAll.data.data);
            // setLoading(false);
          } else {
            setDefault();
          }
          setLoading(false);
          return;
        }
        if (pathParams.idcategory && pathParams.pageCate) {
          // có danh mục và page
          setLoading(true);
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
          setLoading(true);
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
      setLoading(true);
      const listAll = await ProductsServices.List(page, Sort);
      if (listAll.status === 200) {
        setPageAll(countPage(listAll.count));
        setListProducts(listAll.data.data);

        // const data = returnMinPrice(listAll.data.data[0].price_and_saleoff);
        // console.log(data);
      }
      setLoading(false);
    };
    run();
  }, [pathParams, Sort, page]);
  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };
  useEffect(() => {
    const run = async () => {
      if (ListFillter.length > 0) {
        setLoading(true);
        await sleep(200);
        setPageAll(countPage(ListFillter.count));
        setListProducts(ListFillter);
        setLoading(false);
      }
    };
    run();
  }, [ListFillter]);

  // const test = async () => {};

  const handleChange = (event, value) => {
    console.log(value);
    navigator('/shop/page/' + value);
    setPage(value);
    // setcheckFilter(false);
  };
  const handleChangeSort = (e) => {
    setSort(e.target.value);
    // setcheckFilter(false);
  };
  return (
    <>
      <div className="w-100 d-flex justify-content-between">
        <Form.Select
          className="w-25"
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
            'Tạm thời hết sản phẩm'
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
