const LogoutButton = ({ setUser }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  return <button onClick={handleLogout}>logout</button>;
};

export default LogoutButton;
