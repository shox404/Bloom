import { NextRequest, NextResponse } from "next/server";
import { getUserByPhone } from "@/app/_firebase/functions";

interface Props {
  params: { phone: string };
}

export async function GET(
  request: NextRequest,
  { params: { phone } }: Props
) {
  try {
    const data = await getUserByPhone(phone);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
