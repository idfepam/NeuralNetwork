import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Load the dataset
data = pd.read_csv('age_gender.csv')
#123
# Convert the pixel strings to numpy arrays and normalize the pixel values
data['pixels'] = data['pixels'].apply(lambda x: np.array(x.split(), dtype='float32') / 255)

# Set up the plot - assuming we have 5 ethnicities and we need 2 examples each
fig, axes = plt.subplots(nrows=5, ncols=2, figsize=(10, 20))  # Adjust nrows according to the number of ethnicities

# Iterate through each ethnicity and plot 2 examples
for i, (ethnicity, subset) in enumerate(data.groupby('ethnicity')):
    if subset.shape[0] > 1:  # Check if there are at least two samples
        for j in range(2):
            # Extract pixel data for j-th sample in the group
            image = subset['pixels'].iloc[j].reshape(48, 48)
            ax = axes[i, j]
            ax.imshow(image, cmap='gray')
            ax.axis('off')
            ax.set_title(f'Ethnicity {ethnicity}')

plt.tight_layout()
plt.show()
