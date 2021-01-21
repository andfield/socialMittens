import React, {useEffect, useState, useContext} from 'react'
import {UserContext} from '../App'

const Profile=() => {

    //use context to get access to user state
    const {state, dispatch} = useContext(UserContext)

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
                borderBottom: '1px solid grey'
            }}>
                {/* Image div */}
                <div>
                    <img style={{width: "160px", height: "160px", borderRadius: "80px"}}
                        src="https://images.unsplash.com/photo-1558624232-75ee22af7e67?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                    />
                </div>
                {/* User details */}
                <div>
                    <h4>
                       {state?state.name:"loading user"}
                    </h4>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '108%'}}>
                        <h6>10 Posts</h6>
                        <h6>10 Followers</h6>
                        <h6>10 Following</h6>
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