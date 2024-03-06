import express from "express";
const router = express.Router();

import {priceFilter,addToCart } from '../Controllers/userSubController.js'




router.get('/getFiPrdct',priceFilter);
router.post('/addToCart',addToCart)

export default router;