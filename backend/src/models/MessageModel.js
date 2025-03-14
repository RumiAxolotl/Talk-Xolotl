import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({

    channelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
        required: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        required: true,
    },

    attachment: {
        type: String,
        default: "",
    },

    sendAt: {
        type: Date,
        default: Date.now,
    },



},
    { timestamps: true },
);

const MessageModel = mongoose.model("Message", MessageSchema);

export default MessageModel;