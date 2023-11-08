import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'canvas-comp',
  templateUrl: './canvas-comp.component.html',
  styleUrls: ['./canvas-comp.component.css']
})
export class CanvasCompComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) myCanvas!: ElementRef
  @ViewChild('image', { static: false }) myImg!: ElementRef

  ngAfterViewInit(): void {
    this.#processImage()

  }

  #processImage() {
    const img: HTMLImageElement = this.myImg.nativeElement;
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    let recWidth = 30;
    let recHeight = 30;
    canvas.width = 800;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      if (ctx) {
        ctx.drawImage(img, 0, 0, 800, 400)
      }
    }
    canvas.addEventListener('click', function (event: MouseEvent) {
      //debugger;
      let x = event.clientX;
      let y = event.clientY;

      console.log(x, y + ' ' + 'client')

      ctx.strokeStyle = 'red';
      ctx.strokeRect(x - (recWidth / 2), (y - recHeight / 2), recWidth, recHeight);
    })
  }
}
