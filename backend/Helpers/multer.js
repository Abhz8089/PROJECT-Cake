import multer from "multer";
import sharp from "sharp";
import fs from "fs";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

const imageCropMiddleware = (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next();
  }

  const squareSize = 200;
   

  const cropNextImage = (index) => {
    if (index < req.files.length) {
      const file = req.files[index];
      const tempFilePath = file.path + '.temp'; 
      

      sharp(file.path)
        .resize(squareSize, squareSize)
        .toFile(tempFilePath, (err) => {
          if (err) {
            return next(err);
          }

        
          fs.rename(tempFilePath, file.path, (err) => {
            if (err) {
              return next(err);
            }

            cropNextImage(index + 1);
          });
        });
    } else {
      // All images cropped, proceed to the next middleware
      next();
    }
  };

  // Start cropping the first image
  cropNextImage(0);
};
const imageCropMiddlewareForBanner = (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next();
  }

  const targetWidth = 6571;
  const targetHeight = 2555;

  const cropNextImage = (index) => {
    if (index < req.files.length) {
      const file = req.files[index];
      const tempFilePath = file.path + ".temp";

      sharp(file.path)
        .resize(targetWidth, targetHeight)
        .toFile(tempFilePath, (err) => {
          if (err) {
            return next(err);
          }

          fs.rename(tempFilePath, file.path, (err) => {
            if (err) {
              return next(err);
            }

            cropNextImage(index + 1);
          });
        });
    } else {
      // All images resized, proceed to the next middleware
      next();
    }
  };

  // Start resizing the first image
  cropNextImage(0);
};


export { upload, imageCropMiddleware, imageCropMiddlewareForBanner };
