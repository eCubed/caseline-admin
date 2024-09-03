import { HttpHeaders } from "@angular/common/http";
import { AuthService } from "../services/auth.service";

export const getAuthHeaders = (authService: AuthService): HttpHeaders => {
  const token = authService.tokenResponse()?.accessToken ?? 'x'
  let headers = new HttpHeaders()
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
}