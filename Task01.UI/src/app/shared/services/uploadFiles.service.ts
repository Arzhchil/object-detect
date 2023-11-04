import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FileModel } from '../models';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  errorMessage: String = "HttpError";
  private url = "/postFiles";
  constructor(private http: HttpClient) { }
  public uploadFiles(fileModel: FileModel):Observable<FileModel> {
    return this.http.post<FileModel>(environment.apiUrl + this.url, fileModel)
  }

}

