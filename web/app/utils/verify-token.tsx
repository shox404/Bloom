import { jwtVerify, SignJWT, JWTPayload } from "jose";
import cookie from "cookie";

export async function generateJwtToken(data: JWTPayload, expiresIn = "30d") {
  const secretKey = new TextEncoder().encode("privatekeyuserdata");
  const token = await new SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresIn)
    .sign(secretKey);

  saveTokenInCookie(token, expiresIn);
}

export async function verifyJwtToken(token: string): Promise<any> {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode("privatekeyuserdata")
    );
    return verified.payload;
  } catch (error) {
    throw new Error("Your token is expired or invalid.");
  }
}

export function saveTokenInCookie(token: string, expiresIn: string): void {
  const days = parseInt(expiresIn.replace("d", ""), 10);
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);

  const cookieString = cookie.serialize("user_token", token, {
    expires: expirationDate,
    path: "/",
    secure: true,
    httpOnly: true,
  });

  document.cookie = cookieString;
}

export function getTokenFromCookie(): string | null {
  const cookies = cookie.parse(document.cookie);
  return cookies["user_token"] || null;
}
