import Slider from "../../layout/slider/Slider";

const HomeContent = () => {
  // <h3>First slide label</h3>
  // <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
  let imgs = [
    "https://i.pinimg.com/originals/e9/fe/0e/e9fe0e16a126714f09d2e1cfae7379ce.jpg",
    "https://i.pinimg.com/originals/7a/a1/31/7aa131f899b2361a43503102af6e670e.jpg",
    "https://i.pinimg.com/originals/f6/72/f8/f672f84a2a8149fdfb9f162c7c0d1902.jpg",
  ];
  return (
    <div>
      <Slider imgs={imgs} />
    </div>
  );
};

export default HomeContent;
