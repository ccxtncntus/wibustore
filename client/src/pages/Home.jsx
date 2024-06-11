/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { UContexts } from '../components/context/UserContext';
import { Contexts } from '../components/context/Contexts';
import { useCookies } from 'react-cookie';
import Nav from '../layout/nav/Nav';
import NavTop from '../layout/nav/NavTop';
import * as CategoriesService from '../services/CategoryService';
import * as ShoppingCartsService from '../services/ShoppingCartsService';
import * as AccountService from '../services/AccountService';
import Footer from '../layout/footer/Footer';
const Home = () => {
  const [cookies, setCookie] = useCookies(['token']);
  const { addUser, delUser } = useContext(UContexts);
  const { list } = useContext(Contexts);
  useEffect(() => {
    const cate = async () => {
      if (cookies && cookies.token) {
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
      if (!localStorage.getItem('categories')) {
        const data = await CategoriesService.List(1);
        const dataCates = JSON.stringify(data);
        localStorage.setItem('categories', dataCates);
      }
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
