const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    followers: [{
        type: ObjectId,
        ref: "User"
    }],

    following: [{
        type: ObjectId,
        ref: "User"
    }],

    profilePicture: {
        type: String,
        default: 'https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png'
    }

})

mongoose.model('User', userSchema)