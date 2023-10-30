import express from "express";
const router = express.Router();
import {getFCProducts} from '../Controllers/filterProductController.js'



router.get("/getCData", getFCProducts);


export default router