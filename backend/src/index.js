import express from 'express';
import dotenv from 'dotenv';
import AuthRoutes from './routes/AuthRouter.js';
import { connectDB } from './lib/db.js';



dotenv.config();

const app = express();



const PORT = process.env.PORT || 3000;
app.use("/api/auth", AuthRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});