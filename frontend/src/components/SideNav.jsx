import React, { useState, useEffect } from "react";
import myimg from "../assets/img/my_pic.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Info,
  Folder,
  Phone,
  Archive,
  Heart,
  Menu,
  ChevronLeft,
  LogIn,
  LogOut,
} from "lucide-react";

const SideNavigation = () => {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768); // Collapsed on small screens
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { name: "Home", href: "/home", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Projects", href: "/projects", icon: Folder },
    { name: "Contact", href: "/contact", icon: Phone },
    { name: "Archive", href: "/archive", icon: Archive },
    { name: "Love", href: "/love", icon: Heart },
  ];

  // Check if the user is authenticated by looking for a token in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  // Handle logout by removing the token and navigating to the login page
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-gray-900 text-white transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-56"
      } shadow-lg`}
    >
      {/* Toggle Button (Visible only on mobile) */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 md:hidden">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition"
        >
          {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-32 h-32 cursor-pointer mt-5 rounded-full border-2 border-gray-700 overflow-hidden">
          <img
            src={myimg}
            alt="Profile"
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        <h2 className="mt-2 text-xl text-gray-400 font-bold cursor-pointer mb-3 hover:text-white transition-colors duration-200">
          Sanjiv Thapa
        </h2>
        <p className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors duration-200">
          Python | Linux | Backend
        </p>
        <p className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors duration-200">
          Web Developer | Django
        </p>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="relative">
              <Link
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 transition rounded-md ${
                  location.pathname === item.href ? "bg-gray-700 text-white" : ""
                }`}
              >
                <item.icon size={22} />
                {!isCollapsed && <span className="text-sm">{item.name}</span>}
              </Link>
            </li>
          ))}
          {/* Conditionally render Logout or Login button */}
          {isAuthenticated ? (
            <li key="logout">
              <button
                onClick={handleLogout}
                className="flex cursor-pointer items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 transition rounded-md w-full text-left"
              >
                <LogOut size={22} />
                {!isCollapsed && <span className="text-sm">Logout</span>}
              </button>
            </li>
          ) : (
            <li key="login">
              <Link
                to="/auth"
                className="flex cursor-pointer items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 transition rounded-md"
              >
                <LogIn size={22} />
                {!isCollapsed && <span className="text-sm">Login</span>}
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default SideNavigation;