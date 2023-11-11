import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'canvas-comp',
  templateUrl: './canvas-comp.component.html',
  styleUrls: ['./canvas-comp.component.css']
})
export class CanvasCompComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) myCanvas!: ElementRef
  @ViewChild('image', { static: false }) myImg!: ElementRef

  classWeapon: any[] = [];

  ngAfterViewInit(): void {
    this.#processImage()

  }
  selectClass(event: any) {
    console.log(event.target.value);
    this.classWeapon.push(event.target.value);
  }

  #processImage() {
    const img: HTMLImageElement = this.myImg.nativeElement;
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    canvas.width = 1000;
    canvas.height = 600;
    let x1: number;
    let y1: number;
    let x2: number;
    let y2: number;
    const ctx = canvas.getContext('2d');
    img.onload = () => {
      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height = 600)
      }
    }

    function handleClick(event: MouseEvent) {
      if (!x1 || !y1) {
        x1 = event.clientX - 98;
        y1 = event.clientY;
      }
      else {
        x2 = event.clientX - 98;
        y2 = event.clientY;

        const diffX = (x2 - x1); // Ширина !!
        const diffY = (y2 - y1); // Высота !!

        ctx.strokeStyle = 'red';
        ctx.strokeRect(x1, y1, diffX, diffY);

        let centerX = x1 + diffX / 2; //координаты середины по X
        let centerY = y1 + diffY / 2; //координаты середины по Y

        let dividendW = diffX / canvas.width;
        let dividendH = diffX / canvas.height;
        let beginX = x1 / canvas.width;
        let beginY = 1 / canvas.height;

        let roundCenterX = (centerX / canvas.width).toFixed(6); //координаты середины по X в процентах !!
        let roundCenterY = (centerY / canvas.height).toFixed(6); //координаты середины по Y в процентах !!
        let roundX = beginX.toFixed(6);
        let roundY = beginY.toFixed(6);
        let roundW = dividendW.toFixed(6);
        let roundH = dividendH.toFixed(6);

        console.log('Координаты лев. угла', x1, y1);
        console.log('Координата лев. угла в процентах:', roundX, roundY);
        console.log('Координаты середины', centerX, centerY);
        console.log('Координата середины в процентах:', roundCenterX, roundCenterY);
        console.log(`Ширина: ${diffX}`);
        console.log(`Высота: ${diffY}`);
        console.log(`Ширина в процентах : ${roundW}`);
        console.log(`Высота в процентах: ${roundH}`);
        x1 = 0;
        y1 = 0;
        x2 = 0;
        y2 = 0;
        let response = [];
        response[0] = diffX;
        response[1] = diffY;
        response[2] = roundCenterX;
        response[3] = roundCenterY;
        console.log(response)
        return response;
      }
      return 1;
    }
    canvas.addEventListener('click', handleClick);
  }
  Info() {

  }
}
