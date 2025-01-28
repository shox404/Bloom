import { jwtVerify, SignJWT, JWTPayload } from "jose";

export const getJwtSecretKey = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT_SECRET is not set.");
  }
  return secret;
};

export async function generateJwtToken(data: JWTPayload, expiresIn = "30d") {
  const secretKey = new TextEncoder().encode(getJwtSecretKey());
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
      new TextEncoder().encode(getJwtSecretKey())
    );
    return verified.payload;
  } catch (error) {
    throw new Error("Your token is expired or invalid.");
  }
}

export function saveTokenInCookie(token: string, expiresIn: string): void {
  const expirationDate = new Date();
  const days = parseInt(expiresIn.replace("d", ""), 10);
  expirationDate.setDate(expirationDate.getDate() + days);

  document.cookie = `user_token=${token}; expires=${expirationDate.toUTCString()}; path=/; secure; HttpOnly`;
}

export function getTokenFromCookie(): string | null {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("user_token="));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
}
