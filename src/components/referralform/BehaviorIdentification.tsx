import { useState } from 'react';
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';

type BehaviorCategory = 'social-emotional' | 'attention-focus' | 'communication-language' | 'motor-skills' | 'adaptive-behaviors' | 'challenging-behaviors';

interface Behavior {
  category: BehaviorCategory;
  name: string;
  description: string;
}

interface BehaviorIdentificationProps {
  onSubmit: (data: Behavior[]) => void;
  onBack: () => void;
  initialData?: Behavior[];
}

const behaviorOptions: Record<BehaviorCategory, string[]> = {
  'social-emotional': [
    'Difficulty sharing or taking turns',
    'Frequent conflicts with peers',
    'Difficulty expressing emotions appropriately',
    'Social withdrawal or isolation',
    'Excessive dependency on adults'
  ],
  'attention-focus': [
    'Difficulty staying on task',
    'Easily distracted by surroundings',
    'Difficulty following multi-step directions',
    'Frequent task switching without completion',
    'Difficulty maintaining attention during activities'
  ],
  'communication-language': [
    'Difficulty expressing needs verbally',
    'Limited vocabulary use',
    'Difficulty following verbal instructions',
    'Unclear speech or articulation',
    'Difficulty engaging in conversations'
  ],
  'motor-skills': [
    'Difficulty with fine motor tasks',
    'Poor handwriting or drawing skills',
    'Difficulty with gross motor activities',
    'Poor balance or coordination',
    'Difficulty with spatial awareness'
  ],
  'adaptive-behaviors': [
    'Difficulty with self-care routines',
    'Poor time management',
    'Difficulty adapting to changes',
    'Struggles with organizational skills',
    'Difficulty following classroom routines'
  ],
  'challenging-behaviors': [
    'Physical aggression towards others',
    'Verbal aggression or inappropriate language',
    'Destructive behavior towards property',
    'Non-compliance with instructions',
    'Disruptive behaviors during activities'
  ]
};

export function BehaviorIdentification({ onSubmit, onBack, initialData = [] }: BehaviorIdentificationProps) {
  const [behaviors, setBehaviors] = useState(initialData);
  const [selectedCategory, setSelectedCategory] = useState<BehaviorCategory | ''>('');
  const [currentBehavior, setCurrentBehavior] = useState({
    category: '',
    name: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(behaviors);
  };

  const addBehavior = () => {
    if (currentBehavior.category && currentBehavior.name) {
      setBehaviors([...behaviors, currentBehavior as Behavior]);
      setCurrentBehavior({
        category: '',
        name: '',
        description: ''
      });
      setSelectedCategory('');
    }
  };

  const removeBehavior = (index: number) => {
    setBehaviors(behaviors.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Identify Target Behaviors</h2>
      <p className="text-gray-600 mb-6">
        Select behaviors of concern and provide specific descriptions to help create targeted interventions.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Behavior Category
              <span className="ml-1 inline-block" title="Select a category to see specific behaviors">
                <HelpCircle className="h-4 w-4 text-gray-400" />
              </span>
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value as BehaviorCategory);
                setCurrentBehavior(prev => ({ ...prev, category: e.target.value }));
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {Object.keys(behaviorOptions).map((category) => (
                <option key={category} value={category}>
                  {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
              ))}
            </select>
          </div>

          {selectedCategory && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specific Behavior
              </label>
              <select
                value={currentBehavior.name}
                onChange={(e) => setCurrentBehavior(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a behavior</option>
                {behaviorOptions[selectedCategory as BehaviorCategory].map((behavior) => (
                  <option key={behavior} value={behavior}>
                    {behavior}
                  </option>
                ))}
              </select>
            </div>
          )}

          {currentBehavior.name && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Behavior Description
                <span className="ml-1 inline-block" title="Provide specific details about how this behavior manifests">
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                </span>
              </label>
              <textarea
                value={currentBehavior.description}
                onChange={(e) => setCurrentBehavior(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Describe how this behavior specifically manifests..."
              />
              <button
                type="button"
                onClick={addBehavior}
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Behavior
              </button>
            </div>
          )}
        </div>

        {behaviors.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Selected Behaviors:</h3>
            <div className="space-y-4">
              {behaviors.map((behavior, index) => (
                <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">{behavior.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{behavior.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeBehavior(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
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
            disabled={behaviors.length === 0}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            Next: Evaluate Behaviors
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}