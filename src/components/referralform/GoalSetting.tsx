import { useState } from 'react';
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';

interface Goal {
  behaviorId: number;
  specific: string;
  measurable: string;
  achievable: string;
  relevant: string;
  timely: string;
  baseline: string;
  target: string;
  timeline: string;
}

interface Behavior {
  id?: number;
  name: string;
  category: string;
  description: string;
  evaluation?: {
    method: string;
    frequency: string;
    criteria: string;
  };
}

interface GoalSettingProps {
  behaviors: Behavior[];
  onSubmit: (data: Goal[]) => void;
  onBack: () => void;
  initialData?: Goal[];
}

export function GoalSetting({ behaviors, onSubmit, onBack, initialData = [] }: GoalSettingProps) {
  const [goals, setGoals] = useState<Goal[]>(
    initialData.length > 0 
      ? initialData 
      : behaviors.map((b, index) => ({
          behaviorId: index,
          specific: '',
          measurable: '',
          achievable: '',
          relevant: '',
          timely: '',
          baseline: '',
          target: '',
          timeline: ''
        }))
  );

  const updateGoal = (behaviorId: number, field: keyof Goal, value: string) => {
    setGoals(prev => prev.map(goal => 
      goal.behaviorId === behaviorId 
        ? { ...goal, [field]: value }
        : goal
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(goals);
  };

  const isGoalComplete = (goal: Goal) => {
    return Object.values(goal).every(value => 
      typeof value === 'string' ? value.trim().length > 0 : true
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Set SMART Goals</h2>
      <p className="text-gray-600 mb-6">
        Create specific, measurable, achievable, relevant, and time-bound goals for each identified behavior.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {behaviors.map((behavior, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-4">{behavior.name}</h3>
            <p className="text-gray-600 mb-4">{behavior.description}</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specific Goal
                  <span className="ml-1 inline-block" title="What exactly do you want to accomplish?">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </span>
                </label>
                <textarea
                  value={goals[index].specific}
                  onChange={(e) => updateGoal(index, 'specific', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                  placeholder="Describe the specific behavior change you want to see..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Measurable Criteria
                  <span className="ml-1 inline-block" title="How will you measure progress?">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </span>
                </label>
                <textarea
                  value={goals[index].measurable}
                  onChange={(e) => updateGoal(index, 'measurable', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                  placeholder="Define how you will measure progress..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Achievable Steps
                  <span className="ml-1 inline-block" title="What steps will help reach this goal?">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </span>
                </label>
                <textarea
                  value={goals[index].achievable}
                  onChange={(e) => updateGoal(index, 'achievable', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                  placeholder="List the steps needed to achieve this goal..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Relevant Outcomes
                  <span className="ml-1 inline-block" title="Why is this goal important?">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </span>
                </label>
                <textarea
                  value={goals[index].relevant}
                  onChange={(e) => updateGoal(index, 'relevant', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                  placeholder="Explain why this goal is important..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Baseline
                    <span className="ml-1 inline-block" title="What is the current frequency/level of the behavior?">
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </span>
                  </label>
                  <input
                    type="text"
                    value={goals[index].baseline}
                    onChange={(e) => updateGoal(index, 'baseline', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Current level..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Goal
                    <span className="ml-1 inline-block" title="What is the target frequency/level?">
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </span>
                  </label>
                  <input
                    type="text"
                    value={goals[index].target}
                    onChange={(e) => updateGoal(index, 'target', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Target level..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Timeline
                  <span className="ml-1 inline-block" title="When do you expect to achieve this goal?">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </span>
                </label>
                <input
                  type="text"
                  value={goals[index].timeline}
                  onChange={(e) => updateGoal(index, 'timeline', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Expected timeline..."
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
            disabled={!goals.every(isGoalComplete)}
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


