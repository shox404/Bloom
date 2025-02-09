import { storage } from "@/app/_appwrite/config";
import { ID } from "appwrite";
import { type NextRequest } from "next/server";
import { reply } from "../utils";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/app/_firebase/config";

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
  const url = storage.getFileView(bucketId, uploadedFile.$id);

  const msg = { id: uploadedFile.$id, url };

  setDoc(doc(db, "images", msg.id), { url: msg.url });

  return reply({ msg }, 200);
}
