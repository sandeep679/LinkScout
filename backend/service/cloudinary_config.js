import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD,
    api_key: process.env.CLOUD_API,
    api_secret: process.env.CLOUD_SECRET,
  });


export default cloudinary;