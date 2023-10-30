import ProductModel from '../Models/ProductModel.js'

const getFCProducts = async (req,res) => {
try {
    const {Cname} =req.query;
    const result = await ProductModel.find({categoryName:Cname})
    return res.json(result)
} catch (error) {
    console.log(error)
    return res.json({error:'server please re login'})
}
}

export {getFCProducts}