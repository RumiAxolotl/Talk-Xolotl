import ChannelService from "../services/ChannelService.js"

export const getMessages = async (req, res) => {
    try {
        const { channelId } = req.params;
        const messages = await ChannelService.getMessages({ channelId });
        res.status(200).json(messages);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const createChannel = async (req, res) => {
    try {
        const { name, members } = req.body;
        const newChannel = await ChannelService.createChannel({ name, members });
        res.status(201).json(newChannel.data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const editChannel = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedChannel = await ChannelService.editChannel({ id, name });
        res.status(200).json(updatedChannel.data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const deleteChannel = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedChannel = await ChannelService.deleteChannel({ id });
        res.status(200).json(deletedChannel.data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const getChannels = async (req, res) => {
    try {
        const channels = await ChannelService.getChannels();
        res.status(200).json(channels);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const addMember = async (req, res) => {
    try {
        const { id } = req.params;
        const { member } = req.body;
        const updatedChannel = await ChannelService.addMember({ id, member });
        res.status(200).json(updatedChannel.data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const removeMember = async (req, res) => {
    try {
        const { id } = req.params;
        const { member } = req.body;
        const updatedChannel = await ChannelService.removeMember({ id, member });
        res.status(200).json(updatedChannel.data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}



