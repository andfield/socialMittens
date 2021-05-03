import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css'
import styled from "styled-components"

const SignUp=() => {

    //initiallizing use History
    const history=useHistory()

    //Create States
    const [name, setName]=useState("")
    const [password, setPassword]=useState("")
    const [email, setEmail]=useState("")
    const [showPassword, setShow]=useState("password")
    const [image, setImage]=useState(undefined)
    const [url, setImgURL]=useState(undefined)

    useEffect(() => {
        if (url) {
            UploadFields()
        }
    }, [url])

    //Function to upload profile picture
    const UploadImage=() => {
        //use formdata because the image is a file
        const data=new FormData()
        //append the image file on data
        data.append("file", image)
        //append the cloudinary project name
        data.append("upload_preset", 'Social-Mittens')
        //append the cloudinary db name
        data.append("cloud_name", "sidimages")
        //create an api request to cloudinary to upload the image data.
        fetch("	https://api.cloudinary.com/v1_1/sidimages/image/upload", {
            method: 'post',
            body: data
        })
            .then(res => res.json())
            //once the data is converted to json set the url state to url given by cloudinary
            .then(data => {
                console.log(data)
                setImgURL(data.url)
            })
            .catch(error => {
                console.log(error)
            })
    }

    //Function to upload all the fields except image
    const UploadFields=() => {

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
                email,
                pic: url
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

    //Function to post data using fetch
    const PostData=() => {

        //To make image upload optional
        if (image) {
            UploadImage()
        }
        else {
            UploadFields()
        }
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
                <Title>Social Mittens</Title>
                <BtnContainer>
                    <Input type="email" className="input" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    <Input type="text" className="input" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)} />
                    <Input type={showPassword} className="input" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    <div className="row file-field" style={{width: '101%'}}>
                        {
                            image? <FilePicker>Change selection</FilePicker>:<FilePicker >Select Profile Picture</FilePicker>
                        }
                        <Input id="upload" type="file" onChange={(event) => setImage(event.target.files[0])} />

                    </div>
                    <p style={{marginTop: "-10px"}}>
                        <label>
                            <Input type="checkbox" id="checkbox" onClick={show} />
                            <span style={{color: 'grey'}}>Show password</span>
                        </label>
                    </p>
                    <button style={{marginTop: '20px'}}
                        className="btn waves-effect waves-light #F2BAC9 pink lighten-3"
                        onClick={() => PostData()} >
                        Sign Up
              </button>

                </BtnContainer>
                <p style={{color: 'grey', marginTop: '20px'}}>
                    <Link to="/login">You already have an account?</Link>
                </p>
            </SignUpContainer>
        </Container>

    )
}

export default SignUp

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

const FilePicker=styled.p`

    margin-top: 20px;
    color: Grey;

`