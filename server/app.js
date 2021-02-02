const express=require('express')
const app=express()
const mongoose=require('mongoose')
const {mongoUri}=require('./keys')
const port=2000

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


app.listen(port, () => {
    console.log('server is running', port)
})