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


const createChannel = async (channelData) => {
    try {
        const { name, members } = channelData;
        const newChannel = await ChannelModel.create({ name, members });
        return {
            statusCode: 201,
            data: newChannel,
        };
    }
    catch (error) {
        throw error;
    }
}

const editChannel = async (channelData) => {
    try {
        const { id, name } = channelData;
        const updatedChannel = await ChannelModel
            .findByIdAndUpdate(id, {
                name: name,
            }, { new: true });
        return {
            statusCode: 200,
            data: updatedChannel,
        };
    }
    catch (error) {
        throw error;
    }
}

const deleteChannel = async (channelData) => {
    try {
        const { channelId } = channelData;
        const deletedChannel = await ChannelModel.findByIdAndDelete(channelId);
        await UserModel.updateMany({ channels: channelId }, { $pull: { channels: channelId } });
        await MessageModel.deleteMany({ channelId });
        return {
            statusCode: 200,
            data: deletedChannel,
        };
    }
    catch (error) {
        throw error;
    }
}

const getChannels = async (userId) => {
    try {
        const channels = await ChannelModel.find({ members: userId });
        return {
            statusCode: 200,
            data: channels,
        };
    }
    catch (error) {
        throw error;
    }
}





const addMember = async (channelData) => {
    try {
        const { channelId, userId } = channelData;
        await ChannelModel.findByIdAndUpdate
            (channelId, { $push: { members: userId } });
        await UserModel.findByIdAndUpdate
            (userId, { $push: { channels: channelId } });
        return {
            statusCode: 200,
            data: "Member added successfully",
        };
    }
    catch (error) {
        throw error;
    }
}

const removeMember = async (channelData) => {
    try {
        const { channelId, userId } = channelData;
        await ChannelModel.findByIdAndUpdate
            (channelId, { $pull: { members: userId } });
        await UserModel.findByIdAndUpdate
            (userId, { $pull: { channels: channelId } });
        return {
            statusCode: 200,
            data: "Member removed successfully",
        };
    }
    catch (error) {
        throw error;
    }
}

export default {
    getMessages,
    createChannel,
    editChannel,
    deleteChannel,
    getChannels,
    addMember,
    removeMember,
}