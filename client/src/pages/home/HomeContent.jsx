import Slider from "../../layout/slider/Slider";

const HomeContent = () => {
  // <h3>First slide label</h3>
  // <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
  let imgs = [
    "https://i.pinimg.com/originals/b5/2d/5a/b52d5a95a538c4f8a1a568fcabd99310.jpg",
    "https://i.pinimg.com/originals/73/d6/f2/73d6f2ef18f085de49cdcf8e4fe0a4b9.jpg",
    "https://i.pinimg.com/originals/43/10/02/4310026929ab146ac1c6884f9546987f.jpg",
  ];
  return (
    <div>
      <Slider imgs={imgs} />
    </div>
  );
};

export default HomeContent;
