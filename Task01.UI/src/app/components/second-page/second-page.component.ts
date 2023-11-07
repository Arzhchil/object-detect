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
  uploadedVideos: File[] = [];
  done = false;

  constructor(private getModelService: GetModelService,) { }

  fileUpload(files) {
    let t = this
    if (!t.files[0]) {
      alert("No files selected")
      return
    }
    this.uploadedVideos = files;
    t.done = true;
    console.log(files[0])
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(files[0]);
    fileReader.onload = async (event: any) => {
      const content = event.target.result;
      const CHUNK_SIZE = 1000;
      const totalChunks = event.target.result.byteLength / CHUNK_SIZE;
      const fileName = Math.random().toString(36).slice(-6) + files[0].name;

      console.log('files' + '' + files);
      console.log('fileReader' + '' + fileReader);
      console.log('content' + '' + content);
      console.log('totalChunks' + '' + totalChunks);
      console.log('fileName' + '' + fileName);

      for (let chunk = 0; chunk < totalChunks + 1; chunk++) {
        let CHUNK = content.slice(chunk * CHUNK_SIZE, (chunk + 1) * CHUNK_SIZE);
        await fetch('/upload?fileName=' + fileName, {
          'method': 'POST',
          'headers': {
            'content-type': "application/octet-stream",
            'content-length': CHUNK.length,
          },
          'body': CHUNK
        });
        console.log('CHUNK' + '' + CHUNK);
        console.log('CHUNK length' + '' + CHUNK.length);
      }
    };





















    //for (let i = 0; i < files.length; i++) {
    //  console.log(files[i])
    //  const fileReader = new FileReader();
    //  fileReader.readAsArrayBuffer(files[i]);
    //  fileReader.onload = async (event: any) => {
    //    const content = event.target.result;
    //    const CHUNK_SIZE = 1000;
    //    const totalChunks = event.target.result.byteLength / CHUNK_SIZE;
    //    const fileName = Math.random().toString(36).slice(-6) + files[i].name;

    //    console.log('files' + '' + files);
    //    console.log('fileReader' + '' + fileReader);
    //    console.log('content' + '' + content);
    //    console.log('totalChunks' + '' + totalChunks);
    //    console.log('fileName' + '' + fileName);

    //    for (let chunk = 0; chunk < totalChunks + 1; chunk++) {
    //      let CHUNK = content.slice(chunk * CHUNK_SIZE, (chunk + 1) * CHUNK_SIZE);
    //      await fetch('/upload?fileName=' + fileName, {
    //        'method': 'POST',
    //        'headers': {
    //          'content-type': "application/octet-stream",
    //          'content-length': CHUNK.length,
    //        },
    //        'body': CHUNK
    //      });
    //      console.log('CHUNK' + '' + CHUNK);
    //      console.log('CHUNK length' + '' + CHUNK.length);
    //    }
    //  };
    //}

  }

  //console.log('files' + '' + files);
  //console.log('fileReader' + '' + fileReader);
  //console.log('content' + '' + content);
  //console.log('totalChunks' + '' + totalChunks);
  //console.log('fileName' + '' + fileName);
  //console.log('CHUNK' + '' + CHUNK);
  //console.log('CHUNK length' + '' + CHUNK.length);
  //submit(filesModel: FileModel) {
  //  let t = this;
  //  if (!this.files[0]) {
  //    alert("No files selected")
  //  }
  //  t.upload.uploadFiles(filesModel)
  //    .subscribe({
  //      next: (data: any) => { console.log(data) },
  //      error: error => console.log(error)
  //    });
  //}
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

