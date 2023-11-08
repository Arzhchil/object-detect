import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent implements OnInit {
  loader = true;
  ngOnInit(): void {
    let t = this;
    setTimeout(() => {
      t.loader = false;
    }, 5000);
  }
}
