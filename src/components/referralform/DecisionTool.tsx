import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

type Step = "student-type" | "concerns" | "referral-required";

interface StepContent {
  title: string;
  options: {
    label: string;
    value: string;
    action: () => void;
  }[];
}

export const DecisionTool = () => {
  const [currentStep, setCurrentStep] = useState<Step>("student-type");
  const navigate = useNavigate();

  const steps: Record<Step, StepContent> = {
    "student-type": {
      title: "Is this an IP Student or an ECAP Student?",
      options: [
        {
          label: "IP Student",
          value: "ip",
          action: () => setCurrentStep("concerns"),
        },
        {
          label: "ECAP Student",
          value: "ecap",
          action: () => setCurrentStep("concerns"),
        },
      ],
    },
    "concerns": {
      title: "What are the concerns?",
      options: [
        {
          label: "OT/PT/Adaptive/Cognitive/Language/Social concerns",
          value: "multiple",
          action: () => setCurrentStep("referral-required"),
        },
        {
          label: "Speech concerns only",
          value: "speech",
          action: () => setCurrentStep("referral-required"),
        },
        {
          label: "Parent requests evaluation",
          value: "parent",
          action: () => setCurrentStep("referral-required"),
        },
      ],
    },
    "referral-required": {
      title: "MTSS Referral Required",
      options: [
        {
          label: "Begin MTSS Referral",
          value: "begin",
          action: () => navigate("/login", { state: { isSignUp: true } }),
        },
      ],
    },
  };

  const currentStepContent = steps[currentStep];

  return (
    <Card className="p-8 text-center space-y-6">
      <div className="flex justify-center">
        <Building2 className="h-16 w-16 text-primary" />
      </div>
      
      <h2 className="text-2xl font-bold">{currentStepContent.title}</h2>
      
      {currentStep === "referral-required" && (
        <div className="text-left space-y-4">
          <div>
            <h3 className="font-semibold">Contact:</h3>
            <p>Erin Rousu; MTSS Team</p>
          </div>
          <div>
            <h3 className="font-semibold">Instructions:</h3>
            <p>Complete and submit the MTSS referral form. Begin taking data on student. Meet with the MTSS team.</p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {currentStepContent.options.map((option) => (
          <Button 
            key={option.value}
            className="w-full" 
            size="lg"
            onClick={option.action}
          >
            {option.label}
          </Button>
        ))}
        
        <Button 
          variant="secondary" 
          className="w-full"
          size="lg"
          onClick={() => setCurrentStep("student-type")}
        >
          Start Over
        </Button>
        
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Button variant="link" asChild className="p-0 h-auto font-normal" size="sm">
            <Link to="/login">Sign in</Link>
          </Button>
        </p>
      </div>
    </Card>
  );
};