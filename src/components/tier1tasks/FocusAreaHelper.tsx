import { useState } from 'react';
import { Calendar, FileText, Download, Upload } from 'lucide-react';

interface Strategy {
  id: string;
  name: string;
  onlineForm: string;
  printableForm: string;
}

interface FocusArea {
  id: string;
  name: string;
  strategies: Strategy[];
}

const focusAreas: FocusArea[] = [
  {
    id: 'schedules',
    name: 'Schedules',
    strategies: [
      {
        id: 'posted-schedule',
        name: 'Posted Schedule',
        onlineForm: 'https://link-to-schedules-form',
        printableForm: 'https://docs.google.com/document/d/1mSBF8MlE3oNtM5DS8H6CJ6fj476UMzQwzOKvYj8kpPo/edit?tab=t.hzmv6krcflch'
      },
      {
        id: 'balanced-schedule',
        name: 'Balanced Schedule',
        onlineForm: 'https://link-to-schedules-form',
        printableForm: 'https://docs.google.com/document/d/1pE9KAIROkM5NksxC5k0_DxGHeU72rai8jNNG8S2yNWU/edit?tab=t.raoz8m6ccsj#heading=h.5cpe0ykfl6lz'
      },
      {
        id: 'preparing-change',
        name: 'Preparing for Change',
        onlineForm: 'https://link-to-schedules-form',
        printableForm: 'https://docs.google.com/document/d/1DIeyfa3o6XOvJofLWrhaKZw6G8KXXokyDDU0IV37RGc/edit?tab=t.23mzo6gyrnpb#heading=h.hypxehtr5p7x'
      }
    ]
  },
  {
    id: 'transitions',
    name: 'Transitions',
    strategies: [
      {
        id: 'teach-transitions',
        name: 'Teach Transitions',
        onlineForm: 'https://link-to-transitions-form',
        printableForm: 'https://docs.google.com/document/d/1qND6rndb9BtwdZCTPEwzWRyZ4STtNXwpBg5xQe2ktHI/edit?tab=t.n2arlbbmr43f#heading=h.yw0r0s5aefau'
      },
      {
        id: 'whole-class-warnings',
        name: 'Whole Class Warnings',
        onlineForm: 'https://link-to-transitions-form',
        printableForm: 'https://docs.google.com/document/d/15rHoMxGUuVUqm383BaYz5Cp3HuXVF8WsvPBb03MU2Uo/edit?tab=t.mvrxechmwh3p'
      },
      {
        id: 'transition-strategies',
        name: 'Transition Strategies',
        onlineForm: 'https://link-to-transitions-form',
        printableForm: 'https://docs.google.com/document/d/1u7A6qTsKo5ikVjuz_RaSt35W1w8qsFh9lNFNOugE4mw/edit?tab=t.rsv5t0qzulj2#heading=h.26iez5nki7zy'
      }
    ]
  },
  {
    id: 'behavior',
    name: 'Teaching Behavior Expectations',
    strategies: [
      {
        id: 'behavior-expectations',
        name: 'Behavior Expectations',
        onlineForm: 'https://link-to-behavior-form',
        printableForm: 'https://docs.google.com/document/d/15Tw5XQ4pgvyc_rVpJfljMuvb1-7wDg1e07cM_35mAu8/edit?tab=t.uy4ij1dvv1ec#heading=h.py14ndr0hibi'
      }
    ]
  },
  {
    id: 'directions',
    name: 'Providing Directions',
    strategies: [
      {
        id: 'directions-prior',
        name: 'Directions Before Activity',
        onlineForm: 'https://link-to-directions-form',
        printableForm: 'https://docs.google.com/document/d/1IbhdmsAh76PgW8etcG-UsRuzyR75w2_aCI-WdmPQw_Q/edit?tab=t.1q8ke8rhj5gc#heading=h.yzkhc7akgwpr'
      },
      {
        id: 'simple-directions',
        name: 'Simple Directions',
        onlineForm: 'https://link-to-directions-form',
        printableForm: 'https://docs.google.com/document/d/1j0uYEM3Eer4awx7eGg4sMQoV1hZo0aF7gmAHBcAfMMA/edit?tab=t.o1lijlr6i423#heading=h.7if1wiwjz3w4'
      }
    ]
  },
  {
    id: 'social-skills',
    name: 'Teaching Social Skills',
    strategies: [
      {
        id: 'teaching-social',
        name: 'Teaching Social Skills',
        onlineForm: 'https://link-to-social-form',
        printableForm: 'https://docs.google.com/document/d/1hVnzZ0O9UHjrLWe44AGArwxGLEz6ZjojerOZbMyi3Uc/edit?tab=t.o1lijlr6i423'
      },
      {
        id: 'commenting-skills',
        name: 'Commenting on Skills',
        onlineForm: 'https://link-to-social-form',
        printableForm: 'https://docs.google.com/document/d/1BYt2DjbbPh92E-a2d25y3sorHbnSzEe56BQ7uoDqLMY/edit?tab=t.0'
      },
      {
        id: 'modeling-skills',
        name: 'Modeling Skills',
        onlineForm: 'https://link-to-social-form',
        printableForm: 'https://docs.google.com/document/d/1mOR2zFpvHtZV0Z26c8_5BlZ89RFLEgvadMDPDeDbnjw/edit?tab=t.o1lijlr6i423'
      }
    ]
  },
  {
    id: 'conversations',
    name: 'Supportive Conversations',
    strategies: [
      {
        id: 'engaging-conversations',
        name: 'Engaging Conversations',
        onlineForm: 'https://link-to-conversations-form',
        printableForm: 'https://docs.google.com/document/d/1x1C4e8AF73Rv6C4cIWQ6xhJjD-UDSk4KpTpym7GWR2o/edit?tab=t.34rr0lngaw0w'
      }
    ]
  },
  {
    id: 'engagement',
    name: 'Promoting Engagement',
    strategies: [
      {
        id: 'appropriate-activities',
        name: 'Developmentally Appropriate Activities',
        onlineForm: 'https://link-to-engagement-form',
        printableForm: 'https://docs.google.com/document/d/1z-1zWAbLjGbBWLkhOVcY_4YfesvBGJNzG2App3loiRg/edit?tab=t.0'
      },
      {
        id: 'modifying-instruction',
        name: 'Modifying Instruction',
        onlineForm: 'https://link-to-engagement-form',
        printableForm: 'https://docs.google.com/document/d/1lsLgH6Djayl_FT1OndaOT0e3mkoUto2ykrrubpvXDKA/edit?tab=t.0'
      },
      {
        id: 'opportunities-choice',
        name: 'Choices',
        onlineForm: 'https://link-to-engagement-form',
        printableForm: 'https://docs.google.com/document/d/1QoX8EiQOmWMluq4QLhn6lErzgAt8TLx5LNvec93xbwY/edit?tab=t.0'
      }
    ]
  },
  {
    id: 'teaming',
    name: 'Collaborative Teaming',
    strategies: [
      {
        id: 'adult-engagement',
        name: 'Engage Adults',
        onlineForm: 'https://link-to-teaming-form',
        printableForm: 'https://docs.google.com/document/d/1ZN8Vj46gjCOvjdLCePHoJYhta4J7_raKsbHR6uBJfK4/edit?tab=t.0'
      }
    ]
  }
];

