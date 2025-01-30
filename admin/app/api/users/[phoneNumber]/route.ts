import { NextResponse } from "next/server";
import { getUserByPhone } from "@/app/firebase/functions";

interface Params {
  params: { phoneNumber: string };
}

export async function GET({ params: { phoneNumber } }: Params) {
  try {
    const data = await getUserByPhone(phoneNumber);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
