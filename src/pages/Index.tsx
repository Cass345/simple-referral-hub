import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";

const Index = () => {
  return (
    <div className="container mx-auto max-w-md py-12 animate-fade-in">
      <Card className="p-8 text-center space-y-6">
        <div className="flex justify-center">
          <Building2 className="h-16 w-16 text-primary" />
        </div>
        
        <h1 className="text-2xl font-bold">MTSS Referral Decision Tool</h1>
        
        <p className="text-muted-foreground">
          This tool will guide you through the referral process for IP and ECAP students. Answer a few questions to determine the appropriate next steps.
        </p>

        <div className="space-y-3">
          <Button asChild className="w-full" size="lg">
            <Link to="/start-referral">Start</Link>
          </Button>
          
          <Button asChild variant="outline" className="w-full" size="lg">
            <Link to="/login">Already have an account? Sign in</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Index;