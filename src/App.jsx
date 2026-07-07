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
import PropertyManagement from '@/pages/PropertyManagement';
import PropertyGuides from '@/pages/PropertyGuides';
import GuideDetail from '@/pages/GuideDetail';
import Contact from '@/pages/Contact';
import BookConsultation from '@/pages/BookConsultation';
import ComingSoon from '@/pages/ComingSoon';
import ThankYou from '@/pages/ThankYou';
import ArticleDetail from '@/pages/ArticleDetail';
import AdminArticles from '@/pages/admin/AdminArticles';
import AdminRoute from '@/components/AdminRoute';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';

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
        <Route path="/property-guides/:slug" element={<GuideDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book-consultation" element={<BookConsultation />} />
        <Route path="/buyers-agent" element={<ComingSoon />} />
        <Route path="/finance-referral" element={<ComingSoon />} />
        <Route path="/conveyancing" element={<ComingSoon />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/article/:slug" element={<ArticleDetail />} />
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