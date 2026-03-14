import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MobileLayout from "@/components/layout/MobileLayout";
import HomePage from "@/pages/HomePage";
import LearnPage from "@/pages/LearnPage";
import CommunityPage from "@/pages/CommunityPage";
import ProfilePage from "@/pages/ProfilePage";
import FragmentLearnPage from "@/pages/FragmentLearnPage";
import ChapterDetailPage from "@/pages/ChapterDetailPage";
import AIPracticePage from "@/pages/AIPracticePage";
import ExamPage from "@/pages/ExamPage";
import PracticeReviewPage from "@/pages/PracticeReviewPage";
import GrowthMapPage from "@/pages/GrowthMapPage";
import CompetencyPage from "@/pages/CompetencyPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MobileLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="/fragment-learn" element={<FragmentLearnPage />} />
          <Route path="/chapter/:id" element={<ChapterDetailPage />} />
          <Route path="/practice" element={<AIPracticePage />} />
          <Route path="/exam" element={<ExamPage />} />
          <Route path="/practice-review" element={<PracticeReviewPage />} />
          <Route path="/growth-map" element={<GrowthMapPage />} />
          <Route path="/competency" element={<CompetencyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
