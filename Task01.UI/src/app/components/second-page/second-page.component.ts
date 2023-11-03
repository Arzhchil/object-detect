import { Component } from '@angular/core';
import { GetModel, PostModel } from 'src/app/shared/models';
import { elementAt, lastValueFrom } from 'rxjs';
import { GetModelService, PostModelService } from 'src/app/shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent {
  models: GetModel[] = [];
  constructor(
    private getModelService: GetModelService,
    private postModelService: PostModelService,
    private router: Router
  ) { }


  //public async getFM(PostModel: postModel) {
  //  let t = this;
  //  await lastValueFrom(t.postModelService.PostModel(postModel))
  //    .then(response => {
  //      t.PostModel.firstName = response.vectorRec;
  //      t.recommendationGroups = response.newRec;
  //    })
  //    .catch(ex => {
  //      t.modalService.showErrorModal("Не могу получить группы по вектору")
  //    })
  //}
  ngOnInit(): void {
    this.getModelService
      .GetModel()
      .subscribe((result: GetModel[]) => (this.models = result));
  }
}
