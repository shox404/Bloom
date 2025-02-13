import { NextRequest } from "next/server";
import { reply } from "../utils";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/_firebase/config";
import { verify } from "@/app/api/utils";

export async function GET(request: NextRequest) {
  try {
    await verify(request);
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    if (!category) {
      return reply({ message: "Category is required" }, 400);
    }
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
