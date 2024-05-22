import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
import json

# Загрузка архитектуры модели из JSON
with open('converted/model.json', 'r') as json_file:
    model_json = json.load(json_file)

# Создание конфигурации модели из JSON
model_config = model_json['modelTopology']['model_config']

# Инициализация модели
model = tf.keras.Sequential.from_config(model_config['config'])

# Загрузка весов из BIN файлов
weights_manifest = model_json['weightsManifest']
weights_data = []

for group in weights_manifest:
    for path in group['paths']:
        with open(f'converted/{path}', 'rb') as f:
            weights_data.extend(np.frombuffer(f.read(), dtype=np.float32))

# Установка весов в модель
weight_index = 0
for layer in model.layers:
    layer_weights = []
    for weight in layer.weights:
        weight_shape = weight.shape.as_list()
        weight_size = np.prod(weight_shape)
        layer_weight = np.array(weights_data[weight_index:weight_index + weight_size]).reshape(weight_shape)
        weight_index += weight_size
        layer_weights.append(layer_weight)
    if layer_weights:
        layer.set_weights(layer_weights)

# Компиляция модели
model.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=False),
              metrics=['accuracy'])

def predict_ethnicity(image_path):
    img = image.load_img(image_path, target_size=(48, 48), color_mode='grayscale')
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0
    predictions = model.predict(img_array)
    return np.argmax(predictions)

# Выполнение предсказания
print(predict_ethnicity('C:/Users/sergs/Downloads/alex.png'))
