import React, {useEffect, useState, useContext} from 'react'
import {UserContext} from '../App'
import {useParams} from 'react-router-dom'

const OtherUserProfile=() => {

    //use the context
    const {state, dispatch}=useContext(UserContext)

    //state to save all user posts
    const [userProfile, setUserProfile]=useState()

    //save user id from params.
    const {userId}=useParams()

    //Current user follow status
    const [following, setFollowing]=useState(false)

    // on render get all user posts
    useEffect(() => {

        //fetch request to server to get all user posts and save them to local state .
        fetch(`/user/${userId}`, {
            headers: {
                "Authorization": "Bearer "+localStorage.getItem('jwt')
            }
        })
            .then(res => res.json())
            .then(data => {
                setUserProfile(data)
            })

    }, [])

    //Function to follow user.
    const followUser=() => {
        fetch('/follow', {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer '+localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                followId: userId
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                //dispatch followers and following to Context
                dispatch({type: "UPDATE", payload: {following: data.following, followers: data.followers}})
                localStorage.setItem("user", JSON.stringify(data))
                setUserProfile((prevState) => {
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: [...prevState.user.followers, data._id]
                        }
                    }
                })
                setFollowing(true)
            })
    }

    //Function to Unfollow user.
    const unfollowUser=() => {
        fetch('/unfollow', {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer '+localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                unfollowId: userId
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                //dispatch followers and following to Context
                dispatch({type: "UPDATE", payload: {following: data.following, followers: data.followers}})
                localStorage.setItem("user", JSON.stringify(data))
                setUserProfile((prevState) => {
                    const newfollowers=prevState.user.followers.filter(item => item!==data._id)
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: newfollowers
                        }
                    }
                })
                setFollowing(false)
            })

    }


    return (

        <>
            {userProfile?
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
                                {userProfile.user.name}
                            </h4>
                            <h4>
                                {userProfile.user.email}
                            </h4>
                            <div style={{display: 'flex', justifyContent: 'space-between', width: '108%'}}>
                                <h6>{userProfile.posts.length} posts</h6>
                                <h6>{userProfile.user.followers.length} Followers</h6>
                                <h6>{userProfile.user.following.length} Following</h6>
                            </div>
                            {following? <button class="btn waves-effect waves-light #F2BAC9 pink lighten-3" style={{margin: '10px'}}
                                onClick={() => unfollowUser()} >
                                Unfollow
                            </button>
                                :
                                <button class="btn waves-effect waves-light #F2BAC9 pink lighten-3" style={{margin: '10px'}}
                                    onClick={() => followUser()} >
                                    Follow
                            </button>}

                        </div>
                    </div>

                    {/* Users Gallery */}
                    <div className="gallery">
                        {
                            userProfile.posts.map(post => {
                                return (
                                    <img key={post._id} className='gallery-item' src={post.image} alt={post.title} />
                                )
                            })
                        }
                    </div>
                </div>



                :<h2>Loading...</h2>}

        </>
    )
}

export default OtherUserProfile