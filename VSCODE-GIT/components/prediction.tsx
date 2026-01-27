
import React, { useState } from 'react';
import { HouseFeatures } from '../types';

interface PredictionFormProps {
  onPredict: (features: HouseFeatures) => void;
  isLoading: boolean;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onPredict, isLoading }) => {
  const [formData, setFormData] = useState<HouseFeatures>({
    sqft_living: 2200,
    bedrooms: 3,
    bathrooms: 2.5,
    floors: 2,
    view: 0,
    condition: 3,
    grade: 7,
    sqft_above: 2200,
    sqft_basement: 0,
    yr_built: 1995,
    yr_renovated: 0,
    zipcode: '98103'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'zipcode' ? value : Number(value)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Living Area (sqft)</label>
          <input
            type="number"
            name="sqft_living"
            value={formData.sqft_living}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Zip Code</label>
          <select
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          >
            <option value="98103">Seattle Central (98103)</option>
            <option value="98004">Bellevue (98004)</option>
            <option value="98033">Kirkland (98033)</option>
            <option value="98112">Capitol Hill (98112)</option>
            <option value="98052">Redmond (98052)</option>
            <option value="98001">Auburn (98001)</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Bedrooms</label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all"
            min="1"
            max="15"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Bathrooms</label>
          <input
            type="number"
            name="bathrooms"
            step="0.5"
            value={formData.bathrooms}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all"
            min="1"
            max="10"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Year Built</label>
          <input
            type="number"
            name="yr_built"
            value={formData.yr_built}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all"
            min="1900"
            max="2024"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Property Grade (1-13)</label>
          <input
            type="range"
            name="grade"
            min="1"
            max="13"
            value={formData.grade}
            onChange={handleChange}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-slate-500 font-medium">
            <span>Low</span>
            <span>Current: {formData.grade}</span>
            <span>Luxurious</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Condition (1-5)</label>
          <div className="flex gap-4 mt-2">
            {[1, 2, 3, 4, 5].map(num => (
              <button
                key={num}
                type="button"
                onClick={() => setFormData(p => ({ ...p, condition: num }))}
                className={`flex-1 py-2 rounded-lg border text-sm font-semibold transition-all ${
                  formData.condition === num 
                    ? 'bg-indigo-600 border-indigo-600 text-white' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Floors</label>
          <input
            type="number"
            name="floors"
            step="0.5"
            value={formData.floors}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all"
            min="1"
            max="4"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-10 bg-indigo-600 text-white py-4 rounded-xl text-lg font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Calculating Valuation...
          </>
        ) : 'Get Estimated Price'}
      </button>
    </form>
  );
};

export default PredictionForm;
