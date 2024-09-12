import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const App2 = () => {
  const vidRef = useRef(null);
  const canvasRef = useRef(null);
  const [prediction, setPrediction] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (vidRef.current) {
        vidRef.current.srcObject = stream;
        vidRef.current.play();
      }
    });
  }, []);

  const captureImage = () => {
    const video = vidRef.current;
    const canvas = canvasRef.current;

    // Set canvas dimensions equal to the video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    // Draw the current video frame on the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to Base64
    const base64Image = canvas.toDataURL("image/jpg");
    setImage(base64Image);

    // Send the Base64 image to the API for ML based classification
  };

  return (
    <div className="bg-gray-800 flex justify-center items-center h-screen">
      <div className="relative flex flex-col gap-2">
        {image && <img src={image} alt="Captured image" />}
        {prediction &&
          prediction.map((item, index) => {
            const top = item.y - item.height / 2;
            const left = item.x - item.width / 2;
            console.log(top);
            console.log(left);

            return (
              <div
                key={index}
                className="border-red-500 border-2 absolute"
                style={{ top, left, width: item.width, height: item.height }}
              >
                {(prediction[0].confidence * 100).toFixed(2)}% | {item.class}
              </div>
            );
          })}
        {!image && <video ref={vidRef}></video>}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={captureImage}
        >
          Capture Image
        </button>
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      </div>
    </div>
  );
};

export default App2;
