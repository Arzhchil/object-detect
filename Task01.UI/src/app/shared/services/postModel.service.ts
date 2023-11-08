import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PostModel } from '../models';
import { Data } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PostModelService {
  errorMessage: String = "HttpError";
  private url = "/postFile";
  constructor(private http: HttpClient) { }

  public PostModel(body: any): Observable<any> {
    debugger;
    return this.http.post<any>(environment.apiUrl + this.url, body);
  }
}

