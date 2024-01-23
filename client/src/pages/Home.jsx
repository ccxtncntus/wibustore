import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../layout/nav/Nav";
import * as CategoriesService from "../services/CategoryService";
import * as ShoppingCartsService from "../services/ShoppingCartsService";
import * as AccountService from "../services/AccountService";
import { CategoriesContexts } from "../components/context/CategoriesContexts";
import { Contexts } from "../components/context/Contexts";
import { useCookies } from "react-cookie";
const Home = () => {
  const [cookies, setCookie] = useCookies(["token"]);
  const { addCate } = useContext(CategoriesContexts);
  const { list } = useContext(Contexts);
  useEffect(() => {
    const cate = async () => {
      if (cookies && cookies.token) {
        const user = await AccountService.authen(cookies.token);
        if (user.status === 200) {
          const sss = await ShoppingCartsService.listOfUser(user.data.id);
          console.log(sss);
          list(sss);
        }
      }
      const data = await CategoriesService.List(1);
      addCate(data);
    };
    cate();
  }, [cookies]);

  return (
    <>
      <div>
        <Nav />
      </div>
      <div>
        <Outlet />
      </div>
      <div>{/* footer */}</div>
    </>
  );
};
export default Home;
