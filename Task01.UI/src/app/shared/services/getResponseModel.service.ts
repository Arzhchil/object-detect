import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetResponseService {
  errorMessage: String = "HttpError";
  private url = "/getBlob";
  constructor(private http: HttpClient) { }
  public GetResponseModel(): Observable<Blob> {
    return this.http.get((environment.apiUrl + this.url), {
      responseType: 'blob'
    })
  }
}

