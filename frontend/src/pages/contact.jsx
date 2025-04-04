import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaYoutube,
  FaTiktok,
  FaLink,
} from "react-icons/fa";
import { motion } from "framer-motion";
import helloGif from "../assets/gifs/hello.gif";
import BackgroundElement from "../components/BackgroundElements";

const Contact = () => {
  const contactInfo = {
    email: "thapasvt12@gmail.com",
    phone: "+977 9741869505",
    location: "Hetauda, Nepal",
    website: "https://www.sanjivthapa.com.np/",
    socialLinks: {
      github: "https://github.com/sanjivthapasvt",
      linkedin: "https://linkedin.com/in/sanjiv-thapa-361678277",
      instagram: "https://www.instagram.com/sanjivthapasvt1/",
      facebook: "https://www.facebook.com/sanjiv.thapa.svt012",
      youtube: "https://www.youtube.com/@sanjivthapasvt",
      tiktok: "https://www.tiktok.com/@sanjivthapasvt",
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -5,
      boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-br from-gray-900 to-black min-h-screen p-6 w-full"
    >
      <BackgroundElement />
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold mb-6 text-white text-left"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            Contact
          </span>
        </motion.h1>

        {/* GIF */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex mb-12"
        >
          <div className="relative w-full max-w-lg h-64 rounded-lg overflow-hidden shadow-2xl">
            <img
              src={helloGif}
              alt="Hello Gif"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-3xl font-bold mb-10 text-white text-left"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            HERE ARE MY CONTACTS
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <motion.div
            whileHover="hover"
            variants={cardHoverVariants}
            className="relative bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-lg rounded-2xl p-8 backdrop-blur-sm bg-opacity-50 border border-slate-700/50 group overflow-hidden"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 0%, rgba(120, 100, 250, 0.07), transparent 25%)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h2 className="text-2xl font-bold mb-8 relative z-10 group-hover:text-indigo-300 transition-colors duration-300">
              Contact Information
            </h2>
            <div className="space-y-6 relative z-10">
              <div className="flex items-center space-x-4 group cursor-pointer">
                <FaEnvelope className="text-indigo-400 text-xl group-hover:text-indigo-300 transition-colors" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-gray-300 group-hover:text-indigo-300 transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center space-x-4 group cursor-pointer">
                <FaPhone className="text-indigo-400 text-xl group-hover:text-indigo-300 transition-colors" />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-gray-300 group-hover:text-indigo-300 transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center space-x-4 group cursor-pointer">
                <FaMapMarkerAlt className="text-indigo-400 text-xl group-hover:text-indigo-300 transition-colors" />
                <span className="text-gray-300 group-hover:text-indigo-300 transition-colors">
                  {contactInfo.location}
                </span>
              </div>
              <div className="flex items-center space-x-4 group cursor-pointer">
                <FaLink className="text-indigo-400 text-xl group-hover:text-indigo-300 transition-colors" />
                <a
                  href={contactInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 group-hover:text-indigo-300 transition-colors"
                >
                  {contactInfo.website}
                </a>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            whileHover="hover"
            variants={cardHoverVariants}
            className="relative bg-gradient-to-br from-slate-800 to-slate-900 text-white shadow-lg rounded-2xl p-8 backdrop-blur-sm bg-opacity-50 border border-slate-700/50 group overflow-hidden"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 0%, rgba(120, 100, 250, 0.07), transparent 25%)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <h2 className="text-2xl font-bold mb-8 relative z-10 group-hover:text-indigo-300 transition-colors duration-300">
              Connect With Me
            </h2>
            <div className="grid grid-cols-2 gap-6 relative z-10">
              {/* First Column */}
              <div className="space-y-6">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href={contactInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-indigo-400 transition-all transform hover:-translate-y-1"
                >
                  <FaGithub className="text-4xl" />
                  <span>GitHub</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href={contactInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-indigo-400 transition-all transform hover:-translate-y-1"
                >
                  <FaLinkedin className="text-4xl" />
                  <span>LinkedIn</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href={contactInfo.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-indigo-400 transition-all transform hover:-translate-y-1"
                >
                  <FaInstagram className="text-4xl" />
                  <span>Instagram</span>
                </motion.a>
              </div>
              {/* Second Column */}
              <div className="space-y-6">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href={contactInfo.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-indigo-400 transition-all transform hover:-translate-y-1"
                >
                  <FaFacebook className="text-4xl" />
                  <span>Facebook</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href={contactInfo.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-indigo-400 transition-all transform hover:-translate-y-1"
                >
                  <FaYoutube className="text-4xl" />
                  <span>YouTube</span>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href={contactInfo.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-indigo-400 transition-all transform hover:-translate-y-1"
                >
                  <FaTiktok className="text-4xl" />
                  <span>TikTok</span>
                </motion.a>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
