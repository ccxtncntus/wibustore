import { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { NavLink } from "react-router-dom";
const ShopNav = ({ cate, setPC }) => {
  const handleChangeCate = (i) => {
    setPC(i);
  };
  const chanPath = (name) => {
    return name.replace(/ /g, "-").toLowerCase();
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
            <NavLink
              style={{
                color: "black",
                textDecoration: "none",
              }}
              to={`/shop/${chanPath(item.name)}/${item.id}`}
            >
              {" "}
              {item.name}
            </NavLink>
          </ListGroup.Item>
        ))}
      <ListGroup.Item
        style={{ border: "none", borderBottom: "0.5px solid gray" }}
        action
        onClick={() => handleChangeCate({ name: "sale" })}
      >
        Sale
      </ListGroup.Item>
    </ListGroup>
  );
};

export default ShopNav;
