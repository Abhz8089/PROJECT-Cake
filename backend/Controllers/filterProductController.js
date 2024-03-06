import ProductModel from '../Models/ProductModel.js';
import fs from 'fs'
import path from 'path';
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 

const getFCProducts = async (req,res) => {
try {
    const {Cname} =req.query;
    const result = await ProductModel.find({categoryName:Cname,isHide:false})
    return res.json(result)
} catch (error) {
    console.log(error)
    return res.json({error:'server please re login'})
}
}

const deleteProduct = async (req,res) => {
    try {
        const {id,imageName} = req.query
      
        
        const imagePath = path.join(__dirname,'..',"uploads",imageName[0]) 
        const data = await ProductModel.deleteOne({_id:id})
        const result = await ProductModel.find()

        if(data.acknowledged){
            if(fs.existsSync(imagePath)){
                try {
                    fs.unlinkSync(imagePath);
                    return res.json(result)
                } catch (error) {
                    console.log(error)
                    return res.json({error:'Error deleting image'})
                }
            } else {
                console.log(`Image ${imageName} not found`);
                return res.json({error:'Image not found'})
            }
        }
    } catch (error) {
        console.log(error)
        return res.json({error:'Server error please re login'})
    }
}


export { getFCProducts, deleteProduct };