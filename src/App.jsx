import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState([]);

  console.log("Prediction: ", prediction);

  const loadImageBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const base64Image = await loadImageBase64(file);
    setImage(base64Image);
  };

  useEffect(() => {
    if (image) {
      axios({
        method: "POST",
        url: "https://detect.roboflow.com/plastic-recyclable-detection/2",
        params: {
          api_key: "W95jkAhs3Vk9fJZxTD8X",
        },
        data: image,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then(function (response) {
          setPrediction(response.data.predictions);
        })
        .catch(function (error) {
          console.log(error.message);
        });
    }
  }, [image]);

  return (
    <div className="w-[98vw] h-screen flex justify-center items-center py-10">
      <div className="flex flex-col gap-4">
        <div className="p-10 shadow-xl flex flex-col items-center gap-4 mt-20 pt-20">
          <h1 className="text-7xl text-blue-500">PLASTIC DETECTION SYSTEM</h1>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {image && (
            <div className="relative">
              {prediction &&
                prediction.map((item, index) => {
                  const top = item.width.toString();
                  console.log(top);

                  return (
                    <div
                      key={index}
                      className={`border-red-600 border-2 absolute top-[211.5px] left-[263.5px] min-w-[117px] min-h-[225px]`}
                    ></div>
                  );
                })}
              <img className="" src={image} alt="Uploaded Image" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
