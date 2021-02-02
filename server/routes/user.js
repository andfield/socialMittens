const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const Post=mongoose.model("Post")
const User = mongoose.model("User")
const requireLogin=require('../middleware/requireLogin')

//see profile of a user.
router.get('/user/:id',requireLogin, (req, res) => {

    User.findOne({_id: req.params.id})
    .select("-password")
    .then(user => {
        Post.find({postedBy: req.params.id})
        .populate("postedBy", "_id name")
        .exec((error, posts) => {
            if(error){
                res.status(422).json({error})
            }
            else{
                res.json({user, posts})
            }
        })
    })
    .catch(error => {
        return res.status(404).json({error: "User not Found"})
    })

})



module.exports=router