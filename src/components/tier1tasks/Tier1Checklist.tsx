import { useState, useEffect } from 'react';
import { Save, Printer } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { supabase } from '../../lib/supabase';
import { InterventionFocusHelper } from './InterventionFocusHelper';

interface ChecklistItem {
  id: string;
  practice: string;
  regularly: boolean;
  sometimes: boolean;
  needsSupport: boolean;
}

const checklistItems: ChecklistItem[] = [
  {
    id: 'expectations',
    practice: 'Teach school-wide and classroom expectations',
    regularly: false,
    sometimes: false,
    needsSupport: false
  },
  {
    id: 'routines',
    practice: 'Directly teach and reteach routines, procedures, and routines within routines',
    regularly: false,
    sometimes: false,
    needsSupport: false
  },
  {
    id: 'visual',
    practice: 'Visual supports for all students',
    regularly: false,
    sometimes: false,
    needsSupport: false
  },
  {
    id: 'schedules',
    practice: 'Establishing and following predictable schedules',
    regularly: false,
    sometimes: false,
    needsSupport: false
  },
  {
    id: 'social',
    practice: 'Teaching, modeling, and reinforcing social skills every day using Second Step',
    regularly: false,
    sometimes: false,
    needsSupport: false
  },
  {
    id: 'breaks',
    practice: 'Periodic brain breaks',
    regularly: false,
    sometimes: false,
    needsSupport: false
  },
  {
    id: 'reinforcement',
    practice: 'Positive Reinforcement (5:1)',
    regularly: false,
    sometimes: false,
    needsSupport: false
  },
  {
    id: 'choices',
    practice: 'Offering choices',
    regularly: false,
    sometimes: false,
    needsSupport: false
  },
  {
    id: 'transitions',
    practice: 'Keeping transitions tight and quick',
    regularly: false,
    sometimes: false,
    needsSupport: false
  },
  {
    id: 'circle',
    practice: 'Keeping each circle/whole group time to a maximum of 15 minutes',
    regularly: false,
    sometimes: false,
    needsSupport: false
  }
];

export function Tier1Checklist() {
  const [items, setItems] = useState(checklistItems);
  const [currentSection, setCurrentSection] = useState(0);
  const [responses, setResponses] = useState<Response[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [showFocusHelper, setShowFocusHelper] = useState(false);

  if (showFocusHelper) {
    return <InterventionFocusHelper />;
  }

  const handleCheck = (id: string, field: 'regularly' | 'sometimes' | 'needsSupport') => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? {
              ...item,
              [field]: !item[field],
              ...(field === 'regularly' && !item[field] ? { sometimes: false } : {}),
              ...(field === 'sometimes' && !item[field] ? { regularly: false } : {})
            }
          : item
      )
    );
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let yPos = 20;

    doc.setFontSize(16);
    doc.text('Tier 1 Interventions and Practices Checklist', 20, yPos);
    yPos += 15;

    const regularly = items.filter(item => item.regularly);
    const sometimes = items.filter(item => item.sometimes);
    const needsSupport = items.filter(item => item.needsSupport);

    doc.setFontSize(12);
    doc.text('Regular Practices:', 20, yPos);
    yPos += 10;
    regularly.forEach(item => {
      doc.text('• ' + item.practice, 25, yPos);
      yPos += 7;
    });

    yPos += 5;
    doc.text('Occasional Practices:', 20, yPos);
    yPos += 10;
    sometimes.forEach(item => {
      doc.text('• ' + item.practice, 25, yPos);
      yPos += 7;
    });

    yPos += 5;
    doc.text('Practices Needing Support:', 20, yPos);
    yPos += 10;
    needsSupport.forEach(item => {
      doc.text('• ' + item.practice, 25, yPos);
      yPos += 7;
    });

    doc.save('tier1-checklist.pdf');
  };

  const handleSubmit = async () => {
    try {
      // Instead of submitting to an API endpoint, we'll just move to the summary view
      // You can add Supabase integration here if you want to persist the data
      setShowSummary(true);

    } catch (error) {
      console.error('Error submitting checklist:', error);
    }
  };

  const sections = [
    { 
      title: 'Tier 1 Interventions and Practices Checklist', 
      items: items 
    },
    { 
      title: 'Checklist Summary',  
      items: [] 
    } 
  ];

  if (showSummary) {
    return (
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Checklist Summary</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Practice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Implementation
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Support Needed
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map(item => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-normal text-sm font-medium text-gray-900">
                      {item.practice}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.regularly ? (
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Regularly
                        </span>
                      ) : item.sometimes ? (
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                          Sometimes
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                          Not Implemented
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.needsSupport ? (
                        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                          Yes
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                          No
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={generatePDF}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Save as PDF
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </button>
            <button
              onClick={() => setShowFocusHelper(true)}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Continue to Focus Area Helper
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8"> 
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {sections[currentSection].title} 
        </h3>
        <p className="text-gray-700">
          Review the Tier I interventions and practices listed below. For each practice, mark the box to show if this is something you do regularly or sometimes, and if you would like additional support with that practice.
        </p>
      </div>

      <div className="mt-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Intervention/Practice
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Regularly
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sometimes
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Additional Support Needed
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sections[currentSection].items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-normal text-sm text-gray-900">
                    {item.practice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input
                      type="checkbox"
                      checked={item.regularly}
                      onChange={() => handleCheck(item.id, 'regularly')}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input
                      type="checkbox"
                      checked={item.sometimes}
                      onChange={() => handleCheck(item.id, 'sometimes')}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <input
                      type="checkbox"
                      checked={item.needsSupport}
                      onChange={() => handleCheck(item.id, 'needsSupport')}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 flex justify-end items-center pt-4 border-t border-gray-200"> 
        {currentSection === 0 && (
          <button
            onClick={handleSubmit}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Submit 
          </button>
        )}
      </div>
    </div>
  );
}
