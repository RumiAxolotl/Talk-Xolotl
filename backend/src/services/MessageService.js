import MessageModel from "../models/MessageModel.js";
import ChannelModel from "../models/ChannelModel.js";
import UserModel from "../models/UserModel.js";


const sendMessage = async (MessageData) => {
    try {
        const { channelId, senderId, text, attachment } = MessageData;
        const newMessage = await MessageModel.create({ channelId, senderId, text, attachment });
        await ChannelModel.findByIdAndUpdate(channelId, { $push: { messages: newMessage._id } });
        return {
            statusCode: 201,
            data: newMessage,
        };
    }
    catch (error) {
        throw error;
    }
}

const editMessage = async (MessageData) => {
    try {
        const { id, text } = MessageData;
        const updatedMessage = await Message
            .findByIdAndUpdate(id, {
                text: text,
            }, { new: true });
        return {
            statusCode: 200,
            data: updatedMessage,
        };
    }
    catch (error) {
        throw error;
    }
}

const deleteMessage = async (MessageData) => {
    try {
        const { messageId } = MessageData;
        const deletedMessage = await MessageModel.findByIdAndDelete(messageId);
        await Channel
            .findByIdAndUpdate(deletedMessage.channelId, { $pull: { messages: deletedMessage._id } });
        return {
            statusCode: 200,
            data: deletedMessage,
        };
    }
    catch (error) {
        throw error;
    }
}




export default {
    sendMessage,
    editMessage,
    deleteMessage,
};
    
        