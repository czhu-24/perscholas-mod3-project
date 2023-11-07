const mongoose = require("mongoose");

const { Schema } = mongoose; 

const postSchema = new mongoose.Schema({
	  author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    content: {type: String, required: true},
    isPublic: {type: Boolean, required: true},
    isAnonymous: {type: Boolean, required: true}
},
{
    timestamps: true
});
// a virtual is a property that is NOT stored on MongoDB
// used for computed properties
postSchema.virtual('formattedCreatedAt').get(function() {
    return this.createdAt.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  });
//  Bootcamp points to "bootcamps" collection
const Post = mongoose.model('Post', postSchema)
module.exports = Post;