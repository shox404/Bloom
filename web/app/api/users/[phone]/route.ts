import { NextResponse } from "next/server";
import { getUserByPhone } from "@/app/_firebase/functions";

interface Params {
  params: { phone: string };
}

export async function GET({ params: { phone } }: Params) {
  try {
    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    const data = await getUserByPhone(phone);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
