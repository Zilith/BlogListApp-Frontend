import blogService from '../services/blogs';

const BlogForm = ({
  newBlogTitle,
  setNewBlogTitle,
  newBlogUrl,
  setNewBlogUrl,
}) => {
  const handleNewBlog = async () => {
    try {
      const newBlog = {
        title: newBlogTitle,
        url: newBlogUrl,
      };
      const response = await blogService.create(newBlog);
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h2>Add New Blog</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          title
          <input
            type="text"
            value={newBlogTitle}
            name="newBlogTitle"
            onChange={(target) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={newBlogUrl}
            name="newBlogUrl"
            onChange={(target) => setNewBlogUrl(target.value)}
          />
        </div>
        <button type="submit">Add Blog</button>
      </form>
    </>
  );
};

export default BlogForm;
