import Blog from '../components/Blog';
import blogService from '../services/blogs';

const BlogList = ({ blogs, setBlogs }) => {
  const handleAddLike = async (id, likes) => {
    const newLikes = { likes: likes + 1 };
    const returnedBlog = await blogService.addLikes(id, newLikes);
    console.log('returnedBlog', returnedBlog);
    setBlogs(
      blogs.map((blog) => (blog.id === returnedBlog.id ? returnedBlog : blog)),
    );
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you SURE vro? '-.-")) {
      const result = await blogService.deleteBlog(id);
      console.log(result);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  return (
    <>
      <h2>blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleAddLike={handleAddLike}
            handleDelete={handleDelete}
          />
        ))}
    </>
  );
};

export default BlogList;
