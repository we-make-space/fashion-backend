import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { userRoute } from './routes/userRoute.js ';
import { productRoute } from './routes/productRoute.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.listen(PORT, () => {
    console.log(`server is running succesfully on PORT ${PORT}`)
})

app.use('/api/user', userRoute)
app.use('/api/product', productRoute)