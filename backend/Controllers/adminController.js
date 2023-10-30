import AdminModel from '../Models/AdminModel.js';
import CategoryModal from '../Models/CategoryModal.js'
import {comparePassword} from '../Helpers/Hashing.js';
import {getAdminToken,createAdminToken} from '../utils/generateToken.js'

const adminLogin = async (req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email){
            return res.json({error:'Email required'})
        }
        const ifAdmin = await AdminModel.find({email})
        if(!ifAdmin.length){
            return res.json({ error: "You lack administrative privileges." });
        }else{
         const data = await comparePassword(password,ifAdmin[0].password)
         if(!data){
            return res.json({error:'Wrong Password'})
         }
         return res.json(ifAdmin[0])
        }
    } catch (error) {
        console.log(error)
    }
}

const adminLogout = async (req,res) => {
    try {
        const token = await getAdminToken(req);
         res.setHeader(
           "Set-Cookie",
           `Badmin=${token}; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
         );
         res.json({ success: "Logout Successful" });
    } catch (error) {
        console.log(error)
        
    }
}

const addCategory=async(req,res)=>{
    try {
        const {category} = req.body;
        if(!category){
            return res.json({error:'Enter Category name'})
        }
                let largeCat = category.toUpperCase();

        let isExist = await CategoryModal.find({categoryName:largeCat})
        if(isExist.length){
            return res.json({error:'Category name is exist'})
        }
        const result = await CategoryModal.create({ categoryName: largeCat }); 
        if(!result){
            return res.json({error:'Category not added'})
        } 
        const data = await CategoryModal.find() 
      return   res.json(data)  
    } catch (error) {
      console.log(error)  
      return res.json({error:'Server error'})
    }
}

const getAllCategories = async (req,res) => {
   try {
    const catDetails = await CategoryModal.find()
    return res.json(catDetails)
   } catch (error) {
    console.log(error)
    return res.json({error:'Server error please re login'})
   }
}

const deleteCategory = async (req,res)=>{
    try {
       const {id} = req.query;
       const result = await CategoryModal.deleteOne({_id:id});
       if(result.deletedCount==1){
        const data = await CategoryModal.find()
        return res.json(data)
       }else{
        return res.json({error:'Cannot deleted'})
       }
       
    } catch (error) {
        console.log(error)
        return res.json({error:'Server please reLogin'})
    }
}




export {
  adminLogin,
  adminLogout,
  addCategory,
  getAllCategories,
  deleteCategory,
 
};