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
import ComprehensiveEvalPage from "@/pages/ComprehensiveEvalPage";
import LearningMapPage from "@/pages/LearningMapPage";
import SharedPracticeDetailPage from "@/pages/SharedPracticeDetailPage";
import PlanDetailPage from "@/pages/PlanDetailPage";
import PracticeDetailPage from "@/pages/PracticeDetailPage";
import PracticeSessionPage from "@/pages/PracticeSessionPage";
import CourseDetailPage from "@/pages/CourseDetailPage";
import KnowledgeBasePage from "@/pages/KnowledgeBasePage";
import NotFound from "@/pages/NotFound";
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
          <Route path="/course/:id" element={<CourseDetailPage />} />
          <Route path="/course-library" element={<KnowledgeBasePage />} />
          <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
          <Route path="/practice" element={<AIPracticePage />} />
          <Route path="/practice-detail/:id" element={<PracticeDetailPage />} />
          <Route path="/practice-session/:id" element={<PracticeSessionPage />} />
          <Route path="/exam" element={<ExamPage />} />
          <Route path="/practice-review" element={<PracticeReviewPage />} />
          <Route path="/growth-map" element={<GrowthMapPage />} />
          <Route path="/learning-map" element={<LearningMapPage />} />
          <Route path="/competency" element={<CompetencyPage />} />
          <Route path="/comprehensive-eval" element={<ComprehensiveEvalPage />} />
          <Route path="/shared-practice/:id" element={<SharedPracticeDetailPage />} />
          <Route path="/plan/:id" element={<PlanDetailPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
