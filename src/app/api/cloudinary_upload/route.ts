// pages/api/upload.ts
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

// Initialize Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// API route handler

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { file } = reqBody;
    console.log(reqBody);
    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 500 }
      );
    }

    // Upload the image to Cloudinary
    const uploadResponse = await cloudinary.v2.uploader.upload(file, {
      folder: "slides",
    });
    return NextResponse.json(
      {
        message: "New Notice saved successfully",
        success: true,
        data: uploadResponse,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
