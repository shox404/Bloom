import { NextRequest, NextResponse } from "next/server";
import { ID } from "appwrite";
import { APPWRITE_BUCKET_ID, storage } from "@/app/_appwrite/config";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const response = await storage.createFile(
      APPWRITE_BUCKET_ID!,
      ID.unique(),
      file
    );
    return NextResponse.json({
      fileId: response.$id,
      message: "File uploaded successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Upload failed", details: error },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get("fileId");

  if (!fileId) {
    return NextResponse.json({ error: "Missing fileId" }, { status: 400 });
  }

  try {
    const fileUrl = storage.getFileView(APPWRITE_BUCKET_ID!, fileId);
    return NextResponse.json({ fileUrl });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get file", details: error },
      { status: 500 }
    );
  }
}
