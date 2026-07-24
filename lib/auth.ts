import { SignJWT, jwtVerify, JWTPayload } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error(
    "JWT_SECRET belum diset. Tambahkan JWT_SECRET di file .env kamu."
  );
}

const secretKey = new TextEncoder().encode(JWT_SECRET);

export interface SessionPayload extends JWTPayload {
  userId: string;
  role: "ADMIN" | "PARENT";
}

/**
 * Membuat JWT baru untuk session user yang berhasil login/register.
 */
export async function signToken(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

/**
 * Verifikasi JWT dari cookie. Return null kalau token invalid/expired.
 */
export async function verifyToken(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE_NAME = "session_token";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 hari