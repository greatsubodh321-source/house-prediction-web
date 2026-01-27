
import { MarketTrend } from './types';

// Simulated regression coefficients based on common house price datasets (like King County)
export const REGRESSION_WEIGHTS = {
  intercept: -40000,
  sqft_living: 280,
  bedrooms: -35000,
  bathrooms: 41000,
  floors: 6000,
  view: 52000,
  condition: 26000,
  grade: 94000,
  age_penalty: -1500, // per year since built/renovated
};

export const MOCK_MARKET_TRENDS: MarketTrend[] = [
  { month: 'Jan', avgPrice: 540000, volume: 120 },
  { month: 'Feb', avgPrice: 535000, volume: 115 },
  { month: 'Mar', avgPrice: 550000, volume: 145 },
  { month: 'Apr', avgPrice: 580000, volume: 180 },
  { month: 'May', avgPrice: 610000, volume: 210 },
  { month: 'Jun', avgPrice: 630000, volume: 230 },
  { month: 'Jul', avgPrice: 625000, volume: 195 },
  { month: 'Aug', avgPrice: 640000, volume: 205 },
  { month: 'Sep', avgPrice: 615000, volume: 160 },
  { month: 'Oct', avgPrice: 600000, volume: 140 },
  { month: 'Nov', avgPrice: 590000, volume: 110 },
  { month: 'Dec', avgPrice: 605000, volume: 95 },
];

export const ZIPCODE_MULTIPLIERS: Record<string, number> = {
  '98001': 0.85,
  '98004': 2.1,
  '98101': 1.8,
  '98112': 1.95,
  '98033': 1.6,
  '98052': 1.5,
  '98103': 1.4,
  'default': 1.0
};
