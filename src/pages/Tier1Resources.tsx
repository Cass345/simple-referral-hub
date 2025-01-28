import { useState, useEffect } from 'react';
import { Book, FileSpreadsheet, CheckSquare, X, ArrowLeft, ArrowRight, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ClassSnapshotGuide } from '../components/tier1tasks/ClassSnapshotGuide';
import { Tier1Checklist } from '../components/tier1tasks/Tier1Checklist';
import { format } from 'date-fns';

interface ActiveFocusArea {
  type: 'snapshot' | 'intervention';
  area: string;
  strategy: string;
  startDate: string;
}

const guidebookContent = [
  {
    title: "Introduction to MTSS",
    content: "As educators, our shared goal is student success. MTSS, the Multi-Tiered System of Supports, is a framework that equips us to meet each student's unique academic, behavioral, and social-emotional needs. MTSS isn't just another intervention program—it's an organized, multi-tiered structure that brings together differentiated instruction and data-driven interventions to support all students effectively."
  },
  {
    title: "What MTSS Is (and Isn't)",
    content: "MTSS is a collaborative, whole-child support system, guiding each child through universal (Tier 1), targeted (Tier 2), and intensive (Tier 3) support levels based on real data. MTSS isn't solely a set of procedures or forms; rather, it's a dynamic, responsive approach that requires consistent communication and data-sharing among teachers, the MTSS team, and families. Importantly, it's not a pathway to special education—MTSS is about foundational skills and supports designed for success within general education."
  },
  {
    title: "Your Role in MTSS",
    content: "As a teacher, you play a crucial part in the MTSS process. Your responsibilities in MTSS begin with documenting Tier 1 interventions and collecting data on student progress in your classroom. This baseline data is essential—it's the first step in identifying which students may need further support."
  },
  {
    title: "Essential Tasks and Why They Matter",
    content: [
      "Implement and Document Tier 1 Interventions: Each classroom intervention you implement in Tier 1 needs to be documented thoroughly.",
      "Submit a Referral with Comprehensive Data: If Tier 1 interventions aren't enough, completing a referral form with collected data is critical.",
      "Participate in MTSS Meetings: When a student requires Tier 2 or Tier 3 support, your participation ensures effective intervention plans."
    ]
  },
  {
    title: "MTSS Pyramid and Tiers",
    content: "The MTSS pyramid frames the support that students need to ensure equitable access to educational programming.",
    subsections: [
      {
        title: "Tier 1",
        content: "Encompasses the entire school with core instruction and basic interventions for all students, including positive behavioral expectations and classroom management."
      },
      {
        title: "Tier 2",
        content: "Includes more targeted support in small groups for students needing additional help beyond Tier 1, focusing on specific skill deficiencies."
      },
      {
        title: "Tier 3",
        content: "Offers the most intensive, individualized support, often one-on-one, for students who need more than Tier 2 can offer."
      }
    ]
  },
  {
    title: "MTSS Process and Procedures",
    content: [
      "Review Tier 1 interventions and supports, documenting data before filling out a referral form.",
      "If Tier 1 supports are insufficient, the MTSS team may recommend Tier 2 interventions.",
      "After 4-6 weeks, the team reviews progress, modifies interventions, or moves the student to more intensive Tier 3 support."
    ]
  },
  {
    title: "What to Expect in an MTSS Meeting",
    content: [
      "Assess teacher concerns, review information from referral form and all data from Tier 1.",
      "Inventory student strengths and talents, discuss and record their strengths and motivating strategies.",
      "Select targeted concerns based on teacher input and data, focusing on root causes.",
      "Set ambitious but realistic goals based on recent data, and determine goal timeline.",
      "Design the intervention plan using the provided template, define roles, locations, and methods for monitoring progress."
    ]
  }
];

