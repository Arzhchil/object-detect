import { Routes } from "@angular/router";

export const content: Routes = [
    {
      path: 'second',
      loadChildren: () => import('../../components/second-page/second-page.component.module').then(m => m.SecondPageModule),
      data: {
        breadcrumb: ""
      },
    }
]
