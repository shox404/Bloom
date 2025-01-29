import { NextRequest, NextResponse } from "next/server";
import { expires } from "@/app/utils/cookie";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const token = jwt.sign(data, process.env.JWT_SECRET!);

  const response = NextResponse.json({
    message: "Token generated successfully",
  });
  response.cookies.set("user_token", token, { expires });
  response.cookies.set("user_data", data.id, { expires });

  return response;
}
