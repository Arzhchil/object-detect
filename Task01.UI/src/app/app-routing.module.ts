import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecondPageComponent } from './components/second-page/second-page.component';
import { StartPageComponent } from './components/start-page/start-page.component';
const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full'},
  {path : 'second', component : SecondPageComponent},
  {path : 'start', component : StartPageComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
