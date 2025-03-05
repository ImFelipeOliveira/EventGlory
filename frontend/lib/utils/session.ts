"user server";

import { decodeJwt } from "jose";

export async function decrypt(token: string | undefined = "") {
  if (token === "") {
    return null;
  }
  const tokenPayload = decodeJwt(token);
  return tokenPayload;
}
