import React, {useState, useEffect, useContext} from 'react'
import {UserContext} from '../App'

const Home=() => {

    //Post state
    const [posts, setPosts]=useState([])

    //Using context to get user
    const {state, dispatch}=useContext(UserContext)

    //On mount get posts from server
    useEffect(() => {

        //request to get all the post from server
        fetch('/allpost', {
            headers: {
                "Authorization": "Bearer "+localStorage.getItem('jwt')
            },
        })
            .then(res => res.json())
            .then(result => {
                setPosts(result.posts)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    //Create a function to like a post.
    const likePost=(id) => {

        //Create a fetch request to like the post
        fetch('/like', {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                id: id
            })
        })
            .then(res => res.json())
            .then(data => {
                //if the ids match then return new data else return the old one
                const newPosts=posts.map(item => {
                    if (item._id==data._id) {
                        return data
                    }
                    else {
                        return item
                    }
                })
                setPosts(newPosts)
            })
            .catch(error => {
                console.log(error)
            })
    }

    //Create a function to unlike a post.
    const unlikePost=(id) => {

        //Create a fetch request to like the post
        fetch('/unlike', {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                id: id
            })
        })
            .then(res => res.json())
            .then(data => {
                //if the ids match then return new data else return the old one
                const newPosts=posts.map(item => {
                    if (item._id==data._id) {
                        return data
                    }
                    else {
                        return item
                    }
                })
                setPosts(newPosts)
            })
            .catch(error => {
                console.log(error)
            })
    }

    //Create a function to add comment on post.
    const addComment=(comment, id) => {
        fetch('/comment', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                id: id,
                comment: comment
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                const newPosts=posts.map(item => {
                    if (item._id==result._id) {
                        return result
                    }
                    else {
                        return item
                    }
                })
                setPosts(newPosts)
            }).catch(error => {
                console.log(error)
            })
    }

    return (
        // Main div
        <div className="home">
            {
                posts.map(post => {
                    return (
                        <div className="card home-card" key={post._id}>
                            <h5>{post.postedBy.name}</h5>
                            {/* Card image div */}
                            <div className="card-image">
                                <img src={post.image} />
                            </div>
                            {/* Card contents */}
                            <div className="card-content">

                                {/* Allow current user to only like a post once */}
                                {
                                    post.likes.includes(state._id)?
                                        <i className="material-icons" style={{color: 'red'}} onClick={() => {unlikePost(post._id)}} >thumb_down</i>
                                        :
                                        <i className="material-icons" style={{color: 'blue'}} onClick={() => {likePost(post._id)}} >thumb_up</i>
                                }

                                <h6>{post.likes.length} Likes</h6>
                                <h6>{post.title}</h6>
                                <p>{post.body}</p>

                                {
                                    post.comments.map(record => {
                                        return (
                                            <h6 key={record._id}><span style={{fontWeight: "500"}}>{record.postedBy.name}</span> {record.comment}</h6>
                                        )
                                    })
                                }
                                <form onSubmit={(event) => {
                                    event.preventDefault()
                                    addComment(event.target[0].value, post._id)
                                }}>
                                    <input type="text" placeholder="Add a comment" />
                                </form>
                            </div>
                        </div>
                    )
                })
            }
        </div>

    )

}

export default Home