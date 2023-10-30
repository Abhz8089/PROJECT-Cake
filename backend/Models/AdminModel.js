import mongoose from "mongoose";

const Admin = mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const admin = mongoose.model("Admin", Admin);
export default admin;
