import { NextRequest, NextResponse } from "next/server";
import { expires } from "@/app/_utils/cookie";
import { secretKey } from "../global";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const token = jwt.sign(data, secretKey);

  const response = NextResponse.json({
    message: "Token generated successfully",
  });
  response.cookies.set("user_token", token, { expires });

  return response;
}
