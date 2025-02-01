import { NextResponse } from "next/server";
import { getUserByPhone } from "@/app/_firebase/functions";

interface Props {
  params: { phone: string };
}

export async function GET({ params: { phone } }: Props) {
  try {
    const data = await getUserByPhone(phone);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
