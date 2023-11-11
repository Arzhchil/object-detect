import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RetrainingModel } from '../models';
@Injectable({
  providedIn: 'root'
})
export class PostRetrainingService {
  errorMessage: String = "HttpError";
  private url = "/postImg";
  constructor(private http: HttpClient) { }

  public PostRetrainingImg(retrainingModel: RetrainingModel): Observable<RetrainingModel> {
    return this.http.post<RetrainingModel>(environment.apiUrl + this.url, retrainingModel);
  }
}

