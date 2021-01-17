import './App.css'
import NavBar from './components/NavBar'
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import SignUP from './pages/SignUp'
import Login from './pages/Login'
import CreatePost from './pages/CreatePost'
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route path="/" exact component={Home}></Route>
      <Route path="/profile" component={Profile}></Route>
      <Route path="/signup" component={SignUP}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/create" component={CreatePost}></Route>
    </BrowserRouter>
  )
}

export default App
