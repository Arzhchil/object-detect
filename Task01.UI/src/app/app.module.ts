import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StartPageComponent } from './components/start-page/start-page.component';
import { SecondPageComponent } from './components/second-page/second-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PreloaderComponent } from './shared/components/preloader/preloader.component';
import { MlResponseComponent } from './shared/components/ml-response/ml-response.component';
import { CanvasCompComponent } from './shared/components/canvas-comp/canvas-comp.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    SecondPageComponent,
    PreloaderComponent,
    MlResponseComponent,
    CanvasCompComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgxDropzoneModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
