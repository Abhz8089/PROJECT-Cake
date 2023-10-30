import express from "express";
const router = express.Router();
import {upload,imageCropMiddleware} from '../Helpers/multer.js'
import {adminLogin,adminLogout,addCategory,getAllCategories,deleteCategory} from '../Controllers/adminController.js'
import { addProduct,getProduct,changeVisibility} from '../Controllers/ProductController.js'

router.post("/adminLogin",adminLogin);
router.post("/logout",adminLogout);
router.post("/addCat",addCategory);
router.get('/getCat',getAllCategories);
router.delete('/deleteCat',deleteCategory);

//===========product=============================
router.post('/addProduct',upload.array('images',5),imageCropMiddleware,addProduct)
router.get("/getProduct",getProduct);
router.put('/cv',changeVisibility);

export default router;
