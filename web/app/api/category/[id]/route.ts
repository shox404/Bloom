import { NextRequest } from "next/server";
import { reply, verify } from "@/app/api/utils";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/_firebase/config";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await verify(request);
  const { id } = params;
  const data = await request.json();
  await updateDoc(doc(db, "category", id), data);
  return reply(data, 200);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await verify(request);
  await deleteDoc(doc(db, "category", id));
  return reply({ id }, 200);
}
