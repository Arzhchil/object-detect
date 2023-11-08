import { Component } from '@angular/core';
import { GetModel, FileModel, PostModel } from 'src/app/shared/models';
import { GetModelService, FileService, PostModelService } from 'src/app/shared/services';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent {
  //models: GetModel[] = [];
  files: File[] = [];
  uploadedVideos: File[] = [];
  //filesModel: FileModel = new FileModel
  done = false;
  //files: PostModel = new PostModel;

  constructor(
    private getModelService: GetModelService,
    private fileService: FileService,
    private postModelService: PostModelService,
  ) { }

  Upload(files) {
    let t = this
    if (!t.files[0]) {
      alert("No files selected")
      return
    }
    t.done = true;
    console.log(files)
    t.postModelService.PostModel(files)
      .subscribe({
        next: (data: any) => { t.uploadedVideos = data; t.done = true; },
        error: error => console.log(error)
      });
  }

  //fileUpload(files) {
  //  let t = this
  //  if (!t.files[0]) {
  //    alert("No files selected")
  //    return
  //  }
  //  this.uploadedVideos = files;
  //  t.done = true;
  //  console.log(files[0])
  //  const fileReader = new FileReader();
  //  fileReader.readAsArrayBuffer(files[0]);
  //  fileReader.onload = async (event: any) => {
  //    const content = event.target.result;
  //    const CHUNK_SIZE = 1000;
  //    const totalChunks = event.target.result.byteLength / CHUNK_SIZE;
  //    const fileName = Math.random().toString(36).slice(-6) + files[0].name;

  //    //console.log('files' + '' + files);
  //    //console.log('fileReader' + '' + fileReader);
  //    //console.log('content' + '' + content);
  //    //console.log('totalChunks' + '' + totalChunks);
  //    //console.log('fileName' + '' + fileName);

  //    for (let chunk = 0; chunk < totalChunks + 1; chunk++) {
  //      let CHUNK = content.slice(chunk * CHUNK_SIZE, (chunk + 1) * CHUNK_SIZE);
  //      await fetch('/upload?fileName=' + fileName, {
  //        'method': 'POST',
  //        'headers': {
  //          'content-type': "application/octet-stream",
  //          'content-length': CHUNK.length,
  //        },
  //        'body': CHUNK
  //      }
  //      )
  //      //console.log('CHUNK' + '' + CHUNK);
  //      //console.log('CHUNK length' + '' + CHUNK.length);
  //    }
  //  };


  //postnum: PostModel = new PostModel(); // вводимое число
  //receivedNum: PostModel // полученное чисо
  //done: boolean = false;
  //constructor(
  //  private postModelService: PostModelService,
  //) { }
  //submit(postnum: PostModel) {
  //  let t = this;
  //  t.postModelService.PostModel(postnum)
  //    .subscribe({
  //      next: (data: any) => { t.receivedNum = data; t.done = true; },
  //      error: error => console.log(error)
  //    });
  //}

  //ngOnInit(): void {
  //  this.getModelService
  //    .GetModel()
  //    .subscribe((result: GetModel[]) => (this.models = result));
  //}
  onSelect(event: { addedFiles: any; }) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}

