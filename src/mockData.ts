import { Behavior, BehaviorCategory } from '@/types/referral';

export const mockTeacherInfo = {
  teacherName: 'Sarah Johnson',
  classroomNumber: 'Room 204',
  studentName: 'Alex Thompson',
  studentAge: '8',
  studentSchedule: 'AM'
};

export const mockStudentBackground = {
  firstName: 'Alex',
  lastName: 'Thompson',
  grade: 3,
  dob: '2015-05-15',
  studentId: '2024001',
  primaryLanguage: 'English',
  parentName: 'Michael and Lisa Thompson',
  parentEmail: 'thompsons@email.com',
  parentPhone: '(555) 123-4567',
  parentNotificationDate: '2024-03-10',
  strengths: [
    'Strong interest in science',
    'Creative problem solver',
    'Helpful to peers'
  ]
};

export const mockReferralReason = {
  reasons: {
    academic: true,
    behavior: true,
    socialEmotional: false
  },
  concerns: [
    'Difficulty completing assignments',
    'Disruptive behavior during lessons'
  ],
  description: 'Student shows inconsistent academic performance and has difficulty maintaining appropriate classroom behavior.'
};

export const mockBehaviorIdentification: Behavior[] = [
  {
    id: 1,
    name: 'Difficulty Staying on Task',
    category: 'attention-focus' as BehaviorCategory,
    description: 'Student frequently switches between activities without completion and has trouble maintaining focus during independent work.',
  },
  {
    id: 2,
    name: 'Disruptive Classroom Behavior',
    category: 'challenging-behaviors' as BehaviorCategory,
    description: 'Student calls out answers without raising hand and leaves seat without permission during instruction time.',
  }
];

export const mockBehaviorEvaluation: Behavior[] = [
  {
    id: 1,
    name: 'Difficulty Staying on Task',
    category: 'attention-focus' as BehaviorCategory,
    description: 'Student frequently switches between activities without completion',
    evaluation: {
      frequency: 'daily',
      duration: '5-10 minutes',
      intensity: 'moderate',
      impact: 'significant',
      setting: ['classroom', 'independent work'],
      triggers: ['complex tasks', 'distractions'],
      consequences: 'Incomplete assignments and falling behind in work'
    }
  },
  {
    id: 2,
    name: 'Disruptive Classroom Behavior',
    category: 'challenging-behaviors' as BehaviorCategory,
    description: 'Student calls out answers and leaves seat frequently',
    evaluation: {
      frequency: 'daily',
      duration: '2-5 minutes',
      intensity: 'moderate',
      impact: 'moderate',
      setting: ['classroom', 'group work'],
      triggers: ['peer attention', 'challenging work'],
      consequences: 'Disrupts class flow and own learning'
    }
  }
];

export const mockDataCollection = {
  0: {
    type: 'frequency',
    method: 'Tally Count',
    frequency: 'Daily',
    tools: ['Behavior Log', 'Timer'],
    notes: 'Count instances of off-task behavior during independent work'
  },
  1: {
    type: 'duration',
    method: 'Time Sampling',
    frequency: 'Daily',
    tools: ['Observation Form', 'Stopwatch'],
    notes: 'Measure duration of on-task behavior in 15-minute intervals'
  }
};