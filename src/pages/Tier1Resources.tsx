import { Card } from "@/components/ui/card";

const Tier1Resources = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Tier 1 Resources</h1>
      <Card className="p-6">
        <p className="text-muted-foreground mb-4">
          Access guides and checklists for Tier 1 interventions.
        </p>
        {/* Resource list will be implemented in next iteration */}
        <div className="text-center text-muted-foreground">
          Tier 1 resources coming soon...
        </div>
      </Card>
    </div>
  );
};

export default Tier1Resources;