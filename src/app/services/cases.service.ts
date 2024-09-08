import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { firstValueFrom } from 'rxjs';
import {
  CreateCaseModel,
  UpdateCaseModel,
  EditCaseModel,
  PublicCaseDisplayModel,
  AdminCaseDisplayModel,
  DisplayCaseModel,
} from '../models/caseline';
import { AuthService } from './auth.service';
import { PostApiResponse } from '../models/core';

@Injectable({
  providedIn: 'root',
})
export class CasesService {
  private apiUrl = `${environment.apiRoot}cases`;

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

  createCase(model: CreateCaseModel): Promise<PostApiResponse> {
    return firstValueFrom(
      this.http.post<PostApiResponse>(this.apiUrl, model, { headers: this.getAuthHeaders() })
    );
  }

  updateCase(id: number, model: UpdateCaseModel): Promise<void> {
    return firstValueFrom(
      this.http.put<void>(`${this.apiUrl}/${id}`, model, { headers: this.getAuthHeaders() })
    );
  }

  deleteCase(id: number): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
    );
  }

  getCaseForEdit(id: number): Promise<EditCaseModel> {
    return firstValueFrom(
      this.http.get<EditCaseModel>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
    );
  }

  getCaseForDisplay(normalizedName: string): Promise<DisplayCaseModel> {
    return firstValueFrom(
      this.http.get<DisplayCaseModel>(`${this.apiUrl}/display/${normalizedName}`, { headers: this.getAuthHeaders() })
    );
  }

  getAllCasesForPublicDisplay(): Promise<PublicCaseDisplayModel[]> {
    return firstValueFrom(
      this.http.get<PublicCaseDisplayModel[]>(`${this.apiUrl}/public`, { headers: this.getAuthHeaders() })
    );
  }

  getAllCasesForAdminDisplay(): Promise<AdminCaseDisplayModel[]> {
    return firstValueFrom(
      this.http.get<AdminCaseDisplayModel[]>(`${this.apiUrl}/admin`, { headers: this.getAuthHeaders() })
    );
  }
}
