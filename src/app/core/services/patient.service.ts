import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Patient } from '../models/patient.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PatientService {
  private baseUrl = environment.useMockApi
    ? `${environment.mockApiBaseUrl}/patients`
    : `${environment.apiBaseUrl}/patients`;

  constructor(private http: HttpClient) {}

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseUrl);
  }

  getPatient(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/${id}`);
  }

  createPatient(data: Patient): Observable<Patient> {
    return this.http.post<Patient>(this.baseUrl, data);
  }

  updatePatient(id: string, data: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.baseUrl}/${id}`, data);
  }

  deletePatient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
