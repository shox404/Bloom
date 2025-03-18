import { AdminData } from "@/app//types";
import { NextRequest } from "next/server";
import { reply } from "@/app/api/utils";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/_database/firebase";
import { cookies } from "next/headers";
import { expires } from "@/app/_utils/cookie";
import { verify } from "@/app/api/utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function GET() {
  const data = (await getDoc(doc(db, "app", "admin"))).data() as AdminData;
  return reply({ name: data.name }, 200);
}

export async function POST(request: NextRequest) {
  await verify(request);
  const cookieStore = await cookies();
  const { name, password }: AdminData = await request.json();
  if (!name || !password) return reply({ msg: "Enter details!" }, 400);
  const data = (await getDoc(doc(db, "app", "admin"))).data() as AdminData;
  const compare = await bcrypt.compare(password, data.password);
  if (data.name === name && compare) {
    const token = jwt.sign(data, process.env.JWT_SECRET_ADMIN!);
    cookieStore.set("admin-token", token, { expires });
  } else {
    return reply({ msg: "Incorrect password or name!" }, 401);
  }
  return reply({ msg: "Successfully logged in." }, 200);
}

export async function PUT(request: NextRequest) {
  await verify(request);
  const cookieStore = await cookies();
  const data = (await request.json()) as AdminData;
  const secured = await bcrypt.hash(data.password, 10);
  await updateDoc(doc(db, "app", "admin"), { ...data, password: secured });
  const token = jwt.sign(data, process.env.JWT_SECRET_ADMIN!);
  cookieStore.set("admin-token", token, { expires });
  return reply({ msg: "Successfully updated." }, 200);
}
