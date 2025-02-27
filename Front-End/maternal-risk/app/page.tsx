'use client';

import React from 'react';
import { useState } from 'react';

export default function Home() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [risk, setRisk] = useState<'low' | 'mid' | 'high' | null>(null);
  const [formData, setFormData] = useState({
    age: '',
    systolicBP: '',
    diastolicBP: '',
    bloodSugar: '',
    bodyTemp: '',
    heartRate: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const validateForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.age) newErrors.age = 'Age is required';
    else if (Number(formData.age) < 12 || Number(formData.age) > 60) 
      newErrors.age = 'Age must be between 12 and 60';

    if (!formData.systolicBP) newErrors.systolicBP = 'Systolic BP is required';
    else if (Number(formData.systolicBP) < 70 || Number(formData.systolicBP) > 190) 
      newErrors.systolicBP = 'Systolic BP must be between 70 and 190';

    if (!formData.diastolicBP) newErrors.diastolicBP = 'Diastolic BP is required';
    else if (Number(formData.diastolicBP) < 40 || Number(formData.diastolicBP) > 120) 
      newErrors.diastolicBP = 'Diastolic BP must be between 40 and 120';

    if (!formData.bloodSugar) newErrors.bloodSugar = 'Blood sugar is required';
    else if (Number(formData.bloodSugar) < 2 || Number(formData.bloodSugar) > 30) 
      newErrors.bloodSugar = 'Blood sugar must be between 2 and 30';

    if (!formData.bodyTemp) newErrors.bodyTemp = 'Body temperature is required';
    else if (Number(formData.bodyTemp) < 95 || Number(formData.bodyTemp) > 107.6) 
      newErrors.bodyTemp = 'Body temperature must be between 95 and 107.6';

    if (!formData.heartRate) newErrors.heartRate = 'Heart rate is required';
    else if (Number(formData.heartRate) < 40 || Number(formData.heartRate) > 200) 
      newErrors.heartRate = 'Heart rate must be between 40 and 200';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        // Prepare the data to send to the Flask API
        const requestData = {
          Age: formData.age,
          SystolicBP: formData.systolicBP,
          DiastolicBP: formData.diastolicBP,
          BS: formData.bloodSugar,
          BodyTemp: formData.bodyTemp,
          HeartRate: formData.heartRate,
        };

        // Send a POST request to the Flask API
        const response = await fetch('http://localhost:5000/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setRisk(result.risk); // Set the risk level based on the API response
      } catch (error) {
        console.error('Error fetching prediction:', error);
        setErrors({ api: 'Failed to fetch prediction. Please try again.' });
      }
    }
  };

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mt-14 mb-14 text-center text-gray-800">
          Maternal Risk Assessment Tool
        </h1>
        <form onSubmit={validateForm} className="space-y-4 flex flex-col items-center w-full">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="age" className="text-sm font-medium text-gray-700">Age</label>
            <input 
              type="number" 
              id="age" 
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Enter age" 
              className="border p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            />
            {errors.age && <span className="text-red-500 text-sm">{errors.age}</span>}
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="systolicBP" className="text-sm font-medium text-gray-700">Systolic BP</label>
            <input 
              type="number" 
              id="systolicBP" 
              value={formData.systolicBP}
              onChange={handleInputChange}
              placeholder="Enter systolic blood pressure" 
              className="border p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            />
            {errors.systolicBP && <span className="text-red-500 text-sm">{errors.systolicBP}</span>}
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="diastolicBP" className="text-sm font-medium text-gray-700">Diastolic BP</label>
            <input 
              type="number" 
              id="diastolicBP" 
              value={formData.diastolicBP}
              onChange={handleInputChange}
              placeholder="Enter diastolic blood pressure" 
              className="border p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            />
            {errors.diastolicBP && <span className="text-red-500 text-sm">{errors.diastolicBP}</span>}
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="bloodSugar" className="text-sm font-medium text-gray-700">Blood Sugar (mmol/L)</label>
            <input 
              type="number" 
              id="bloodSugar" 
              value={formData.bloodSugar}
              onChange={handleInputChange}
              placeholder="Enter blood sugar" 
              className="border p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            />
            {errors.bloodSugar && <span className="text-red-500 text-sm">{errors.bloodSugar}</span>}
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="bodyTemp" className="text-sm font-medium text-gray-700">Body Temperature (°F)</label>
            <input 
              type="number" 
              id="bodyTemp" 
              value={formData.bodyTemp}
              onChange={handleInputChange}
              placeholder="Enter body temperature" 
              step="0.1" 
              className="border p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            />
            {errors.bodyTemp && <span className="text-red-500 text-sm">{errors.bodyTemp}</span>}
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="heartRate" className="text-sm font-medium text-gray-700">Heart Rate</label>
            <input 
              type="number" 
              id="heartRate" 
              value={formData.heartRate}
              onChange={handleInputChange}
              placeholder="Enter heart rate" 
              className="border p-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            />
            {errors.heartRate && <span className="text-red-500 text-sm">{errors.heartRate}</span>}
          </div>

          <button 
            type="submit" 
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 shadow-sm"
          >
            Assess Risk
          </button>
        </form>

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">Result:</h2>
          <div className="text-xl">
            {risk && (
              <span className={`font-bold ${
                risk === 'high' ? 'text-red-600' :
                risk === 'mid' ? 'text-yellow-600' :
                'text-green-600'
              }`}>
                {risk === 'high' ? 'High Risk' :
                 risk === 'mid' ? 'Medium Risk' :
                 'Low Risk'}
              </span>
            )}
          </div>
          {errors.api && <span className="text-red-500 text-sm">{errors.api}</span>}
        </div>
      </div>
    </main>
  );
}