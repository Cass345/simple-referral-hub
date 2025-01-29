import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import type { BehaviorData } from "@/types/referral";

interface BaselineDataSectionProps {
  studentId: string;
  concerns: string[];
  onComplete: () => void;
}

export function BaselineDataSection({ studentId, concerns, onComplete }: BaselineDataSectionProps) {
  const [behaviorData, setBehaviorData] = useState<BehaviorData[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchBaselineData();
  }, [studentId]);

  const fetchBaselineData = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('behavior_data')
        .eq('id', studentId)
        .single();

      if (error) throw error;
      setBehaviorData(data.behavior_data || []);
    } catch (error) {
      console.error('Error fetching baseline data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch baseline data",
        variant: "destructive",
      });
    }
  };

  const handleDataSubmit = async (newData: BehaviorData) => {
    try {
      const { error } = await supabase
        .from('students')
        .update({
          behavior_data: [...behaviorData, newData]
        })
        .eq('id', studentId);

      if (error) throw error;
      
      setBehaviorData(prev => [...prev, newData]);
      toast({
        title: "Success",
        description: "Baseline data saved successfully",
      });
    } catch (error) {
      console.error('Error saving baseline data:', error);
      toast({
        title: "Error",
        description: "Failed to save baseline data",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Baseline Data Collection</h2>
      {concerns.map((concern, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-xl font-medium mb-4">{concern}</h3>
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={behaviorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="frequency" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* Add data collection form here */}
        </div>
      ))}
      <Button onClick={onComplete}>Continue to Tier 1 Interventions</Button>
    </Card>
  );
}