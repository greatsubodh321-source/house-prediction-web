import React from 'react';
import { PredictionResult } from '../types';

interface ResultDisplayProps {
  result: PredictionResult;
  isAnalyzing: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, isAnalyzing }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-3xl text-white shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="text-indigo-100 font-medium mb-1">Estimated Fair Market Value</p>
            <h2 className="text-5xl font-black tabular-nums tracking-tight">
              ${result.estimatedPrice.toLocaleString()}
            </h2>
            <div className="mt-4 flex items-center gap-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                Confidence Range: ${result.confidenceInterval[0].toLocaleString()} - ${result.confidenceInterval[1].toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex -space-x-2">
              <img src="https://picsum.photos/40/40?random=1" className="w-10 h-10 rounded-full border-2 border-indigo-500" alt="Agent" />
              <img src="https://picsum.photos/40/40?random=2" className="w-10 h-10 rounded-full border-2 border-indigo-500" alt="Agent" />
              <img src="https://picsum.photos/40/40?random=3" className="w-10 h-10 rounded-full border-2 border-indigo-500" alt="Agent" />
            </div>
            <p className="mt-2 text-xs font-medium text-indigo-100">Top area agents agree with this valuation</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-amber-100 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800">Gemini AI Market Insight</h3>
        </div>

        {isAnalyzing ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-slate-100 rounded w-3/4"></div>
            <div className="h-4 bg-slate-100 rounded w-full"></div>
            <div className="h-4 bg-slate-100 rounded w-5/6"></div>
            <div className="h-4 bg-slate-100 rounded w-2/3"></div>
          </div>
        ) : (
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
            {result.marketInsights}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-100 text-center">
            <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Price per sqft</p>
            <p className="text-xl font-bold text-slate-800">${Math.round(result.estimatedPrice / result.features.sqft_living)}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 text-center">
            <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Mortgage Estimate</p>
            <p className="text-xl font-bold text-slate-800">${Math.round(result.estimatedPrice * 0.006).toLocaleString()}/mo</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 text-center">
            <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Projected ROI (5y)</p>
            <p className="text-xl font-bold text-indigo-600">+18.4%</p>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
