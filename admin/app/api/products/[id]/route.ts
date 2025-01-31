import { NextRequest, NextResponse } from "next/server";
import { verify } from "@/app/api/global";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/_firebase/config";

export async function PUT(
  request: NextRequest,
  { params: { id } }: { params: { id: any } }
) {
  await verify(request);
  const data = await request.json();
  await updateDoc(doc(db, "items", id), data);
  return NextResponse.json(data, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params: { id } }: { params: { id: any } }
) {
  await verify(request);
  await deleteDoc(doc(db, "items", id));
  return NextResponse.json({ id }, { status: 200 });
}
