# Plastic Detection Application

This project is a simple web-based application that detects plastic in real-time using a device's webcam. The app captures an image and processes it to identify plastic within the captured frame. It is designed to work on any device with a web browser and camera access.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Technical Details](#technical-details)
- [License](#license)

## Features

- **Real-Time Plastic Detection**: Uses the device's webcam to capture a live video feed and detect plastic objects.
- **Responsive UI**: Works across different devices (mobile, desktop) with browser and camera access.
- **Simple Interface**: Click a button to capture an image and initiate detection.
- **Toast Notifications**: Provides success and error feedback after each image capture and detection.

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/plastic-detection-app.git
   cd plastic-detection-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Obtain a Roboflow API Key by signing up on [Roboflow](https://roboflow.com/) and adding the API Key to your environment variables (see [Configuration](#configuration) below).

## Usage

### We have a website

- [Plastic Detection System](https://plastic-detection.netlify.app)

or, you can do

### Running the Application

1. Start the application:

   ```bash
   npm start
   ```

   The app will launch on `http://localhost:3000` by default.

2. Open the application in your browser:

   - Allow camera access when prompted to enable video feed.

3. Click the **Capture Image** button to take a snapshot.
4. The application sends the captured image to Roboflow's Plastic Detection API for analysis.
5. If plastic is detected, bounding boxes with confidence percentages will appear around the detected items on the screen.

### Configuration

1. Create a `.env` file in the project root.
2. Add your Roboflow API key:
   ```plaintext
   VITE_API_KEY=your_roboflow_api_key
   ```

## Technical Details

This application is built with **React.js** and leverages the **Roboflow API** to detect plastic. Here’s an overview of how the core components work:

- **Video Feed**: The app accesses the webcam using `navigator.mediaDevices.getUserMedia`.
- **Image Capture**: When the **Capture Image** button is clicked, the video feed is converted into a base64 image using an HTML canvas.
- **API Request**: The base64 image is sent to Roboflow's API, which analyzes the image and returns any detected plastic objects with confidence scores and bounding box data.
- **Image Display & Overlay**: Detected plastic items are displayed on the captured image using bounding boxes.

### Dependencies

- **axios**: For making HTTP requests to the Roboflow API.
- **react-toastify**: For displaying user-friendly notifications.
- **Loader Component**: Displays a loading indicator while the image is being processed.

## Limitations

- Relies on external API (Roboflow) for plastic detection, which requires an internet connection and an API key.
- Accuracy and detection depend on the quality of the camera feed and lighting conditions.

## License

This project is licensed under the MIT License.

---

Feel free to modify the placeholders (e.g., GitHub link, Roboflow API key steps) as needed for your specific setup!
