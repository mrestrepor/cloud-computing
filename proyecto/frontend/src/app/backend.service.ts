import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {
    const payload = { message };
    console.log(payload);
    return this.http.post(`/api/v1/process_message`, payload);
  }
}
 