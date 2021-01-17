import React from 'react'


const Home=() => {

    return (
        // Main Div
        <div className="home">
            {/* Card for home page */}
            <div className="card home-card">
                <h5>Sid Thakur</h5>
                {/* Card image div */}
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1604912719650-f395b12832d1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1225&q=80" />
                </div>
                {/* Card contents */}
                <div className="card-content">
                    <i class="material-icons" style={{color: 'red'}} >favorite_border</i>
                    <h6>Title</h6>
                    <p>This is a test description of post</p>
                    <input type="text" placeholder="Add a comment" />
                </div>
            </div>

            {/* Card for home page */}
            <div className="card home-card">
                <h5>Sid Thakur</h5>
                {/* Card image div */}
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1604912719650-f395b12832d1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1225&q=80" />
                </div>
                {/* Card contents */}
                <div className="card-content">
                    <i className="material-icons" style={{color:'red'}} >favorite_border</i>
                    <h6>Title</h6>
                    <p>This is a test description of post</p>
                    <input type="text" placeholder="Add a comment" />
                </div>
            </div>

            {/* Card for home page */}
            <div className="card home-card">
                <h5>Sid Thakur</h5>
                {/* Card image div */}
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1604912719650-f395b12832d1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1225&q=80" />
                </div>
                {/* Card contents */}
                <div className="card-content">
                    <i class="material-icons" style={{color: 'red'}}>favorite_border</i>
                    <h6>Title</h6>
                    <p>This is a test description of post</p>
                    <input type="text" placeholder="Add a comment" />
                </div>
            </div>

        </div>
    )
}

export default Home