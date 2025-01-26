import React, { createContext, useContext, useState } from 'react';

export type BehaviorEvaluation = {
  frequency: string;
  duration: string;
  intensity: string;
  context?: string;
  notes?: string;
  category: string;
  impactLearning: string;
  impactSafety: string;
  development: string;
  feedback: string;
  routineInterference: string;
  priorityScore?: number;
};

type BehaviorContextType = {
  selectedBehaviors: string[];
  behaviorEvaluations: Record<string, BehaviorEvaluation>;
  addBehavior: (behavior: string) => void;
  addEvaluation: (behavior: string, evaluation: BehaviorEvaluation) => void;
  calculatePriorityScore: (evaluation: BehaviorEvaluation) => number;
};

const BehaviorContext = createContext<BehaviorContextType | undefined>(undefined);

export function BehaviorProvider({ children }: { children: React.ReactNode }) {
  const [selectedBehaviors, setSelectedBehaviors] = useState<string[]>([]);
  const [behaviorEvaluations, setBehaviorEvaluations] = useState<Record<string, BehaviorEvaluation>>({});

  const addBehavior = (behavior: string) => {
    if (!selectedBehaviors.includes(behavior)) {
      setSelectedBehaviors([...selectedBehaviors, behavior]);
    }
  };

  const addEvaluation = (behavior: string, evaluation: BehaviorEvaluation) => {
    setBehaviorEvaluations((prev) => ({
      ...prev,
      [behavior]: {
        ...evaluation,
        priorityScore: calculatePriorityScore(evaluation),
      },
    }));
  };

  const calculatePriorityScore = (evaluation: BehaviorEvaluation) => {
    const weights = {
      impactLearning: 0.3,
      impactSafety: 0.3,
      frequency: 0.2,
      duration: 0.1,
      intensity: 0.1,
    };

    let score = 0;

    // Calculate score based on frequency
    const frequencyScores: Record<string, number> = {
      rarely: 1,
      occasionally: 2,
      frequently: 3,
      daily: 4,
      multipleday: 5,
      severalday: 6,
      multiplehour: 7,
      severalhour: 8,
    };
    score += weights.frequency * (frequencyScores[evaluation.frequency] || 0);

    // Calculate score based on duration
    const durationScores: Record<string, number> = {
      'less-5-mins': 1,
      '5-10-mins': 2,
      'more-10-mins': 3,
    };
    score += weights.duration * (durationScores[evaluation.duration] || 0);

    // Calculate score based on intensity
    const intensityScores: Record<string, number> = {
      mild: 1,
      moderate: 2,
      severe: 3,
    };
    score += weights.intensity * (intensityScores[evaluation.intensity] || 0);

    // Add impact scores
    if (evaluation.impactLearning === 'yes') score += weights.impactLearning;
    if (evaluation.impactSafety === 'yes') score += weights.impactSafety;

    return score;
  };

  return (
    <BehaviorContext.Provider
      value={{
        selectedBehaviors,
        behaviorEvaluations,
        addBehavior,
        addEvaluation,
        calculatePriorityScore,
      }}
    >
      {children}
    </BehaviorContext.Provider>
  );
}

export function useBehavior() {
  const context = useContext(BehaviorContext);
  if (context === undefined) {
    throw new Error('useBehavior must be used within a BehaviorProvider');
  }
  return context;
}