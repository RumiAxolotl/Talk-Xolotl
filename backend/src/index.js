import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import AuthRoutes from './routes/AuthRouter.js';
import { connectDB } from './lib/db.js';



dotenv.config();

const app = express();

const corsOption = {
    credentials: true,
    origin: ['http://localhost:3000']
}

app.use(cors(corsOption));
app.use(express.json());
app.use(bodyParser.json())
app.use(
    express.urlencoded({
        extended: true,
    })
);


const PORT = process.env.PORT || 3000;
app.use("/api/auth/", AuthRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});