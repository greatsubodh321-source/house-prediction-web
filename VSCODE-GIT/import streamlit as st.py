import streamlit as st
import requests
from datetime import datetime
import google.generativeai as genai

st.set_page_config(page_title="ProphetAI", layout="wide")

# Initialize Gemini
genai.configure(api_key=st.secrets["GOOGLE_API_KEY"])

st.title("🏠 ProphetAI - House Valuation Engine")

# Sidebar inputs
with st.sidebar:
    st.header("Property Parameters")
    sqft_living = st.number_input("Living Area (sqft)", value=2200, min_value=500)
    bedrooms = st.number_input("Bedrooms", value=3, min_value=1, max_value=15)
    bathrooms = st.number_input("Bathrooms", value=2.5, min_value=1.0, max_value=10.0, step=0.5)
    year_built = st.number_input("Year Built", value=1995, min_value=1900, max_value=2024)
    grade = st.slider("Property Grade (1-13)", 1, 13, 7)
    condition = st.selectbox("Condition", [1, 2, 3, 4, 5])
    zipcode = st.selectbox("Zip Code", ["98103", "98004", "98033", "98112", "98052", "98001"])

# Prediction engine
REGRESSION_WEIGHTS = {
    "intercept": -40000,
    "sqft_living": 280,
    "bedrooms": -35000,
    "bathrooms": 41000,
    "grade": 94000,
    "age_penalty": -1500,
}

ZIPCODE_MULTIPLIERS = {
    "98001": 0.85, "98004": 2.1, "98101": 1.8,
    "98112": 1.95, "98033": 1.6, "98052": 1.5, "98103": 1.4,
}

def calculate_price():
    age = datetime.now().year - year_built
    price = REGRESSION_WEIGHTS["intercept"]
    price += sqft_living * REGRESSION_WEIGHTS["sqft_living"]
    price += bedrooms * REGRESSION_WEIGHTS["bedrooms"]
    price += bathrooms * REGRESSION_WEIGHTS["bathrooms"]
    price += grade * REGRESSION_WEIGHTS["grade"]
    price += age * REGRESSION_WEIGHTS["age_penalty"]
    
    multiplier = ZIPCODE_MULTIPLIERS.get(zipcode, 1.0)
    price *= multiplier
    price = max(price, 150000)
    return round(price)

def get_ai_analysis(price):
    model = genai.GenerativeModel("gemini-pro")
    prompt = f"""Act as a real estate analyst. Analyze this property valuation:
- Price: ${price:,}
- Size: {sqft_living} sqft
- Bedrooms/Baths: {bedrooms}/{bathrooms}
- Grade: {grade}/13
- Year Built: {year_built}

Provide 3-4 paragraphs on: 1) Market realism 2) Feature impact 3) ROI opportunities 4) Market outlook"""
    
    response = model.generate_content(prompt)
    return response.text

# Main display
col1, col2 = st.columns([1, 2])

with col1:
    if st.button("💰 Get Valuation", use_container_width=True):
        price = calculate_price()
        st.session_state.price = price
        st.session_state.analyzing = True

if "price" in st.session_state:
    with col1:
        st.metric("Estimated Price", f"${st.session_state.price:,}")
        conf_low = int(st.session_state.price * 0.92)
        conf_high = int(st.session_state.price * 1.08)
        st.caption(f"Range: ${conf_low:,} - ${conf_high:,}")

with col2:
    if "analyzing" in st.session_state:
        with st.spinner("🤖 Generating AI Analysis..."):
            analysis = get_ai_analysis(st.session_state.price)
            st.write(analysis)