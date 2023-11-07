const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    // just remember that this pw is hashed!
    password: { type: String, required: true },
    profileDescription: { type: String },
    profilePhoto: { type: String },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post"}]
},
    {
        timestamps: true
    })
//  points to users collection
const User = mongoose.model('User', userSchema)
module.exports = User;