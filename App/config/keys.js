//Give either production keys or development keys
if (process.env.NODE_ENV==='production') {
    module.exports=require("./prod")
}
else {
    module.exports=require("./dev")
}