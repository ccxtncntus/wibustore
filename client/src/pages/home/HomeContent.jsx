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
        <Featured />
        <Deal />
        <div>
          <ListFratured />
        </div>
      </div>
    </>
  );
};

export default HomeContent;
