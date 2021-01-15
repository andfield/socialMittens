const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const Post=mongoose.model("Post")
const requireLogin = require('../middleware/requireLogin')


//All the routes for post

router.post('/createpost', requireLogin, (req,res) => {
    const {title, body} = req.body
    if(!title || !body) {
        return res.status(422).json({error: "Please provide all the fields"})
    }
    //Make password invisible on post
    req.user.password = undefined

    const post = new Post({
        title,
        body,
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




module.exports = router