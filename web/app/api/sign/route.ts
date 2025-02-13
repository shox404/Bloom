import { NextRequest, NextResponse } from "next/server";
import { expires } from "@/app/_utils/cookie";
import { secretKey } from "../global";
import { verify } from "../utils";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  await verify(request);
  const data = await request.json();

  const token = jwt.sign(data, secretKey);

  const response = NextResponse.json({
    message: "Token generated successfully",
  });
  response.cookies.set("user_token", token, { expires });

  return response;
}
