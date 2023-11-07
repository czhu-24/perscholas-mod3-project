const mongoose = require("mongoose");

const { Schema } = mongoose;

const messageSchema = new mongoose.Schema({
    content: { type: String, required: true }
},
    {
        timestamps: true
    });

messageSchema.virtual('formattedCreatedAt').get(function() {
    return this.createdAt.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });
});
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;