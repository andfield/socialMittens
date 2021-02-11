import React, {useEffect, useState, useContext} from 'react'
import {UserContext} from '../App'

const Profile=() => {

    //use context to get access to user state
    const {state, dispatch}=useContext(UserContext)

    //state to save all user posts
    const [myposts, setMyposts]=useState([])

    //on render get all user posts
    useEffect(() => {

        //fetch request to server to get all user posts
        fetch('/mypost', {
            headers: {
                "Authorization": "Bearer "+localStorage.getItem('jwt')
            }
        })
            .then(res => res.json())
            .then(data => {
                setMyposts(data.posts)
            })

    }, [])

    return (
        // Page Div
        <div style={{maxWidth: '550px', margin: '0px auto'}}>

            {/* Image and details */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                margin: '18px 0px',
                borderBottom: '2px solid grey'
            }}>
                {/* Image div */}
                <div className="img-hover" >
                    <img style={{width: "160px", height: "160px", borderRadius: "80px"}}
                        src={state? state.profilePicture:"Loading..."}
                        className="image"
                    />
                    {/* Image Update button */}
                    <div className="hover-btn" style={{marginLeft: '20px'}}>
                        <a
                            onClick={null} >
                            <i className="material-icons">add_a_photo</i>
                        </a>
                    </div>

                </div>

                {/* User details */}
                <div>
                    <h4>
                        {state? state.name:"loading user"}
                    </h4>
                    <h5>{state? state.email:"loading email"}</h5>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '108%'}}>
                        <h6>{myposts.length} Post</h6>
                        <h6>{state? state.followers.length:"0"} followers</h6>
                        <h6>{state? state.following.length:"0"} following</h6>
                    </div>
                </div>
            </div>

            {/* Users Gallery */}
            <div className="gallery">
                {
                    myposts.map(post => {
                        return (
                            <img key={post._id} className='gallery-item' src={post.image} alt={post.title} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profile