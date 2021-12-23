import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './styles.css'

export default function Login () {
  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const onChangeInput = e => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const loginSubmit = async e => {
    e.preventDefault()
    if (user.password.length < 6) {
      alert('No valid')
      return
    }
    try {
      await axios.post('/user/login', { ...user })
      localStorage.setItem('firstLogin', true)
      window.location.href = '/'
    } catch (error) {
      alert(error.response.data.msg)
    }
  }

  return (
    <div className='login-page'>
      <form onSubmit={loginSubmit}>
        <h2>Login</h2>
        <input
          type='email'
          name='email'
          required
          placeholder='Correo eletronico'
          value={user.email}
          onChange={onChangeInput}
          autoComplete='on'
        />
        <input
          type='password'
          name='password'
          required
          placeholder='Password'
          value={user.password}
          onChange={onChangeInput}
          autoComplete='on'
        />
        <div className='row'>
          <button type='submit'>Login</button>
          <Link to='/register'>Register</Link>
        </div>
      </form>
    </div>
  )
}
