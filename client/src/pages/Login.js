import {React, useState, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../App'

const Login=() => {

    //destructure the UserContext and get state and dispatch from it.
    const{state, dispatch} = useContext(UserContext)

    //initiallizing use History
    const history=useHistory()

    //Create States
    const [password, setPassword]=useState("")
    const [email, setEmail]=useState("")

    //Function to post data using fetch
    const PostData=() => {
        //Email Check
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            return M.toast({html: "Invalid Email", classes: "#d32f2f red lighten-2"})
        }
        fetch("/signin", {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.error) {
                    M.toast({html: data.error, classes: "#d32f2f red lighten-2"})
                }
                else {
                    console.log(data)
                    //save the token passed by server to local storage
                    localStorage.setItem("jwt", data.token)

                    //Save the user data to local storage
                    localStorage.setItem("user", JSON.stringify(data.user))

                    //create a action called USER to change the global context state.
                    dispatch({type: "USER", payload: data.user})

                    M.toast({html: "Signed in Sucessfully", classes: "#BAF2BB green lighten-2"})
                    //once the user has signed up take him to Login screen
                    history.push('/')

                }
            }).catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="mycard" >
            <div class="card auth-card input-field">
                <h4>Social Mittens</h4>
                <input type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />

                <button class="btn waves-effect waves-light #F2BAC9 pink lighten-3" onClick={() => PostData()}>Login
                </button>
                <h5>
                    <Link to="/signin">You dont have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Login