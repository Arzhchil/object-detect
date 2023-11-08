import { Component } from '@angular/core';
import { PostModelService } from 'src/app/shared/services';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent {
  files: File[] = [];
  uploadedVideos: File[] = [];
  done = false;

  constructor(
    private postModelService: PostModelService,
  ) { }

  onSelect(event: { addedFiles: any; }) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

//!!!!
  Upload() {
    let t = this
    console.log(t.files)
    if (!t.files[0]) {
      alert("No files selected")
      return
    }
    const file_data = t.files[0];
    const data = new FormData()
    data.append('file', file_data)
    console.log(data);
    t.postModelService.PostModel(data).subscribe((res) => { console.log(res), t.done = true })
  }

//!!!
  //console.log(files[0])
  ////t.postModelService.PostModel(files[0])
  //t.postModelService.PostModel(files[0])
  //  .subscribe({
  //    next: (data: any) => { t.uploadedVideos = data; t.done = true; },
  //    error: error => console.log(error)
  //  });


//StreamByte
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
  //      }
  //      )
  //      console.log('CHUNK' + '' + CHUNK);
  //      console.log('CHUNK length' + '' + CHUNK.length);
  //    }
  //  };
}
