import React, { useState } from 'react';
import { FileText, ChevronDown } from 'lucide-react';
import { interventions } from '../data/mtssData';
import { Intervention } from '../types';

export default function InterventionPlan() {
  const [selectedIntervention, setSelectedIntervention] = useState<Intervention | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const uniqueFocusAreas = Array.from(
    new Set(interventions.map(i => i.focusArea))
  );

  const handleInterventionSelect = (intervention: Intervention) => {
    setSelectedIntervention(intervention);
    setShowDropdown(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="w-8 h-8 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-800">Generate Intervention Plan</h2>
      </div>

      <div className="relative mb-6">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-full bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
        >
          <span className="text-gray-700">
            {selectedIntervention ? selectedIntervention.title : 'Select an Intervention'}
          </span>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </button>

        {showDropdown && (
          <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg z-10">
            {uniqueFocusAreas.map(area => (
              <div key={area}>
                <div className="px-4 py-2 bg-gray-50 font-medium text-gray-700">
                  {area}
                </div>
                {interventions
                  .filter(i => i.focusArea === area)
                  .map(intervention => (
                    <button
                      key={intervention.id}
                      onClick={() => handleInterventionSelect(intervention)}
                      className="w-full text-left px-4 py-3 hover:bg-indigo-50 transition-colors"
                    >
                      {intervention.title}
                    </button>
                  ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedIntervention && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            {selectedIntervention.title}
          </h3>
          
          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-700 mb-2">Description</h4>
            <p className="text-gray-600">{selectedIntervention.description}</p>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-700 mb-2">Implementation Steps</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 ml-4">
              {selectedIntervention.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-medium text-gray-700 mb-2">Examples</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              {selectedIntervention.examples.map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
          </div>

          <div className="bg-indigo-50 rounded-lg p-4">
            <h4 className="text-lg font-medium text-indigo-800 mb-2">
              Progress Monitoring Schedule
            </h4>
            <p className="text-indigo-700">{selectedIntervention.monitoringSchedule}</p>
          </div>
        </div>
      )}
    </div>
  );
}