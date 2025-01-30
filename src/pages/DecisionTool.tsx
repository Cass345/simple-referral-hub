import React from 'react';
import { useNavigate } from 'react-router-dom';
import { School, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface Step {
  question: string;
  options: {
    text: string;
    nextStep?: string;
    result?: {
      requiresMTSS: boolean;
      message: string;
      nextAction: string;
    };
  }[];
}

const flowchartSteps: Record<string, Step> = {
  start: {
    question: 'What type of support is the student currently receiving?',
    options: [
      { text: 'General Education Only', nextStep: 'concerns_type' },
      { text: 'Has IEP', nextStep: 'iep_needs' },
      { text: 'Has 504 Plan', nextStep: 'concerns_type' },
    ],
  },
  concerns_type: {
    question: 'What is the primary area of concern?',
    options: [
      { text: 'Academic Performance', nextStep: 'academic_concerns' },
      { text: 'Behavior/Social-Emotional', nextStep: 'behavior_concerns' },
      { text: 'Both Academic and Behavioral', nextStep: 'combined_concerns' },
    ],
  },
  academic_concerns: {
    question: 'Have Tier 1 academic interventions been implemented consistently?',
    options: [
      {
        text: 'Yes, with documentation',
        result: {
          requiresMTSS: true,
          message: 'MTSS is recommended for this student.',
          nextAction: 'Create an account to begin the referral process'
        }
      },
      {
        text: 'No/Unsure',
        result: {
          requiresMTSS: false,
          message: 'Implement and document Tier 1 interventions first',
          nextAction: 'Review Tier 1 support documentation'
        }
      }
    ]
  },
  behavior_concerns: {
    question: 'Have Tier 1 behavioral interventions been implemented consistently?',
    options: [
      {
        text: 'Yes, with documentation',
        result: {
          requiresMTSS: true,
          message: 'MTSS is recommended for this student.',
          nextAction: 'Create an account to begin the referral process'
        }
      },
      {
        text: 'No/Unsure',
        result: {
          requiresMTSS: false,
          message: 'Implement and document Tier 1 interventions first',
          nextAction: 'Review Tier 1 support documentation'
        }
      }
    ]
  }
};

export function DecisionTool() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState('start');
  const [path, setPath] = React.useState<string[]>(['start']);
  const [result, setResult] = React.useState<Step['options'][0]['result'] | null>(null);

  const handleOption = (option: Step['options'][0]) => {
    if (option.result) {
      setResult(option.result);
    } else if (option.nextStep) {
      setCurrentStep(option.nextStep);
      setPath([...path, option.nextStep]);
    }
  };

  const handleContinue = () => {
    if (result?.requiresMTSS) {
      navigate('/signup');
    }
  };

  const step = flowchartSteps[currentStep];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <School className="w-8 h-8 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Decision Support Tool</h1>
          <p className="mt-2 text-gray-600">
            Answer a few questions to determine if MTSS is the right pathway for your student
          </p>
        </div>

        {/* Decision Flow */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          {!result ? (
            <>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{step.question}</h2>
              <div className="space-y-3">
                {step.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOption(option)}
                    className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className={`p-4 rounded-lg ${
                result.requiresMTSS ? 'bg-green-50' : 'bg-yellow-50'
              }`}>
                <div className="flex items-start">
                  {result.requiresMTSS ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 mr-3" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 mr-3" />
                  )}
                  <div>
                    <h3 className={`font-medium ${
                      result.requiresMTSS ? 'text-green-800' : 'text-yellow-800'
                    }`}>
                      {result.message}
                    </h3>
                    <p className={`mt-1 text-sm ${
                      result.requiresMTSS ? 'text-green-700' : 'text-yellow-700'
                    }`}>
                      {result.nextAction}
                    </p>
                  </div>
                </div>
              </div>
              
              {result.requiresMTSS && (
                <button
                  onClick={handleContinue}
                  className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                  Continue to Sign Up
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        {!result && path.length > 1 && (
          <button
            onClick={() => {
              const newPath = path.slice(0, -1);
              setPath(newPath);
              setCurrentStep(newPath[newPath.length - 1]);
            }}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Go Back
          </button>
        )}
      </div>
    </div>
  );
}