import mongoose from "mongoose";

const User = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone:{
     type: Number,
     unique:true,
    },

    email: {
      type: String,
      
    },
    password: {
      type: String,
      required: false,
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("User", User);
export default user;
