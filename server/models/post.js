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
        default: "Default image url"
    },
    postedBy: {
        type: ObjectId,
        ref: 'User'
    }

})

mongoose.model('Post', postSchema)