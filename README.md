# 🏠 House Price Prediction App

A Machine Learning web application that predicts real estate prices based on property features. This project uses **Linear Regression** to analyze factors like square footage, location, and number of bedrooms to estimate market value.

## 🚀 Features

* **Instant Predictions:** Users can input property details (e.g., Area, Bedrooms, Location) to get an estimated price immediately.
* **Interactive Interface:** A user-friendly web dashboard built with **Streamlit**.
* **Data Visualizations:** Charts showing the relationship between price and various features (e.g., Price vs. Area).
* **Model Performance:** Displays accuracy metrics like MAE (Mean Absolute Error) and R² Score.

## 🛠️ Tech Stack

* **Python:** Core programming language.
* **Scikit-Learn:** For training the Linear Regression model.
* **Pandas & NumPy:** For data cleaning and preprocessing.
* **Streamlit:** For the frontend web application.
* **Matplotlib / Seaborn:** For exploratory data analysis (EDA) plots.

## 📂 Dataset

The model is trained on a real estate dataset (e.g., from Kaggle) containing:
* **Area:** Square footage of the property.
* **Bedrooms/Bathrooms:** Count of rooms.
* **Location:** Neighborhood or city sector.
* **Price:** The target variable.

## ⚙️ Installation & Setup

Follow these steps to run the app locally.

**1. Clone the Repository**
```bash
git clone [https://github.com/your-username/house-price-prediction.git](https://github.com/your-username/house-price-prediction.git)
cd house-price-prediction
