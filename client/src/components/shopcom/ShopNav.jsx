import ListGroup from 'react-bootstrap/ListGroup';
import { NavLink } from 'react-router-dom';
import './shopnav.css';
import { useState } from 'react';

const ShopNav = ({ cate }) => {
  const chanPath = (name) => {
    return name.replace(/ /g, '-').toLowerCase();
  };

  return (
    <div className="shopNav">
      <ListGroup>
        <h5>Categories</h5>
        <hr />
        {cate &&
          cate.map((item, index) => (
            <ListGroup.Item
              style={{ border: 'none' }}
              action
              key={index}
              className="shopNav_item"
            >
              <NavLink
                style={{
                  color: 'black',
                  textDecoration: 'none',
                }}
                to={`/shop/${chanPath(item.name)}/${item.id}`}
              >
                {' '}
                {item.name}
              </NavLink>
            </ListGroup.Item>
          ))}
      </ListGroup>
      <hr />
    </div>
  );
};

export default ShopNav;
