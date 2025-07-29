import { useState } from 'react';

const Blog = ({ blog, handleAddLike, handleDelete }) => {
  const [viewDetails, setViewDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setViewDetails(!viewDetails);
  };

  const hiddenToggle = { display: viewDetails ? '' : 'none' };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}
        <button onClick={toggleVisibility}>View</button>
        <div style={hiddenToggle}>
          <div>{blog.url}</div>
          <div>
            {blog.likes}
            <button onClick={() => handleAddLike(blog.id, blog.likes)}>
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          <button onClick={() => handleDelete(blog.id)}>delete</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
