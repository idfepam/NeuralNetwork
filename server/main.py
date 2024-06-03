from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import io
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from pymongo import MongoClient
from datetime import datetime
import os
import uuid
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Load your model
model = tf.keras.models.load_model('ethnicity_model.h5')

# Initialize FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB setup
client = MongoClient(os.getenv("MONGO_URI"))
db = client["neural-network"]
collection = db["history"]

# Class names
class_names = {
    0: "Caucasoid",
    1: "Negroid",
    2: "Mongoloid",
    3: "Americanoid",
    4: "Australoid"
}


IMAGE_DIR = "images"
os.makedirs(IMAGE_DIR, exist_ok=True)

app.mount("/images", StaticFiles(directory=IMAGE_DIR), name="images")


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    img = image.load_img(io.BytesIO(contents), target_size=(48, 48), color_mode='grayscale')
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0

    predictions = model.predict(img_array)
    predicted_class_index = np.argmax(predictions)
    predicted_class_name = class_names[predicted_class_index]

    unique_filename = f"{uuid.uuid4()}{os.path.splitext(file.filename)[1]}"
    image_path = os.path.join(IMAGE_DIR, unique_filename)
    with open(image_path, "wb") as img_file:
        img_file.write(contents)

    prediction_record = {
        "filename": file.filename,
        "image": unique_filename,
        "predicted_class": predicted_class_name,
        "timestamp": datetime.now().isoformat()
    }
    collection.insert_one(prediction_record)

    return JSONResponse(content={"image": file.filename, "predicted_class": predicted_class_name}, status_code=200)


@app.get("/history")
async def get_history():
    history = list(collection.find({}, {"_id": 0}).limit(10))
    return JSONResponse(content=history, status_code=200)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
