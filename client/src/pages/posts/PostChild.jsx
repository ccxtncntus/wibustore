/* eslint-disable react/prop-types */
import './post.css';
import { HOST } from '../../configs/DataEnv';
import { NavLink } from 'react-router-dom';
const PostChild = ({ item }) => {
  return (
    <div className="postChild" style={{ height: '440px' }}>
      <img
        className="w-100 h-75 object-fit-cover"
        alt=""
        src={`${HOST}/uploads/${item.fimg}`}
      />
      <h5 className="mt-2">
        <NavLink className="fixa text-dark" to={`/posts/${item.id}`}>
          {item.title}
        </NavLink>
      </h5>
      <span> {item.description}</span>
    </div>
  );
};

export default PostChild;
