import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';

import PageLayout from '@/components/origin/PageLayout';
import Home from '@/pages/Home';
import BuyerAdvisory from '@/pages/BuyerAdvisory';
import BuyerResources from '@/pages/BuyerResources';
import PropertyManagementResources from '@/pages/PropertyManagementResources';
import ConveyancingResources from '@/pages/ConveyancingResources';
import MortgageResources from '@/pages/MortgageResources';
import PropertyManagement from '@/pages/PropertyManagement';
import PropertyGuides from '@/pages/PropertyGuides';
import GuideDetail from '@/pages/GuideDetail';
import Contact from '@/pages/Contact';
import BookConsultation from '@/pages/BookConsultation';
import MortgageFinance from '@/pages/MortgageFinance';
import Conveyancing from '@/pages/Conveyancing';
import ThankYou from '@/pages/ThankYou';
import ArticleDetail from '@/pages/ArticleDetail';
import FAQ from '@/pages/FAQ';
import Articles from '@/pages/Articles';
import Guides from '@/pages/Guides';
import Tools from '@/pages/Tools';
import PropertyManagementReadinessChecklist from '@/pages/tools/PropertyManagementReadinessChecklist';
import InvestmentYieldCalculator from '@/pages/tools/InvestmentYieldCalculator';
import OriginHomeBuyingPlanner from '@/pages/tools/OriginHomeBuyingPlanner';
import BuyerSettlementTracker from '@/pages/tools/BuyerSettlementTracker';
import SellerSettlementTracker from '@/pages/tools/SellerSettlementTracker';
import About from '@/pages/About';
import AdminArticles from '@/pages/admin/AdminArticles';
import AdminRoute from '@/components/AdminRoute';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import HermesLayout from '@/components/hermes/HermesLayout';
import HermesDashboard from '@/pages/hermes/Dashboard';
import HermesProjects from '@/pages/hermes/Projects';
import HermesResearch from '@/pages/hermes/Research';
import HermesContentPipeline from '@/pages/hermes/ContentPipeline';
import HermesKnowledgeGraph from '@/pages/hermes/KnowledgeGraph';
import HermesAuthority from '@/pages/hermes/AuthorityCentre';
import HermesAiVisibility from '@/pages/hermes/AiVisibility';
import HermesCmsExport from '@/pages/hermes/CmsExport';
import HermesSettings from '@/pages/hermes/Settings';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-parchment">
        <div className="w-8 h-8 border-4 border-stone border-t-golden rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<PageLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/property-management" element={<PropertyManagement />} />
        <Route path="/property-guides" element={<PropertyGuides />} />
        <Route path="/knowledge-centre" element={<PropertyGuides />} />
        <Route path="/property-guides/:slug" element={<GuideDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book-consultation" element={<BookConsultation />} />
        <Route path="/buyer-advisory" element={<BuyerAdvisory />} />
        <Route path="/buyer-advisory/resources" element={<BuyerResources />} />
        <Route path="/property-management/resources" element={<PropertyManagementResources />} />
        <Route path="/conveyancing/resources" element={<ConveyancingResources />} />
        <Route path="/mortgage-finance/resources" element={<MortgageResources />} />
        <Route path="/finance-referral" element={<MortgageFinance />} />
        <Route path="/mortgage-finance" element={<MortgageFinance />} />
        <Route path="/conveyancing" element={<Conveyancing />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/article/:slug" element={<ArticleDetail />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/about" element={<About />} />
        <Route path="/tools/property-management-readiness-checklist" element={<PropertyManagementReadinessChecklist />} />
        <Route path="/tools/investment-yield-calculator" element={<InvestmentYieldCalculator />} />
        <Route path="/tools/origin-home-buying-planner" element={<OriginHomeBuyingPlanner />} />
        <Route path="/tools/buyer-settlement-tracker" element={<BuyerSettlementTracker />} />
        <Route path="/tools/seller-settlement-tracker" element={<SellerSettlementTracker />} />
      </Route>
      <Route element={<HermesLayout />}>
        <Route path="/hermes" element={<HermesDashboard />} />
        <Route path="/hermes/projects" element={<HermesProjects />} />
        <Route path="/hermes/research" element={<HermesResearch />} />
        <Route path="/hermes/content-pipeline" element={<HermesContentPipeline />} />
        <Route path="/hermes/knowledge-graph" element={<HermesKnowledgeGraph />} />
        <Route path="/hermes/authority" element={<HermesAuthority />} />
        <Route path="/hermes/ai-visibility" element={<HermesAiVisibility />} />
        <Route path="/hermes/cms-export" element={<HermesCmsExport />} />
        <Route path="/hermes/settings" element={<HermesSettings />} />
      </Route>
      <Route path="/admin/articles" element={<AdminRoute><AdminArticles /></AdminRoute>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App