import { useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import * as CategoriesService from "../services/CategoryService";
import Nav from "../layout/nav/Nav";
import { CategoriesContexts } from "../components/context/CategoriesContexts";
const Home = () => {
  const { addCate } = useContext(CategoriesContexts);
  useEffect(() => {
    const cate = async () => {
      const data = await CategoriesService.List(1);
      addCate(data);
    };
    cate();
  }, []);

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
