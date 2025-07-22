const BlogForm = ({
  handleNewBlog,
  newBlogTitle,
  setNewBlogTitle,
  newBlogUrl,
  setNewBlogUrl,
  newBlogAuthor,
  setNewBlogAuthor,
}) => (
  <>
    <h2>Add New Blog</h2>
    <form onSubmit={handleNewBlog}>
      <div>
        title
        <input
          type="text"
          value={newBlogTitle}
          name="newBlogTitle"
          onChange={({ target }) => setNewBlogTitle(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={newBlogUrl}
          name="newBlogUrl"
          onChange={({ target }) => setNewBlogUrl(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={newBlogAuthor}
          name="newBlogAuthor"
          onChange={({ target }) => setNewBlogAuthor(target.value)}
        />
      </div>
      <button type="submit">Add Blog</button>
    </form>
  </>
);

export default BlogForm;
