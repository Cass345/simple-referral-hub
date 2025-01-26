import { Card } from "@/components/ui/card";

const StudentProfiles = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Student Profiles</h1>
      <Card className="p-6">
        <p className="text-muted-foreground mb-4">
          View and manage student information and referral history.
        </p>
        {/* Student list will be implemented in next iteration */}
        <div className="text-center text-muted-foreground">
          Student profiles coming soon...
        </div>
      </Card>
    </div>
  );
};

export default StudentProfiles;