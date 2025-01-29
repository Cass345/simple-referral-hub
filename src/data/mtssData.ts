export const interventionStrategies = [
  {
    id: 1,
    name: 'Visual Supports',
    description: 'Using visual aids to support learning and behavior',
    category: 'academic'
  },
  {
    id: 2,
    name: 'Positive Reinforcement',
    description: 'Providing rewards for desired behaviors',
    category: 'behavior'
  },
  {
    id: 3,
    name: 'Social Skills Training',
    description: 'Teaching appropriate social interactions',
    category: 'social-emotional'
  }
];

export const tierOneChecklist = [
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

export interface Intervention {
  id: number;
  name: string;
  description: string;
  category: string;
}

export interface ChecklistItem {
  id: number;
  category: string;
  items: string[];
}