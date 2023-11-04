import { Component } from '@angular/core';
import { GetModel } from 'src/app/shared/models';
import { GetModelService } from 'src/app/shared/services';
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
    private router: Router
  ) { }
  ngOnInit(): void {
    this.getModelService
      .GetModel()
      .subscribe((result: GetModel[]) => (this.models = result));
  }


}

