import { useEffect, useState } from 'react';
import ShopNav from '../../components/shopcom/ShopNav';
import ShopProducts from '../../components/shopcom/shopProducts';
import './shop.css';
import * as CategoriesService from '../../services/CategoryService';

const Shop = () => {
  const [cate, SetCate] = useState('');
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    const run = async () => {
      if (!localStorage.getItem('categories')) {
        const data = await CategoriesService.List(1);
        SetCate(data.data.data);
        const dataCates = JSON.stringify(data);
        localStorage.setItem('categories', dataCates);
        return;
      }

      if (localStorage.getItem('categories')) {
        const dataCates = JSON.parse(localStorage.getItem('categories'));
        SetCate(dataCates.data.data);
        return;
      }
    };
    run();
  }, []);

  return (
    <div className="shop_vip">
      <div className="container shop">
        <div className="row">
          <div className="col-md-3">
            <ShopNav cate={cate} />
          </div>
          <div className="col-md-9">
            <ShopProducts />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
