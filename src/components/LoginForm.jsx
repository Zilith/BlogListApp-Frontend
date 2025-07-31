import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { mapBackendErrors } from '../utils/errorMessages'

const LoginForm = ({ setUser, pushNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      pushNotification(`Logged in with ${user.name}`, 'info')
    } catch ({ response }) {
      console.log('error', response)

      const backendMsg = response?.data?.error
      const userMsg = mapBackendErrors(backendMsg)
      pushNotification(userMsg.join(' | '), 'error')
    }
  }
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
  )
}

export default LoginForm