export function FocusAreaHelper() {
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedStrategy, setSelectedStrategy] = useState('');
  const [startDate, setStartDate] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const selectedFocusArea = focusAreas.find(area => area.id === selectedArea);
  const selectedStrategyDetails = selectedFocusArea?.strategies.find(
    strategy => strategy.id === selectedStrategy
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Focus Area Helper</h2>

      <div className="space-y-6">
        {/* Focus Area Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Focus Area
          </label>
          <select
            value={selectedArea}
            onChange={(e) => {
              setSelectedArea(e.target.value);
              setSelectedStrategy('');
            }}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          >
            <option value="">Choose a focus area</option>
            {focusAreas.map(area => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </select>
        </div>

        {/* Strategy Selection */}
        {selectedArea && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Strategy
            </label>
            <select
              value={selectedStrategy}
              onChange={(e) => setSelectedStrategy(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
            >
              <option value="">Choose a strategy</option>
              {selectedFocusArea?.strategies.map(strategy => (
                <option key={strategy.id} value={strategy.id}>
                  {strategy.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Start Date Selection */}
        {selectedStrategy && (
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

        {/* Documentation Links and Upload */}
        {selectedStrategy && selectedStrategyDetails && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Documentation Forms</h3>
              <div className="space-y-3">
                <a
                  href={selectedStrategyDetails.onlineForm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-indigo-600 hover:text-indigo-800"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Online Form
                </a>
                <a
                  href={selectedStrategyDetails.printableForm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-indigo-600 hover:text-indigo-800"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Printable Form
                </a>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Upload Documentation</h3>
              <div className="mt-2">
                <label className="block">
                  <span className="sr-only">Choose file</span>
                  <input
                    type="file"
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-indigo-50 file:text-indigo-700
                      hover:file:bg-indigo-100"
                    onChange={handleFileChange}
                  />
                </label>
                {file && (
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <Upload className="h-4 w-4 mr-2" />
                    {file.name}
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6">
              <button
                onClick={() => {
                  // Handle submission logic here
                  alert('Focus area selection submitted successfully!');
                }}
                disabled={!selectedArea || !selectedStrategy || !startDate}
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