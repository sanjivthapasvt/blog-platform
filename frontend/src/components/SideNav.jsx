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
  X,
  LogIn,
  LogOut,
} from "lucide-react";
import axios from "axios";
import { toast } from 'react-toastify';

const SideNavigation = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const baseUrl = "http://127.0.0.1:8000/api";
  const isMobile = window.innerWidth < 768;

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileOpen]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (window.innerWidth < 768 && isMobileOpen) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && !sidebar.contains(e.target)) {
          setIsMobileOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobileOpen(false);
    }
  }, [location.pathname]);

  const menuItems = [
    { name: "Home", href: "/home", icon: Home },
    { name: "About", href: "/about", icon: Info },
    { name: "Projects", href: "/projects", icon: Folder },
    { name: "Contact", href: "/contact", icon: Phone },
    { name: "Archive", href: "/archive", icon: Archive },
    { name: "Love", href: "/love", icon: Heart },
  ];

  // Check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem("token");

  // Handle logout
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
          `${baseUrl}/auth/logout/`,
          { refresh_token: localStorage.getItem("refresh_token") },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        
        toast.success("Successfully logged out!");
        navigate("/auth");
      }
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      toast.error("Error during logout. Please try again.");
      navigate("/auth");
    }
  };

  // Mobile toggle button
  const MobileMenuButton = () => (
    <button
      onClick={() => setIsMobileOpen(!isMobileOpen)}
      className="fixed z-50 top-4 right-4 p-2 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition-all duration-200 md:hidden"
      aria-label="Toggle menu"
    >
      {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );

  return (
    <>
      {/* Mobile Menu Button*/}
      <MobileMenuButton />
      
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" />
      )}

      {/* Main Sidebar */}
      <div
        id="sidebar"
        className={`fixed left-0 top-0 h-full bg-gray-900 text-white transition-all duration-300 z-40 shadow-xl 
          md:w-64 w-64
          ${isMobile && !isMobileOpen ? "-translate-x-full" : "translate-x-0"}`}
      >
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-6 px-3 pt-2">
          <div className="relative overflow-hidden rounded-full border-2 border-indigo-500 transition-all duration-300 w-28 h-28">
            <img
              src={myimg}
              alt="Profile"
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
          
          <div className="mt-4 text-center transition-opacity duration-300">
            <h2 className="text-xl font-bold text-white">Sanjiv Thapa</h2>
            <div className="mt-2 space-y-1">
              <p className="text-sm text-gray-300 bg-gray-800 px-3 py-1 rounded-full inline-block">
                Python | Linux | Backend
              </p>
              <p className="text-sm text-gray-300 bg-gray-800 px-3 py-1 rounded-full inline-block">
                Web Developer | Django
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-2 px-2">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
              const IconComponent = item.icon;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200
                      ${isActive 
                        ? "bg-indigo-600 text-white" 
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
                  >

                    <div className="flex-shrink-0 w-6 flex justify-center">
                      <IconComponent size={22} />
                    </div>
                    <span className="text-sm font-medium">{item.name}</span>
                    {isActive && (
                      <span className="ml-auto bg-indigo-500 h-2 w-2 rounded-full"></span>
                    )}
                  </Link>
                </li>
              );
            })}
            
            {/* Auth Button */}
            <li className="mt-2 pt-2 border-t border-gray-700">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer text-red-300 hover:bg-red-900/30 hover:text-red-200 rounded-md transition-all duration-200"
                >
                  <div className="flex-shrink-0 w-6 flex justify-center">
                    <LogOut size={22} />
                  </div>
                  <span className="text-sm font-medium">Logout</span>
                </button>
              ) : (
                <Link
                  to="/auth"
                  className="flex items-center gap-3 px-4 py-3 text-green-300 hover:bg-green-900/30 hover:text-green-200 rounded-md transition-all duration-200"
                >
                  <div className="flex-shrink-0 w-6 flex justify-center">
                    <LogIn size={22} />
                  </div>
                  <span className="text-sm font-medium">Login</span>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default SideNavigation;