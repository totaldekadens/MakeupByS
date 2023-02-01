import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* export const cloudinaryPath =
  "https://res.cloudinary.com/dkzh2lxon/image/upload/v1675178603/makeupbys/"; */

export default cloudinary;
