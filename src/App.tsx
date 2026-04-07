import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import ContactUsPage from "./pages/ContactUsPage";
import LoginPage from "./pages/LoginPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./utils/Navbar";
import Footer from "./utils/Footer";
import AdminRoute from "./components/AdminRoute";
import AdminDashboardMain from "./pages/AdminDashboardMain";
import ScrollToTopButton from "./components/ScrollToTopButton";

// import DashboardPage from "./pages/DashboardPage";
// import ProductsPage from "./pages/ProductsPage";
// import CategoriesPage from "./pages/CategoriesPage";
// import SuppliersPage from "./pages/SuppliersPage";
// import ReceiptsPage from "./pages/ReceiptsPage";
// import WriteOffsPage from "./pages/WriteOffsPage";
// import OperationsHistoryPage from "./pages/OperationsHistoryPage";

import "./App.css";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {!isAdminPage && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* Admin Dashboard Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboardMain />
              </AdminRoute>
            }
          >
            {/* <Route
              index
              element={
                <AdminRoute>
                  <DashboardPage />
                </AdminRoute>
              }
            />
            <Route
              path="products"
              element={
                <AdminRoute>
                  <ProductsPage />
                </AdminRoute>
              }
            />
            <Route
              path="categories"
              element={
                <AdminRoute>
                  <CategoriesPage />
                </AdminRoute>
              }
            />
            <Route
              path="suppliers"
              element={
                <AdminRoute>
                  <SuppliersPage />
                </AdminRoute>
              }
            />
            <Route
              path="receipts"
              element={
                <AdminRoute>
                  <ReceiptsPage />
                </AdminRoute>
              }
            />
            <Route
              path="write-offs"
              element={
                <AdminRoute>
                  <WriteOffsPage />
                </AdminRoute>
              }
            />
            <Route
              path="operations-history"
              element={
                <AdminRoute>
                  <OperationsHistoryPage />
                </AdminRoute>
              }
            /> */}
          </Route>

          {/* Not Found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {!isAdminPage && <Footer />}
      <ScrollToTopButton />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
