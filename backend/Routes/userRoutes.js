import express from 'express';
const router = express.Router();
//==========controllers============
import {
  userSignup,
  Register,
  resendOTP,
  userLogin,
  logout,
} from "../Controllers/userController.js";



router.post('/signup',userSignup);
router.post("/sendedOtp", Register);
router.post("/resendOtp",resendOTP);
router.post("/login",userLogin);
router.post('/logout',logout);






export default router;