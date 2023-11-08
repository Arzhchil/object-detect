import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GetModel } from '../models';
@Injectable({
  providedIn: 'root'
})
export class GetModelService {
  errorMessage: String = "HttpError";
  private url = "/getTest";
  constructor(private http: HttpClient) { }
  public GetModel(): Observable<GetModel[]> {
    return this.http.get<GetModel[]>(environment.apiUrl + this.url);
  }
}

