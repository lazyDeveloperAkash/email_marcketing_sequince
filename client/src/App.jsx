import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import FlowChart from "./components/FlowChart"
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import SignInPage from "./components/Signin";
import SignUpPage from "./components/SignupPage"
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar";
import RedirectRoute from "./components/RedirectRoute";

// Layout component to conditionally show Navbar
const Layout = ({ children }) => {
  const location = useLocation();
  return (
    <>
      {!['/', '/signin', '/signup'].includes(location.pathname) && <Navbar />}
      {children}
    </>
  );
};

const App = () => {
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
      <Router>
        <Layout />
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signup" element={<RedirectRoute><SignUpPage /></RedirectRoute>} />
          <Route path="/signin" element={<RedirectRoute><SignInPage /></RedirectRoute>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <FlowChart />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App