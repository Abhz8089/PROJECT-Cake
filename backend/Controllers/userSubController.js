import productModel from '../Models/ProductModel.js'


const priceFilter = async (req,res) =>{
   try {
   const {lp ,hp} =req.query
  const filterProduct = await productModel.find({ price: { $gte: lp, $lte: hp } })
  console.log(filterProduct)
  return res.json(filterProduct)


   } catch (error) {
    console.log(error)
   }
}

const addToCart = async (req,res) => {
   try {
      const {_id,name,quantity,image,price} = req.body;
    

   } catch (error) {
      console.log(error)
   }
}
export {priceFilter,addToCart}