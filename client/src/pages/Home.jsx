import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { CategoriesContexts } from "../components/context/CategoriesContexts";
import { UContexts } from "../components/context/UserContext";
import { Contexts } from "../components/context/Contexts";
import { useCookies } from "react-cookie";
import Nav from "../layout/nav/Nav";
import NavTop from "../layout/nav/NavTop";
import * as CategoriesService from "../services/CategoryService";
import * as ShoppingCartsService from "../services/ShoppingCartsService";
import * as AccountService from "../services/AccountService";
import Footer from "../layout/footer/Footer";
const Home = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const { addCate } = useContext(CategoriesContexts);
  const { addUser, delUser } = useContext(UContexts);
  const { list } = useContext(Contexts);
  useEffect(() => {
    const cate = async () => {
      if (cookies && cookies.token) {
        const user = await AccountService.authen(cookies.token);
        if (user.status === 200) {
          addUser(user.data);
          const sss = await ShoppingCartsService.listOfUser(user.data.id);
          list(sss);
        }
      } else {
        delUser();
      }
      const data = await CategoriesService.List(1);
      addCate(data);
    };
    cate();
  }, [cookies]);

  return (
    <>
      <div>
        <NavTop />
      </div>
      <div>
        <Nav />
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};
export default Home;