export function Tier1Resources() {
  const navigate = useNavigate();
  const [activeFocusAreas, setActiveFocusAreas] = useState<ActiveFocusArea[]>([]);
  const [guidebookComplete, setGuidebookComplete] = useState(false);
  const [snapshotComplete, setSnapshotComplete] = useState(false);
  const [showGuidebook, setShowGuidebook] = useState(false);
  const [showSnapshot, setShowSnapshot] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [checklistComplete, setChecklistComplete] = useState(false);
  
  useEffect(() => {
    // Load active focus areas from localStorage
    const snapshotArea = window.localStorage.getItem('snapshotFocusArea');
    const interventionArea = window.localStorage.getItem('selectedIntervention');
    const snapshotStartDate = window.localStorage.getItem('snapshotStartDate');
    const interventionStartDate = window.localStorage.getItem('interventionStartDate');
    
    const areas: ActiveFocusArea[] = [];
    
    if (snapshotArea && snapshotStartDate) {
      areas.push({
        type: 'snapshot',
        area: snapshotArea,
        strategy: snapshotArea,
        startDate: snapshotStartDate
      });
    }
    
    if (interventionArea && interventionStartDate) {
      areas.push({
        type: 'intervention',
        area: interventionArea.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        strategy: interventionArea.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        startDate: interventionStartDate
      });
    }
    
    setActiveFocusAreas(areas);
  }, []);

  const handleNext = () => {
    if (currentSection < guidebookContent.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleComplete = () => {
    setGuidebookComplete(true);
    setShowGuidebook(false);
  };

  const renderSection = (section: typeof guidebookContent[0]) => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">{section.title}</h3>
      {Array.isArray(section.content) ? (
        <ul className="list-disc pl-5 space-y-2">
          {section.content.map((item, i) => (
            <li key={i} className="text-gray-700">{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700">{section.content}</p>
      )}
      
      {section.subsections && (
        <div className="mt-4 space-y-4">
          {section.subsections.map((subsection, i) => (
            <div key={i} className="pl-4 border-l-2 border-indigo-200">
              <h4 className="text-lg font-medium text-gray-900 mb-2">{subsection.title}</h4>
              <p className="text-gray-700">{subsection.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6">
      {/* Active Focus Areas */}
      {activeFocusAreas.length > 0 && (
        <div className="mb-8 space-y-4">
          {activeFocusAreas.map((area, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border ${
                area.type === 'snapshot' ? 'border-indigo-200 bg-indigo-50' : 'border-green-200 bg-green-50'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className={`font-semibold ${
                    area.type === 'snapshot' ? 'text-indigo-900' : 'text-green-900'
                  }`}>
                    {area.type === 'snapshot' ? 'Focus Area Progress' : 'Checklist Intervention Progress'}
                  </h3>
                  <p className={`text-sm ${
                    area.type === 'snapshot' ? 'text-indigo-700' : 'text-green-700'
                  }`}>
                    {area.area} - Started {format(new Date(area.startDate), 'MMM d, yyyy')}
                  </p>
                </div>
                <button
                  onClick={() => navigate('/')}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    area.type === 'snapshot' 
                      ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  View Calendar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Past Documentation Button */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/documentation-history')}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <History className="w-4 h-4 mr-2" />
          View Past Focus Area Documentation
        </button>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Tier 1 Tasks</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Guidebook Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Book className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-lg font-semibold">MTSS Guidebook</h2>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              guidebookComplete ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {guidebookComplete ? 'Completed' : 'Pending'}
            </span>
          </div>
          <p className="text-gray-600 mb-4">Review the MTSS framework and your role in supporting student success.</p>
          <button
            onClick={() => setShowGuidebook(true)}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            {guidebookComplete ? 'Review Again' : 'Start Review'}
          </button>
        </div>

        {/* Snapshot Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FileSpreadsheet className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-lg font-semibold">Class Snapshot</h2>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              snapshotComplete ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {snapshotComplete ? 'Completed' : 'Pending'}
            </span>
          </div>
          <p className="text-gray-600 mb-4">Complete a snapshot assessment of your class's current needs.</p>
          <button
            onClick={() => setShowSnapshot(true)}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            {snapshotComplete ? 'Update Snapshot' : 'Start Snapshot'}
          </button>
        </div>

        {/* Checklist Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <CheckSquare className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-lg font-semibold">Implementation Checklist</h2>
            </div>
            <span className={`ml-4 px-2 py-1 text-xs font-medium rounded-full ${
              checklistComplete ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {checklistComplete ? 'Completed' : 'Pending'}
            </span>
          </div>
          <p className="text-gray-600 mb-4">Review and assess your implementation of Tier 1 interventions and practices.</p>
          <button
            onClick={() => setShowChecklist(true)}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            {checklistComplete ? 'Review Checklist' : 'Start Checklist'}
          </button>
        </div>
      </div>

      {/* Guidebook Modal */}
      {showGuidebook && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-8 w-full max-w-4xl bg-white rounded-lg shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">MTSS Guidebook</h2>
              <button 
                onClick={() => setShowGuidebook(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="h-2 bg-gray-200 rounded-full">
                <div 
                  className="h-2 bg-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${((currentSection + 1) / guidebookContent.length) * 100}%` }}
                />
              </div>
              <div className="mt-2 text-sm text-gray-600 text-center">
                Section {currentSection + 1} of {guidebookContent.length}
              </div>
            </div>

            {guidebookComplete ? (
              // Show all content in scrollable view when complete
              <div className="overflow-y-auto max-h-[calc(100vh-300px)] pr-4 space-y-8">
                {guidebookContent.map((section, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                    {renderSection(section)}
                  </div>
                ))}
              </div>
            ) : (
              // Show single section with navigation when not complete
              <div className="min-h-[400px] flex flex-col">
                <div className="flex-grow">
                  {renderSection(guidebookContent[currentSection])}
                </div>
                
                <div className="mt-8 flex justify-between items-center pt-4 border-t border-gray-200">
                  <button
                    onClick={handleBack}
                    disabled={currentSection === 0}
                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      currentSection === 0
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </button>

                  {currentSection === guidebookContent.length - 1 ? (
                    <button
                      onClick={handleComplete}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Complete Review
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Snapshot Modal */}
      {showSnapshot && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-8 w-full max-w-4xl bg-white rounded-lg shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Class Snapshot Guide</h2>
              <button 
                onClick={() => {
                  setShowSnapshot(false);
                  setSnapshotComplete(true);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <ClassSnapshotGuide />
          </div>
        </div>
      )}
      
      {/* Checklist Modal */}
      {showChecklist && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-8 w-full max-w-4xl bg-white rounded-lg shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Implementation Checklist</h2>
              <button 
                onClick={() => {
                  setShowChecklist(false);
                  setChecklistComplete(true);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <Tier1Checklist />
          </div>
        </div>
      )}
    </div>
  );
}
export default Tier1Resources;