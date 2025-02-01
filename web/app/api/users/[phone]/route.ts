import { NextRequest, NextResponse } from "next/server";
import { getUserByPhone } from "@/app/_firebase/functions";

export async function GET(
  _request: NextRequest,
  { params }: { params: { phone: string } }
) {
  try {
    const data = await getUserByPhone(params.phone);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
