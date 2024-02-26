import Deal from "../../layout/deal/Deals";
import Featured from "../../layout/featured/Featured";
import ListFratured from "../../layout/listfeatured/ListFratured";
import Policy from "../../layout/policy/Policy";
import Slider from "../../layout/slider/Slider";
import Social from "../../layout/social/Social";
const HomeContent = () => {
  return (
    <>
      <div>
        <div>
          <Slider />
        </div>
        <Featured />
        <Deal />
        <Policy />
        <div>
          <ListFratured />
        </div>
        <Social />
      </div>
    </>
  );
};

export default HomeContent;
