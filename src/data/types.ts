export interface Intervention {
  id: number;
  name: string;
  description: string;
  category: string;
  focusArea: string;
}

export interface ChecklistItem {
  id: number;
  category: string;
  items: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}