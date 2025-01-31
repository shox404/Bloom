import { AdminData } from "@/app/types";
import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/_firebase/config";
import { cookies } from "next/headers";
import { expires } from "@/app/_utils/cookie";
import { verify } from "@/app/api/global";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function GET() {
  const data = (await getDoc(doc(db, "app", "admin"))).data() as AdminData;
  return NextResponse.json({ name: data.name }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const { name, password } = (await request.json()) as AdminData;
  if (!name || !password)
    return NextResponse.json({ msg: "Enter details!" }, { status: 400 });
  const data = (await getDoc(doc(db, "app", "admin"))).data() as AdminData;
  const compare = await bcrypt.compare(password, data.password);
  if (data.name === name && compare) {
    const token = jwt.sign(data, process.env.JWT_SECRET!);
    cookieStore.set("admin-token", token, { expires });
  } else {
    return NextResponse.json(
      { msg: "Incorrect password or name!" },
      { status: 401 }
    );
  }
  return NextResponse.json({ msg: "Successfully logged in." }, { status: 200 });
}

export async function PUT(request: NextRequest) {
  await verify(request);
  const cookieStore = await cookies();
  const data = (await request.json()) as AdminData;
  const secured = await bcrypt.hash(data.password, 10);
  await updateDoc(doc(db, "app", "admin"), { ...data, password: secured });
  const token = jwt.sign(data, process.env.JWT_SECRET!);
  cookieStore.set("admin-token", token, { expires });
  return NextResponse.json({ msg: "Successfully updated." }, { status: 200 });
}
