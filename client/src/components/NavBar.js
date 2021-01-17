import React from 'react'
import {Link} from 'react-router-dom'

const NavBar = () => {
    return(
        <nav>
        <div className="nav-wrapper #F4F39A yellow lighten-3">
          <Link to="/" className="brand-logo left">Social Mittens</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign up</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/create">Create Post</Link></li>
          </ul>
        </div>
      </nav>
    )
}

export default NavBar