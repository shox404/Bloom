import { NextRequest } from "next/server";
import { reply, verify } from "@/app/api/utils";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/app/_firebase/config";
import { storage } from "@/app/_appwrite/config";

export async function GET(request: NextRequest) {
  try {
    await verify(request);
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    if (!category) {
      return reply({ message: "Category is required" }, 400);
    }
    console.log(category);

    const q = query(
      collection(db, "products"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return reply(products, 200);
  } catch {
    return reply({ message: "Internal Server Error" }, 500);
  }
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

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  await verify(request);
  const data = await request.text();

  const bucketId = "679f09690013e0e294d5";
  storage.deleteFile(bucketId, data);
  await deleteDoc(doc(db, "products", id));
  return reply({ id }, 200);
}
