import MessageService from "../services/MessageService.js";



export const sendMessage = async (req, res) => {
    try {
        const { channelId } = req.params;
        const { senderId, text, attachment } = req.body;
        const newMessage = await MessageService.sendMessage({ channelId, senderId, text, attachment });
        res.status(newMessage.statusCode).json(newMessage.data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const editMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const updatedMessage = await MessageService.editMessage({ id, text});
        res.status(updatedMessage.statusCode).json(updatedMessage.data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteMessage = async (req, res) => {
    try {
        const { id } = req.body;
        const deletedMessage = await MessageService.deleteMessage({ id });
        res.status(deletedMessage.statusCode).json(deletedMessage.data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const findMessagesWithContent = async (req, res) => {
    try {
        const { userId, content } = req.body;
        const messages = await MessageService.findMessagesWithContent({ userId, content });
        res.status(200).json(messages);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


