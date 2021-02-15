import React, {useContext, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'

const NavBar=() => {

  const {state, dispatch}=useContext(UserContext)
  const history=useHistory()

  useEffect(() => {
    var elems=document.querySelectorAll('#dropdowner')
    M.Dropdown.init(elems, {inDuration: 300, outDuration: 225, coverTrigger: false})
  })


  const renderList=() => {
    if (state) {
      return [
        <li><Link to="/explore"><i className="material-icons btn-icons">explore</i></Link></li>,
        <li><Link to="/create"><i className="material-icons btn-icons">add_circle</i></Link></li>,
        <li><a id="dropdowner" className="dropdown-trigger btn-icons" data-target="dropdown1"><i className="material-icons">account_circle</i></a></li>
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

        <Link to={state? "/":"/login"} className="brand-logo left logo">Social Mittens</Link>

        <ul id="nav-mobile" className="btn-group right">
          {renderList()}
        </ul>

        <ul id="dropdown1" className="dropdown-content">
          <li><Link to="/profile"><i className="material-icons">account_circle</i>My Account</Link></li>
          <li><Link to="/settings"><i className="material-icons">settings</i>Settings</Link></li>
          <li class="divider" tabindex="-1"></li>
          <li><a onClick={() => {
            localStorage.clear()
            dispatch({type: "LOGOUT"})
            history.push('/login')
          }}><i className="material-icons">cancel</i>Logout</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar