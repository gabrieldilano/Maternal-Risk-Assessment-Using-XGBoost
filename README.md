Maternal Risk Assessment using XGBoost Classifier
This project aims to assess maternal health risks based on factors such as age, blood pressure, blood sugar levels, body temperature, and heart rate. The system uses an XGBoost Classifier to predict maternal risk levels: low risk, mid risk, and high risk. The project consists of two main components:

Flask API: A backend server that hosts the trained XGBoost model and provides a REST API for risk prediction.

Next.js Frontend: A modern web application that allows users to input health data and view the predicted risk level.

Features
Machine Learning Model:

Trained using XGBoost Classifier.

Predicts maternal risk levels based on health metrics.

Flask API:

Hosts the trained model and exposes a /predict endpoint.

Accepts JSON input with health metrics and returns the predicted risk level.

Next.js Frontend:

User-friendly interface for inputting health data.

Displays the predicted risk level with a clear visual indicator (low, mid, or high risk).

Includes form validation to ensure data accuracy.

Tech Stack
Frontend:

Next.js: A React framework for building the user interface.

Tailwind CSS: For styling the components.

Backend:

Flask: A lightweight Python web framework for hosting the API.

XGBoost: A machine learning library for training and deploying the model.

Other Tools:

NumPy: For numerical computations.

Pandas: For data manipulation.

Scikit-learn: For model evaluation and preprocessing.
