import mongoose from "mongoose";

import ChannelModel from "../models/ChannelModel.js";
import UserModel from "../models/UserModel.js";
import MessageModel from "../models/MessageModel.js";

const getMessages = async (req, res) => {
    try {
        const { channelId } = req.params;
        const messages = await MessageModel.find({ channelId });
        res.status(200).json(messages);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export default {
    getMessages,
}