import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Building2, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "@/lib/auth";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto max-w-md py-12 animate-fade-in">
      <Card className="p-8 text-center space-y-6">
        <div className="flex justify-center">
          <Building2 className="h-16 w-16 text-primary" />
        </div>
        
        <h1 className="text-2xl font-bold">MTSS Referral Decision Tool</h1>
        
        <p className="text-muted-foreground">
          This tool will guide you through the MTSS referral process for IP and ECAP students. 
          Follow the steps to determine appropriate interventions and next steps.
        </p>

        <div className="space-y-3">
          {user ? (
            <Button asChild className="w-full" size="lg">
              <Link to="/start-referral">Start Referral Process</Link>
            </Button>
          ) : (
            <>
              <Button asChild className="w-full" size="lg">
                <Link to="/login" state={{ isSignUp: true }}>
                  Start
                </Link>
              </Button>
              
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Button variant="link" asChild className="p-0 h-auto font-normal" size="sm">
                  <Link to="/login">Sign in</Link>
                </Button>
              </p>
            </>
          )}
        </div>

        {!user && (
          <div className="text-sm text-muted-foreground">
            <p>The MTSS referral process includes:</p>
            <ul className="list-disc list-inside mt-2 text-left">
              <li>Student type identification (IP/ECAP)</li>
              <li>Baseline data collection</li>
              <li>Tier 1 intervention implementation</li>
              <li>Progress monitoring</li>
              <li>Team collaboration and decision making</li>
            </ul>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Index;