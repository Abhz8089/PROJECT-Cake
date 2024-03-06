import express from "express";
const router = express.Router();
import {getFCProducts,deleteProduct} from '../Controllers/filterProductController.js'



router.get("/getCData", getFCProducts);
router.delete("/dltPrdct", deleteProduct);


export default router