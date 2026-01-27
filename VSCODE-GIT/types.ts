
export interface HouseFeatures {
  sqft_living: number;
  bedrooms: number;
  bathrooms: number;
  floors: number;
  view: number; // 0-4
  condition: number; // 1-5
  grade: number; // 1-13
  sqft_above: number;
  sqft_basement: number;
  yr_built: number;
  yr_renovated: number;
  zipcode: string;
}

export interface PredictionResult {
  estimatedPrice: number;
  confidenceInterval: [number, number];
  features: HouseFeatures;
  marketInsights?: string;
}

export interface MarketTrend {
  month: string;
  avgPrice: number;
  volume: number;
}
