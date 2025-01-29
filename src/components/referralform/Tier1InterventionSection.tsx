import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { interventions } from "@/lib/interventions";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

interface Tier1InterventionSectionProps {
  studentId: string;
  onComplete: () => void;
}

export function Tier1InterventionSection({ studentId, onComplete }: Tier1InterventionSectionProps) {
  const [selectedInterventions, setSelectedInterventions] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchExistingInterventions();
  }, [studentId]);

  const fetchExistingInterventions = async () => {
    try {
      const { data, error } = await supabase
        .from('interventions')
        .select('*')
        .eq('student_id', studentId)
        .eq('tier_level', 1);

      if (error) throw error;
      setSelectedInterventions(data.map((d: any) => d.type));
    } catch (error) {
      console.error('Error fetching interventions:', error);
    }
  };

  const handleInterventionToggle = async (interventionId: string) => {
    try {
      if (selectedInterventions.includes(interventionId)) {
        // Remove intervention
        await supabase
          .from('interventions')
          .delete()
          .eq('student_id', studentId)
          .eq('type', interventionId);

        setSelectedInterventions(prev => prev.filter(id => id !== interventionId));
      } else {
        // Add intervention
        await supabase
          .from('interventions')
          .insert({
            student_id: studentId,
            type: interventionId,
            tier_level: 1,
            start_date: new Date().toISOString()
          });

        setSelectedInterventions(prev => [...prev, interventionId]);
      }

      toast({
        title: "Success",
        description: "Interventions updated successfully",
      });
    } catch (error) {
      console.error('Error updating interventions:', error);
      toast({
        title: "Error",
        description: "Failed to update interventions",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Tier 1 Interventions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {interventions.map((intervention) => (
          <Card key={intervention.id} className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{intervention.name}</h3>
              <Button
                variant={selectedInterventions.includes(intervention.id) ? "default" : "outline"}
                onClick={() => handleInterventionToggle(intervention.id)}
              >
                {selectedInterventions.includes(intervention.id) ? "Selected" : "Select"}
              </Button>
            </div>
            <div className="mt-4 space-y-2">
              <a href={intervention.onlineForm} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block">
                Online Form
              </a>
              <a href={intervention.printableForm} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block">
                Printable Form
              </a>
            </div>
          </Card>
        ))}
      </div>
      <Button onClick={onComplete} className="mt-6">Complete Referral</Button>
    </Card>
  );
}