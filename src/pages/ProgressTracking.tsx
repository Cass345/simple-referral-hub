import { Card } from "@/components/ui/card";

const ProgressTracking = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Progress Tracking</h1>
      <Card className="p-6">
        <p className="text-muted-foreground mb-4">
          Monitor ongoing referrals and track intervention outcomes.
        </p>
        {/* Progress dashboard will be implemented in next iteration */}
        <div className="text-center text-muted-foreground">
          Progress tracking dashboard coming soon...
        </div>
      </Card>
    </div>
  );
};

export default ProgressTracking;