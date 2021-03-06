const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const Post=mongoose.model("Post")
const requireLogin=require('../middleware/requireLogin')


//All the routes for post

//Create new post route
router.post('/createpost', requireLogin, (req, res) => {
    const {title, body, imgURL}=req.body
    if (!title||!body||!imgURL) {
        return res.status(422).json({error: "Please provide all the fields"})
    }
    //Make password invisible on post
    req.user.password=undefined

    //Create a new post
    const post=new Post({
        title,
        body,
        image: imgURL,
        postedBy: req.user

    })

    //Save the new post
    post.save().then(newPost => {
        res.json({post: newPost})
    })
        .catch(error => {
            console.log(error)
        })
})

//Get all posts
router.get('/allpost', requireLogin, (req, res) => {
    //find all the posts
    Post.find()
        //Populate the postedBy with user name and Id.
        .populate("postedBy", '_id name')
        .populate("comments.postedBy", "_id name")
        .then(posts => {
            return res.json({posts})
        })
        .catch(error => {
            console.log(error)
        })
})

//Get following posts
router.get('/getfollowpost', requireLogin, (req, res) => {
    //find if postedBy is present in the following list
    Post.find({postedBy: {$in: req.user.following}})
        //Populate the postedBy with user name and Id.
        .populate("postedBy", '_id name')
        .populate("comments.postedBy", "_id name")
        .then(posts => {
            return res.json({posts})
        })
        .catch(error => {
            console.log(error)
        })
})

//Get post created by a single user
router.get('/mypost', requireLogin, (req, res) => {
    //Get all the post posted by the current loggedin user
    Post.find({postedBy: req.user._id})
        //populate the posted by field
        .populate("postedBy", "_id name")
        .then(posts => {
            res.json({posts})
        })
        .catch(error => {
            console.log(error)
        })

})

//Like a post route
router.put('/like', requireLogin, (req, res) => {

    Post.findByIdAndUpdate(req.body.id, {
        //push into the likes array
        $push: {likes: req.user._id}
    }, {
        //To get new updated record from mongo
        new: true
    })
        //execute the query
        .exec((error, result) => {
            if (error) {
                return res.status(422).json({error})
            }
            else {
                res.json(result)
            }
        })
})

//unlike a post route
router.put('/unlike', requireLogin, (req, res) => {

    Post.findByIdAndUpdate(req.body.id, {
        //pull the user from likes array
        $pull: {likes: req.user._id}
    }, {
        //To get new updated record from mongo
        new: true
    })
        //execute the query
        .exec((error, result) => {
            if (error) {
                return res.status(422).json({error})
            }
            else {
                res.json(result)
            }
        })
})

//Add a comment to the post
router.put('/comment', requireLogin, (req, res) => {

    //get the comment from front end
    const comment={
        comment: req.body.comment,
        postedBy: req.user._id
    }

    Post.findByIdAndUpdate(req.body.id, {
        //push into the comments model
        $push: {comments: comment}
    }, {
        //To get new updated record from mongo
        new: true

    })
        //Populate to get more data about the user.
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")

        //execute the query
        .exec((error, result) => {
            if (error) {
                return res.status(422).json({error})
            }
            else {
                res.json(result)
            }
        })
})

//Delete a post from DB
router.delete('/deletePost/:id', requireLogin, (req, res) => {
    Post.findOne({_id: req.params.id})
        .populate("postedBy", "_id")
        .exec((err, post) => {
            if (err||!post) {
                return res.status(422).json({error: err})
            }
            if (post.postedBy._id.toString()===req.user._id.toString()) {
                post.remove()
                    .then(result => {
                        res.json(result)
                    }).catch(err => {
                        console.log(err)
                    })
            }
        })
})

//Delete a comment from DB
router.delete('/deleteComment/:id/:comment_id', requireLogin, (req, res) => {

    //create a commnt using the params 
    const comment={_id: req.params.comment_id}

    Post.findByIdAndUpdate(req.params.id, {
        $pull: {comments: comment}
    },
        {
            new: true,
        }
    )
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")
        .exec((error, postComment) => {
            if (error||!postComment) {
                return res.status(422).json({error})
            }
            else {
                const result=postComment
                res.json(result)
            }
        })
})

module.exports=router