import mongoose from "mongoose";

const ChannelSchema = new mongoose.Schema({

    
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }],

    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    }],

},
    {timestamps: true},
);

const ChannelModel = mongoose.model("Channel", ChannelSchema);

export default ChannelModel;