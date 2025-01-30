import { NextRequest, NextResponse } from "next/server";
import { getUserById } from "@/app/firebase/functions";
import { cookies } from "next/headers";
import { secretKey } from "../global";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const cookie = await cookies();
    const token = cookie.get("user_token");

    let decoded;
    if (token?.value) {
      decoded = jwt.verify(token.value, secretKey);
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!decoded)
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });

    return NextResponse.json(decoded);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
