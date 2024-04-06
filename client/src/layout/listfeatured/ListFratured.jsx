import './listfrature.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Cart from '../../components/product/Cart';
import { useState, useContext, useEffect } from 'react';
import { CategoriesContexts } from '../../components/context/CategoriesContexts';
import { ProHomeContexts } from '../../components/context/ProductHomeContex';
import * as ProductService from '../../services/ProductService';
const ListFratured = () => {
  const { ListCategories } = useContext(CategoriesContexts);
  const { ProductsHome } = useContext(ProHomeContexts);
  const [ListCategoriess, setListCategories] = useState([]);
  const [ListProducts, setListProducts] = useState([]);
  // categories
  useEffect(() => {
    if (ListCategories) {
      setListCategories(
        ListCategories.status === 200 ? ListCategories.data.data : []
      );
    }
    return () => {};
  }, [ListCategories]);
  const [Selects, setSelects] = useState(null);
  // product
  useEffect(() => {
    const run = async () => {
      if (ProductsHome) {
        setListProducts(ProductsHome.data.data);
        return;
      }
    };
    run();
  }, [ProductsHome]);

  useEffect(() => {
    const run = async () => {
      if (Selects == 0) {
        if (ProductsHome) {
          setListProducts(ProductsHome.data.data);
          return;
        }
        const list = await ProductService.List(1, 'desc');
        list.status === 200 && setListProducts(list.data.data);
      } else if (Selects != 0 && Selects != null) {
        const lists = await ProductService.listProCategory(Selects, 1, 'desc');
        lists.status === 200 && setListProducts(lists.data.data);
      }
    };
    run();
  }, [Selects]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  return (
    <div className="listfrature">
      <div className="listfrature_title">
        <h5>ListFratured</h5>
        <ul>
          <li
            className={
              Selects === 0 || Selects == null
                ? 'listfrature_title_active'
                : undefined
            }
            onClick={() => setSelects(0)}
          >
            All
          </li>
          {ListCategoriess.length > 0
            ? ListCategoriess.map((item, index) => (
                <li
                  key={index}
                  className={
                    Selects === item.id ? 'listfrature_title_active' : undefined
                  }
                  onClick={() => setSelects(item.id)}
                >
                  {item.name}
                </li>
              ))
            : 'Loading...'}
        </ul>
      </div>
      <div className="listfrature_products">
        <Carousel responsive={responsive} showDots={ListProducts.length > 4}>
          {ListProducts.length > 0 ? (
            ListProducts.map((item, index) => <Cart key={index} item={item} />)
          ) : (
            <Cart />
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default ListFratured;
