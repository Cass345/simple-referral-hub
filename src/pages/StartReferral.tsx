import { Card } from "@/components/ui/card";

const StartReferral = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Start a New Referral</h1>
      <Card className="p-6">
        <p className="text-muted-foreground mb-4">
          Begin the referral process by providing basic student information.
        </p>
        {/* Form will be implemented in next iteration */}
        <div className="text-center text-muted-foreground">
          Form implementation coming soon...
        </div>
      </Card>
    </div>
  );
};

export default StartReferral;