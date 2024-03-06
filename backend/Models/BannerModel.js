import mongoose from "mongoose";

const Banner = mongoose.Schema(
  {
   BannerImg:{
    type:String
   },
   visibility:{
    type:Boolean,
    default:true
   }
  },
  {
    timestamps: true,
  }
);

const banner = mongoose.model("Banner", Banner);
export default banner;
