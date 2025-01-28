import { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft, 
  ArrowRight, 
  Save, 
  Printer,
  Check,
  X
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { FocusAreaHelper } from './FocusAreaHelper';

interface Section {
  id: string;
  title: string;
  description: string;
  subsections: Subsection[];
}

interface Subsection {
  id: string;
  title: string;
  description: string;
  reflectionQuestion: string;
  followUpYes?: string;
  followUpNo?: string;
}

const snapshotContent: Section[] = [
  {
    id: 'schedules',
    title: 'I. Schedules, Routines, and Activities',
    description: 'Evaluate your classroom\'s daily structure and routines.',
    subsections: [
     {
       id: 'posted-schedule',
       title: 'Posted Schedule',
       description: 'Is the schedule posted with visual representations in an accessible area? Is the schedule reviewed with children throughout the day?\n\nQuestions to Consider: Where is the schedule posted? How high/low are you going to post it so children can access it? What kinds of visuals are you going to use – line drawings, photographs, etc.? When and how often will you review the schedule – before you transition to the next activity, at circle?\n\nTips: Make the pieces of your posted schedule flexible so you can move activities around as needed. Provide an indicator that marks what the current activity is (arrow, star, etc.).',
       reflectionQuestion: 'Is this present in your classroom? (Yes/No)',
       followUpYes: 'If yes, how can we improve?',
       followUpNo: 'If no, what are the next steps to implement?'
     },
     {
       id: 'balanced-schedule',
       title: 'Balanced Schedule',
       description: 'Does the schedule include a balance of child and teacher-directed activities?\n\nQuestions to Consider: How many minutes are your child-led activities/adult-led activities? Are child and adult-led activities interspersed throughout the day?\n\nTips: List child-led activities. List adult-led activities.',
       reflectionQuestion: 'Is this present in your classroom? (Yes/No)',
       followUpYes: 'If yes, how can we improve?',
       followUpNo: 'If no, what are the next steps to implement?'
      },
      {
        id: 'preparing-change',
        title: 'Preparing for Change',
        description: 'Are children prepared for changes in the posted schedule?\n\nQuestions to Consider: When are you going to teach the symbol to your students? When are you going to explain the change in schedule to your class? How will you explain the change in schedule? Will the change in schedule affect anything else in your day?\n\nTips: Use a universal visual symbol to represent a special activity. Plan for change. Warn students both at the beginning of the day and right before the change in schedule.',
        reflectionQuestion: 'Is this present in your classroom? (Yes/No)',
        followUpYes: 'If yes, how can we improve?',
        followUpNo: 'If no, what are the next steps to implement?'
      }
    ]
  },
  {
    id: 'transitions',
    title: 'II. Transitions',
    description: 'Assess how effectively your class moves between activities.',
    subsections: [
     {
       id: 'teach-transitions',
       title: 'Teach Transitions',
       description: 'Are children explicitly taught the steps and expectations of transitions?\n\nQuestions to Consider: What transitions are you going to teach? When are you going to teach the transition? How are you going to teach the transition? Have you taught every step of the transitions? Do your students have the prerequisite skills they need to transition successfully?\n\nTips: Visuals can support teaching transitions. Peer models can demonstrate a successful transition. Video modeling can show students what a proper transition looks like.',
       reflectionQuestion: 'Is this present in your classroom? (Yes/No)',
       followUpYes: 'If yes, how can we improve?',
       followUpNo: 'If no, what are the next steps to implement?'
     },
     {
       id: 'whole-class-warnings',
       title: 'Whole Class Warnings',
       description: 'Are whole class warnings provided prior to transitions?\n\nQuestions to Consider: How will you present class warnings for transitions? Will you scaffold your warnings? How will you teach the transition warnings?\n\nExamples: Light flash. Bell ringing. Timer. Call out specific time left.',
       reflectionQuestion: 'Is this present in your classroom? (Yes/No)',
       followUpYes: 'If yes, how can we improve?',
       followUpNo: 'If no, what are the next steps to implement?'
     },
     {
       id: 'transition-strategies',
       title: 'Transition Strategies',
       description: 'Are transition strategies used to actively engage children during transitions, including waiting time?\n\nQuestions to Consider: What kind of transition strategies will you use? Will you have varied transition strategies? How will you teach your transition strategies to the class?\n\nExamples: Songs. Fingerplays. Poems. Catch a bubble. Imitation of movements. Flashcards with letters/shapes/numerals.',
       reflectionQuestion: 'Is this present in your classroom? (Yes/No)',
       followUpYes: 'If yes, how can we improve?',
       followUpNo: 'If no, what are the next steps to implement?'
      }
    ]
  },
  {
    id: 'behavior-expectations',
    title: 'III. Teaching Behavior Expectations',
    description: 'Review how behavior expectations are communicated and reinforced.',
    subsections: [
      {
        id: 'behavior-expectations',
        title: 'Behavior Expectations',
        description: 'Are positively stated behavior expectations posted, reviewed, and referred to throughout the day?\n\nQuestions to Consider: Where will you post the school rules? How will you teach the school rules to your classroom? How will you embed the school rules into your daily routine? What will you do to reinforce the rules? How will you use positive (what to do language) rather than negative (what not to do language)?\n\nTips: Post the Second Step and MEC rules where they are easily seen by the students. Practice ways to be friendly, be safe, and be a worker. Give out busy bees, ladybug leaders, and dragonfly doers to students who are following rules. Practice positive statements as a team.\n\nExamples: "Use your walking feet." "Hands in your lap." "I notice ..."',
        reflectionQuestion: 'Is this present in your classroom? (Yes/No)',
        followUpYes: 'If yes, how can we improve?',
        followUpNo: 'If no, what are the next steps to implement?'
      }
    ]
  },
  {
    id: 'providing-directions',
    title: 'IV. Providing Directions',
    description: 'Evaluate how directions are communicated to students.',
    subsections: [
      {
        id: 'directions-prior',
        title: 'Directions Prior to Activity',
        description: 'Are activity expectations described to children prior to the activity?\n\nQuestions to Consider: How would you model/explain the activity? What visuals would you use (if any)? How many steps will you have? Can a child help to model the activity?\n\nTips: Keep it simple. Plan ahead – have materials ready and what questions to ask students. Review steps before dismissing to activity.\n\nExamples: I do, you do, we do or My turn, your turn.',
        reflectionQuestion: 'Is this present in your classroom? (Yes/No)',
        followUpYes: 'If yes, how can we improve?',
        followUpNo: 'If no, what are the next steps to implement?'
      },
      {
        id: 'simple-directions',
        title: 'Simple, Positive Directions',
        description: 'Are simple, short, specific directions used that tell children what to do?\n\nQuestions to Consider: How can you rephrase directions in a positive way? Be more specific? Think about what you want them to do rather than what you don\'t want them to do.\n\nTips: Avoid saying "don\'t". Keep directions short.\n\nExamples: Instead of "Don\'t stand on the chair," say, "Please sit on the chair."',
        reflectionQuestion: 'Is this present in your classroom? (Yes/No)',
        followUpYes: 'If yes, how can we improve?',
        followUpNo: 'If no, what are the next steps to implement?'
      }
    ]
  },
  {
    id: 'social-skills',
    title: 'V. Teaching Social Skills and Emotional Competencies',
    description: 'Assess how social and emotional skills are taught and reinforced.',
    subsections: [
      {
        id: 'teaching-social',
        title: 'Teaching Social Skills',
        description: 'Are structured activities and naturally occurring opportunities used to teach social skills and emotional competencies?\n\nQuestions to Consider: How can you incorporate puppets and social stories? When and how often? Once a day? Throughout the day? How will you reinforce? What words and comments can you use?\n\nTips: Use: Puppets. Second Step Curriculum every day. Mood Meter. Books. Social Stories. Songs. Relate to everyday experiences.',
        reflectionQuestion: 'Is this present in your classroom? (Yes/No)',
        followUpYes: 'If yes, how can we improve?',
        followUpNo: 'If no, what are the next steps to implement?'
      },
      {
        id: 'commenting-skills',
        title: 'Commenting on Use of Skills',
        description: 'Are positive and descriptive comments provided when children use social skills appropriately?\n\nQuestions to Consider: When? How often? Which skill(s) are you focusing on? What do your students need? Do they need lots of praise with lots of enthusiasm or do they sabotage it and just need a simple noticing that you "give and go?"\n\nTips: Be specific with wording to focus on what they are doing, such as sharing, taking a turn, waiting, belly breath, listening, walking, suggesting a solution. Avoid praise without specificity. Comments can simply communicate what you notice that is positive- praise is optional. Tone of voice and body language convey meaning. Non-verbal can be just as powerful as verbal.',
        reflectionQuestion: 'Is this present in your classroom? (Yes/No)',
        followUpYes: 'If yes, how can we improve?',
        followUpNo: 'If no, what are the next steps to implement?'
      },
      {
        id: 'modeling-skills',
        title: 'Modeling Skills',
        description: 'Are expected social skills and emotional competencies modeled, including language for children to use?\n\nQuestions to Consider: Why do you model? How do you model? When do you model?\n\nTips: I do, I do, I do, we do, we do, we do, you do! You may need to model some skills over and over and over. Modeling needs to be specific to the social situation. Take advantage of teachable moments and natural settings. Have children model for others when appropriate.',
        reflectionQuestion: 'Is this present in your classroom? (Yes/No)',
        followUpYes: 'If yes, how can we improve?',
        followUpNo: 'If no, what are the next steps to implement?'
      }
    ]
  },
  {
    id: 'supportive-conversations',
    title: 'VI. Supportive Conversations',
    description: 'Evaluate communication strategies with students.',
    subsections: [
      {
        id: 'engaging-conversations',
        title: 'Engaging Conversations',
        description: 'Do adults join in play and engage in conversations about play, using alternative strategies when communicating with children who are nonverbal, language delayed, or dual-language learners?\n\nQuestions to Consider: What are the language skills of your students? What are the play skills of your students?\n\nTips: Be at the eye level of the children - on the floor, in a chair, kneel next to them - don\'t stand over them. Talk with them. Ask questions about what they are doing with open-ended answers. Make comments about their play. Use gestures and demonstrate how to play with the materials.',
        reflectionQuestion: 'Is this present in your classroom? (Yes/No)',
        followUpYes: 'If yes, how can we improve?',
        followUpNo: 'If no, what are the next steps to implement?'
      }
    ]
  },
  {
    id: 'promoting-engagement',
    title: 'VII. Promoting Children\'s Engagement',
    description: 'Review strategies for maintaining student engagement.',
    subsections: [
      {
        id: 'appropriate-activities',
        title: 'Developmentally Appropriate Activities',
        description: 'Are developmentally appropriate activities provided to support engagement? Is whole group/circle time less than 20 minutes at a time?\n\nQuestions to Consider: How are the lowest learners participating? How are the highest learners participating?\n\nTips: Consider how you are going to differentiate while you are planning the activity. Consider the length of your activities based on your children\'s attention span and abilities.',
        reflectionQuestion: 'Is this present in your classroom? (Yes/No)',
        followUpYes: 'If yes, how can we improve?',
        followUpNo: 'If no, what are the next steps to implement?'
      },
      {
        id: 'modifying-instruction',
        title: 'Modifying Instruction',
        description: 'Is instruction or activity modified when children lose interest?\n\nQuestions to Consider: Can you shorten or adapt the activity?\n\nTips: Become more animated or silly to regain engagement.',
        reflectionQuestion: 'Is this present in your classroom? (Yes/No)',
        followUpYes: 'If yes, how can we improve?',
        followUpNo: 'If no, what are the next steps to implement?'
      },
      {
        id: 'opportunities-choice',
        title: 'Opportunities for Choice',
        description: 'Are children provided with multiple opportunities to make choices?\n\nQuestions to Consider: How often are you providing choices?\n\nTips: Make sure that the choices you give are actually options. Can be a great strategy to provide behavior kids with a sense of control. Should be at least a 5-1 ratio of positives to negatives.',
        reflectionQuestion: 'Is this present in your classroom? (Yes/No)',
        followUpYes: 'If yes, how can we improve?',
        followUpNo: 'If no, what are the next steps to implement?'
      },
      {
        id: 'communicating-eye-level',
        title: 'Communicating at Eye Level',
        description: 'Are positive comments provided to engaged children, and is communication at their eye level?\n\nQuestions to Consider: What is the ratio of positive statements to non-positive statements?\n\nTips: Provide incentives. Communicating with children at eye level builds rapport which results in compliance.',
        reflectionQuestion: 'Is this present in your classroom? (Yes/No)',
        followUpYes: 'If yes, how can we improve?',
        followUpNo: 'If no, what are the next steps to implement?'
      }
    ]
  },
  {
    id: 'collaborative-teaming',
    title: 'VIII. Collaborative Teaming',
    description: 'Assess team collaboration and supervision strategies.',
    subsections: [
      {
        id: 'adult-engagement',
        title: 'Adult Engagement',
        description: 'Are all adults engaged with children during activities and routines, providing active supervision?\n\nQuestions to Consider: How many adults are interacting with students at a time? Do adults know where they are supposed to be? Do the adults know how to meet needs as they arise in the classroom without being explicitly told? Have you taught your adults what their expectations are and the steps they need to take to have active supervision within the classroom? Have you modeled how to engage with children throughout the day?\n\nTips: Model for your adults how to be engaged with students (i.e., have an adult take over circle while you assist a student so they can see how to support that student). Communicate wants and needs with each other both throughout the classroom day and during regular team meetings. Meet regularly as a team to help – have topics ready to discuss.',
        reflectionQuestion: 'Is this present in your classroom? (Yes/No)',
        followUpYes: 'If yes, how can we improve?',
        followUpNo: 'If no, what are the next steps to implement?'
      }
    ]
  }
];

interface Response {
  subsectionId: string;
  response: boolean;
  followUp: string;
}

export function ClassSnapshotGuide() {
  const [currentSection, setCurrentSection] = useState(0);
  const [expandedSubsections, setExpandedSubsections] = useState<string[]>([]);
  const [responses, setResponses] = useState<Response[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [showFocusHelper, setShowFocusHelper] = useState(false);

  const toggleSubsection = (subsectionId: string) => {
    setExpandedSubsections(prev => 
      prev.includes(subsectionId)
        ? prev.filter(id => id !== subsectionId)
        : [...prev, subsectionId]
    );
  };

  const handleResponse = (subsectionId: string, value: boolean) => {
    setResponses(prev => {
      const existing = prev.findIndex(r => r.subsectionId === subsectionId);
      if (existing !== -1) {
        return [
          ...prev.slice(0, existing),
          { ...prev[existing], response: value, followUp: '' },
          ...prev.slice(existing + 1)
        ];
      }
      return [...prev, { subsectionId, response: value, followUp: '' }];
    });
  };

  const handleFollowUp = (subsectionId: string, text: string) => {
    setResponses(prev => {
      const existing = prev.findIndex(r => r.subsectionId === subsectionId);
      if (existing !== -1) {
        return [
          ...prev.slice(0, existing),
          { ...prev[existing], followUp: text },
          ...prev.slice(existing + 1)
        ];
      }
      return prev;
    });
  };

  const handleNext = () => {
    if (currentSection < snapshotContent.length - 1) {
      setCurrentSection(prev => prev + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    let yPos = 20;

    // Add title
    doc.setFontSize(16);
    doc.text('Class Snapshot Guide Summary', 20, yPos);
    yPos += 10;

    // Add responses
    doc.setFontSize(12);
    responses.forEach(response => {
      const subsection = snapshotContent
        .flatMap(section => section.subsections)
        .find(sub => sub.id === response.subsectionId);

      if (subsection) {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }

        doc.text(subsection.title, 20, yPos);
        yPos += 7;
        doc.text(`Response: ${response.response ? 'Yes' : 'No'}`, 25, yPos);
        yPos += 7;
        if (response.followUp) {
          const followUpLines = doc.splitTextToSize(`Follow-up: ${response.followUp}`, 170);
          doc.text(followUpLines, 25, yPos);
          yPos += 7 * followUpLines.length;
        }
        yPos += 5;
      }
    });

    doc.save('class-snapshot-summary.pdf');
  };

  if (showFocusHelper) {
    return <FocusAreaHelper />;
  }

  if (showSummary) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Class Snapshot Summary</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subsection
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Present
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Follow-up Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {responses.map(response => {
                const subsection = snapshotContent
                  .flatMap(section => section.subsections)
                  .find(sub => sub.id === response.subsectionId);

                return subsection ? (
                  <tr key={response.subsectionId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {subsection.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {response.response ? 'Yes' : 'No'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {response.followUp}
                    </td>
                  </tr>
                ) : null;
              })}
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
    );
  }

  const currentSectionContent = snapshotContent[currentSection];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-indigo-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentSection + 1) / snapshotContent.length) * 100}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-gray-600 text-center">
          Section {currentSection + 1} of {snapshotContent.length}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {currentSectionContent.title}
      </h2>
      <p className="text-gray-600 mb-6">{currentSectionContent.description}</p>

      <div className="space-y-4">
        {currentSectionContent.subsections.map(subsection => (
          <div
            key={subsection.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleSubsection(subsection.id)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100"
            >
              <span className="font-medium text-gray-900">{subsection.title}</span>
              {expandedSubsections.includes(subsection.id) ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {expandedSubsections.includes(subsection.id) && (
              <div className="p-4 space-y-4">
                <p className="text-gray-700">{subsection.description}</p>
                
                <div className="space-y-4">
                  <p className="font-medium text-gray-900">
                    {subsection.reflectionQuestion}
                  </p>
                  
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleResponse(subsection.id, true)}
                      className={`flex items-center px-4 py-2 rounded-md ${
                        responses.find(r => r.subsectionId === subsection.id)?.response === true
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Yes
                    </button>
                    <button
                      onClick={() => handleResponse(subsection.id, false)}
                      className={`flex items-center px-4 py-2 rounded-md ${
                        responses.find(r => r.subsectionId === subsection.id)?.response === false
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      <X className="w-4 h-4 mr-2" />
                      No
                    </button>
                  </div>

                  {responses.find(r => r.subsectionId === subsection.id) && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        {responses.find(r => r.subsectionId === subsection.id)?.response
                          ? subsection.followUpYes
                          : subsection.followUpNo}
                      </label>
                      <textarea
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        rows={3}
                        value={responses.find(r => r.subsectionId === subsection.id)?.followUp || ''}
                        onChange={(e) => handleFollowUp(subsection.id, e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
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

        <button
          onClick={handleNext}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          {currentSection === snapshotContent.length - 1 ? 'View Summary' : 'Next'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}