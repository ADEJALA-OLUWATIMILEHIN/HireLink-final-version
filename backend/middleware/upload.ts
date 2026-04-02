import multer from "multer";
import path from "path";

// 1. Define where and how to store the file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Make sure this folder exists in your root!
  },
  filename: (req, file, cb) => {
    // Give the file a unique name to avoid overwriting
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// 2. Define the filter (PDF, JPG, PNG only)
const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only .png, .jpg, .jpeg and .pdf formats are allowed!"));
  }
};

// 3. Export the middleware
export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter,
});

export const uploadSingleFile = upload.single("resume");