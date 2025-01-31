import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MainSidebar } from "@/components/layout/Sidebar";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AuthProvider } from "@/lib/auth";
import { useState } from "react";

// Pages
import Index from "./pages/Index";
import StartReferral from "./pages/StartReferral";
import StudentProfiles from "./pages/StudentProfiles";
import ProgressTracking from "./pages/ProgressTracking";
import Tier1Resources from "./pages/Tier1Resources";
import Resources from "./pages/Resources";
import Settings from "./pages/Settings";
import TargetBehaviors from "./pages/TargetBehaviors";
import EvaluateBehavior from "./pages/EvaluateBehavior";

const App = () => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <SidebarProvider>
              <div className="min-h-screen flex w-full">
                <MainSidebar />
                <main className="flex-1 p-8">
                  <Breadcrumb />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/start-referral" element={<StartReferral />} />
                    <Route path="/student-profiles" element={<StudentProfiles />} />
                    <Route path="/progress-tracking" element={<ProgressTracking />} />
                    <Route path="/tier1-resources" element={<Tier1Resources />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/target-behaviors" element={<TargetBehaviors />} />
                    <Route path="/evaluate-behavior" element={<EvaluateBehavior />} />
                  </Routes>
                </main>
              </div>
            </SidebarProvider>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;