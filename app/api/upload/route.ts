import fs from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req: Request): Promise<Response> {
  try {
    // Parse form data
    const data = await req.formData();

    // Extract the file
    const file = data.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Ensure the file is an image
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/svg+xml",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    // File details
    const filename = file.name;
    const imagesDir = path.join(process.cwd(), "public", "images");
    const filepath = path.join(imagesDir, filename);

    // Write file to the `public/images` directory
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.mkdir(imagesDir, { recursive: true }); // Ensure the directory exists
    await fs.writeFile(filepath, buffer as unknown as Uint8Array);

    return NextResponse.json({ success: true, path: `/images/${filename}` });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 },
    );
  }
}
