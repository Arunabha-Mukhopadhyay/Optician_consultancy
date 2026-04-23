// src/App.jsx — All routes with lazy loading
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop, { RouteScrollReset } from './components/ScrollToTop';
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute';

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/Services/ServiceDetail'));
const Industries = lazy(() => import('./pages/Industries'));
const IndustryDetail = lazy(() => import('./pages/Industries/IndustryDetail'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudies/CaseStudyDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/Blog/BlogPost'));
const ESGCalculator = lazy(() => import('./pages/ESGCalculator'));
const ESGResults = lazy(() => import('./pages/ESGCalculator/Results'));
const Contact = lazy(() => import('./pages/Contact'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Feedback = lazy(() => import('./pages/Feedback'));

// Client Dashboard (protected)
const Dashboard = lazy(() => import('./pages/Dashboard'));
const DashboardProjects = lazy(() => import('./pages/Dashboard/Projects'));
const DashboardReports = lazy(() => import('./pages/Dashboard/Reports'));
const DashboardConsultations = lazy(() => import('./pages/Dashboard/Consultations'));
const DashboardESG = lazy(() => import('./pages/Dashboard/ESGHistory'));

// Admin Panel (admin-only)
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'));
const AdminConsultations = lazy(() => import('./pages/Admin/Consultations'));
const AdminBlogs = lazy(() => import('./pages/Admin/Blogs'));
const AdminCaseStudies = lazy(() => import('./pages/Admin/CaseStudies'));
const AdminFeedback = lazy(() => import('./pages/Admin/Feedback'));
const AdminEsgResults = lazy(() => import('./pages/Admin/EsgResults'));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-gray-500 font-medium">Loading...</p>
    </div>
  </div>
);

// Layout wrapper (with Navbar + Footer)
const PublicLayout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </>
);

// Dashboard layout (no public footer)
const DashboardLayout = ({ children }) => (
  <>
    <Navbar />
    <main className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-950">{children}</main>
  </>
);

export default function App() {
  return (
    <Router>
      <RouteScrollReset />
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
          <Route path="/services/:slug" element={<PublicLayout><ServiceDetail /></PublicLayout>} />
          <Route path="/industries" element={<PublicLayout><Industries /></PublicLayout>} />
          <Route path="/industries/:slug" element={<PublicLayout><IndustryDetail /></PublicLayout>} />
          <Route path="/case-studies" element={<PublicLayout><CaseStudies /></PublicLayout>} />
          <Route path="/case-studies/:id" element={<PublicLayout><CaseStudyDetail /></PublicLayout>} />
          <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
          <Route path="/blog/:slug" element={<PublicLayout><BlogPost /></PublicLayout>} />
          <Route path="/esg-calculator" element={<PublicLayout><ESGCalculator /></PublicLayout>} />
          <Route path="/esg-calculator/results" element={<PublicLayout><ESGResults /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
          <Route path="/feedback" element={<PublicLayout><Feedback /></PublicLayout>} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Client Dashboard */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><Dashboard /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/projects" element={<ProtectedRoute><DashboardLayout><DashboardProjects /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/reports" element={<ProtectedRoute><DashboardLayout><DashboardReports /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/consultations" element={<ProtectedRoute><DashboardLayout><DashboardConsultations /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/esg" element={<ProtectedRoute><DashboardLayout><DashboardESG /></DashboardLayout></ProtectedRoute>} />

          {/* Admin Panel */}
          <Route path="/admin/dashboard" element={<AdminRoute><DashboardLayout><AdminDashboard /></DashboardLayout></AdminRoute>} />
          <Route path="/admin/consultations" element={<AdminRoute><DashboardLayout><AdminConsultations /></DashboardLayout></AdminRoute>} />
          <Route path="/admin/blogs" element={<AdminRoute><DashboardLayout><AdminBlogs /></DashboardLayout></AdminRoute>} />
          <Route path="/admin/case-studies" element={<AdminRoute><DashboardLayout><AdminCaseStudies /></DashboardLayout></AdminRoute>} />
          <Route path="/admin/feedback" element={<AdminRoute><DashboardLayout><AdminFeedback /></DashboardLayout></AdminRoute>} />
          <Route path="/admin/esg-results" element={<AdminRoute><DashboardLayout><AdminEsgResults /></DashboardLayout></AdminRoute>} />

          {/* 404 */}
          <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
        </Routes>
      </Suspense>
    </Router>
  );
}
