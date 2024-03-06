
import productModel from '../Models/ProductModel.js'
import {capitalizeFirstLetter} from '../Helpers/WordStructure.js'

const addProduct = async (req, res) => {
 
  try {
    if (!req.files.length) {
      return res.json({ error: "Choose image" });
    }
    const { productName, CategoryName, price } = req.body;
    const proName= await capitalizeFirstLetter(productName);
    
    
    const isExist = await productModel.find({productName:proName})
    if(isExist.length){
      return res.json({error:'Product name exist'})
      

    }
    const filePaths = req.files.map((file)=>file.filename);
    const result = await productModel.create({productName:proName,categoryName:CategoryName,price,photos:filePaths})

    if(result){
      
      return res.json(result)
    }
    
  } catch (error) {
    console.log(error)
    return res.json({error:'Server please re login'})
  }
};

const getProduct = async(req,res) =>{
   try {
    const getData = await productModel.find({isHide:false});
   
    return res.json(getData)
   } catch (error) {
     console.log(error)
     return res.json({error:'Server please re login'})
   }
}

const changeVisibility = async(req,res) =>{
 try {
  const {id} =req.body;
  const result = await productModel.findOne({_id:id})
  result.isHide = !result.isHide
  result.save()
  return res.json({success:'success'})

 } catch (error) {
  console.log(error)
  return res.json({error:'Server error please re login'})
 }
}


export {addProduct ,getProduct,changeVisibility}