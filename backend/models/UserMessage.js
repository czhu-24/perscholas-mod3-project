const mongoose = require("mongoose");

const { Schema } = mongoose;

const userMessageSchema = new mongoose.Schema({
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    receiver: { type: Schema.Types.ObjectId, ref: "User" },
    message: { type: Schema.Types.ObjectId, ref: "Message" },
},
    {
        timestamps: true
    });

const UserMessage = mongoose.model("UsersToMessages", userMessageSchema);

module.exports = UserMessage;
