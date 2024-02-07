import React, { useState } from "react";
import Cropper, { Point, Area } from "react-easy-crop";
import { Slider } from "../ui/slider";

type Props = {
  image: string
}

// TODO: falta terminar
const CropPostImage = ({image}: Props) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels);
  }


  return (
    <>
      <div className="absolute left-0 top-0 w-full h-full">
        <Cropper
          image={image || "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000"}
          crop={crop}
          zoom={zoom}
          aspect={16 / 9}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
      <div className="w-[70%] absolute left-1/2 bottom-0 translate-x-[-50%] h-20 flex items-center">
        <Slider
          className="p-5"
          min={1}
          max={3}
          step={0.1}
          aria-labelledby="Zoom"
          onValueChange={([value]) => setZoom(value)}
        />
      </div>
    </>
  );
};

export default CropPostImage
