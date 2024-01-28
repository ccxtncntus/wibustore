import Deal from "../../layout/deal/Deals";
import Featured from "../../layout/featured/Featured";
import Footer from "../../layout/footer/Footer";
import ListFratured from "../../layout/listfeatured/ListFratured";
import Policy from "../../layout/policy/Policy";
import Slider from "../../layout/slider/Slider";
import Social from "../../layout/social/Social";

const HomeContent = () => {
  return (
    <>
      <div>
        <Slider />
        <Featured />
        <Deal />
        <Policy />
        <ListFratured />
        <Social />
        <Footer />
      </div>
    </>
  );
};

export default HomeContent;
