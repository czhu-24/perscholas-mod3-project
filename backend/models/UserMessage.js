const mongoose = require("mongoose");

const { Schema } = mongoose;

const userMessageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
},
    {
        timestamps: true
    });

const UserMessage = mongoose.model("UsersToMessages", userMessageSchema);

module.exports = UserMessage;
