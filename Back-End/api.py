import numpy as np
from xgboost import XGBClassifier
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Load configuration from environment variables
MODEL_PATH = os.getenv('MODEL_PATH', 'maternal_risk_xgb.json')

# Check if model file exists
if not os.path.exists(MODEL_PATH):
    logger.error(f"Model file '{MODEL_PATH}' not found")
    raise FileNotFoundError(f"Model file '{MODEL_PATH}' not found")

# Load the model
try:
    model = XGBClassifier()
    model.load_model(MODEL_PATH)
    logger.info("Model loaded successfully")
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    raise Exception(f"Error loading model: {str(e)}")

def validate_input(data):
    """Validate the input data."""
    required_fields = ['Age', 'SystolicBP', 'DiastolicBP', 'BS', 'BodyTemp', 'HeartRate']
    for field in required_fields:
        if field not in data:
            raise ValueError(f'Missing required field: {field}')
    
    try:
        features = [
            float(data['Age']),
            float(data['SystolicBP']),
            float(data['DiastolicBP']),
            float(data['BS']),
            float(data['BodyTemp']),
            float(data['HeartRate'])
        ]
    except ValueError as e:
        raise ValueError(f'Invalid value format: {str(e)}')
    
    return features

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get data from POST request
        data = request.get_json()
        if not data:
            logger.error("No data provided in the request")
            return jsonify({'error': 'No data provided'}), 400
        
        # Validate and extract features
        features = validate_input(data)
        
        # Make prediction
        features = np.array(features).reshape(1, -1)
        prediction = model.predict(features)
        
        # Map numerical predictions to risk levels
        risk_mapping = {0: 'low', 1: 'mid', 2: 'high'}
        risk_level = risk_mapping.get(int(prediction[0]), 'unknown')
        
        return jsonify({
            'risk': risk_level,
            'risk_code': int(prediction[0])
        })
    
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({'error': f'Prediction error: {str(e)}'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)