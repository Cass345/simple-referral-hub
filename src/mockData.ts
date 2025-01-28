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

// Mock behaviors
export const mockBehaviors = [
  {
    id: 1,
    name: 'Difficulty Staying on Task',
    category: 'attention-focus',
    description: 'Student frequently switches between activities without completion and has trouble maintaining focus during independent work.',
    evaluation: {
      frequency: 'daily',
      duration: '5-10-mins',
      intensity: 'moderate',
      impact: 'significant'
    }
  },
  {
    id: 2,
    name: 'Disruptive Classroom Behavior',
    category: 'challenging-behaviors',
    description: 'Student calls out answers without raising hand and leaves seat without permission during instruction time.',
    evaluation: {
      frequency: 'frequently',
      duration: 'less-5-mins',
      intensity: 'moderate',
      impact: 'moderate'
    }
  }
];

// Mock goals
export const mockGoals = [
  {
    behaviorId: 0,
    specific: 'Increase time spent on assigned tasks during independent work periods',
    measurable: 'Track duration of focused work time using a timer',
    achievable: '1. Use visual timer\n2. Break tasks into smaller chunks\n3. Provide frequent breaks',
    relevant: 'Improving task focus will increase academic performance and reduce classroom disruptions',
    timely: 'Within the next 6 weeks',
    baseline: '5 minutes of continuous focus',
    target: '15 minutes of continuous focus',
    timeline: '6 weeks with weekly progress monitoring'
  },
  {
    behaviorId: 1,
    specific: 'Reduce instances of calling out and leaving seat without permission',
    measurable: 'Count frequency of calling out and unauthorized seat leaving',
    achievable: '1. Use silent hand signals\n2. Implement token system\n3. Regular movement breaks',
    relevant: 'Reducing disruptions will improve learning environment for all students',
    timely: 'Within the next 4 weeks',
    baseline: '8-10 disruptions per hour',
    target: '2-3 disruptions per hour',
    timeline: '4 weeks with daily tracking'
  }
];

// Mock data collection methods
export const mockDataCollection = {
  0: {
    type: 'duration',
    frequency: 'daily',
    tools: ['Timer', 'Duration log'],
    notes: 'Use visual timer visible to student. Record duration of focused work periods in 5-minute increments.'
  },
  1: {
    type: 'frequency',
    frequency: 'continuous',
    tools: ['Tally sheet', 'Counter app'],
    notes: 'Track each instance of calling out and leaving seat separately. Note time of day and activity context.'
  }
};