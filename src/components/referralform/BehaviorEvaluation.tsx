import { useState } from 'react';
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import type { Behavior } from '@/types/referral';

export interface BehaviorEvaluationProps {
  behaviors: Behavior[];
  onSubmit: (data: Behavior[]) => void;
  onBack: () => void;
}

export function BehaviorEvaluation({ behaviors, onSubmit, onBack }: BehaviorEvaluationProps) {
  const [evaluatedBehaviors, setEvaluatedBehaviors] = useState<Behavior[]>(behaviors);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(evaluatedBehaviors);
  };

  interface BehaviorEvaluationType {
    frequency?: string;
    duration?: string;
    intensity?: string;
    impact?: string;
    setting?: string[];
    triggers?: string[];
    consequences?: string;
  }

  const updateBehaviorEvaluation = (
    index: number,
    field: keyof BehaviorEvaluationType,
    value: string | string[]
  ) => {
    setEvaluatedBehaviors(prev =>
      prev.map((behavior, i) => {
        if (i === index) {
          return {
            ...behavior,
            evaluation: {
              ...behavior.evaluation,
              [field]: value,
            },
          };
        }
        return behavior;
      })
    );
  };


  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Evaluate Behaviors</h2>
      <p className="text-gray-600 mb-6">
        Provide detailed information about each identified behavior to help develop effective interventions.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {evaluatedBehaviors.map((behavior, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-4">{behavior.name}</h3>
            <p className="text-gray-600 mb-4">{behavior.description}</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                  <span className="ml-1 inline-block" title="How often does this behavior occur?">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </span>
                </label>
                <select
                  value={behavior.evaluation?.frequency || ''}
                  onChange={(e) => updateBehaviorEvaluation(index, 'frequency', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select frequency</option>
                  <option value="rarely">Rarely (1-2 times per week)</option>
                  <option value="occasionally">Occasionally (3-4 times per week)</option>
                  <option value="frequently">Frequently (daily)</option>
                  <option value="very-frequently">Very Frequently (multiple times per day)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                  <span className="ml-1 inline-block" title="How long does each instance of the behavior typically last?">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </span>
                </label>
                <select
                  value={behavior.evaluation?.duration || ''}
                  onChange={(e) => updateBehaviorEvaluation(index, 'duration', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select duration</option>
                  <option value="brief">Brief (less than 5 minutes)</option>
                  <option value="moderate">Moderate (5-15 minutes)</option>
                  <option value="extended">Extended (15-30 minutes)</option>
                  <option value="prolonged">Prolonged (more than 30 minutes)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Intensity
                  <span className="ml-1 inline-block" title="How severe is the behavior when it occurs?">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </span>
                </label>
                <select
                  value={behavior.evaluation?.intensity || ''}
                  onChange={(e) => updateBehaviorEvaluation(index, 'intensity', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select intensity</option>
                  <option value="mild">Mild (minimal disruption)</option>
                  <option value="moderate">Moderate (noticeable disruption)</option>
                  <option value="severe">Severe (significant disruption)</option>
                  <option value="crisis">Crisis (requires immediate intervention)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Impact on Learning/Social Interaction
                  <span className="ml-1 inline-block" title="How does this behavior affect the student's learning or social interactions?">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </span>
                </label>
                <select
                  value={behavior.evaluation?.impact || ''}
                  onChange={(e) => updateBehaviorEvaluation(index, 'impact', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select impact</option>
                  <option value="minimal">Minimal impact</option>
                  <option value="moderate">Moderate impact</option>
                  <option value="significant">Significant impact</option>
                  <option value="severe">Severe impact</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Setting/Context
                  <span className="ml-1 inline-block" title="In what settings does this behavior typically occur?">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </span>
                </label>
                <div className="space-y-2">
                  {['Classroom', 'Playground', 'Cafeteria', 'Transitions', 'Specials'].map((setting) => (
                    <label key={setting} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={behavior.evaluation?.setting?.includes(setting.toLowerCase()) || false}
                        onChange={(e) => {
                          const settings = behavior.evaluation?.setting || [];
                          const newSettings = e.target.checked
                            ? [...settings, setting.toLowerCase()]
                            : settings.filter(s => s !== setting.toLowerCase());
                          updateBehaviorEvaluation(index, 'setting', newSettings);
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-700">{setting}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Common Triggers
                  <span className="ml-1 inline-block" title="What typically triggers or precedes this behavior?">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </span>
                </label>
                <div className="space-y-2">
                  {[
                    'Transitions',
                    'Peer interactions',
                    'Academic demands',
                    'Sensory overload',
                    'Changes in routine'
                  ].map((trigger) => (
                    <label key={trigger} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={behavior.evaluation?.triggers?.includes(trigger.toLowerCase()) || false}
                        onChange={(e) => {
                          const triggers = behavior.evaluation?.triggers || [];
                          const newTriggers = e.target.checked
                            ? [...triggers, trigger.toLowerCase()]
                            : triggers.filter(t => t !== trigger.toLowerCase());
                          updateBehaviorEvaluation(index, 'triggers', newTriggers);
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-700">{trigger}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Typical Consequences/Outcomes
                  <span className="ml-1 inline-block" title="What typically happens after the behavior occurs?">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </span>
                </label>
                <textarea
                  value={behavior.evaluation?.consequences || ''}
                  onChange={(e) => updateBehaviorEvaluation(index, 'consequences', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe what typically happens after the behavior occurs..."
                />
              </div>
            </div>
          </div>
        ))}


<div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ChevronLeft className="mr-2 h-5 w-5" />
            Back
          </button>
          <button
            type="submit"
            disabled={evaluatedBehaviors.some(b => !b.evaluation?.frequency)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            Next: Data Collection
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
