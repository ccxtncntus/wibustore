import Blog from '../../layout/blog/Blog';
import Deal from '../../layout/deal/Deals';
import Featured from '../../layout/featured/Featured';
import ListFratured from '../../layout/listfeatured/ListFratured';
import Policy from '../../layout/policy/Policy';
import Slider from '../../layout/slider/Slider';
const HomeContent = () => {
  return (
    <>
      <div>
        <div>
          <Slider />
        </div>
        <Policy />
        <ListFratured />
        <Featured />
        <Deal />
        <div></div>
        <Blog />
      </div>
    </>
  );
};

export default HomeContent;
