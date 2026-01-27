
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import PredictionForm from './components/PredictionForm';
import MarketChart from './components/MarketChart';
import ResultDisplay from './components/ResultDisplay';
import { HouseFeatures, PredictionResult } from './types';
import { calculatePrice } from './services/predictionEngine';
import { getMarketAnalysis } from './services/geminiService';

const App: React.FC = () => {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handlePredict = useCallback(async (features: HouseFeatures) => {
    setIsLoading(true);
    
    // Simulate engine processing time
    setTimeout(async () => {
      const result = calculatePrice(features);
      setPrediction(result);
      setIsLoading(false);
      
      // Start AI analysis
      setIsAnalyzing(true);
      const analysis = await getMarketAnalysis(result);
      setPrediction((prev: PredictionResult | null) => prev ? { ...prev, marketInsights: analysis } : null);
      setIsAnalyzing(false);
    }, 800);
  }, []);

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Market Valuation Engine</h2>
          <p className="text-lg text-slate-500 max-w-2xl font-medium">
            Enter property details below. Our regression-based model and Gemini AI will provide an instant, data-backed market valuation and strategic analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
          <div className="xl:col-span-5 space-y-8">
            <section>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Property Parameters</h3>
              <PredictionForm onPredict={handlePredict} isLoading={isLoading} />
            </section>
            
            <section className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Data Quality Notice
                </h4>
                <p className="text-sm text-indigo-700 leading-relaxed">
                    Estimates are based on historical data from similar ZIP codes. Accuracy is subject to local market volatility and interior finish specifics not captured in primary metrics.
                </p>
            </section>
          </div>

          <div className="xl:col-span-7 space-y-10">
            {prediction ? (
              <ResultDisplay result={prediction} isAnalyzing={isAnalyzing} />
            ) : (
              <div className="bg-slate-100/50 border-2 border-dashed border-slate-200 rounded-3xl h-[500px] flex flex-col items-center justify-center text-slate-400 p-12 text-center">
                <div className="bg-slate-200 p-4 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-600 mb-2">Awaiting Parameters</h3>
                <p className="max-w-xs">Fill out the form to the left to see instant property valuations and deep AI market insights.</p>
              </div>
            )}

            <section>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Macro Market Intelligence</h3>
              <MarketChart />
            </section>
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-slate-200 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 grayscale opacity-60">
                <div className="bg-slate-900 p-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </div>
                <span className="font-bold text-slate-900">ProphetAI</span>
            </div>
            <p className="text-sm text-slate-500">&copy; 2024 ProphetAI Analytics. All data provided for informational purposes.</p>
            <div className="flex gap-6 text-sm font-medium text-slate-400">
                <a href="#" className="hover:text-indigo-600">Privacy</a>
                <a href="#" className="hover:text-indigo-600">Terms</a>
                <a href="#" className="hover:text-indigo-600">Contact</a>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
