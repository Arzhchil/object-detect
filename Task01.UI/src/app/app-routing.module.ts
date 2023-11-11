import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecondPageComponent } from './components/second-page/second-page.component';
import { StartPageComponent } from './components/start-page/start-page.component';
const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full'},
  {path : 'main', component : SecondPageComponent},
  {path : 'storage', component : StartPageComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
