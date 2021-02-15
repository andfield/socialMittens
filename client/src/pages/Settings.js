import React, {useEffect, useState, useContext} from 'react'
import {UserContext} from '../App'

const Settings=() => {


    //use context to get access to user state
    const {state, dispatch}=useContext(UserContext)

    //States
    const [name, setName]=useState("")
    const [email, setEmail]=useState("")
    const [image, setImage]=useState(undefined)
    const [url, setImgURL]=useState(undefined)

    //Function to handle MenuButton Click

    useEffect(() => {
        if (image) {
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
                    setImgURL(data.url)
                    //push the new image to localstorage
                    localStorage.setItem("user", JSON.stringify({...state, profilePicture: data.url}))

                    //update the state.
                    dispatch({type: 'UPDATEPICTURE', payload: data.url})

                    //Reload the page to update state.
                    window.location.reload()
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [image])

    //Function to update Photo
    const updatePhoto=(file) => {
        setImage(file)
    }

    return (
        <div className="container">
            <div className="row" style={{marginTop: '40px'}}>
                <div className="col s12 m4 13" style={{backgroundColor: 'gray'}}>
                    <div className="collection">
                        <a href="#!" className="collection-item">User Setting</a>
                        <a href="#!" className="collection-item">Privacy Setting</a>
                        <a href="#!" className="collection-item">Delete account</a>
                        <a href="#!" className="collection-item">Report a problem</a>
                    </div>
                </div>
                <div className="col s12 m8 19">
                    <div className="container">
                        <div className="row">

                            <div className="col s12">
                                <div className="card-panel">
                                    {/* Profile Details and picture */}
                                    <div className=" row valign-wrapper" style={{borderBottom: '1px solid'}}>
                                        <div className="col s2" style={{width: '80%', marginBottom: '10px'}}>
                                            <img src={state? state.profilePicture:'loading'} style={{width: "80px", height: "80px", borderRadius: "80px"}} className="circle responsive-img" />
                                        </div>
                                        <div className="col s10" style={{width: '200%', marginBottom: '10px'}}>
                                            <h4 style={{fontSize: '30px'}}>
                                                {state? state.name:"loading user"}
                                            </h4>
                                            {/* File input */}
                                            <div className="row file-field" style={{width: '101%'}}>
                                                <div className="col s12 waves-effect waves-red btn-flat">
                                                    {
                                                        image? <span>File Selected</span>:<span>Select Profile Picture</span>
                                                    }
                                                    <input id="upload" type="file" onChange={(event) => updatePhoto(event.target.files[0])} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Name Change */}
                                    <div className="row valign-wrapper" style={{borderBottom: '1px solid'}}>
                                        <div className="col s2">
                                            <h6 style={{fontWeight: 'bold'}} >Name</h6>
                                        </div>
                                        <div className="col input-field s10">
                                            <input type="text" placeholder={state? state.name:'Loading Name'} value={name} onChange={(event) => setName(event.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings