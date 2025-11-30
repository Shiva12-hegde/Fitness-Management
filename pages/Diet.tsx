import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { generateDietAdvice } from '../services/geminiService';
import { BrainCircuit, Loader2 } from 'lucide-react';

export const Diet: React.FC = () => {
  const { user } = useApp();
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!user) return;
    setLoading(true);
    const result = await generateDietAdvice(user);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-8 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 p-3 rounded-xl">
             <BrainCircuit className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold">AI Nutritionist</h1>
        </div>
        <p className="text-indigo-100 max-w-2xl text-lg">
          Generate a personalized diet plan and health analysis based on your unique profile metrics using Gemini AI.
        </p>
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="mt-6 bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-indigo-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> Analyzing Profile...
            </>
          ) : (
            'Generate My Plan'
          )}
        </button>
      </div>

      {advice && (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden animate-fade-in">
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">Your Personalized Plan</h2>
          </div>
          <div className="p-8 prose prose-indigo max-w-none">
            {/* Simple Markdown Rendering */}
            {advice.split('\n').map((line, idx) => {
              if (line.startsWith('###')) {
                return <h3 key={idx} className="text-xl font-bold text-gray-900 mt-6 mb-3">{line.replace('###', '').trim()}</h3>;
              }
              if (line.startsWith('**')) {
                 return <p key={idx} className="font-bold text-gray-800 mt-2">{line.replace(/\*\*/g, '')}</p>
              }
              if (line.trim().startsWith('-')) {
                return <li key={idx} className="ml-4 text-gray-700 list-disc my-1">{line.replace('-', '').trim()}</li>;
              }
              if (line.trim() === '') return <br key={idx} />;
              return <p key={idx} className="text-gray-700">{line}</p>;
            })}
          </div>
        </div>
      )}
    </div>
  );
};