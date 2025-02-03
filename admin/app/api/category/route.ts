import { NextRequest, NextResponse } from "next/server";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/app/_firebase/config";
import { verify } from "@/app/api/global";

export async function GET() {
  try {
    const { docs } = await getDocs(collection(db, "category"));
    const data = docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ msg: "Server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  await verify(request);
  const data = await request.json();
  const added = await addDoc(collection(db, "category"), data);
  return NextResponse.json({ ...data, id: added.id }, { status: 201 });
}
