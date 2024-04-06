import { useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { CategoriesContexts } from '../components/context/CategoriesContexts';
import { ProHomeContexts } from '../components/context/ProductHomeContex';
import { UContexts } from '../components/context/UserContext';
import { Contexts } from '../components/context/Contexts';
import { useCookies } from 'react-cookie';
import Nav from '../layout/nav/Nav';
import NavTop from '../layout/nav/NavTop';
import * as CategoriesService from '../services/CategoryService';
import * as ShoppingCartsService from '../services/ShoppingCartsService';
import * as ProductService from '../services/ProductService';
import * as AccountService from '../services/AccountService';
import Footer from '../layout/footer/Footer';
const Home = () => {
  const [cookies, setCookie] = useCookies(['token']);
  const { addCate } = useContext(CategoriesContexts);
  const { addUser, delUser } = useContext(UContexts);
  const { list } = useContext(Contexts);
  const { addList } = useContext(ProHomeContexts);
  useEffect(() => {
    const cate = async () => {
      if (cookies && cookies.token) {
        // const user = await AccountService.authen(cookies.token);
        // if (user.status === 200) {
        //   console.log(user);
        //   addUser(user.data);
        //   const sss = await ShoppingCartsService.listOfUser(user.data.id);
        //   list(sss);
        // }
        AccountService.authen(cookies.token)
          .then((i) => {
            addUser(i.data);
            return ShoppingCartsService.listOfUser(i.data.id);
          })
          .then((i) => {
            list(i);
          })
          .catch((i) => {
            console.log(i);
          });
      } else {
        delUser();
      }
    };
    cate();
  }, [cookies]);
  useEffect(() => {
    const run = async () => {
      const data = await CategoriesService.List(1);
      const listProductHome = await ProductService.List(1, 'desc');
      addList(listProductHome);
      addCate(data);
    };
    run();
  }, []);

  return (
    <>
      <NavTop />
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};
export default Home;
