import express from "express";
const router = express.Router();
import { addBanners, getBanners,deleteBanner,changeVisibility,getBannerImg } from "../Controllers/BannersAndOffers.js";
import {addSubBanners,changeVisibilityOfSubBanner,deleteSubBanner,getSubBannerImg,getSubBanners} from '../Controllers/SubBannersController.js';
import { upload,imageCropMiddlewareForBanner } from "../Helpers/multer.js";

router.post(
  "/addBanners",
  upload.array("images", 1),imageCropMiddlewareForBanner,addBanners
);
router.get("/getBanner",getBanners);
router.delete("/deleteBanner",deleteBanner);
router.put('/changeV',changeVisibility);
router.get('/getBannerImg',getBannerImg);

router.post("/addSubBanners",upload.array("images",1),addSubBanners);
router.get("/getSubBanner",getSubBanners);
router.delete("/deleteSubBanner",deleteSubBanner);
router.put("/changeVOfSb",changeVisibilityOfSubBanner);
router.get("/getSubBannerImg",getSubBannerImg);

export default router;
