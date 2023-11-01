const mongoose = require("mongoose");

const { Schema } = mongoose; 

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    hashedPassword: {type: String, required: true}
},
{
    timestamps: true
})
//  points to users collection
const User = mongoose.model('User', userSchema)
module.exports = User;