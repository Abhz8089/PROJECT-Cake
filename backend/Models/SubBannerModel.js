import mongoose from "mongoose";

const SubBanner = mongoose.Schema(
  {
    SubBannerImg: {
      type: String,
    },
    visibility: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const subBanner = mongoose.model("SubBanner", SubBanner);
export default subBanner;
