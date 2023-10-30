
import jwt from 'jsonwebtoken'
import {generateOTP,transporter} from '../Helpers/otpGenerator.js'
import {hashPassword,comparePassword} from '../Helpers/Hashing.js'
import User from '../Models/UserModel.js'
import {createUserToken,getUserToken} from '../utils/generateToken.js'

const userSignup = async (req, res) => {

    try {

         const { name, phone, password } = req.body;
         const exist = await User.findOne({ phone });
         if (exist) {
           return res.json({ error: "This mobile number is already used " });
         }

         const otp = generateOTP();
         const mailOptions = {
           from: "bookmybarber@gmail.com",
           to: "abhijithabh8089@gmail.com",
           text: `Your OTP is   ${otp}`,
         };

         transporter.sendMail(mailOptions, (err, info) => {
           if (err) {
             res.status(500).send({ error: "Error sending OTP email" });
             client.close();
             return;
           }
         });

         const currentTime = new Date();

         createUserToken(res, { otp: otp, time: currentTime });

         return res.json({ success: "success" });
        
    } catch (error) {
        console.log(error)
    }


}


  const Register = async (req, res) => {
    

      const {name,phone,password,otp} = req.body;

      let token = getUserToken(req);

     

      if (token) {
        try {
          const decodedToken = jwt.verify(token,process.env.JWT_SECRET);

          const decodedTokenTime = new Date(decodedToken.data.time);

          const enterOtpTime = new Date();

          const timeDifference = Math.abs(enterOtpTime-decodedTokenTime);

          const timeDifferenceInMinutes = timeDifference/60000;

          let numOtp = parseInt(otp)

          

          if (numOtp !== decodedToken.data.otp || timeDifferenceInMinutes > 1) {
            return res.json({ error: "you are entered wrong otp" });
          } else {
            const hashedPassword = await hashPassword(password);

            const user = await User.create({
              name: name,
              phone: phone,
              password: hashedPassword,
            });
            console.log(user, "-------------------------user");
            if (user) {
              return res.json(user);
            } else {
              return res.json({ error: "cannot register please re try later" });
            }
          }
          
        } catch (error) {
          console.log(error)
        }
      }
   
  };

  const resendOTP = async(req,res) => {
    try {
      const{phone} = req.body;
      let sendedOtp = await generateOTP();
         const mailOptions = {
           from: "bookecorner@gmail.com",
           to: "abhijithabhiz8089@gmail.com",
           text: `Your OTP is   ${sendedOtp}`,
         };
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              res.status(500).send({ error: "Error sending OTP email" });
              client.close();
              return;
            }
          });

           const currentTime = new Date();

           createUserToken(res, { otp: sendedOtp, time: currentTime });
           return res.json({ success: "otp successfully sended" });
    } catch (error) {
      console.log(error);
    }
  }

  const userLogin=async(req,res) => {
   console.log(req.body)
    try {
      const {email,password}= req.body;
          let isEmail = false;
          let isPhone = false;  
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const phoneRegex = /^[0-9]{10}$/;
          if (emailRegex.test(email)) {
            isEmail = true;
            
          } else if (phoneRegex.test(email)) {
            isPhone = true;
           
          } else {
           
            return res.json({ error: "Invalid email or phone format" });
          }
          
          let details

          if(isEmail){
            details = await User.find({email:email})
          }else if(isPhone){
            
            details = await User.find({phone:email})
          }
          
        
          if(details.length){
            let match = await comparePassword(password,details[0].password);
           
            if(match){
              createUserToken(res, {
                name: details[0].name,
                id: details[0]._id,
                phone: details[0].phone,
                email: details[0].email,
              });
              const result= {name:details[0].name,id:details[0]._id,phone:details[0].phone,email:details[0].email}    

              return res.json(result);
            }else{
              return res.json({error:"Invalid email or Password"})
            }
          }else{
            return res.json({error:'Invalid email or password'})
          }

    } catch (error) {
      console.log(error)
    }

  }

  const logout =async (req,res) => {
    try {
      let token= await getUserToken(req);
     
      res.setHeader(
        "Set-Cookie",
        `Buser=${token}; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
      );
      res.json({success:"Logout Successful"})
    } catch (error) {
      console.log(error)
    }
  }

  const Login =async(req,res)=>{
    console.log(req.body)
  }



export { userSignup, Register, resendOTP, userLogin, logout ,Login};
