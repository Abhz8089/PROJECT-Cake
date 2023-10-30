import mongoose from "mongoose";

const Category = mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

const Cat = mongoose.model("Category", Category);
export default Cat;
