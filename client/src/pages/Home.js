import React, {useState, useEffect} from 'react'


const Home=() => {

    //Post state
    const [posts, setPosts]= useState([])

    //On mount get posts from server
    useEffect(() => {

        //request to get all the post from server
        fetch('/allpost', {
            headers: {
                "Authorization": "Bearer "+localStorage.getItem('jwt')
            },
        })
            .then(res => res.json())
            .then( result => {
                setPosts(result.posts)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (

        // Main div
        <div className="home">
            {
                posts.map( post => {
                    return (
                        <div className="card home-card" key={post._id}>
                            <h5>{post.postedBy.name}</h5>
                            {/* Card image div */}
                            <div className="card-image">
                                <img src={post.image} />
                            </div>
                            {/* Card contents */}
                            <div className="card-content">
                                <i className="material-icons" style={{color: 'red'}} >favorite_border</i>
                                <h6>{post.title}</h6>
                                <p>{post.body}</p>
                                <input type="text" placeholder="Add a comment" />
                            </div>
                        </div>
                    )
                })
            }
        </div>

    )

}

export default Home