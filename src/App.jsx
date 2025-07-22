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
