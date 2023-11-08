import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {

}

























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

