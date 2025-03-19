import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import AuthRoutes from './routes/AuthRouter.js';
import MessageRoutes from './routes/MessageRouter.js';
import ChannelRoutes from './routes/ChannelRouter.js';
import { connectDB } from './lib/mongo.js';



dotenv.config();

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json())
app.use(
    express.urlencoded({
        extended: true,
    })
);


const PORT = process.env.PORT || 3000;
app.use("/api/auth/", AuthRoutes);
app.use("/api/message/", MessageRoutes);
app.use("/api/channel/", ChannelRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});