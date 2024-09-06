import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { CreateEvidenceModel, UpdateEvidenceModel } from '../models/caseline';
import { AuthService } from './auth.service';
import { PostApiResponse } from '../models/core';

@Injectable({
  providedIn: 'root',
})
export class EvidencesService {
  private apiUrl = `${environment.apiRoot}evidences`;

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

  createEvidence(model: CreateEvidenceModel): Promise<PostApiResponse> {
    return firstValueFrom(
      this.http.post<PostApiResponse>(this.apiUrl, model, { headers: this.getAuthHeaders() })
    );
  }

  updateEvidence(id: number, model: UpdateEvidenceModel): Promise<void> {
    return firstValueFrom(
      this.http.put<void>(`${this.apiUrl}/${id}`, model, { headers: this.getAuthHeaders() })
    );
  }

  deleteEvidence(id: number): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
    );
  }
}
