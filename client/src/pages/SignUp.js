import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'

const SignUp=() => {

    //initiallizing use History
    const history=useHistory()

    //Create States
    const [name, setName]=useState("")
    const [password, setPassword]=useState("")
    const [email, setEmail]=useState("")

    //Function to post data using fetch
    const PostData=() => {
        //Email Check
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            return M.toast({html: "Invalid Email", classes: "#d32f2f red lighten-2"})
        }
        fetch("/signup", {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({html: data.error, classes: "#d32f2f red lighten-2"})
                }
                else {
                    M.toast({html: data.message, classes: "#BAF2BB green lighten-2"})
                    //once the user has signed up take him to Login screen
                    history.push('/login')

                }
            }).catch(error => {
                console.log(error)
            })
    }


    return (
        <div className="mycard" >
            <div class="card auth-card input-field">
                <h4>Social Mittens</h4>
                <input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} />
                <input type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                <input type="text" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                <button class="btn waves-effect waves-light #F2BAC9 pink lighten-3" onClick={() => PostData()} >Sign Up
                </button>
                <h5>
                    <Link to="/signin">Do you already have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default SignUp