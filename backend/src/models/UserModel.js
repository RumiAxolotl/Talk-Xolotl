import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    }, username: {
        type: String,
        required: [true, "Please provide a name"],
    },

    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6,
    },

    avatar: {
        type: String,
        default: "",
    },

    channels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Channel",
    }],

},

    {timestamps: true},

);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;