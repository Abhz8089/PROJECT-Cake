import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT;
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
import { dirname } from "path";
import { fileURLToPath } from "url";
import connectDB from './config/config.js';

//========import routers==========

import userRoutes from './Routes/userRoutes.js'
import adminRoutes from './Routes/adminRoutes.js'
import productRoutes from './Routes/productRoutes.js'
import BannersOffers from './Routes/BannersOffers.js';
import userSubRoutes from './Routes/userSubRoutes.js'

//========data base connection=====
connectDB();

//=========dirName config=========
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 


//========Middlewares=============

app.use("/uploads",express.static(__dirname+"/uploads"))
app.use(express.json());
app.use(cors({origin:"http://localhost:3000" , credentials: true}))
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))


app.use('/',userRoutes)
app.use('/sub', userSubRoutes);
app.use('/admin/api',adminRoutes)
app.use('/products',productRoutes)
app.use('/bo',BannersOffers)





//======connect port ===============

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})