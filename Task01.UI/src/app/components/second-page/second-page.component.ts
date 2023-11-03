import { Component } from '@angular/core';
import { Model } from 'src/app/shared/models';
import { ModelService } from 'src/app/shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent {
  models: Model[] = [];
  constructor(
    private ModelService: ModelService,
    private router: Router
  ){ }
  ngOnInit(): void {
    this.ModelService
      .GetModel()
      .subscribe((result: Model[]) => (this.models = result));
  }
}
