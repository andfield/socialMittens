const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const User=mongoose.model("User")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../keys')
const requireLogin=require('../middleware/requireLogin')

//All Routes for authentication functions

//route only accessable to a verified token
router.get('/protected', requireLogin, (req, res) => {
    res.send('Hello User')
})

router.post('/signup', (req, res) => {
    const {name, email, password, pic}=req.body
    if (!name||!password||!email) {
        return res.status(422).json({error: "Please enter all the fields"})
    }
    //check if user already exists with the email
    User.findOne({email: email})
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({error: `User already exists with email: ${email}`})
            }
            //Hash password using bcrypt once sucessfull store the new user with hashed password
            bcrypt.hash(password, 13)
                .then(hashedPassword => {
                    //give data to model
                    const user=new User({
                        name,
                        email,
                        password: hashedPassword,
                        profilePicture: pic
                    })
                    //save the new user
                    user.save().then(user => {
                        res.json({message: 'saved new user Successfully'})
                    }).catch(error => {
                        console.log(error)
                    })
                })


        }).catch(error => {
            console.log(error)
        })

})
router.post('/signin', (req, res) => {
    const {email, password}=req.body
    //check if details are provided
    if (!email||!password) {
        return res.status(422).json({message: 'Please enter both fields'})
    }

    //find user using email
    User.findOne({email: email})
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({error: 'Invalid creditials'})
            }
            //Compare password with bcrypt
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    //if password match send a JWT token back
                    if (doMatch) {
                        //create token based on user ID
                        const token=jwt.sign({_id: savedUser._id}, JWT_SECRET)
                        //de-structuring user to send necessary data back to client.
                        const {_id, name, email, followers, following, profilePicture}=savedUser
                        //sending data back
                        res.json({token, user: {_id, name, email, followers, following, profilePicture}}) 
                    }
                    else {
                        return res.status(422).json({error: 'Invalid creditials'})
                    }
                }).catch(error => {
                    console.log(error)
                })
        }).catch(error => {
            console.log(error)
        })
})

module.exports=router