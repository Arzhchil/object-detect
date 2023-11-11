import argparse

parser = argparse.ArgumentParser()
parser.add_argument('-i','-I','--input',
                    help='Input Video file')
parser.add_argument('-o','-U','--output', default = "out_test.mp4",
                    help='Output Video file, default as "out_test.mp4"')
parser.add_argument('-r','-R','--ratio', default = 10,
                    type = int,
                    help='Speed up by ratio, "default = 2"')
parser.add_argument('-f','-F','--fps', default = 0,
                    type = int,
                    help='Speed up by ratio, "default = 2"')
parser.add_argument('-inf', nargs='?',default=True)

args = parser.parse_args()
INPUT = args.input
OUTPUT = args.output
Ratio = args.ratio
fps_o = args.fps
inf = args.inf


import cv2

INPUT = 'py/deagle.mp4'
cap = cv2.VideoCapture(INPUT)
fps_c = cap.get(cv2.CAP_PROP_FPS)
Video_h = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)
Video_w = cap.get(cv2.CAP_PROP_FRAME_WIDTH)
print("Current fps:",fps_c)


OUTPUT = "out_test.mp4"
if fps_o == 0:
    fps_o = fps_c

def Video_speed(cap, OUTPUT):
    Out_size = (int(Video_w),int(Video_h))
    fourcc = cv2.VideoWriter_fourcc(*'XVID')
    videowriter = cv2.VideoWriter(OUTPUT,fourcc,fps_o,Out_size)

    i = 0
    ret = True
    while ret == True:
        i +=1
        ret,frame=cap.read()
        if i % Ratio == 0:
            videowriter.write(frame)

    videowriter.release()

if inf == True:
    Video_speed(cap, OUTPUT)