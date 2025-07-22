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
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      {user === null ? (
        <LoginForm
          setUser={setUser}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <>
          <p>{user.name} logged in</p>
          <BlogForm
            newBlogTitle={newBlogTitle}
            newBlogUrl={newBlogUrl}
            setNewBlogTitle={setNewBlogTitle}
            setNewBlogUrl={setNewBlogUrl}
          />
        </>
      )}
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
