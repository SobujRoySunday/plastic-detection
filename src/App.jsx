import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { useEffect, useState } from "react";
import plasticData from "./assets/plasticData";

function App() {
  const [model, setModel] = useState(null);
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [plasticInfo, setPlasticInfo] = useState(null);

  const loadModel = async () => {
    const model = await mobilenet.load();
    setModel(model);
    console.log("Model loaded successfully");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const image = new Image();
      image.src = event.target.result;
      image.onload = () => {
        setImage(image);
      };
    };

    reader.readAsDataURL(file);
  };

  const classifyImage = async () => {
    if (image && model) {
      const processedImage = tf.browser
        .fromPixels(image)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .expandDims();

      const predictions = await model.classify(processedImage);
      setPrediction(predictions[0]);

      const plasticType = predictions[0].className;
      const plasticDetails = plasticData[plasticType.toLowerCase()];

      if (plasticDetails) {
        setPlasticInfo(plasticDetails);
      } else {
        setPlasticInfo(null);
      }
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  return (
    <div className="w-[98vw] h-screen flex justify-center items-center py-10">
      <div className="flex flex-col gap-4">
        <div className="p-10 shadow-2xl flex flex-col items-center gap-4 mt-20 pt-20">
          <h1 className="text-7xl text-blue-500">PLASTIC DETECTION SYSTEM</h1>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {image && (
            <>
              <img className="w-96" src={image.src} alt="Uploaded Image" />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={classifyImage}
              >
                Classify Image
              </button>
            </>
          )}
        </div>

        {prediction && (
          <div className="p-10 shadow-2xl flex flex-col items-center gap-4">
            <h2 className="text-3xl text-blue-500">Prediction</h2>
            <p>Class: {prediction.className}</p>
            <p>
              Confidence: {Math.round(prediction.probability * 100).toFixed(2)}%
            </p>
          </div>
        )}

        {plasticInfo && (
          <div className="p-10 shadow-2xl flex flex-col items-center gap-4">
            <h2 className="text-3xl text-blue-500">Plastic Info</h2>
            <p>Grade: {plasticInfo.grade}</p>
            <p>Degradation Time: {plasticInfo.degradationTime}</p>
            <p>Recycle Value: {plasticInfo.recycleValue}</p>
            <p>Recycling Methods: {plasticInfo.recyclingMethods}</p>
            <p>Recycle Process: {plasticInfo.recycleProcess}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
