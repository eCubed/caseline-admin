import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { CreateAssertionModel, UpdateAssertionModel } from '../models/caseline';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AssertionsService {
  private apiUrl = `${environment.apiRoot}assertions`;

  constructor(private http: HttpClient,
              private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.tokenResponse()?.accessToken ?? 'x'
    let headers = new HttpHeaders()
    if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  createAssertion(model: CreateAssertionModel): Promise<number> {
    return firstValueFrom(
      this.http.post<number>(this.apiUrl, model, { headers: this.getAuthHeaders() })
    );
  }

  updateAssertion(id: number, model: UpdateAssertionModel): Promise<void> {
    return firstValueFrom(
      this.http.put<void>(`${this.apiUrl}/${id}`, model, { headers: this.getAuthHeaders() })
    );
  }

  deleteAssertion(id: number): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
    );
  }
}
