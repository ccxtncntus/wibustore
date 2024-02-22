import { useEffect } from "react";
import Deal from "../../layout/deal/Deals";
import Featured from "../../layout/featured/Featured";
import ListFratured from "../../layout/listfeatured/ListFratured";
import Policy from "../../layout/policy/Policy";
import Slider from "../../layout/slider/Slider";
import Social from "../../layout/social/Social";
import AOS from "aos";
import "aos/dist/aos.css";
const HomeContent = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  }, []);
  return (
    <>
      <div>
        <div data-aos="fade-up">
          <Slider />
        </div>
        <Featured />
        <Deal />
        <Policy />
        <div data-aos="fade-up">
          <ListFratured />
        </div>
        <Social />
      </div>
    </>
  );
};

export default HomeContent;
