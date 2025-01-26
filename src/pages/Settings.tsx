import { Card } from "@/components/ui/card";

const Settings = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <Card className="p-6">
        <p className="text-muted-foreground mb-4">
          Manage your profile and notification preferences.
        </p>
        {/* Settings form will be implemented in next iteration */}
        <div className="text-center text-muted-foreground">
          Settings configuration coming soon...
        </div>
      </Card>
    </div>
  );
};

export default Settings;