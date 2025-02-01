import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";

type Step = "welcome" | "student-type" | "concerns" | "referral-required";

interface StepContent {
  title: string;
  description?: string;
  options: {
    label: string;
    value: string;
    action: () => void;
  }[];
}

export const DecisionTool = () => {
  const [currentStep, setCurrentStep] = useState<Step>("welcome");

  const steps: Record<Step, StepContent> = {
    "welcome": {
      title: "MTSS Referral Decision Tool",
      description: "This tool will guide you through the referral process for IP and ECAP students. Answer a few questions to determine the appropriate next steps.",
      options: [
        {
          label: "Start",
          value: "start",
          action: () => setCurrentStep("student-type"),
        },
      ],
    },
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
          action: () => window.location.href = "/login?isSignUp=true",
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
      
      {currentStepContent.description && (
        <p className="text-muted-foreground">
          {currentStepContent.description}
        </p>
      )}

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
        
        {currentStep !== "welcome" && (
          <Button 
            variant="secondary" 
            className="w-full"
            size="lg"
            onClick={() => setCurrentStep("welcome")}
          >
            Start Over
          </Button>
        )}
        
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