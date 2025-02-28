import { NextRequest } from "next/server";
import { reply } from "../utils";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/app/_database/firebase";
import { verify } from "@/app/api/utils";
import { storage } from "@/app/_database/appwrite";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    let mainQ = query(collection(db, "products"));
    if (category) {
      mainQ = query(
        collection(db, "products"),
        where("category", "==", category)
      );
    }
    const snapshot = await getDocs(mainQ);
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return reply(products, 200);
  } catch {
    return reply({ message: "Internal Server Error" }, 500);
  }
}

export async function POST(request: NextRequest) {
  await verify(request);
  const data = await request.json();

  if (data.uploader) delete data.uploader;

  const result = await addDoc(collection(db, "products"), {
    ...data,
    active: true,
  });

  return reply({ ...data, id: result.id }, 201);
}

export async function PUT(request: NextRequest) {
  try {
    await verify(request);
    const data = await request.json();

    const image = data.new_image || data.image || null;
    delete data.new_image;

    const updateData = { ...data };
    if (image) updateData.image = image;

    await updateDoc(doc(db, "products", data.id), updateData);
    delete data.id;

    if (data.image && image !== data.image) {
      const bucketId = "679f09690013e0e294d5";
      storage.deleteFile(bucketId, data.image);
    }

    return reply(updateData, 200);
  } catch {
    return reply({ message: "Internal Server Error" }, 500);
  }
}

export async function DELETE(request: NextRequest) {
  await verify(request);
  const data = await request.text();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") as string;
  const bucketId = "679f09690013e0e294d5";
  storage.deleteFile(bucketId, data);
  await deleteDoc(doc(db, "products", id));
  return reply({ id }, 200);
}
