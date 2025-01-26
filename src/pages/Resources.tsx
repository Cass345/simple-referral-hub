import { Card } from "@/components/ui/card";

const Resources = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Resources</h1>
      <Card className="p-6">
        <p className="text-muted-foreground mb-4">
          Browse our library of training materials, forms, and FAQs.
        </p>
        {/* Resource library will be implemented in next iteration */}
        <div className="text-center text-muted-foreground">
          Resource library coming soon...
        </div>
      </Card>
    </div>
  );
};

export default Resources;