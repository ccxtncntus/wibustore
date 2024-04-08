import { useEffect, useState, useContext } from 'react';
import ShopNav from '../../components/shopcom/ShopNav';
import ShopProducts from '../../components/shopcom/shopProducts';
import './shop.css';
import { CategoriesContexts } from '../../components/context/CategoriesContexts';
const Shop = () => {
  const { ListCategories } = useContext(CategoriesContexts);
  const [cate, SetCate] = useState('');
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  useEffect(() => {
    if (ListCategories !== '') {
      SetCate(ListCategories.data.data);
    }
  }, [ListCategories]);
  return (
    <div className="mt-4 shop">
      <div className="row">
        <div className="col-md-2">
          <ShopNav cate={cate} />
        </div>
        <div className="col-md-10">
          <ShopProducts />
        </div>
      </div>
    </div>
  );
};

export default Shop;
