import { Intervention, ChecklistItem } from './types';

export const interventionStrategies: Intervention[] = [
  {
    id: 1,
    name: 'Visual Supports',
    description: 'Using visual aids to support learning and behavior',
    category: 'academic',
    focusArea: 'learning'
  },
  {
    id: 2,
    name: 'Positive Reinforcement',
    description: 'Providing rewards for desired behaviors',
    category: 'behavior',
    focusArea: 'behavior'
  },
  {
    id: 3,
    name: 'Social Skills Training',
    description: 'Teaching appropriate social interactions',
    category: 'social-emotional',
    focusArea: 'social'
  }
];

export const tierOneChecklist: ChecklistItem[] = [
  {
    id: 1,
    category: 'Classroom Management',
    items: [
      'Clear behavioral expectations posted',
      'Consistent daily routines',
      'Organized classroom environment'
    ]
  },
  {
    id: 2,
    category: 'Instruction',
    items: [
      'Differentiated instruction',
      'Multiple modes of presentation',
      'Regular formative assessment'
    ]
  }
];

export const quizQuestions = [
  {
    question: 'What is the primary goal of MTSS Tier 1 interventions?',
    options: [
      'Supporting all students with high-quality core instruction',
      'Providing intensive individual support',
      'Conducting special education evaluations',
      'Creating behavior plans'
    ],
    correctAnswer: 0
  },
  {
    question: 'How often should universal screening occur?',
    options: [
      'Daily',
      'Weekly',
      'Monthly',
      '3 times per year'
    ],
    correctAnswer: 3
  }
];