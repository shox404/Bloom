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

export async function GET() {
  try {
    const { docs } = await getDocs(collection(db, "category"));
    const data = docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return reply(data, 200);
  } catch {
    return reply({ msg: "Server error" }, 500);
  }
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") as string;
  await verify(request);
  const data = await request.json();
  await updateDoc(doc(db, "category", id), data);
  return reply(data, 200);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") as string;
  await verify(request);
  await deleteDoc(doc(db, "category", id));
  return reply({ id }, 200);
}

export async function POST(request: NextRequest) {
  await verify(request);
  const data = await request.json();

  if (data.uploader) delete data.uploader;

  const q = query(collection(db, "category"), where("key", "==", data.key));
  const existingCategories = await getDocs(q);
  if (!existingCategories.empty) {
    return reply({ msg: "Category already exists" }, 400);
  }

  const added = await addDoc(collection(db, "category"), data);
  return reply({ ...data, id: added.id }, 201);
}
