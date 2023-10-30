import mongoose from "mongoose";

const Product = mongoose.Schema(
  {
    productName:{
     type: String,
     
    },
    categoryName: {
      type: String,
      required: true,
    },
    price:{
        type:Number,
    },
    photos:{
        type:[String]
    },
    isHide:{
        type:Boolean,
        default:false
    }
  },
  {
    timestamps: true,
  }
);

const Pro = mongoose.model("Products", Product);
export default Pro;
