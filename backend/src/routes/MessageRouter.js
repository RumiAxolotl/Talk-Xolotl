import express from "express";

import { sendMessage, editMessage, deleteMessage } from "../controllers/MessageController.js";

import { verifyToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/:channelId/", verifyToken, sendMessage);
router.put("/:id", verifyToken, editMessage);
router.delete(":id", verifyToken, deleteMessage);

export default router;