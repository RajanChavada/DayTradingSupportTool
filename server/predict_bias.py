import joblib
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler

# Load the pre-trained model
model = joblib.load('market_bias_model.pkl')

# Define the features for prediction (make sure these match what was used for training)
features = ['price_change_pct', '5ma', 'momentum', 'volume_avg']

# Assuming the latest data from yesterday is passed into the script (use actual data source in production)
# You would read or pass the last "yesterday" data for pre-market prediction here
# Example of data for the prediction (replace this with actual pre-market data)
pre_market_data = {
    'price_change_pct': [0.5],  # Example data
    '5ma': [140],               # Example data
    'momentum': [1.2],          # Example data
    'volume_avg': [35000]       # Example data
}

# Create a DataFrame for the pre-market data
X = pd.DataFrame(pre_market_data)

# Feature Scaling (normalize data, if used during training)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Make the prediction
prediction = model.predict(X_scaled)

# Return the prediction: Bullish (1) or Bearish (-1)
bias = 'Bullish' if prediction == 1 else 'Bearish'

# Optionally return the classification report for more details
from sklearn.metrics import classification_report

# Assuming you have a set of labeled test data for evaluation
# For demo, we're assuming you already have true labels (this is a simplified example)
y_true = np.array([1, -1, 1, -1, 1])  # Placeholder true labels
y_pred = model.predict(X_scaled)

report = classification_report(y_true, y_pred)

print(f'Bias prediction: {bias}')
print(f'Classification Report: {report}')

# Print out the bias and report to the Node.js server
print(bias)  # Send only the bias for quick response to frontend
