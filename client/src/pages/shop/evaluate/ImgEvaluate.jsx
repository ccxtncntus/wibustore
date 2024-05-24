/* eslint-disable react/prop-types */
import Image from 'react-bootstrap/Image';

const ImgEvaluate = ({ imgsblob, setimgsblob, delfile }) => {
  const handleDel = (i) => {
    const newss = imgsblob.filter((item) => item != i);
    const index = imgsblob.findIndex((item) => item == i);
    delfile(index);
    setimgsblob(newss);
  };
  return (
    <>
      <div>
        {imgsblob.length > 0 &&
          imgsblob.map((item, index) => (
            <label
              key={index}
              style={{ height: '120px', position: 'relative' }}
              className="d-inline-block"
            >
              <Image style={{ height: '100%', margin: '2px' }} src={item} />
              <i
                onClick={() => handleDel(item)}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  fontSize: '1.1rem',
                }}
                className="fa-solid fa-circle-xmark"
              />
            </label>
          ))}
      </div>
    </>
  );
};

export default ImgEvaluate;
