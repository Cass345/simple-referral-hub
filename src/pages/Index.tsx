import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { DecisionTool } from "@/components/referralform/DecisionTool";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto max-w-md py-12 animate-fade-in">
      {user ? (
        <Card className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <Building2 className="h-16 w-16 text-primary" />
          </div>
          
          <h1 className="text-2xl font-bold">MTSS Referral Decision Tool</h1>
          
          <p className="text-muted-foreground">
            This tool will guide you through the MTSS referral process for IP and ECAP students. 
            Follow the steps to determine appropriate interventions and next steps.
          </p>

          <Button asChild className="w-full" size="lg">
            <Link to="/start-referral">Start Referral Process</Link>
          </Button>
        </Card>
      ) : (
        <DecisionTool />
      )}
    </div>
  );
};

export default Index;