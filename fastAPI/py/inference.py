from fastapi import FastAPI, File, UploadFile, Response
from io import BytesIO, StringIO
from PIL import Image
from ultralytics import YOLO
import cv2
import numpy as np
from imageio import v3 as iio
import matplotlib.pyplot as plt
from starlette.responses import FileResponse
from moviepy.editor import *
import os
import zipfile
from fastapi.responses import StreamingResponse, FileResponse
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path


def speed_up_video_mp(input_path, output_path, speed):
    clip = VideoFileClip(input_path)
    accelerated_clip = clip.fx(vfx.speedx, speed)

    accelerated_clip.write_videofile(output_path)

app = FastAPI()


origins = [
    "https://localhost",
    "http://localhost:4200",
    "http://localhost:4200/second",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = YOLO("model/weights/best.pt")


zip_subdir = "/compressed_files"
def get_zipfile(filenames):
    zip_io = BytesIO()
    with zipfile.ZipFile(zip_io, mode='w', compression=zipfile.ZIP_DEFLATED) as temp_zip:
        for fpath in filenames:
            fdir, fname = os.path.split(fpath)
            zip_path = os.path.join(zip_subdir, fname)
            temp_zip.write(fpath, zip_path)
    return StreamingResponse(
        iter([zip_io.getvalue()]),
        media_type="application/x-zip-compressed",
        headers = { "Content-Disposition": f"attachment; filename=images.zip"}
    )
    

def clean_directory(dir_path):
    dir = dir_path
    for f in os.listdir(dir):
        os.remove(os.path.join(dir, f))

@app.get('/')
async def hello():
    return {'response': 'hello'}

@app.post('/predict')
async def predict(im: UploadFile = File(...)):
    image = Image.open(BytesIO(im.file.read()))

    results = model.predict(source=image, save=False)
    
    try:
        xmin, ymin, xmax, ymax = results[0].boxes.xyxy.numpy()[0].astype(int)
        image = np.array(image)
        cv2.rectangle(image, (xmin, ymin), (xmax, ymax), (0, 255, 0), 2)
        
    except:
        image = np.array(image)
        
    with BytesIO() as buf:
        iio.imwrite(buf, image, plugin="pillow", format="JPEG")
        im_bytes = buf.getvalue()
        
    headers = {'Content-Disposition': 'inline; filename="test.jpeg"'}
    
    return Response(im_bytes, headers=headers, media_type='image/jpeg')

@app.post('/postFile')
async def predict_video(video: UploadFile = File(...)):
    with open("input_video.mp4", "wb") as binary_file:
        binary_file.write(video.file.read())
        
    speed_up_video_mp('input_video.mp4', 'x10_video.mp4', 10)
    
    results = model.predict(source='x10_video.mp4', save=False, stream=True)
    files_list = []
    
    clean_directory('../Task01.UI/src/assets/img/compressed_files/')
        
    CONF = .4
    COLORS_MAP = [(0, 0, 255), (0, 255, 0), (255, 0, 0), (255, 255, 255)]
    for (index, r) in enumerate(results):
        print(r.boxes)
        if len(r.boxes.xyxy.numpy()) != 0 and r.boxes.conf.numpy().max() >= CONF:
            im = r.orig_img
            inds_with_conf = [i for i, v in enumerate(r.boxes.conf.numpy()) if v >= CONF]
            for ind in inds_with_conf:
                xmin, ymin, xmax, ymax = r.boxes.xyxy.numpy()[ind].astype(int)
                cv2.rectangle(im, (xmin, ymin), (xmax, ymax), COLORS_MAP[r.boxes.cls.numpy().astype(int)[ind]], 2)
            image = Image.fromarray(im)
            img_path = f"../Task01.UI/src/assets/img/compressed_files/image_n{index+1}.jpeg"
            image.save(img_path)
            files_list.append(img_path)
        
    return get_zipfile(files_list)