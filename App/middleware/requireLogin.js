const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../config/keys')
const mongoose=require('mongoose')
const User=mongoose.model('User')

module.exports=(req, res, next) => {

    const {authorization}=req.headers
    //authorization will look like { Bearer token }
    if (!authorization) {
        return res.status(401).json({error: "Access denied"})
    }
    //replace Bearer space with empty string to get only the token
    const token=authorization.replace("Bearer ", "")

    //Verify if the token is valid
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({error: "Access denied"})
        }
        //get _id from the token
        const {_id}=payload

        //find the data using _id
        User.findById(_id).then(
            userData => {
                req.user=userData
                //stop this middle ware and go to next code.
                next()
            }
        )
    })
}