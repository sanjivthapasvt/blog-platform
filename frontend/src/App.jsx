import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Auth from "./pages/auth";
import SideNavigation from "./components/SideNav";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import About from "./pages/about";

function Layout() {
  const location = useLocation();
  const showSidebar = location.pathname !== "/";
  
  return (
    <div className="flex">
      {showSidebar && <SideNavigation />}
      <div className={`flex-1 ${showSidebar ? 'ml-16 md:ml-56' : ''}`}>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/about" element={<About />} />
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