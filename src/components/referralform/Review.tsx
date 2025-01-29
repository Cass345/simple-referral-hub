import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle, AlertCircle } from "lucide-react";
import type { ReferralFormData } from "@/types/referral";

interface ReviewSummaryProps {
  formData: ReferralFormData;
  onSubmit: () => void;
  onBack: () => void;
}

export function ReviewSummary({ formData, onSubmit, onBack }: ReviewSummaryProps) {
  const { toast } = useToast();

  // Check if baseline data has been collected for at least 4 days
  const hasValidBaselineData = Object.keys(formData.dataCollection).length >= 4;

  const handleSubmit = () => {
    if (!hasValidBaselineData) {
      toast({
        title: "Incomplete Baseline Data",
        description: "You must document baseline data for at least 4 days before submitting the referral.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(); // Submit the form if validation passes
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Review and Submit Referral</h2>
      <p className="text-gray-600 mb-6">
        Please review the information below. Ensure that baseline data has been collected for at least 4 days before submitting the referral.
      </p>

      {/* Behavior Identification Summary */}
      <Card className="p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Behavior Identification</h3>
        {formData.behaviors.map((behavior, index) => (
          <div key={index} className="mb-4">
            <p className="text-gray-700">
              <span className="font-medium">Behavior {index + 1}:</span> {behavior.name}
            </p>
            <p className="text-gray-600">{behavior.description}</p>
          </div>
        ))}
      </Card>

      {/* Behavior Evaluation Summary */}
      <Card className="p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Behavior Evaluation</h3>
        {formData.behaviors.map((behavior, index) => (
          <div key={index} className="mb-4">
            <p className="text-gray-700">
              <span className="font-medium">Behavior {index + 1}:</span> {behavior.name}
            </p>
            {behavior.evaluation && (
              <div className="ml-4 text-gray-600">
                <p>
                  <span className="font-medium">Frequency:</span> {behavior.evaluation.frequency || "Not specified"}
                </p>
                <p>
                  <span className="font-medium">Duration:</span> {behavior.evaluation.duration || "Not specified"}
                </p>
                <p>
                  <span className="font-medium">Intensity:</span> {behavior.evaluation.intensity || "Not specified"}
                </p>
                <p>
                  <span className="font-medium">Impact:</span> {behavior.evaluation.impact || "Not specified"}
                </p>
                <p>
                  <span className="font-medium">Settings:</span>{" "}
                  {behavior.evaluation.setting?.join(", ") || "Not specified"}
                </p>
                <p>
                  <span className="font-medium">Triggers:</span>{" "}
                  {behavior.evaluation.triggers?.join(", ") || "Not specified"}
                </p>
                <p>
                  <span className="font-medium">Consequences:</span>{" "}
                  {behavior.evaluation.consequences || "Not specified"}
                </p>
              </div>
            )}
          </div>
        ))}
      </Card>

      {/* Data Collection Summary */}
      <Card className="p-6 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Data Collection</h3>
        {hasValidBaselineData ? (
          <div className="flex items-center text-green-600 mb-4">
            <CheckCircle className="mr-2 h-5 w-5" />
            <p>Baseline data has been collected for {Object.keys(formData.dataCollection).length} days.</p>
          </div>
        ) : (
          <div className="flex items-center text-red-600 mb-4">
            <AlertCircle className="mr-2 h-5 w-5" />
            <p>Baseline data has been collected for {Object.keys(formData.dataCollection).length} days. At least 4 days are required.</p>
          </div>
        )}
        {Object.entries(formData.dataCollection).map(([date, data], index) => (
          <div key={index} className="mb-4">
            <p className="text-gray-700">
              <span className="font-medium">Day {index + 1} ({date}):</span>
            </p>
            <div className="ml-4 text-gray-600">
              <p>
                <span className="font-medium">Method:</span> {data.method}
              </p>
              <p>
                <span className="font-medium">Frequency:</span> {data.frequency}
              </p>
              <p>
                <span className="font-medium">Tools:</span> {data.tools.join(", ")}
              </p>
              <p>
                <span className="font-medium">Notes:</span> {data.notes || "No notes provided"}
              </p>
            </div>
          </div>
        ))}
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleSubmit} disabled={!hasValidBaselineData}>
          Submit Referral
        </Button>
      </div>
    </div>
  );
}