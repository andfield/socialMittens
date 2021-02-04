import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'

const NavBar=() => {

  const {state, dispatch}=useContext(UserContext)
  const history = useHistory()

  const renderList=() => {
    if (state) {
      return [
        <li><Link to="/followingPosts">Gallery</Link></li>,
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Create Post</Link></li>,
        <li>
          <button className="btn waves-effect waves-light #F2BAC9 pink lighten-3"
            onClick={() => {
              localStorage.clear()
              dispatch({type: "LOGOUT"})
              history.push('/login')
            }}
            >
            Logout
            </button>
        </li>
      ]
    }
    else {
      return [
        <li><Link to="/login">Login</Link></li>,
        <li><Link to="/signup">Sign up</Link></li>
      ]
    }
  }

  return (
    <nav>
      <div className="nav-wrapper #F4F39A yellow lighten-3">
        <div>
        <a data-target="side-nav" className="sidenav-trigger left"><i class="material-icons">menu</i></a>
        <Link to={state? "/":"/login"} className="brand-logo left">Social Mittens</Link>
        </div>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {renderList()}
        </ul>
        <ul id="side-nav" className="sidenav">
          {renderList()}
        </ul>
      </div>
    </nav>
  )
}

export default NavBar