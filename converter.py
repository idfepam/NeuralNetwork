import tensorflowjs as tfjs
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image

model = tf.keras.models.load_model('ethnicity_model.h5')
tfjs.converters.save_keras_model(model, 'converted')

