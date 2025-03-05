import { decodeJwt } from "jose";

export async function decrypt(token: string | undefined = "") {
  try {
    const tokenPayload = decodeJwt(token);
    return tokenPayload;
  } catch (error) {
    console.error("Erro ao decodificar token: ", error);
    return { error: error };
  }
}
