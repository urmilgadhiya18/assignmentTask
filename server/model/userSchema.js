const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imgpath:{
        type:String,
        required:true
    },
    date:{
        type:Date
    },
    viewCount: {
        type: Number,
        default: 1 // Initialize viewCount to 1 by default
    }
});

// create model
const users = new mongoose.model("users",userSchema);
module.exports = users;