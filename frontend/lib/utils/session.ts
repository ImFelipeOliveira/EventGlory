"user server";

import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.NEXT_PUBLIC_SECRET_KEY);
export async function verifyToken(token: string | undefined = "") {
  if (token === "") {
    return null;
  }
  const tokenPayload = jwtVerify(token, SECRET_KEY);
  return tokenPayload;
}
