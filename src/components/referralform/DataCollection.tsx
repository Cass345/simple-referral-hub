import { useState } from 'react';
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';

interface DataCollectionMethod {
  type: string;
  frequency: string;
  tools: string[];
  notes: string;
}

interface Behavior {
  id?: number;
  name: string;
  category: string;
  description: string;
  evaluation?: unknown;
}

interface DataCollectionProps {
  behaviors: Behavior[];
  onSubmit: (data: Record<number, DataCollectionMethod>) => void;
  onBack: () => void;
  initialData?: Record<number, DataCollectionMethod>;
}

const dataCollectionTypes = [
  {
    value: 'frequency',
    label: 'Frequency/Event & Rate Recording',
    description: 'Count how often the behavior occurs',
    tools: ['Tally sheet', 'Counter app', 'Behavior log'],
    example: 'Example: Count how many times a student raises their hand during class.'
  },
  {
    value: 'duration',
    label: 'Duration Recording',
    description: 'Measure how long the behavior lasts',
    tools: ['Timer', 'Duration log', 'Stopwatch app'],
    example: 'Example: Measure how long a student stays on task during a 30-minute activity.'
  },
  {
    value: 'interval',
    label: 'Interval Recording',
    description: 'Check if behavior occurs during set time intervals',
    tools: ['Interval timer', 'Observation sheet', 'Time sampling form'],
    example: 'Example: Check every 5 minutes if a student is engaged in the lesson.'
  },
  {
    value: 'latency',
    label: 'Latency Recording',
    description: 'Measure how long it takes for a behavior to start after a prompt',
    tools: ['Stopwatch', 'Latency log', 'Timer app'],
    example: 'Example: Measure how long it takes for a student to start working after being given an instruction.'
  },
  {
    value: 'timeSampling',
    label: 'Time Sampling Recording',
    description: 'Observe behavior at specific moments in time',
    tools: ['Timer', 'Observation sheet', 'Time sampling form'],
    example: 'Example: Observe a student’s behavior at the start of every 10-minute interval.'
  },
  {
    value: 'permanentProduct',
    label: 'Permanent Product',
    description: 'Record tangible outcomes or products of behavior',
    tools: ['Checklist', 'Product log', 'Digital tracking app'],
    example: 'Example: Count the number of completed homework assignments or worksheets.'
  },
  {
    value: 'abcAnalysis',
    label: 'ABC Analysis',
    description: 'Document Antecedent, Behavior, Consequence',
    tools: ['ABC chart', 'Behavior incident form', 'Digital tracking app'],
    example: 'Example: Record what happens before, during, and after a student has a tantrum.'
  },
  {
    value: 'scatterplot',
    label: 'Scatterplot',
    description: 'Identify patterns of behavior over time',
    tools: ['Scatterplot chart', 'Observation sheet', 'Digital tracking app'],
    example: 'Example: Track when a student’s disruptive behavior occurs throughout the day.'
  }
];

const collectionFrequencies = [
  { value: 'continuous', label: 'Continuous (Throughout the day)' },
  { value: 'daily', label: 'Daily (Once per day)' },
  { value: 'weekly', label: 'Weekly (Several times per week)' },
  { value: 'scheduled', label: 'Scheduled Times (Specific periods)' }
];

export function DataCollection({ behaviors, onSubmit, onBack, initialData = {} }: DataCollectionProps) {
  const [collectionMethods, setCollectionMethods] = useState<Record<number, DataCollectionMethod>>(
    Object.keys(initialData).length > 0
      ? initialData
      : behaviors.reduce((acc, _, index) => ({
          ...acc,
          [index]: {
            type: '',
            frequency: '',
            tools: [],
            notes: ''
          }
        }), {})
  );

  const updateMethod = (behaviorId: number, field: keyof DataCollectionMethod, value: unknown) => {
    setCollectionMethods(prev => ({
      ...prev,
      [behaviorId]: {
        ...prev[behaviorId],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(collectionMethods);
  };

  const isMethodComplete = (method: DataCollectionMethod) => {
    return method.type && method.frequency && method.tools.length > 0;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Data Collection Plan</h2>
      <p className="text-gray-600 mb-6">
        Select appropriate data collection methods and tools for each behavior to track progress effectively.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {behaviors.map((behavior, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-4">{behavior.name}</h3>
            <p className="text-gray-600 mb-4">{behavior.description}</p>
            
                          <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Collection Method
                  <span className="ml-1 inline-block" title="How will you collect data for this behavior?">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </span>
                </label>
                <select
                  value={collectionMethods[index].type}
                  onChange={(e) => updateMethod(index, 'type', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a method</option>
                  {dataCollectionTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
                {collectionMethods[index].type && (
                  <div className="mt-1 text-sm text-gray-500">
                    <p>{dataCollectionTypes.find(t => t.value === collectionMethods[index].type)?.description}</p>
                    <p className="italic">{dataCollectionTypes.find(t => t.value === collectionMethods[index].type)?.example}</p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Collection Frequency
                  <span className="ml-1 inline-block" title="How often will you collect data?">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </span>
                </label>
                <select
                  value={collectionMethods[index].frequency}
                  onChange={(e) => updateMethod(index, 'frequency', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select frequency</option>
                  {collectionFrequencies.map(freq => (
                    <option key={freq.value} value={freq.value}>{freq.label}</option>
                  ))}
                </select>
              </div>

              {collectionMethods[index].type && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Collection Tools
                    <span className="ml-1 inline-block" title="What tools will you use to collect data?">
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </span>
                  </label>
                  <div className="space-y-2">
                    {dataCollectionTypes
                      .find(t => t.value === collectionMethods[index].type)
                      ?.tools.map(tool => (
                        <label key={tool} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={collectionMethods[index].tools.includes(tool)}
                            onChange={(e) => {
                              const tools = collectionMethods[index].tools;
                              const newTools = e.target.checked
                                ? [...tools, tool]
                                : tools.filter(t => t !== tool);
                              updateMethod(index, 'tools', newTools);
                            }}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-gray-700">{tool}</span>
                        </label>
                      ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                  <span className="ml-1 inline-block" title="Any specific details about data collection for this behavior">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </span>
                </label>
                <textarea
                  value={collectionMethods[index].notes}
                  onChange={(e) => updateMethod(index, 'notes', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Add any additional notes about data collection..."
                />
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
            disabled={!Object.values(collectionMethods).every(isMethodComplete)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            Next: Review
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
   );
}