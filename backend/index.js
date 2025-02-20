import express from 'express';
import routes from './routes/index.js';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 1000;
app.use(express.json());
app.use(routes);
app.get(`/`, (req, res) =>{
    res.send("Server heree");
});

app.listen(PORT, () =>{
    connectDB();
    console.log(`RUNNING IN ${PORT}`);
});