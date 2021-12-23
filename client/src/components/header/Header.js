import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import { Link } from 'react-router-dom'
import './styles.css'
import { useContext, useState } from 'react'
import { GlobalState } from '../../GlobalState'
import axios from 'axios'

export default function Header () {
  const state = useContext(GlobalState)
  const [isLogged] = state.UserAPI.isLogged
  const [isAdmin] = state.UserAPI.isAdmin
  const [cart] = state.UserAPI.cart
  const [menu, setMenu] = useState(false)

  const logoutUser = async () => {
    await axios.get('/user/logout')
    localStorage.removeItem('firstLogin')
    window.location.href = '/'
  }
  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to='/create_product'>Create Products</Link>
        </li>
        <li>
          <Link to='/category'>Categories</Link>
        </li>
      </>
    )
  }

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to='/history'>Histrory</Link>
        </li>
        <li>
          <Link to='/' onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    )
  }

  const toggleMenu = () => setMenu(!menu)

  const styleMenu = {
    left: menu ? 0 : '-100%'
  }
  return (
    <header className='header'>
      <div className='menu' onClick={() => toggleMenu(!menu)}>
        <img src={Menu} alt='menu' width='30' />
      </div>
      <div className='logo'>
        <h1>
          <Link to='/'>{isAdmin ? 'Admin' : 'DeVat Shop'}</Link>
        </h1>
      </div>
      <ul style={styleMenu}>
        <li>
          <Link to='/'>{isAdmin ? 'Products' : 'Shop'}</Link>
        </li>

        {isAdmin && adminRouter()}

        {isLogged ? (
          loggedRouter()
        ) : (
          <>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
          </>
        )}

        <li onClick={() => toggleMenu(!menu)}>
          <img src={Close} alt='' width='30' className='menu' />
        </li>
      </ul>
      {isAdmin ? (
        ''
      ) : (
        <div className='cart-icon'>
          <span>{cart.length}</span>
          <Link to='/cart'>
            <img src={Cart} alt='' width='30' />
          </Link>
        </div>
      )}
    </header>
  )
}
