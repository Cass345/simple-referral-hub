import { QuickActions } from "@/components/home/QuickActions";
import { Overview } from "@/components/home/Overview";

const Index = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome to MTSS Referral Tool</h1>
        <p className="text-muted-foreground">
          Streamline your student support process with our comprehensive MTSS management system.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <QuickActions />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <Overview />
      </section>
    </div>
  );
};

export default Index;