import { useState, useEffect, useRef } from 'react';
import blogService from './services/blogs';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import UserInfo from './components/UserInfo';
import LogoutButton from './components/LogoutButton';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import BlogList from './components/BlogList';
import { mapBackendErrors } from './utils/errorMessages';

const App = () => {
  const [user, setUser] = useState(null);
  const [notifications, setnotificatios] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');

  const pushNotification = (message, type = 'info') => {
    setnotificatios((prev) => [...prev, { message, type }]);
  };

  const removeNotification = () => {
    setnotificatios((prev) => prev.slice(1));
  };

  const blogFormRef = useRef();

  const handleNewBlog = async (e) => {
    e.preventDefault();


    try {
      const newBlog = {
        title: newBlogTitle,
        url: newBlogUrl,
        author: newBlogAuthor,
      };
      blogFormRef.current.toggleVisibility()

      const returnedBlog = await blogService.create(newBlog);


      pushNotification(
        `a new blog You're NOT gonna need it! by ${user.name} added`,
        'success',
      );
      setBlogs(blogs.concat(returnedBlog));
    } catch (error) {
      console.log('error.response', error.response);
      console.log('error', error);

      const backendMsg = error.response?.data?.error;
      const userMsg = mapBackendErrors(backendMsg);
      pushNotification(userMsg.join(' | '), 'error');
    }
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  return (
    <div>
      <Notification
        notifications={notifications}
        removeNotification={removeNotification}
      />
      {user === null ? (
        <LoginForm setUser={setUser} pushNotification={pushNotification} />
      ) : (
        <>
          <UserInfo user={user} />
          <LogoutButton setUser={setUser}/>
          <Togglable buttonLabel={'New Blog'} ref={blogFormRef} >
            <BlogForm
              handleNewBlog={handleNewBlog}
              newBlogTitle={newBlogTitle}
              setNewBlogTitle={setNewBlogTitle}
              newBlogUrl={newBlogUrl}
              setNewBlogUrl={setNewBlogUrl}
              newBlogAuthor={newBlogAuthor}
              setNewBlogAuthor={setNewBlogAuthor}
            />
          </Togglable>
          <BlogList blogs={blogs} />
        </>
      )}
    </div>
  );
};

export default App;
