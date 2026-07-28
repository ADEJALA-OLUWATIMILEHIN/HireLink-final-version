import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const allowedExtensions = /\.(jpeg|jpg|png|pdf|doc|docx)$/i;
const allowedMimeTypes = /^(image\/(jpeg|png)|application\/pdf|application\/msword|application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document)$/;

const configureCloudinary = () => {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.");
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
};

const fileFilter = (req: any, file: any, cb: any) => {
  const extname = allowedExtensions.test(file.originalname);
  const mimetype = allowedMimeTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only .png, .jpg, .jpeg, .pdf, .doc and .docx formats are allowed!"));
  }
};

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter,
});

export const uploadSingleFile = upload.single("resume");

export const uploadFileToCloudinary = (file: Express.Multer.File) =>
  new Promise<string>((resolve, reject) => {
    try {
      configureCloudinary();

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "hirelink/resumes",
          resource_type: "raw",
          public_id: `resume-${Date.now()}-${Math.round(Math.random() * 1e9)}`,
          overwrite: false,
        },
        (error, result) => {
          if (error || !result?.secure_url) {
            reject(error ?? new Error("Cloudinary did not return a file URL."));
            return;
          }

          resolve(result.secure_url);
        }
      );

      uploadStream.end(file.buffer);
    } catch (error) {
      reject(error);
    }
  });
