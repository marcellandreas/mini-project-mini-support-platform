import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navigation/Navbar";
import CreatorPage from "./pages/CreatorPage";
import SupporterPage from "./pages/SupporterPage";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Auth/Login";
import { ToastContainer } from "react-toastify";
import Register from "./components/Auth/Register";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <>
      <ToastContainer />
      <Router>
        <div className=" left-5 bottom-5 absolute">Untuk Dummy Login, bisa langsung ke register saja</div>
          <Navbar />
          <Routes>
            <Route path="/" element={<CreatorPage />} />

            <Route path="/support" element={
                <ProtectedRoute>
                  <SupporterPage />
                </ProtectedRoute>            
              } />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
