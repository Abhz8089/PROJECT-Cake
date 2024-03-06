import BannerModel from '../Models/BannerModel.js'
import fs from 'fs'
import path from 'path';
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 


const addBanners = async (req,res) => {
    try {
        
        const bannerName = req.files[0].filename;
        if(!bannerName){
            res.json({error:'please select image'})
        }else{
            const result = await BannerModel.create({BannerImg:bannerName})
            if(result){
                const finalResult = await BannerModel.find()
                res.json(finalResult);
            }
        }


    } catch (error) {
          console.log(error)
         res.json({error:'server error please re login'})
    }

}

const getBanners = async(req,res) =>{
  try {
    const data = await BannerModel.find()
   
    if(data.length){
        res.json(data)
    }else{
        res.json({error:'Empty'})
    }
  } catch (error) {
    
    res.json({error:'Server please re login'})
  }
}

const deleteBanner = async (req,res) => {
    try {
        
        const {id,imageName} = req.query
        
  const imagePath = path.join(__dirname, "..", "uploads", imageName);    
      
        const data = await BannerModel.deleteOne({_id:id})
        const result = await BannerModel.find()

        if(data.acknowledged){
          if (fs.existsSync(imagePath)) {
            try {
              // Delete the image file
              fs.unlinkSync(imagePath);
              return res.json(result)
            } catch (error) {
              console.log(error)
              return res.json({error:'Error deleting image'})
            }
          } else {
            console.log(`Image ${imageName} not found.`);
            return res.json({error:'Image not found'})
          }
        }else{
           return  res.json({error:'cannot delete Banner'})
        }
    } catch (error) {
        console.log(error)
        return res.json({error:'server error please re login'})
    }
}

const changeVisibility = async (req,res) => {
    try {
         const {id}  = req.body;
        
         
         const currentBanner = await BannerModel.find({_id:id});
        
          const newVisibility = !currentBanner[0].visibility;
         
        const data = await BannerModel.updateMany(
          { _id: id },
          { $set: { visibility: newVisibility } }
        );
        
        return res.json({success:'Success'})
    } catch (error) {
        console.log(error)
        return res.json({error:'Server error please re Login'})
    }
}

const getBannerImg = async (req,res) => {
  try {
const data = await BannerModel.find({ visibility: true })
  .sort({ createdAt: -1 }) 
  .limit(3)
  .select({ BannerImg: 1, _id: 0 });

   if(data.length){
    return res.json(data)
   }else{
    return res.json([])
   }
  } catch (error) {
    console.log(error)
    return res.json({error:'Server please re-login'})
  }
}

export {addBanners,getBanners,deleteBanner,changeVisibility,getBannerImg}