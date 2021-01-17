import React from 'react'


const CreatePost=() => {
    return (
        // Main Div for the form
        <div className="card input-filed" style={{
            margin: "30px auto",
            maxWidth: "500px",
            padding: "20px",
            textAlign: 'center'
        }}>

            <input type="text" placeholder="title" />
            <input type="text" placeholder="Body" />
            {/* File input */}
            <div className="file-field input-field">
                <div className="btn white">
                    <i class="material-icons"  style={{color: 'black'}} >attach_file</i>
                    <input type="file" />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button class="btn waves-effect waves-light #F2BAC9 pink lighten-3" >Submit Post
                </button>
        </div>
    )

}

export default CreatePost