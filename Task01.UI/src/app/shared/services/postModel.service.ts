import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PostModel } from '../models';
@Injectable({
  providedIn: 'root'
})
export class PostModelService {
  errorMessage: String = "HttpError";
  private url = "/postFile";
  constructor(private http: HttpClient) { }
  public PostModel(PostModel: PostModel): Observable<PostModel> {
    return this.http.post<PostModel>(environment.apiUrl + this.url, PostModel);
  }
}

