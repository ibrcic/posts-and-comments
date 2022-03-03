import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetPostResponse } from 'src/app/models/response/get-post-response';
import { API_BASE_URL } from '../../app.module';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient
  ) {
  }

  getAll(): Observable<GetPostResponse[]> {
    const url = `${this.baseUrl}/posts`;
    return this.http.get<GetPostResponse[]>(url);
  }

  getById(id: number): Observable<GetPostResponse> { 
    const url = `${this.baseUrl}/posts/${id}`;
    return this.http.get<GetPostResponse>(url);
  }
}
