import { Component } from '@angular/core';
import { PostModel } from 'src/app/shared/models';
import { PostModelService } from 'src/app/shared/services';
import { Router } from '@angular/router';
@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {
  postnum: PostModel = new PostModel(2); // вводимое число
  receivedNum: PostModel // полученное чисо
  done: boolean = false;
  constructor(
    private postModelService: PostModelService,
  ) { }
  submit(postnum: PostModel) {
    let t = this;
    t.postModelService.PostModel(postnum)
      .subscribe({
        next: (data: any) => { t.receivedNum = data; t.done = true; },
        error: error => console.log(error)
      });
  }
}
