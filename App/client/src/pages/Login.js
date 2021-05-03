import {React, useState, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../App'
import styled from "styled-components"

const Login=() => {

    //destructure the UserContext and get state and dispatch from it.
    const {state, dispatch}=useContext(UserContext)

    //initiallizing use History
    const history=useHistory()

    //Create States
    const [password, setPassword]=useState("")
    const [email, setEmail]=useState("")
    const [showPassword, setShow]=useState("password")

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

    //Function to show the password

    const show=() => {
        var checkBox=document.getElementById("checkbox")

        if (checkBox.checked==true) {
            setShow("text")
        }
        else {
            setShow("password")
        }
    }



    return (
        <Container>
            <SignUpContainer>
                <Title style={{padding: '30px'}}>Social Mittens</Title>
                <BtnContainer>
                    <Input style={{}} type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    <Input type={showPassword} placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    <p>
                        <label>
                            <input type="checkbox" id="checkbox" onClick={show} />
                            <span>Show password</span>
                        </label>
                    </p>

                    <button style={{marginTop: '20px'}} className="btn waves-effect waves-light #F2BAC9 pink lighten-3" onClick={() => PostData()}>Login
                </button>
                </BtnContainer>
                <p style={{color: 'grey', marginTop: '20px'}}>
                    <Link to="/signup">You dont have an account?</Link>
                </p>
            </SignUpContainer>
        </Container>
    )
}

export default Login

//Styled components.
const Container=styled.div`
  display: grid;
  height: 100vh;
`

const SignUpContainer=styled.div`
  padding-top: 10em;
  align-items: center;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  width: 100%;
  height: 100%;
`

const BtnContainer=styled.div`
  display: flex; 
  flex-direction: column;
`
const Title=styled.h4`

    font-size:2.5em;
    padding-bottom: 1.5em;

`

const Input=styled.input`
    &&&{
        text-indent: 5px;
    }
`