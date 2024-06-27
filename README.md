# Neural Network Ethnicity Recognition

Neural Network Ethnicity Recognition is a project designed to identify the ethnicity of individuals based on image recognition using a neural network.

## Features

- Upload and predict ethnicity from images.
- View the history of predictions.
- Visualize model performance and data distribution.

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
  - [Predicting Ethnicity](#predicting-ethnicity)
  - [Viewing History](#viewing-history)
- [File Descriptions](#file-descriptions)
- [Development](#development)
  - [Adding New Features](#adding-new-features)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Visualizations](#visualizations)

## Project Overview

This project is a neural network application designed to recognize the ethnicity of a person based on image recognition. It uses TensorFlow for model training and prediction, FastAPI for the backend, and React.js for the frontend.

## Project Structure

```
NEURALNETWORK/
├── .vscode/
├── client/
│   ├── src/
│   │   ├── .eslintrc.cjs
│   │   ├── index.html
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── README.md
│   │   └── vite.config.js
├── model/
│   ├── .gitattributes
│   ├── .gitignore
│   ├── confusion_matrix.png
│   ├── ethnicity_model.h5
│   ├── json_testing.py
│   ├── main.py
│   ├── model.json
│   ├── performance.png
│   ├── poetry.lock
│   ├── population_pca.png
│   ├── prediction.py
│   ├── pyproject.toml
│   └── vis.py
├── server/
│   ├── images/
│   ├── ethnicity_model.h5
│   └── main.py
```

## Setup Instructions

### Prerequisites

- Python 3.7 or higher
- Node.js and npm
- MongoDB
- TensorFlow
- FastAPI
- React.js

### Backend Setup

1. **Create a virtual environment:**

    ```bash
    python -m venv venv
    ```

2. **Activate the virtual environment:**

    - On Windows:
      ```bash
      .\venv\Scripts\activate
      ```
    - On macOS/Linux:
      ```bash
      source venv/bin/activate
      ```

3. **Install backend dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4. **Configure MongoDB:**

    Update the `.env` file with your MongoDB URI.

5. **Run the FastAPI server:**

    ```bash
    uvicorn main:app --reload
    ```

### Frontend Setup

1. **Navigate to the frontend directory:**

    ```bash
    cd client
    ```

2. **Install frontend dependencies:**

    ```bash
    npm install
    ```

3. **Start the React development server:**

    ```bash
    npm run dev
    ```

## Usage

### Predicting Ethnicity

To predict the ethnicity of an individual from an image:

1. **Upload an image using the frontend interface.**
2. **The image will be processed by the FastAPI backend and the ethnicity will be predicted using the TensorFlow model.**
3. **The result will be displayed on the frontend.**

### Viewing History

You can view the history of previous predictions through the `/history` endpoint which will show the recent predictions stored in the MongoDB database.

## File Descriptions

- `model/ethnicity_model.h5`: The pre-trained TensorFlow model for ethnicity recognition.
- `model/main.py`: Script for training the model.
- `model/prediction.py`: Script for loading the model and making predictions.
- `model/vis.py`: Script for data visualization.
- `server/main.py`: FastAPI backend implementation.
- `client/src/index.html`: Entry point for the React frontend.
- `client/src/main.jsx`: Main React component.

## Development

### Adding New Features

1. **Fork the repository.**
2. **Create a new branch for your feature.**
3. **Make your changes.**
4. **Submit a pull request.**

## Contributing

Contributions are welcome! Please follow the standard GitHub flow:

1. **Fork the repository.**
2. **Create a feature branch.**
3. **Commit your changes.**
4. **Push to your branch.**
5. **Submit a pull request.**

## License

This project is licensed under the MIT License.

## Acknowledgements

- TensorFlow for the machine learning framework.
- FastAPI for the web framework.
- React.js for the frontend framework.

## Visualizations

### Model Accuracy and Loss
The following graphs depict the training and validation accuracy and loss of the model over epochs. The accuracy graph shows how well the model is learning to classify images correctly, while the loss graph shows the error in the model's predictions.
![performance](https://github.com/idfepam/NeuralNetwork/assets/105879784/69e648a9-39b1-4e1f-bba1-ab96028ee4ce)

### PCA on Test Set
The PCA plot visualizes the distribution of the test set in two principal components. Each point represents an image, and its color indicates its true ethnicity class. This plot helps in understanding the separability of different classes in a lower-dimensional space.
![population_pca](https://github.com/idfepam/NeuralNetwork/assets/105879784/b683e6bc-26b2-4ca6-9bb3-f56e6d71dc43)

### Confusion Matrix
The confusion matrix shows the performance of the classification model on the test set. Each row represents the true class, and each column represents the predicted class. The diagonal elements indicate the number of correct predictions for each class.
![confusion_matrix](https://github.com/idfepam/NeuralNetwork/assets/105879784/42c43c9f-6c43-4a77-b8b5-0cbc47633380)

```
