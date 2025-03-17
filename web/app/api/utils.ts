import { type NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const reply = (
  data: string | number | undefined | object | [],
  status: number
) => {
  return NextResponse.json(data, { status: status });
};

export async function verify(request: NextRequest): Promise<void> {
  const token = await request.cookies.get("admin-token")?.value as string;
  if (!token) throw reply({ msg: "Unauthorised!" }, 401);
  try {
    jwt.verify(token, process.env.JWT_SECRET_ADMIN!);
  } catch {
    throw reply({ msg: "Invalid token!" }, 403);
  }
}
