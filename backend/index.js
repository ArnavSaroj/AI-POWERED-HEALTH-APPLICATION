import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import mainRoutes from './routes/mainRoutes.js'

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", mainRoutes);

app.listen(PORT,async() => {
    console.log("Server running on port", PORT);
})

