import React, {useEffect, createContext, useReducer, useContext} from 'react'
import './App.css'
import NavBar from './components/NavBar'
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignUP from './pages/SignUp'
import Login from './pages/Login'
import CreatePost from './pages/CreatePost'
import OtherUserProfile from './pages/OtherUserProfile'
import FollowingPosts from './pages/followingPosts'
import {reducer, initialState} from './reducers/userReducer'


//Create a context [ type of global state ] and export it
export const UserContext=createContext()

//create a seperate component for app routes
const AppRouting=() => {

  //initiallize useHistory
  const history=useHistory()

  //destructure the UserContext and get state and dispatch from it.
  const {state, dispatch}=useContext(UserContext)

  //use effect to run when the component mounts for first time
  useEffect(() => {
    //get user from local storage
    const user=JSON.parse(localStorage.getItem("user"))



    //if user is   in local storage save him to context else to login
    if (user) {

      //create a action called USER to change the global context state.
      dispatch({type: "USER", payload: user})

      // history.push('/')
    }
    else {
      history.push('/login')
    }

  }, [])

  return (
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/profile" exact component={Profile}></Route>
      <Route path="/signup" component={SignUP}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/create" component={CreatePost}></Route>
      <Route path="/profile/:userId" component={OtherUserProfile}></Route>
      <Route path="/followingPosts"component={FollowingPosts}></Route>
    </Switch>
  )
}


function App() {

  //initallize userReducer so when the context state changes the components re-render
  const [state, dispatch]=useReducer(reducer, initialState)

  return (

    //Wrap everything with context so child components have access to state.
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <NavBar />
        <AppRouting />
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
