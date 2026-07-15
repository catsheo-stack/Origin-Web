import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import SeoManager from '@/components/seo/SeoManager';
import StructuredDataManager from '@/components/seo/StructuredDataManager';

import PageLayout from '@/components/origin/PageLayout';
import Home from '@/pages/Home';
import HomeZh from '@/pages/zh/HomeZh';
import AboutZh from '@/pages/zh/AboutZh';
import BuyerAdvisoryZh from '@/pages/zh/BuyerAdvisoryZh';
import PropertyManagementZh from '@/pages/zh/PropertyManagementZh';
import ConveyancingZh from '@/pages/zh/ConveyancingZh';
import MortgageFinanceZh from '@/pages/zh/MortgageFinanceZh';
import ContactZh from '@/pages/zh/ContactZh';
import BookConsultationZh from '@/pages/zh/BookConsultationZh';
import ThankYouZh from '@/pages/zh/ThankYouZh';
import PrivacyPolicyZh from '@/pages/zh/PrivacyPolicyZh';
import TermsOfUseZh from '@/pages/zh/TermsOfUseZh';
import ProfessionalDisclaimerZh from '@/pages/zh/ProfessionalDisclaimerZh';
import FAQZh from '@/pages/zh/FAQZh';
import KnowledgeCentreZh from '@/pages/zh/KnowledgeCentreZh';
import BuyerResourcesZh from '@/pages/zh/BuyerResourcesZh';
import PropertyManagementResourcesZh from '@/pages/zh/PropertyManagementResourcesZh';
import ConveyancingResourcesZh from '@/pages/zh/ConveyancingResourcesZh';
import MortgageResourcesZh from '@/pages/zh/MortgageResourcesZh';
import ArticleDetailZh from '@/pages/zh/ArticleDetailZh';
import ToolsZh from '@/pages/zh/ToolsZh';
import InvestmentYieldCalculatorZh from '@/pages/zh/InvestmentYieldCalculatorZh';
import OriginHomeBuyingPlannerZh from '@/pages/zh/OriginHomeBuyingPlannerZh';
import PropertyManagementReadinessChecklistZh from '@/pages/zh/PropertyManagementReadinessChecklistZh';
import BuyerSettlementTrackerZh from '@/pages/zh/BuyerSettlementTrackerZh';
import SellerSettlementTrackerZh from '@/pages/zh/SellerSettlementTrackerZh';

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
import BuyerAgentChecklist from '@/en/pages/HomeBuyerJourneyChecklist';
import BuyerAgentChecklistZh from '@/pages/HomeBuyerJourneyChecklistZh';
import About from '@/pages/About';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfUse from '@/pages/TermsOfUse';
import ProfessionalDisclaimer from '@/pages/ProfessionalDisclaimer';
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
        <Route path="/zh" element={<HomeZh />} />
        <Route path="/zh/about" element={<AboutZh />} />
        <Route path="/zh/buyer-advisory" element={<BuyerAdvisoryZh />} />
        <Route path="/zh/property-management" element={<PropertyManagementZh />} />
        <Route path="/zh/conveyancing" element={<ConveyancingZh />} />
        <Route path="/zh/mortgage-finance" element={<MortgageFinanceZh />} />
        <Route path="/zh/contact" element={<ContactZh />} />
        <Route path="/zh/book-consultation" element={<BookConsultationZh />} />
        <Route path="/zh/thank-you" element={<ThankYouZh />} />
        <Route path="/zh/privacy-policy" element={<PrivacyPolicyZh />} />
        <Route path="/zh/terms-of-use" element={<TermsOfUseZh />} />
        <Route path="/zh/professional-disclaimer" element={<ProfessionalDisclaimerZh />} />
        <Route path="/zh/faq" element={<FAQZh />} />
        <Route path="/zh/knowledge-centre" element={<KnowledgeCentreZh />} />
        <Route path="/zh/buyer-advisory/resources" element={<BuyerResourcesZh />} />
        <Route path="/zh/property-management/resources" element={<PropertyManagementResourcesZh />} />
        <Route path="/zh/conveyancing/resources" element={<ConveyancingResourcesZh />} />
        <Route path="/zh/mortgage-finance/resources" element={<MortgageResourcesZh />} />
        <Route path="/zh/article/:slug" element={<ArticleDetailZh />} />
        <Route path="/zh/guides" element={<KnowledgeCentreZh />} />
        <Route path="/zh/property-guides" element={<PropertyManagementResourcesZh />} />
        <Route path="/zh/property-guides/:slug" element={<ArticleDetailZh />} />
        <Route path="/zh/tools" element={<ToolsZh />} />
        <Route path="/zh/tools/property-management-readiness-checklist" element={<PropertyManagementReadinessChecklistZh />} />
        <Route path="/zh/tools/investment-yield-calculator" element={<InvestmentYieldCalculatorZh />} />
        <Route path="/zh/tools/origin-home-buying-planner" element={<OriginHomeBuyingPlannerZh />} />
        <Route path="/zh/tools/buyer-settlement-tracker" element={<BuyerSettlementTrackerZh />} />
        <Route path="/zh/tools/seller-settlement-tracker" element={<SellerSettlementTrackerZh />} />
        <Route path="/zh/tools/buyer-agent-checklist" element={<BuyerAgentChecklistZh />} />

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
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/professional-disclaimer" element={<ProfessionalDisclaimer />} />
        <Route path="/tools/property-management-readiness-checklist" element={<PropertyManagementReadinessChecklist />} />
        <Route path="/tools/investment-yield-calculator" element={<InvestmentYieldCalculator />} />
        <Route path="/tools/origin-home-buying-planner" element={<OriginHomeBuyingPlanner />} />
        <Route path="/tools/buyer-settlement-tracker" element={<BuyerSettlementTracker />} />
        <Route path="/tools/seller-settlement-tracker" element={<SellerSettlementTracker />} />
        <Route path="/tools/buyer-agent-checklist" element={<BuyerAgentChecklist />} />
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
          <SeoManager />
          <StructuredDataManager />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App