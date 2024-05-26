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
        default: 0
    }
});

// create model
const users = new mongoose.model("users",userSchema);
module.exports = users;