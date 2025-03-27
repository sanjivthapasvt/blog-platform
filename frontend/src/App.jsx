import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Auth from "./pages/auth";
import SideNavigation from "./components/SideNav";
import Home from "./pages/Home";

function Layout() {
  const location = useLocation();
  const hideSidebarPaths = ["/auth", "/auth/"]; // Hide sidebar on auth page

  return (
    <div className="app-container">
      {/* Show Sidebar only if the current path is not in hideSidebarPaths */}
      {!hideSidebarPaths.includes(location.pathname) && <SideNavigation />}

      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
