import { Outlet } from "react-router-dom";
import Nav from "../layout/nav/Nav";
const Home = () => {
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
