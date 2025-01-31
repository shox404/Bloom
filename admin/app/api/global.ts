import { type NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function verify(request: NextRequest): Promise<void> {
  const token = request.cookies.get("admin-token")?.value as string;
  if (!token)
    throw NextResponse.json({ msg: "Unauthorised!" }, { status: 401 });
  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY!);
  } catch (error) {
    throw NextResponse.json({ msg: "Invalid token!" }, { status: 403 });
  }
}
