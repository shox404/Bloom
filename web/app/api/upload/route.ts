import { storage } from "@/app/_appwrite/config";
import { ID } from "appwrite";
import { NextRequest } from "next/server";
import { reply } from "../utils";
import { db } from "@/app/_firebase/config";
import { deleteDoc, doc } from "firebase/firestore";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") as string;
    const bucketId = "679f09690013e0e294d5";

    const uploadedFile = await storage.getFile(bucketId, id);
    const url = storage.getFileView(bucketId, uploadedFile.$id);

    return reply({ msg: url }, 200);
  } catch {
    return reply({ msg: "File not found" }, 404);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") as string;
    const bucketId = "679f09690013e0e294d5";
    storage.deleteFile(bucketId, id);
    deleteDoc(doc(db, "images", id));
    return reply({ msg: id }, 200);
  } catch {
    return reply({ msg: "File not found" }, 404);
  }
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof Blob)) {
    return reply({ msg: "No file uploaded" }, 400);
  }

  const fileId = ID.unique();
  const bucketId = "679f09690013e0e294d5";
  const appwriteFile = new File([file], file.name, { type: file.type });

  const uploadedFile = await storage.createFile(bucketId, fileId, appwriteFile);

  return reply({ msg: uploadedFile.$id }, 200);
}
