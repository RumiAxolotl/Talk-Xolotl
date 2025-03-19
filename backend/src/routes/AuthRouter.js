import express from "express";
import multer from "multer";
import { signin, signout, signup, updateProfile, checkAuth} from "../controllers/AuthController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.put("/update-profile", verifyToken, upload.single('avatar'), updateProfile); 
router.get("/check", verifyToken, checkAuth)

export default router;