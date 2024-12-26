import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  const imagesDir = path.join(process.cwd(), "public", "images");

  try {
    // Read the directory contents
    const files = fs.readdirSync(imagesDir);

    // Filter and construct URLs
    const imagePaths = files
      .filter((file) => /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file))
      .map((file) => `/images/${file}`);

    return NextResponse.json({ images: imagePaths });
  } catch (error) {
    console.error("Error reading images directory:", error);
    return NextResponse.json(
      { error: "Unable to retrieve images" },
      { status: 500 },
    );
  }
}
