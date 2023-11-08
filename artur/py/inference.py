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
from fastapi.responses import StreamingResponse
from typing import List
from fastapi.middleware.cors import CORSMiddleware



def speed_up_video_mp(input_path, output_path, speed):
    clip = VideoFileClip(input_path)
    accelerated_clip = clip.fx(vfx.speedx, speed)

    # return accelerated_clip
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


model = YOLO("model/weights/best_weights.pt")

def speed_up_video(input_path, output_path, speed):
    cap = cv2.VideoCapture(input_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, fps * speed, (width, height))

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        out.write(frame)

    cap.release()
    out.release()

zip_subdir = "/some_local_path/of_files_to_compress"
def get_zipfile(filenames):
    zip_io = BytesIO()
    with zipfile.ZipFile(zip_io, mode='w', compression=zipfile.ZIP_DEFLATED) as temp_zip:
        for fpath in filenames:
            # Calculate path for file in zip
            fdir, fname = os.path.split(fpath)
            zip_path = os.path.join(zip_subdir, fname)
            # Add file, at correct path
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
async def predict_video(video: UploadFile = File(..., alias="file")):
    with open("input_video.mp4", "wb") as binary_file:
        binary_file.write(video.file.read())
        
    speed_up_video_mp('input_video.mp4', 'x10_video.mp4', 20)
    
    results = model.predict(source='x10_video.mp4', save=False, stream=True)
    files_list = []
    
    clean_directory('outputs/')
        
    for (index, r) in enumerate(results):
        if len(r.boxes.xyxy.numpy()) != 0:
            im = r.orig_img
            xmin, ymin, xmax, ymax = r.boxes.xyxy.numpy()[0].astype(int)
            cv2.rectangle(im, (xmin, ymin), (xmax, ymax), (0, 255, 0), 2)
            image = Image.fromarray(im)
            img_path = f"outputs/image_n{index}.jpeg"
            image.save(img_path)
            files_list.append(img_path)
    
    return get_zipfile(files_list)