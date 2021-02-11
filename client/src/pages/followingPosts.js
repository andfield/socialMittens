import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import M from "materialize-css";
import { Link } from "react-router-dom";

const FollowingPosts = () => {
  //Post state
  const [posts, setPosts] = useState([]);
  const [postChange, setPostChange] = useState(false);

  //Using context to get user
  const { state, dispatch } = useContext(UserContext);

  //On mount get posts from server
  useEffect(() => {
    //request to get all the post from server
    fetch("/getfollowpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setPosts(result.posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postChange]);

  //Create a function to like a post.
  const likePost = (id) => {
    //Create a fetch request to like the post
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //if the ids match then return new data else return the old one
        const newPosts = posts.map((item) => {
          if (item._id == data._id) {
            return data;
          } else {
            return item;
          }
        });
        setPosts(newPosts);
        setPostChange(!postChange)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Create a function to unlike a post.
  const unlikePost = (id) => {
    //Create a fetch request to like the post
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //if the ids match then return new data else return the old one
        const newPosts = posts.map((item) => {
          if (item._id == data._id) {
            return data;
          } else {
            return item;
          }
        });
        setPosts(newPosts);
        setPostChange(!postChange)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Create a function to add comment on post.
  const addComment = (comment, id) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        id: id,
        comment: comment,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newPosts = posts.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setPosts(newPosts);
        setPostChange(!postChange)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Create a function to delete a post.
  const deletePost = (id) => {
    fetch(`/deletePost/${id}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = posts.filter((post) => {
          if (post._id == result._id) {
            return result;
          } else {
            return post;
          }
        });
        setPosts(newData);
        setPostChange(!postChange)
      });
  };

  //Create a function to delete a comment.
  const deleteComment = (postId, commentId) => {
    fetch(`deleteComment/${postId}/${commentId}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = posts.filter((post) => {
          if (post._id === result._id) {
            return result;
          } else {
            return post;
          }
        });
        setPosts(newData);
        setPostChange(!postChange)
      });
  };

  return (
    // Main div
    <div className="home">
      {posts.length === 0 && (
        <div className="mycard">
          <div className="card auth-card">
            <h4 style={{ textAlign: "center" }}>Looks like you are lonely.</h4>
            <h6 style={{ textAlign: "center", padding: "20px" }}>
              Try Following someone first or look at random posts
            </h6>
            <a
              className="btn waves-effect waves-light #F2BAC9 pink lighten-3"
              style={{}}
            >
              <Link to="/explore">Explore</Link>
            </a>
          </div>
        </div>
      )}

      {posts.map((post) => {
        return (
          <div className="card home-card" key={post._id}>
            <h5>
              <Link
                to={
                  post.postedBy._id == state._id
                    ? "/profile"
                    : `/profile/${post.postedBy._id}`
                }
              >
                {post.postedBy.name}{" "}
              </Link>
              {
                //expression to check weather the id of current user matches the post id.
                post.postedBy._id == state._id && (
                  <i
                    className="material-icons"
                    style={{ float: "right" }}
                    onClick={() => deletePost(post._id)}
                  >
                    delete
                  </i>
                )
              }
            </h5>

            {/* Card image div */}
            <div className="card-image">
              <img src={post.image} />
            </div>
            {/* Card contents */}
            <div className="card-content">
              {/* Allow current user to only like a post once */}
              {post.likes.includes(state._id) ? (
                <i
                  className="material-icons"
                  style={{ color: "red" }}
                  onClick={() => {
                    unlikePost(post._id);
                  }}
                >
                  thumb_down
                </i>
              ) : (
                <i
                  className="material-icons"
                  style={{ color: "blue" }}
                  onClick={() => {
                    likePost(post._id);
                  }}
                >
                  thumb_up
                </i>
              )}

              <h6>{post.likes.length} Likes</h6>
              <h6>{post.title}</h6>
              <p>{post.body}</p>

              {post.comments.map((record) => {
                return (
                  <div>
                    {record.postedBy._id === state._id && (
                      <i
                        className="material-icons"
                        style={{ float: "right" }}
                        onClick={() => deleteComment(post._id, record._id)}
                      >
                        delete
                      </i>
                    )}
                    <h6 key={record._id}>
                      <span style={{ fontWeight: "500" }}>
                        {record.postedBy.name}
                      </span>{" "}
                      {record.comment}
                    </h6>
                  </div>
                );
              })}
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  addComment(event.target[0].value, post._id);
                }}
              >
                <input type="text" placeholder="Add a comment" />
              </form>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FollowingPosts;
