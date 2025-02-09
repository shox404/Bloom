import { storage } from "@/app/_appwrite/config";
import { reply } from "../../utils";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/app/_firebase/config";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try { 
    const bucketId = "679f09690013e0e294d5";
  
    const uploadedFile = await storage.getFile(bucketId, id);
    const url = storage.getFileView(bucketId, uploadedFile.$id);
    
    return reply({ msg: url }, 200);
  } catch (error) {
    return reply({ msg: "File not found" }, 404);
  }
}

export async function DELETE(
  _request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const bucketId = "679f09690013e0e294d5";
    storage.deleteFile(bucketId, id);
    deleteDoc(doc(db, "images", id));
    return reply({ msg: id }, 200);
  } catch (error) {
    return reply({ msg: "File not found" }, 404);
  }
}
