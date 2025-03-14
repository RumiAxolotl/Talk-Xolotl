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

