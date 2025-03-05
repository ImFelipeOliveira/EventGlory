"user server";

import { decodeJwt, jwtDecrypt, JWTPayload } from "jose";
import { cookies } from "next/headers";
import { actionAPIFetch } from "../fetch-server";

export class TokenManager {
  static async refreshToken(): Promise<boolean> {
    try {
      const cookieStore = await cookies();
      const refreshToken = cookieStore.get("refresh_token")?.value;

      if (!refreshToken) {
        this.clearTokens();
        return false;
      }

      const response = await actionAPIFetch("token/refresh/", {
        method: "POST",
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response?.error.detail == "Token is blacklisted") {
        this.clearTokens();
        return false;
      }

      if (!response?.data?.access) {
        return false;
      }

      cookieStore.set("token_access", response?.data.access);
      cookieStore.set("refresh_token", response?.data.refresh);

      return true;
    } catch (error) {
      console.log("Erro ao renovar token: ", error);
      if (error) {
        this.clearTokens();
      }

      return false;
    }
  }
  static async shouldRefreshToken(token: string): Promise<boolean> {
    const payload = decodeJwt(token);
    const ONE_HOUR = 3600;
    try {
      const currentTime = Math.floor(Date.now() / 1000);

      return payload?.exp !== undefined && payload.exp - currentTime < ONE_HOUR;
    } catch (error) {
      return true;
    }
  }

  public static async clearTokens(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete("token_access");
    cookieStore.delete("refresh_token");
  }
}
