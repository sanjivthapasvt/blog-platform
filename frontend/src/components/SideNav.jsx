import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Info,
  Folder,
  Phone,
  Archive,
  Heart,
  Menu,
  ChevronLeft,
} from "lucide-react";

const SideNavigation = () => {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768); //collapsed on small screens
  const location = useLocation();

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
        </ul>
      </nav>
    </div>
  );
};

export default SideNavigation;
