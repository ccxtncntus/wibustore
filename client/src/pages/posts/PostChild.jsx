import './post.css';
const PostChild = () => {
  return (
    <div className="postChild" style={{ height: '440px' }}>
      <img
        className="w-100 h-75 object-fit-cover"
        alt=""
        src="https://i.pinimg.com/736x/1b/54/fd/1b54fdb78829776f9ff5d9229c63c03c.jpg"
      />
      <h5 className="mt-2">
        <a className="fixa text-light" href="/blog">
          Titile
        </a>
      </h5>
      <span>description</span>
    </div>
  );
};

export default PostChild;
