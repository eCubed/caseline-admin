import { Injectable, WritableSignal, signal } from '@angular/core';
import { Login, TokenResponse } from '../models/logins'
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #tokenResponse: WritableSignal<TokenResponse | null> = signal(null);
  tokenResponse = this.#tokenResponse.asReadonly();

  #loginError: WritableSignal<boolean> = signal(false)
  loginError = this.#loginError.asReadonly();

  #isLoggingIn: WritableSignal<boolean> = signal(false);
  isLoggingIn = this.#isLoggingIn.asReadonly();

  constructor(private http: HttpClient) {
    const savedTokenResponse = this.loadTokenResponse();
    if (savedTokenResponse) {
      this.#tokenResponse.set(savedTokenResponse);
    }

  }

  private loadTokenResponse(): TokenResponse | null {
    const tokenResponse = localStorage.getItem('tokenResponse');
    return tokenResponse ? JSON.parse(tokenResponse) : null;
  }

  private saveTokenResponse(tokenResponse: TokenResponse | null): void {
    if (tokenResponse) {
      localStorage.setItem('tokenResponse', JSON.stringify(tokenResponse));
    } else {
      localStorage.removeItem('tokenResponse');
    }
  }

  login(login: Login): void {

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new HttpParams()
      .set('username', login.username)
      .set('password', login.password);

    this.#isLoggingIn.set(true)
    this.http.post<TokenResponse>(environment.tokenEndpoint, body.toString(), { headers })
      .subscribe({
        next: (response) => { 
          this.#tokenResponse.set(response)
          this.saveTokenResponse(response)
          this.#loginError.set(false)
          this.#isLoggingIn.set(false)
        },
        error: (error) => { 
          this.#loginError.set(true)
          this.#isLoggingIn.set(false)
          console.error('Login failed', error) 
        }
      })
  }

  logout(): void {
    this.#tokenResponse.set(null);
    this.saveTokenResponse(null);
  }
}
