import { BrowserRouter } from "react-router-dom"
import { BehaviorProvider } from "./components/behavior/BehaviorContext"
import { Routes, Route } from "react-router-dom"
import EvaluateBehavior from "./pages/EvaluateBehavior"
import ProgressTracking from "./pages/ProgressTracking"
import TargetBehaviors from "./pages/TargetBehaviors"
import Index from "./pages/Index"

function App() {
  return (
    <BrowserRouter>
      <BehaviorProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/evaluate-behavior" element={<EvaluateBehavior />} />
          <Route path="/progress-tracking" element={<ProgressTracking />} />
          <Route path="/target-behaviors" element={<TargetBehaviors />} />
        </Routes>
      </BehaviorProvider>
    </BrowserRouter>
  )
}

export default App