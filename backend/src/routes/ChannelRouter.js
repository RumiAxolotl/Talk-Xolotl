import express from "express";
import { getMessages, createChannel, editChannel, deleteChannel, getChannels, addMember, removeMember } from "../controllers/ChannelController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

// Get all messages in a channel
router.get("/:channelId/messages", verifyToken, getMessages);

// Get all channels for current user
router.get("/", verifyToken, getChannels);

// Create new channel
router.post("/", verifyToken, createChannel);

// Update channel
router.put("/:id", verifyToken, editChannel);

// Delete channel
router.delete("/:id", verifyToken, deleteChannel);

// Add member to channel
router.put("/:id/members", verifyToken, addMember);

// Remove member from channel
router.delete("/:id/members", verifyToken, removeMember);

export default router;

