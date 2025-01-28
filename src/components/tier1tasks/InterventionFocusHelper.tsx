import { useState } from 'react';
import { Calendar, FileText, Download } from 'lucide-react';

interface Intervention {
  id: string;
  name: string;
  onlineForm: string;
  printableForm: string;
}

const interventions: Intervention[] = [
  {
    id: 'brain-breaks',
    name: 'Brain Breaks',
    onlineForm: 'https://sites.google.com/view/meadowcrestmtss/referral-process/pre-referral-tasks/tier-1-interventions-practices-checklist/tier-1-intervention-focus-helper/brain-breaks?authuser=0',
    printableForm: 'https://docs.google.com/document/d/1slKymyT0O1sOjafw51Jv8JVmNmaV4l8f7t3w1yxEQHc/edit?tab=t.0'
  },
  {
    id: 'circle-time',
    name: 'Circle/Whole Group Time',
    onlineForm: 'https://sites.google.com/view/meadowcrestmtss/referral-process/pre-referral-tasks/tier-1-interventions-practices-checklist/tier-1-intervention-focus-helper/circlewhole-group-time?authuser=0',
    printableForm: 'https://docs.google.com/document/d/1yKzhyFLhFRskVeldwwrjIrOL6AEaY2URNDtwMDV9W_g/edit?tab=t.f3k9s361fsic'
  },
  {
    id: 'offering-choices',
    name: 'Offering Choices',
    onlineForm: 'https://sites.google.com/view/meadowcrestmtss/referral-process/pre-referral-tasks/tier-1-interventions-practices-checklist/tier-1-intervention-focus-helper/offering-choices?authuser=0',
    printableForm: 'https://docs.google.com/document/d/1MMNY8Hzfln7F5jMPNrjZVCOe5Xb_7BSQviu75GLhsY0/edit?tab=t.lq8j8k4h47vx'
  },
  {
    id: 'positive-reinforcement',
    name: 'Positive Reinforcement',
    onlineForm: 'https://sites.google.com/view/meadowcrestmtss/referral-process/pre-referral-tasks/tier-1-interventions-practices-checklist/tier-1-intervention-focus-helper/positive-reinforcement?authuser=0',
    printableForm: 'https://docs.google.com/document/d/17GK5pJyIPrPv3Dr_Eh02dLtHqkry0xiGHGEhVwd05q8/edit?tab=t.0'
  },
  {
    id: 'predictable-schedules',
    name: 'Predictable Schedules',
    onlineForm: 'https://sites.google.com/view/meadowcrestmtss/referral-process/pre-referral-tasks/tier-1-interventions-practices-checklist/tier-1-intervention-focus-helper/predictable-schedules?authuser=0',
    printableForm: 'https://docs.google.com/document/d/1Zrc3PXamm2pmzBzn91tZcqMAb_NjhPeqUIJdIRAV4l0/edit?tab=t.0#heading=h.6ygvr0kdyf4d'
  },
  {
    id: 'routines-procedures',
    name: 'Routines and Procedures',
    onlineForm: 'https://sites.google.com/view/meadowcrestmtss/referral-process/pre-referral-tasks/tier-1-interventions-practices-checklist/tier-1-intervention-focus-helper/routines-and-procedures?authuser=0',
    printableForm: 'https://docs.google.com/document/d/18gBZecb4slnJqpmDpLyj1jlr3NabKx55ZRnpkyohW3Q/edit?tab=t.0'
  },
  {
    id: 'school-wide-classroom',
    name: 'School-Wide and Classroom',
    onlineForm: 'https://sites.google.com/view/meadowcrestmtss/referral-process/pre-referral-tasks/tier-1-interventions-practices-checklist/tier-1-intervention-focus-helper/school-wide-and-classroom?authuser=0',
    printableForm: 'https://docs.google.com/document/d/1JVaDiOMm9E1HebaPZHpPFhgfT0nCEejSmmKihNENec0/edit?tab=t.0'
  },
  {
    id: 'social-skills',
    name: 'Social Skills',
    onlineForm: 'https://sites.google.com/view/meadowcrestmtss/referral-process/pre-referral-tasks/tier-1-interventions-practices-checklist/tier-1-intervention-focus-helper/social-skills?authuser=0',
    printableForm: 'https://docs.google.com/document/d/15tI5kjVH3gWklNvFxuptLzt4SfvtdZMRc4qo51HuoNM/edit?tab=t.0'
  },
  {
    id: 'transition',
    name: 'Transition',
    onlineForm: 'https://sites.google.com/view/meadowcrestmtss/referral-process/pre-referral-tasks/tier-1-interventions-practices-checklist/tier-1-intervention-focus-helper/transition?authuser=0',
    printableForm: 'https://docs.google.com/document/d/1f6wIFx3nflrPMLsQSBgbXfZbRfLvWoR6FC-b_7OXOgU/edit?tab=t.0'
  },
  {
    id: 'visual-supports',
    name: 'Visual and Supports',
    onlineForm: 'https://sites.google.com/view/meadowcrestmtss/referral-process/pre-referral-tasks/tier-1-interventions-practices-checklist/tier-1-intervention-focus-helper/visual-supports?authuser=0',
    printableForm: 'https://docs.google.com/document/d/1GkyEcsc_sCxImBoab5HufUiVXgvGgMpBsPfULlb6ZbE/edit?tab=t.0'
  }
];

export function InterventionFocusHelper() {
  const [selectedIntervention, setSelectedIntervention] = useState('');
  const [startDate, setStartDate] = useState('');

  const handleSubmit = () => {
    if (selectedIntervention && startDate) {
      // Update the intervention start date in the dashboard
      window.localStorage.setItem('interventionStartDate', startDate);
      window.localStorage.setItem('selectedIntervention', selectedIntervention);
      window.location.href = '/'; // Redirect to dashboard
    }
  };

  const selectedInterventionDetails = interventions.find(
    intervention => intervention.id === selectedIntervention
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Intervention Focus Helper</h2>

      <div className="space-y-6">
        {/* Intervention Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Intervention Focus Area
          </label>
          <select
            value={selectedIntervention}
            onChange={(e) => setSelectedIntervention(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          >
            <option value="">Choose an intervention area</option>
            {interventions.map(intervention => (
              <option key={intervention.id} value={intervention.id}>
                {intervention.name}
              </option>
            ))}
          </select>
        </div>

        {/* Start Date Selection */}
        {selectedIntervention && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Start Date
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Documentation will be expected for the next 2 weeks
            </p>
          </div>
        )}

        {/* Documentation Links */}
        {selectedInterventionDetails && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Documentation Forms</h3>
              <div className="space-y-3">
                <a
                  href={selectedInterventionDetails.onlineForm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-indigo-600 hover:text-indigo-800"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Online Form
                </a>
                <a
                  href={selectedInterventionDetails.printableForm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-indigo-600 hover:text-indigo-800"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Printable Form
                </a>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                onClick={handleSubmit}
                disabled={!selectedIntervention || !startDate}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Focus Area Selection
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}