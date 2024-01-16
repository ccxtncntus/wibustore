import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
const ShopNav = ({ cate, setPC }) => {
  const handleChangeCate = (i) => {
    setPC(i);
  };
  return (
    <ListGroup>
      <h4> Categories</h4>
      {cate &&
        cate.map((item, index) => (
          <ListGroup.Item
            style={{ border: "none", borderBottom: "0.5px solid gray" }}
            action
            key={index}
            onClick={() => handleChangeCate(item)}
          >
            {item.name}
          </ListGroup.Item>
        ))}
      <ListGroup.Item
        style={{ border: "none", borderBottom: "0.5px solid gray" }}
        action
        onClick={() => handleChangeCate("sale")}
      >
        Sale
      </ListGroup.Item>
    </ListGroup>
  );
};

export default ShopNav;
