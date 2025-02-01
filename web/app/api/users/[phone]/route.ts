import { NextRequest, NextResponse } from "next/server";
import { getUserByPhone } from "@/app/_firebase/functions";

export async function GET(
  _request: NextRequest, // First argument: NextRequest
  { params }: { params: { phone: string } } // Second argument: params object
) {
  try {
    if (!params.phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    const data = await getUserByPhone(params.phone);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
