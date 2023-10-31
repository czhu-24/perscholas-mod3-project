const mongoose = require("mongoose");

const { Schema } = mongoose; 

const postSchema = new mongoose.Schema({
	author: {type: Schema.Types.ObjectId, ref: 'User'},
    content: {type: String, required: true},
    isPublic: {type: Boolean, required: true}
},
{
    timestamps: true
})
//  Bootcamp points to "bootcamps" collection
const Post = mongoose.model('Post', postSchema)
module.exports = Post;