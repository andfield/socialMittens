import React from 'react'
import {Link} from 'react-router-dom'

const SignUp=() => {

    return (
        <div className="mycard" >
            <div class="card auth-card input-field">
                <h4>Social Mittens</h4>
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Email" />
                <input type="text" placeholder="Password" />
                <button class="btn waves-effect waves-light #F2BAC9 pink lighten-3" >Sign Up
                </button>
                <h5>
                    <Link to="/signin">Do you already have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default SignUp