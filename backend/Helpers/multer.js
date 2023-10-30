import multer from "multer";
import sharp from "sharp";

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

// Middleware for image cropping to a square of size 200x200 pixels
const imageCropMiddleware = (req, res, next) => {
  if (!req.files || req.files.length === 0) {
    return next();
  }

  const squareSize = 200; // Define the square size here

  const cropNextImage = (index) => {
    if (index < req.files.length) {
      const file = req.files[index];
      sharp(file.path)
        .resize(squareSize, squareSize)
        .toFile(file.path, (err) => {
          if (err) {
            return next(err);
          }
          cropNextImage(index + 1);
        });
    } else {
      // All images cropped, proceed to the next middleware
      next();
    }
  };

  // Start cropping the first image
  cropNextImage(0);
};

export { upload, imageCropMiddleware };
