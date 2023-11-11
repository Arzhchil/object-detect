import * as JSZip from 'jszip';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { environment } from 'src/enviroments';
import { ImagePostRequestModel } from 'src/app/shared/models/imagePostRequestModel';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css']
})
export class SecondPageComponent {
  @ViewChild('canvas', { static: false }) myCanvas!: ElementRef
  @ViewChild('image', { static: false }) myImg!: ElementRef
  @ViewChild('select', { static: false }) mySelect!: ElementRef
  classWeapon: any[] = [];
  files: File[] = []; //variable for files in dropzone
  done = false; //boolean variable for html
  uploadedVideos: any[] = []; //variable for response from model
  preloader = false; //preloader variable
  emtryTitle = true;
  showSend = false;
  response: ImagePostRequestModel = new ImagePostRequestModel;
  private url = "/postFile";
  constructor(
  ) { }

  //Select in Dropzone
  onSelect(event: { addedFiles: any; }) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  //Remove from Dropzone
  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  //Post videos and get zip
  Upload() {
    let t = this
    if (!t.files[0]) {
      alert("No files selected")
      return
    }
    const file_data = t.files[0];
    t.files.length = 0;
    t.uploadedVideos.length = 0;
    t.done = false;
    t.preloader = true;
    const data = new FormData()
    data.append('file', file_data)
    fetch((environment.apiUrl + this.url), {
      'method': 'POST',
      'body': data
    })
      .then(response => response.blob())
      .then(JSZip.loadAsync)
      .then(zip => {
        console.log("архив .zip загружен")
        t.preloader = false;
        zip.forEach(entry => {
          t.uploadedVideos.push(entry)
        })
        t.done = true;
        t.emtryTitle = false
      }, console.error)
  }

  //Add correct image in server
  appendRetrainImage(imgRetrain) {
    let t = this;
    console.log(imgRetrain)
    let indexToRemove = t.uploadedVideos.indexOf(imgRetrain);
    t.uploadedVideos.splice(indexToRemove, 1)
    if (t.uploadedVideos.length == 0) {
      t.emtryTitle = true;
      t.done = false
    }
  }

  //Delete wrong image from uploadVideos
  deleteImage(currentImage) {
    let t = this;
    let indexToRemove = t.uploadedVideos.indexOf(currentImage);
    t.uploadedVideos.splice(indexToRemove, 1)
    if (t.uploadedVideos.length == 0) {
      t.emtryTitle = true;
      t.done = false
    }
  }

  sendMarking(currentImage) {
    let t = this;
    if (confirm("Отправить данную разметку ?")) {
      //fetch((environment.apiUrl + t.urlMarking), {
      //  'method': 'POST',
      //  'body': t.response
      //})
      //  .then(response => console.log("good", response))
      console.log("Отправленно", t.response)
      let indexToRemove = t.uploadedVideos.indexOf(currentImage);
      t.uploadedVideos.splice(indexToRemove, 1)
      if (t.uploadedVideos.length == 0) {
        t.emtryTitle = true;
        t.done = false
      }
      t.showSend = false
    }
    return;
  }

  //Canvas Zone
  scrollToPosition(x: number, y: number) {
    window.scrollTo(x, y);
  }

  processImage() {
    let t = this;
    scrollToPosition(0, 600);
    const img: HTMLImageElement = this.myImg.nativeElement;
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    const select: HTMLSelectElement = this.mySelect.nativeElement
    canvas.width = 1110;
    canvas.height = 550;
    let x1: number;
    let y1: number;
    let x2: number;
    let y2: number;
    let coefW = 1.72972;
    let coefH = 1.96363;
    let urlMarking = '/postMarking'
    const ctx = canvas.getContext('2d');

    function scrollToPosition(x: number, y: number) {
      window.scrollTo(x, y);
    }

    function selectClass(event: any) {
      return event.value;
    }

    function handleClick(event: MouseEvent) {
      if (selectClass(select) == "Выберите класс оружия") {
        alert("Выберите класс оружия перед разметкой")
        return;
      }
      if (!x1 || !y1) {
        x1 = event.clientX - canvas.getBoundingClientRect().left;
        y1 = event.clientY - canvas.getBoundingClientRect().top;
        ctx.beginPath()
        ctx.arc(x1, y1, 3, 0, Math.PI * 2)
        ctx.fillStyle = "red";
        ctx.fill();
        return;
      }
      if (!x2 || !y2) {
        x2 = event.clientX - canvas.getBoundingClientRect().left;
        y2 = event.clientY - canvas.getBoundingClientRect().top;
        ctx.beginPath()
        ctx.arc(x2, y2, 3, 0, Math.PI * 2)
        ctx.fillStyle = "red";
        ctx.fill();


        ctx.beginPath();
        ctx.moveTo(x1, y1)
        ctx.lineTo(x1, y2);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x2, y1);
        ctx.lineTo(x1, y1);
        ctx.strokeStyle = "red";
        ctx.stroke();

        const diffX = (x2 - x1); //Ширина
        const diffY = (y2 - y1); //Высота
        let widthWithCoef = diffX * coefW; // Пересчитыванные значения для полного разрешения изображения 1080
        let heightWithCoef = diffY * coefH; // Пересчитыванные значения для полного разрешения изображения 1080
        let roundW = (widthWithCoef / 1920).toFixed(6); // Ширина в процентах с учётом коэффицента !!
        let roundH = (heightWithCoef / 1080).toFixed(6); // Высота в процентах с учётом коэффицента!!

        let centerX = (x1 + diffX / 2); //координаты середины по X
        let centerY = (y1 + diffY / 2); //координаты середины по Y
        let centerXwithCoef = centerX * coefW; // Пересчитыванные значения для полного разрешения изображения 1920
        let centerYwithCoef = centerY * coefH; // Пересчитыванные значения для полного разрешения изображения 1080
        let roundCenterX = (centerXwithCoef / 1920).toFixed(6); //координаты середины по X в процентах с учётом коэффицента !!
        let roundCenterY = (centerYwithCoef / 1080).toFixed(6); //координаты середины по Y в процентах с учётом коэффицента !!

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

        let nameImg = img.src.slice(img.src.indexOf("image"), img.src.length)
        console.log(typeof nameImg);

        t.response.imageName = nameImg;
        t.response.imageClass = selectClass(select);
        t.response.coordX = roundCenterX;
        t.response.coordY = roundCenterY;
        t.response.width = roundW;
        t.response.height = roundH;

        t.showSend = true;
        console.log(t.response)
      }
    }
    canvas.addEventListener('click', handleClick);
  }

}
