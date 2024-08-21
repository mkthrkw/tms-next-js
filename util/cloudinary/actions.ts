"use server";

import { getUser } from "@/features/user/actions";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadImage(fileData:string, public_id:string = '') {
  const user = await getUser();
  const options = {
    asset_folder: 'tms-app/' + user.id,
    public_id: public_id,
  }
  return await cloudinary.uploader.upload(fileData,options);
}