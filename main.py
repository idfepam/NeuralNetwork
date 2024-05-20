import numpy as np 
import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

data = pd.read_csv('age_gender.csv')

def validate_and_prepare_pixels(pixel_str):
    pixel_array = np.array(pixel_str.split(), dtype="float32")
    if pixel_array.size == 2304:
        return pixel_array / 255
    else:
        return None
    
data['pixels'] = data['pixels'].apply(validate_and_prepare_pixels)
data = data.dropna(subset=['pixels'])
X = np.array(data['pixels'].tolist()).reshape(-1, 48, 48, 1)
y = data['ethnicity']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.22, random_state=37)

model = tf.keras.Sequential([
    tf.keras.layers.Input(shape=(48, 48, 1)),
    tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(32, 32, 3)),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
    tf.keras.layers.MaxPooling2D((2, 2)),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dropout(rate=0.5),
    tf.keras.layers.Dense(5)
])

model.compile(optimizer='rmsprop',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])

class EarlyStoppingCallback(tf.keras.callbacks.Callback):
    def on_epoch_end(self, epoch, logs={}):
        if logs.get('val_accuracy') > 0.79:
            print("\nReached 79% validation accuracy so cancelling training!")
            self.model.stop_training = True

callback = EarlyStoppingCallback()
history = model.fit(X_train, y_train, epochs=16, validation_split=0.1, batch_size=64, callbacks=[callback])

model.save('ethnicity_model.h5') 

loss, acc = model.evaluate(X_test, y_test, verbose=0)
print(f'Test loss: {loss}')
print(f'Test Accuracy: {acc}')

# Генерація графіків
plt.figure(figsize=(12, 4))

# Графік точності
plt.subplot(1, 2, 1)
plt.plot(history.history['accuracy'], label='accuracy')
plt.plot(history.history['val_accuracy'], label = 'val_accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.ylim([0, 1])
plt.legend(loc='lower right')
plt.title('Model accuracy')

# Графік втрат
plt.subplot(1, 2, 2)
plt.plot(history.history['loss'], label='loss')
plt.plot(history.history['val_loss'], label = 'val_loss')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.ylim([0, 2])
plt.legend(loc='upper right')
plt.title('Model loss')

plt.savefig('performance.png')
plt.show()

# Генерація матриці невизначеності
y_pred = np.argmax(model.predict(X_test), axis=1)
cm = confusion_matrix(y_test, y_pred)
cmd = ConfusionMatrixDisplay(cm, display_labels=np.unique(y))
cmd.plot(cmap=plt.cm.Blues)
plt.title('Confusion Matrix')
plt.savefig('confusion_matrix.png')
plt.show()


# Перетворення даних для PCA
X_flat = X_test.reshape(-1, 48*48)  # Перетворюємо зображення у вектори

# Стандартизація даних
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_flat)

# PCA для зменшення розмірності
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)

# Генерація графіку популяції
plt.figure(figsize=(8, 6))
for i in np.unique(y_test):
    plt.scatter(X_pca[y_test == i, 0], X_pca[y_test == i, 1], label=f'Class {i}', alpha=0.5)
plt.xlabel('Principal Component 1')
plt.ylabel('Principal Component 2')
plt.title('PCA on Test Set')
plt.legend()
plt.savefig('population_pca.png')
plt.show()