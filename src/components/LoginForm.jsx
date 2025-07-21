import loginService from '../services/login';
import blogService from '../services/blogs';

const LoginForm = ({
  setUser,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      console.log('logged in with', username, password);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          password
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
