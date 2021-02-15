import {React, useState, useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'

const CreatePost=() => {

    //create history constant to route around
    const history=useHistory()

    //Create title state
    const [title, setTitle]=useState("")
    const [body, setBody]=useState("")
    //this is where the file will be stored
    const [image, setImage]=useState("")
    //This will update onces cloudinary returns the url.
    const [imgURL, setImgURL]=useState("")

    //Use effect when the url is changed to make a createpost request on server
    useEffect(() => {

        //If the imgURL exists then create req on server to save
        if (imgURL) {
            //Save post on server
            fetch("/createpost", {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title,
                    body,
                    imgURL
                })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.error) {
                        M.toast({html: data.error, classes: "#d32f2f red lighten-2"})
                    }
                    else {
                        M.toast({html: "Post uploaded sucessfully", classes: "#BAF2BB green lighten-2"})
                        history.push('/')
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    } , [imgURL])

    //Function to post details of image file to Cloudinary
    const postDetails=() => {
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

        return (
            // Main Div for the form
            <div className="card input-filed" style={{
                margin: "30px auto",
                maxWidth: "500px",
                padding: "20px",
                textAlign: 'center'
            }}>

                <input type="text" placeholder="title" value={title} onChange={(event) => setTitle(event.target.value)} />
                <input type="text" placeholder="Body" value={body} onChange={(event) => setBody(event.target.value)} />
                {/* File input */}
                <div className="file-field input-field">
                    <div className="btn white">
                        <i class="material-icons" style={{color: 'black'}} >attach_file</i>
                        <input type="file" onChange={(event) => setImage(event.target.files[0])} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path validate" type="text" />
                    </div>
                </div>
                <button class="btn waves-effect waves-light #F2BAC9 pink lighten-3" onClick={() => postDetails()} >Submit Post
                </button>
            </div>
        )
}
    export default CreatePost