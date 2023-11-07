from fastapi import FastAPI, File, UploadFile
from io import BytesIO
from PIL import Image
from ultralytics import YOLO
import cv2
import numpy as np
from imageio import v3 as iio
from fastapi import Response

app = FastAPI()

model = YOLO("best_weights.pt")


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


