import { useAuth } from "@/lib/AuthProvider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Settings = () => {
  const { user, profile, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
      toast({
        title: "Success",
        description: "Successfully logged out",
      });
      navigate("/login");
    } catch (error) {
      console.error("Signout error:", error);
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || !profile) {
    navigate("/login");
    return null;
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Email:</span> {profile.email}</p>
              <p><span className="font-medium">Name:</span> {profile.first_name} {profile.last_name}</p>
              <p><span className="font-medium">Role:</span> {profile.role}</p>
            </div>
          </div>
          <Button 
            onClick={handleSignOut} 
            variant="destructive"
            disabled={isLoading}
          >
            {isLoading ? "Signing out..." : "Sign Out"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Settings;