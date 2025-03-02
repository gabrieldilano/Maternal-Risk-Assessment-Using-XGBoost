# **Maternal Risk Assessment using XGBoost Classifier**  

This project assesses maternal health risks based on factors such as age, blood pressure, blood sugar levels, body temperature, and heart rate. It utilizes an **XGBoost Classifier** to predict maternal risk levels: **low risk, mid risk, and high risk**.  

## **Project Components**  

### **1. Flask API**  
- A backend server that hosts the trained **XGBoost** model.  
- Provides a **REST API** for maternal risk prediction.  

### **2. Next.js Frontend**  
- A modern web application for user input and risk level display

## **Features**  

### **Machine Learning Model**  
✅ Trained using **XGBoost Classifier**.  
✅ Predicts maternal risk levels based on health metrics.  
✅ **Model Performance Metrics:**  
- **87% precision and recall for high-risk cases**,
```plaintext
                precision    recall  f1-score   support

    low risk       0.86      0.84      0.85        80
    mid risk       0.82      0.84      0.83        76
   high risk       0.87      0.87      0.87        47

    accuracy                           0.85       203
   macro avg       0.85      0.85      0.85       203
weighted avg       0.85      0.85      0.85       203 
```
### **Flask API**  
✅ Hosts the trained model and exposes a `/predict` endpoint.  
✅ Accepts **JSON input** with health metrics and returns the predicted risk level.  

### **Next.js Frontend**  
✅ **User-friendly** interface for inputting health data.  
✅ Displays the **predicted risk level** with a clear visual indicator (**low, mid, or high risk**).  
✅ Includes **form validation** to ensure data accuracy.  

## **Tech Stack**  

### **Frontend**  
- **Next.js** – A React framework for building the user interface.  
- **Tailwind CSS** – For styling components.  

### **Backend**  
- **Flask** – A lightweight Python web framework for hosting the API.  
- **XGBoost** – A machine learning library for training and deploying the model.  

### **Other Tools**  
- **NumPy** – For numerical computations.  
- **Pandas** – For data manipulation.  
- **Scikit-learn** – For model evaluation and preprocessing. 
