const express=require('express')
const app=express()
const mongoose=require('mongoose')
const {mongoUri}=require('./config/keys')
const port= process.env.PORT || 2000

//User model
require('./models/user')

//Connect to DB
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true

})
//On db connection console log
mongoose.connection.on('connected', () => {
    console.log('connected to Database')
})
//On error console log
mongoose.connection.on('error', (err) => {
    console.log('error on Database', err)
})

//making models to be required
require('./models/user')
require('./models/post')


//Parse to json middleware
app.use(express.json())

//Auth routes
app.use(require('./routes/auth'))

//routes for posts
app.use(require('./routes/post'))

//routes for users
app.use(require('./routes/user'))

//If app is deployed
if(process.env.NODE_ENV == "production"){
    //serve all the js and css static file in client build
    app.use(express.static('client/build'))

    //require path module
    const path = require('path')

    //if client is making any request send back index.html of client folder.
    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(port, () => {
    console.log('server is running', port)
})