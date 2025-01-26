import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const frequencyOptions = [
  { value: "rarely", label: "Rarely (less than once a week)" },
  { value: "occasionally", label: "Occasionally (1-3 times a week)" },
  { value: "frequently", label: "Frequently (4-6 times a week)" },
  { value: "daily", label: "Daily (1 time)" },
  { value: "multipleday", label: "Multiple times per day (2-3 times)" },
  { value: "severalday", label: "Several times per day (4-6 times)" },
  { value: "multiplehour", label: "Multiple times per hour (2-3 times)" },
  { value: "severalhour", label: "Several times per hour (4-6 times)" },
];

const durationOptions = [
  { value: "less-5-mins", label: "Less than 5 minutes" },
  { value: "5-10-mins", label: "5-10 minutes" },
  { value: "more-10-mins", label: "More than 10 minutes" },
];

const intensityOptions = [
  { value: "mild", label: "Mild (e.g., minor disruptions)" },
  {
    value: "moderate",
    label: "Moderate (e.g., requires teacher intervention)",
  },
  {
    value: "severe",
    label: "Severe (e.g., causes harm or significant disruption)",
  },
];

interface BehaviorEvaluation {
  frequency: string;
  duration: string;
  intensity: string;
  context?: string;
  notes?: string;
}

const EvaluateBehavior = () => {
  const [targetBehaviors, setTargetBehaviors] = useState<string[]>([]);
  const [currentBehavior, setCurrentBehavior] = useState<string>("");
  const [evaluations, setEvaluations] = useState<Record<string, BehaviorEvaluation>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const storedBehaviors = sessionStorage.getItem("targetBehaviors");
    if (storedBehaviors) {
      const behaviors = JSON.parse(storedBehaviors);
      setTargetBehaviors(behaviors);
      if (behaviors.length > 0) {
        setCurrentBehavior(behaviors[0]);
      }
    }
  }, []);

  const handleEvaluationChange = (field: keyof BehaviorEvaluation, value: string) => {
    setEvaluations((prev) => ({
      ...prev,
      [currentBehavior]: {
        ...prev[currentBehavior],
        [field]: value,
      },
    }));
  };

  const handleContinue = () => {
    if (Object.keys(evaluations).length < targetBehaviors.length) {
      toast({
        title: "Incomplete evaluations",
        description: "Please evaluate all selected behaviors before continuing",
        variant: "destructive",
      });
      return;
    }

    // Store evaluations in session storage
    sessionStorage.setItem(
      "behaviorEvaluations",
      JSON.stringify(evaluations)
    );
    navigate("/prioritize-behaviors");
  };

  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="text-3xl font-bold">Evaluate Behavior</h1>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select Behavior to Evaluate</h2>
            <Select
              value={currentBehavior}
              onValueChange={setCurrentBehavior}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a behavior" />
              </SelectTrigger>
              <SelectContent>
                {targetBehaviors.map((behavior) => (
                  <SelectItem key={behavior} value={behavior}>
                    {behavior}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {currentBehavior && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Frequency</h3>
                <Select
                  value={evaluations[currentBehavior]?.frequency || ""}
                  onValueChange={(value) => handleEvaluationChange("frequency", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {frequencyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Duration</h3>
                <Select
                  value={evaluations[currentBehavior]?.duration || ""}
                  onValueChange={(value) => handleEvaluationChange("duration", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {durationOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Intensity</h3>
                <Select
                  value={evaluations[currentBehavior]?.intensity || ""}
                  onValueChange={(value) => handleEvaluationChange("intensity", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select intensity" />
                  </SelectTrigger>
                  <SelectContent>
                    {intensityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Context</h3>
                <Textarea
                  placeholder="Describe when and where the behavior typically occurs..."
                  value={evaluations[currentBehavior]?.context || ""}
                  onChange={(e) => handleEvaluationChange("context", e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Additional Notes</h3>
                <Textarea
                  placeholder="Any additional observations or notes..."
                  value={evaluations[currentBehavior]?.notes || ""}
                  onChange={(e) => handleEvaluationChange("notes", e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="flex justify-end pt-6">
            <Button onClick={handleContinue}>
              Continue to Prioritize Behaviors
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EvaluateBehavior;