import ListGroup from 'react-bootstrap/ListGroup';
import { Link, NavLink, useParams } from 'react-router-dom';
import './shopnav.css';
import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import ShopFillter from './shopFillter';
// eslint-disable-next-line react/prop-types
const ShopNav = ({ cate }) => {
  const chanPath = (name) => {
    return name.replace(/ /g, '-').toLowerCase();
  };
  const path = useParams();
  // useEffect(() => {
  //   console.log(path);
  // }, [path]);

  return (
    <div className="shopNav">
      <Accordion defaultActiveKey={['0']} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h6>Danh mục</h6>
          </Accordion.Header>
          <Accordion.Body>
            <ListGroup as="ul">
              <ListGroup.Item as="li">
                <Link
                  to={'/shop'}
                  className={!path?.category ? 'fixa active' : 'fixa'}
                >
                  Tất cả
                </Link>
              </ListGroup.Item>
              <ListGroup.Item as="li">
                <Link
                  to={`/shop/sale/0`}
                  className={path?.category == 'sale' ? 'fixa active' : 'fixa'}
                >
                  Sale
                </Link>
              </ListGroup.Item>
              {cate &&
                // eslint-disable-next-line react/prop-types
                cate.map((item, index) => (
                  <ListGroup.Item as="li" key={index}>
                    <NavLink
                      to={`/shop/${chanPath(item.name)}/${item.id}`}
                      className="fixa"
                    >
                      {item.name}
                    </NavLink>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <h6>Giá</h6>
          </Accordion.Header>
          <Accordion.Body>
            <div>Đơn vị .000đ</div>
            <ShopFillter />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default ShopNav;
