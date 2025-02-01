import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2 } from "lucide-react";
import { Link } from "react-router-dom";

interface StudentTypeSelectionProps {
  onSelect: (type: 'IP' | 'ECAP') => void;
}

export const StudentTypeSelection = ({ onSelect }: StudentTypeSelectionProps) => {
  return (
    <Card className="p-8 text-center space-y-6">
      <div className="flex justify-center">
        <Building2 className="h-16 w-16 text-primary" />
      </div>
      
      <h2 className="text-2xl font-bold">Is this an IP Student or an ECAP Student?</h2>
      
      <div className="space-y-3">
        <Button 
          className="w-full" 
          size="lg"
          onClick={() => onSelect('IP')}
        >
          IP Student
        </Button>
        
        <Button 
          className="w-full" 
          size="lg"
          onClick={() => onSelect('ECAP')}
        >
          ECAP Student
        </Button>
        
        <Button 
          variant="secondary" 
          className="w-full"
          size="lg"
          onClick={() => onSelect('IP')}
        >
          Start Over
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full"
          size="lg"
          asChild
        >
          <Link to="/login">Already have an account? Sign in</Link>
        </Button>
      </div>
    </Card>
  );
};