import { useState } from 'react'
import loginService from '../services/login'
import noteService from '../services/notes'

const LoginForm = ({setUser}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username,
        password,
      })
      console.log(user)
      setUser(user)
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (err) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div className="usernmae">
        <label htmlFor="username">
          Username:
          <input
            type="text"
            value={username}
            onChange={({ target: e }) => setUsername(e.value)}
            name="username"
            id="username"
          />
        </label>
      </div>
      <div className="password">
        <label htmlFor="password">
          Password: 
          <input
            type="password"
            value={password}
            onChange={({ target: e }) => setPassword(e.value)}
            name="password"
            id="password"
          />
        </label>
      </div>
      <button>Login</button>
    </form>
  )
}

export default LoginForm
