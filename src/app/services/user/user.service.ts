import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/app/app.module';
import { GetUserResponse } from 'src/app/models/response/get-user-response';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient
  ) {
  }

  getAll(): Observable<GetUserResponse[]> {
    const url = `${this.baseUrl}/users`;
    return this.http.get<GetUserResponse[]>(url);
  }

  getById(id: number): Observable<GetUserResponse> { 
    const url = `${this.baseUrl}/users/${id}`;
    return this.http.get<GetUserResponse>(url);
  }
}
