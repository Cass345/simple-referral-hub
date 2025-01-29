// Import the BehaviorCategory type from your shared types
import { Behavior, BehaviorCategory } from '@/types/referral';

// Mock teacher info
export const mockTeacherInfo = {
  teacherName: 'Sarah Johnson',
  classroomNumber: 'Room 204',
  studentName: 'Alex Thompson',
  studentAge: '8',
  studentSchedule: 'AM'
};

// Mock student background
export const mockStudentBackground = {
  dob: '2015-05-15',
  primaryLanguage: 'English',
  parentName: 'Michael and Lisa Thompson',
  parentContact: '(555) 123-4567',
  parentNotificationDate: '2024-03-10'
};

// Mock referral reason
export const mockReferralReason = {
  reasons: {
    academic: true,
    behavior: true,
    socialEmotional: false
  },
  strengths: [
    'Strong interest in science and nature',
    'Creative problem solver',
    'Helpful to peers during group activities'
  ]
};

// Mock Behavior Identification Data
export const mockBehaviorIdentification: Behavior [] = [
  {
    id: 1,
    name: 'Difficulty Staying on Task',
    category: 'attention-focus',
    description: 'Student frequently switches between activities without completion and has trouble maintaining focus during independent work.',
  },
  {
    id: 2,
    name: 'Disruptive Classroom Behavior',
    category: 'challenging-behaviors',
    description: 'Student calls out answers without raising hand and leaves seat without permission during instruction time.',
  },
];

// Mock Behavior Evaluation Data
export const mockBehaviorEvaluation: Behavior[] = [
  {
    category: 'attention-focus',
    frequency: 'daily',
    duration: '5-10-mins',
    intensity: 'moderate',
    impact: 'significant',
  },
  {
    category: 'challenging-behaviors',
    frequency: 'frequently',
    duration: 'less-5-mins',
    intensity: 'moderate',
    impact: 'moderate',
  },
];

// Mock data collection methods
export const mockDataCollection = {

  0: {

    type: 'Behavior',
    method: 'Observation',
    frequency: 'Daily',
    tools: ['ABC Chart'],
    notes: 'Monitor during morning activities'

  },

  1: {

    type: 'Academic',
    method: 'Survey',
    frequency: 'Weekly',
    tools: ['Progress Monitoring Sheet'],
    notes: 'Track reading comprehension'

  }
};
