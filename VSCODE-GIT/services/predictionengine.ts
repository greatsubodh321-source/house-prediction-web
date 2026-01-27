import { HouseFeatures, PredictionResult } from '../types';
import { REGRESSION_WEIGHTS, ZIPCODE_MULTIPLIERS } from '../constants';

export const calculatePrice = (features: HouseFeatures): PredictionResult => {
  const currentYear = new Date().getFullYear();
  const effectiveYear = Math.max(features.yr_built, features.yr_renovated);
  const age = currentYear - effectiveYear;

  let price = REGRESSION_WEIGHTS.intercept;
  price += features.sqft_living * REGRESSION_WEIGHTS.sqft_living;
  price += features.bedrooms * REGRESSION_WEIGHTS.bedrooms;
  price += features.bathrooms * REGRESSION_WEIGHTS.bathrooms;
  price += features.floors * REGRESSION_WEIGHTS.floors;
  price += features.view * REGRESSION_WEIGHTS.view;
  price += features.condition * REGRESSION_WEIGHTS.condition;
  price += features.grade * REGRESSION_WEIGHTS.grade;
  price += age * REGRESSION_WEIGHTS.age_penalty;

  // Apply location multiplier
  const multiplier = ZIPCODE_MULTIPLIERS[features.zipcode] || ZIPCODE_MULTIPLIERS.default;
  price *= multiplier;

  // Ensure minimum price for sanity
  price = Math.max(price, 150000);

  return {
    estimatedPrice: Math.round(price),
    confidenceInterval: [Math.round(price * 0.92), Math.round(price * 1.08)],
    features
  };
};
