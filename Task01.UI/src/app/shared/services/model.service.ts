import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Model } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  errorMessage: String = "HttpError";
 private url = "/getUser";

  constructor(private http: HttpClient) { }

  public GetModel() : Observable<Model[]> {
    return this.http.get<Model[]>(environment.apiUrl + this.url);
  }
}

