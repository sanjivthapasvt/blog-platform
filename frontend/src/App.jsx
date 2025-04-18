import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import Auth from "./pages/auth";
import SideNavigation from "./components/SideNav";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import About from "./pages/about";
import Contact from "./pages/contact";
import Projects from "./pages/projects";
import ProjectDetail from "./pages/projectDetails";
import Love from "./pages/love";
import ArchivePage from "./pages/archive";

function Layout() {
  const location = useLocation();
  const showSidebar = !location.pathname.startsWith("/auth");
  
  function NotFoundRedirect() {
    return <Navigate to="/home" />;
  }
  
  return (
    <div className="w-full h-full flex overflow-x-hidden">
      {showSidebar && <SideNavigation />}
      <div className={`flex-grow ${showSidebar ? 'ml-0 md:ml-64' : 'w-full'}`}>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/love" element={<Love />} />
          <Route path="/" element={<NotFoundRedirect />} />
        </Routes>
      </div>
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