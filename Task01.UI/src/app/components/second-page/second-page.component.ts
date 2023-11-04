import { Component } from '@angular/core';
import { GetModel, FileModel } from 'src/app/shared/models';
import { GetModelService } from 'src/app/shared/services';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/shared/services/uploadFiles.service';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent {
  models: GetModel[] = [];
  files: File[] = [];
  filesModel: FileModel = new FileModel
  constructor(
    private getModelService: GetModelService,
    private upload: UploadService,
    private router: Router
  ) { }
  submit(filesModel: FileModel) {
    let t = this;
    if (!this.files[0]) {
      alert("No files selected")
    }
    t.upload.uploadFiles(filesModel)
      .subscribe({
        next: (data: any) => {console.log(data)},
        error: error => console.log(error)
      });
  }
  ngOnInit(): void {
    this.getModelService
      .GetModel()
      .subscribe((result: GetModel[]) => (this.models = result));
  }
  onSelect(event: { addedFiles: any; }) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}

