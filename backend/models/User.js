const mongoose = require("mongoose");

const { Schema } = mongoose; 

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    hashedPassword: {type: String, required: true}
},
{
    timestamps: true
})
//  Bootcamp points to "bootcamps" collection
const User = mongoose.model('User', userSchema)
module.exports = User;