import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Loader from "./components/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App2 = () => {
  const vidRef = useRef(null);
  const canvasRef = useRef(null);
  const [prediction, setPrediction] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

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

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64Image = canvas.toDataURL("image/jpg");
    setImage(base64Image);
  };

  useEffect(() => {
    if (image) {
      setLoading(true);
      axios({
        method: "POST",
        url: "https://detect.roboflow.com/plastic-detection-szrn0/1",
        params: {
          api_key: import.meta.env.VITE_API_KEY
        },
        data: image,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(function (response) {
          const { predictions } = response.data;
          setPrediction(predictions);
          toast.success("Image analysis completed!");
        })
        .catch(function (error) {
          console.error(error);
          toast.error(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [image]);

  return (
    <div className="bg-gray-800 flex justify-center items-center h-screen">
      <ToastContainer />
      {loading && <Loader />}
      <div className="relative flex flex-col gap-2">
        <h1 className="text-white text-3xl self-center font-semibold">Plastic Detection</h1>
        {image && <img src={image} alt="Captured image" className="rounded" />}
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
                <span className="bg-gray-200">{(prediction[0].confidence * 100).toFixed(2)}% | {item.class}</span>
              </div>
            );
          })}
        {!image && <video ref={vidRef} className="rounded"></video>}
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
