import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { secretKey } from "../global";
import { getUserByPhone } from "@/app/_database/firebase-functions";
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
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    const user = await getUserByPhone(phone);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
