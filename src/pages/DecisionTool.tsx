import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { School } from 'lucide-react';
import { decisionSteps, decisionResults, type Result } from '../utils/decisionSteps';

export function DecisionTool() {
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState('start');
  const [result, setResult] = useState<Result | null>(null);
  const [history, setHistory] = useState<string[]>(['start']);

  const handleStart = () => {
    setStarted(true);
  };

  const handleOption = (nextStep: string) => {
    if (decisionSteps[nextStep]) {
      setCurrentStep(nextStep);
      setHistory([...history, nextStep]);
    } else if (decisionResults[nextStep]) {
      setResult(decisionResults[nextStep]);
    }
  };

  const handleRestart = () => {
    setStarted(false);
    setCurrentStep('start');
    setResult(null);
    setHistory(['start']);
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-center mb-6">
            <School className="h-12 w-12 text-indigo-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-4">
            MTSS Referral Decision Tool
          </h1>
          
          <p className="text-gray-600 text-center mb-6">
            This tool will guide you through the referral process for IP and ECEAP students.
            Answer a few questions to determine the appropriate next steps.
          </p>

          <button
            onClick={handleStart}
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
          >
            Start
          </button>

          <div className="text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-center mb-6">
          <School className="h-12 w-12 text-indigo-600" />
        </div>

        {result ? (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">{result.title}</h2>
            
            {result.contact && (
              <div>
                <h3 className="text-sm font-medium text-gray-700">Contact:</h3>
                <p className="mt-1 text-sm text-gray-600">{result.contact}</p>
              </div>
            )}
            
            <div>
              <h3 className="text-sm font-medium text-gray-700">Instructions:</h3>
              <p className="mt-1 text-sm text-gray-600">{result.instructions}</p>
            </div>
            
            <div className="flex flex-col space-y-3">
              {result.requiresMTSS && (
                <Link
                  to="/register"
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 text-center"
                >
                  Begin MTSS Referral
                </Link>
              )}
              
              <button
                onClick={handleRestart}
                className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
              >
                Start Over
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">
              {decisionSteps[currentStep].question}
            </h2>
            
            <div className="space-y-3">
              {decisionSteps[currentStep].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOption(option.next)}
                  className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {option.text}
                </button>
              ))}
            </div>

            <button
              onClick={handleRestart}
              className="w-full px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-md hover:bg-indigo-100"
            >
              Start Over
            </button>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
