import { useState } from "react";
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
import { useToast } from "@/components/ui/use-toast";

const behaviorCategories = {
  'social-emotional': {
    name: 'Social-Emotional',
    behaviors: [
      'Difficulty sharing toys or materials',
      'Engaging in frequent arguments or conflicts with peers',
      'Difficulty expressing emotions appropriately',
      'Withdrawing from social interaction',
      'Excessive clinging to adults',
      'Difficulty separating from caregivers',
      "Limited empathy or understanding of others' feelings",
    ],
  },
  'attention-focus': {
    name: 'Attention and Focus',
    behaviors: [
      'Difficulty staying on task or following directions',
      'Easily distracted by surroundings',
      'Short attention span',
      'Fidgeting or restlessness',
      'Difficulty with transitions between activities',
    ],
  },
  'communication-language': {
    name: 'Communication and Language',
    behaviors: [
      'Difficulty understanding spoken language',
      'Difficulty expressing needs or wants verbally',
      'Limited vocabulary',
      'Speech that is difficult to understand',
      'Frustration with communication difficulties',
    ],
  },
  'motor-skills': {
    name: 'Motor Skills',
    behaviors: [
      'Difficulty with fine motor tasks',
      'Difficulty with gross motor skills',
      'Clumsiness or frequent accidents',
      'Resistance to participating in physical activities',
    ],
  },
  'adaptive-behaviors': {
    name: 'Adaptive Behaviors',
    behaviors: [
      'Difficulty with self-help skills',
      'Difficulty following routines or schedules',
      'Resistance to change',
    ],
  },
  'challenging-behaviors': {
    name: 'Challenging Behaviors',
    behaviors: [
      'Physical aggression',
      'Verbal aggression',
      'Property destruction',
      'Self-injurious behavior',
      'Disruptive vocalizations',
      'Non-compliance with requests or rules',
    ],
  },
} as const;

const TargetBehaviors = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBehaviors, setSelectedBehaviors] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    if (selectedBehaviors.length === 0) {
      toast({
        title: "No behaviors selected",
        description: "Please select at least one behavior to continue",
        variant: "destructive",
      });
      return;
    }
    // Store selected behaviors in session storage for the next step
    sessionStorage.setItem(
      "targetBehaviors",
      JSON.stringify(selectedBehaviors)
    );
    navigate("/evaluate-behavior");
  };

  const handleBehaviorSelect = (behavior: string) => {
    if (selectedBehaviors.includes(behavior)) {
      setSelectedBehaviors(selectedBehaviors.filter((b) => b !== behavior));
    } else {
      setSelectedBehaviors([...selectedBehaviors, behavior]);
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="text-3xl font-bold">Identify Target Behaviors</h1>
      
      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select Behavior Category</h2>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(behaviorCategories).map(([key, category]) => (
                  <SelectItem key={key} value={key}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCategory && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Select Behaviors</h2>
              <div className="grid gap-3">
                {behaviorCategories[selectedCategory as keyof typeof behaviorCategories].behaviors.map((behavior) => (
                  <Button
                    key={behavior}
                    variant={selectedBehaviors.includes(behavior) ? "default" : "outline"}
                    className="justify-start h-auto py-4 px-4 whitespace-normal text-left"
                    onClick={() => handleBehaviorSelect(behavior)}
                  >
                    {behavior}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-6">
            <Button onClick={handleContinue}>
              Continue to Behavior Evaluation
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TargetBehaviors;