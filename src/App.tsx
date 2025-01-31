import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { MainSidebar } from "@/components/layout/Sidebar";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { AuthProvider } from "@/lib/AuthProvider";

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
import { DecisionTool } from "./pages/DecisionTool";
import { LandingPage } from "./pages/LandingPage";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Toaster />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
                  <Route path="/decision-tool" element={<DecisionTool />} />
                  <Route path="/landing-page" element={<LandingPage />} />
                  <Route path="/sign-up" element={<SignUp />} />  
                  <Route path="/login" element={<Login />} />
                  <Route path="/index" element={<Index />} />
                  <Route path="/start-referral" element={<StartReferral />} />
                  <Route path="/student-profiles" element={<StudentProfiles />} />
                  <Route path="/progress-tracking" element={<ProgressTracking />} />
                  <Route path="/tier1-resources" element={<Tier1Resources />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/target-behaviors" element={<TargetBehaviors />} />
                  <Route path="/evaluate-behavior" element={<EvaluateBehavior />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;