import subBannerModel from "../Models/SubBannerModel.js";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename); 

const addSubBanners = async (req, res) => {
  try {
    const bannerName = req.files[0].filename;
    if (!bannerName) {
      res.json({ error: "please select image" });
    } else {
      const result = await subBannerModel.create({ SubBannerImg: bannerName });
      if (result) {
        const finalResult = await subBannerModel.find();
        res.json(finalResult);
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ error: "server error please re login" });
  }
};

const getSubBanners = async (req, res) => {
  try {
    const data = await subBannerModel.find();

    if (data.length) {
      
      res.json(data);
    } else {
      res.json({ error: "Empty" });
    }
  } catch (error) {
    res.json({ error: "Server please re login" });
  }
};


const deleteSubBanner = async (req, res) => {
  try {
    const { id, imageName } = req.query;

    const imagePath = path.join(__dirname, "..", "uploads", imageName);

    const data = await subBannerModel.deleteOne({ _id: id });
    const result = await subBannerModel.find();

    if (data.acknowledged) {
      if (fs.existsSync(imagePath)) {
        try {
          // Delete the image file
          fs.unlinkSync(imagePath);
          return res.json(result);
        } catch (error) {
          console.log(error);
          return res.json({ error: "Error deleting image" });
        }
      } else {
        console.log(`Image ${imageName} not found.`);
        return res.json({ error: "Image not found" });
      }
    } else {
      return res.json({ error: "cannot delete Banner" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: "server error please re login" });
  }
};



const changeVisibilityOfSubBanner = async (req, res) => {
  try {
    const { id } = req.body;

    const currentBanner = await subBannerModel.find({ _id: id });

    const newVisibility = !currentBanner[0].visibility;

    const data = await subBannerModel.updateMany(
      { _id: id },
      { $set: { visibility: newVisibility } }
    );

    return res.json({ success: "Success" });
  } catch (error) {
    console.log(error);
    return res.json({ error: "Server error please re Login" });
  }
};

const getSubBannerImg = async (req, res) => {
  try {
    const data = await subBannerModel.find({ visibility: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .select({ SubBannerImg: 1, _id: 0 });

    if (data.length) {
     
      return res.json(data);
    } else {
      return res.json([]);
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: "Server please re-login" });
  }
};



export {
  addSubBanners,
  getSubBanners,
  deleteSubBanner,
  changeVisibilityOfSubBanner,
  getSubBannerImg,
};