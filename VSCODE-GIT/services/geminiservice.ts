
import { GoogleGenAI } from "@google/genai";
import { PredictionResult } from "../types";

export const getMarketAnalysis = async (result: PredictionResult): Promise<string> => {
  // Always use process.env.API_KEY directly as per senior engineer guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Act as a professional real estate analyst. 
    Analyze the following house prediction result:
    - Estimated Price: $${result.estimatedPrice.toLocaleString()}
    - Square Footage: ${result.features.sqft_living} sqft
    - Bedrooms/Bathrooms: ${result.features.bedrooms}/${result.features.bathrooms}
    - Condition Grade (1-13): ${result.features.grade}
    - Location Zipcode: ${result.features.zipcode}
    - Year Built: ${result.features.yr_built}

    Provide a concise (3-4 paragraph) expert opinion on:
    1. Whether this price seems realistic for the current market.
    2. How the specific features (like grade or location) are likely impacting this valuation.
    3. Suggested renovations or upgrades that could yield the highest return on investment for this specific property profile.
    4. A brief outlook on the real estate market in a similar area.
    
    Use a professional yet accessible tone. Use markdown formatting.
  `;

  try {
    // The 404 error was likely due to 'gemini-3-flash-latest' being an invalid model ID.
    // 'gemini-3-flash-preview' is the correct identifier for text-based tasks.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    // Use .text property directly as per modern @google/genai documentation
    return response.text || "Unable to generate analysis at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating AI analysis. Please check your connection or API configuration.";
  }
};
