let mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        max:255
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        min:5,
        max:1024
    },
    date:{
        type:String,
        default:Date.now
    }
});

// let  User = mongoose.model("User",userSchema);

module.exports = mongoose.model("User",userSchema)