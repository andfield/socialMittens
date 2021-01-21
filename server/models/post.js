const mongoose = require('mongoose')

//imoprting ObjectID from mongoose data type
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    likes: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    postedBy: {
        type: ObjectId,
        ref: 'User'
    }

})

mongoose.model('Post', postSchema)