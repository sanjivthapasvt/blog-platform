import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaEnvelope, FaPhone, FaMapMarkerAlt, FaYoutube, FaTiktok, FaLink } from 'react-icons/fa';
import helloGif from "../assets/gifs/hello.gif"

const Contact = () => {
  const contactInfo = {
    email: 'thapasvt12@gmail.com',
    phone: '+977 9741869505',
    location: 'Hetauda, Nepal',
    website: 'https://www.sanjivthapa.com.np/',
    socialLinks: {
      github: 'https://github.com/sanjivthapasvt',
      linkedin: 'https://linkedin.com/in/sanjiv-thapa-361678277',
      instagram: 'https://www.instagram.com/sanjivthapasvt1/',
      facebook: 'https://www.facebook.com/sanjiv.thapa.svt012',
      youtube: 'https://www.youtube.com/@sanjivthapasvt',
      tiktok: 'https://www.tiktok.com/@sanjivthapasvt'
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black min-h-screen p-6 w-full">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-white text-left">Contact</h1>

        {/* GIF */}
        <div className="flex mb-12">
          <div className="relative w-full max-w-lg h-64 rounded-lg overflow-hidden shadow-2xl">
            <img
              src={helloGif}
              alt="Hello Gif"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </div>
        </div>
        
        <h2 className="text-3xl font-bold mb-6 text-white text-left mb-10">HERE ARE MY CONTACTS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg rounded-lg p-8 backdrop-blur-sm bg-opacity-50">
            <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 group">
                <FaEnvelope className="text-blue-400 text-xl group-hover:text-blue-300 transition-colors" />
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="text-gray-300 group-hover:text-blue-300 transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center space-x-4 group">
                <FaPhone className="text-blue-400 text-xl group-hover:text-blue-300 transition-colors" />
                <a 
                  href={`tel:${contactInfo.phone}`}
                  className="text-gray-300 group-hover:text-blue-300 transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-blue-400 text-xl" />
                <span className="text-gray-300">{contactInfo.location}</span>
              </div>
              <div className="flex items-center space-x-4 group">
              <FaLink className="text-blue-400 text-xl group-hover:text-blue-300 transition-colors" />
              <a 
                  href={`${contactInfo.website}`}
                  target='_blank'
                  rel="noopener noreferrer"
                  className="text-gray-300 group-hover:text-blue-300 transition-colors"
                >
                  {contactInfo.website}
                </a>
                </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg rounded-lg p-8 backdrop-blur-sm bg-opacity-50">
            <h2 className="text-2xl font-bold mb-8">Connect With Me</h2>
            <div className="grid grid-cols-2 gap-6">
              {/* First Column */}
              <div className="space-y-6">
                <a
                  href={contactInfo.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-all transform hover:-translate-y-1 hover:scale-110"
                >
                  <FaGithub className="text-4xl" />
                  <span>GitHub</span>
                </a>
                <a
                  href={contactInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-all transform hover:-translate-y-1 hover:scale-110"
                >
                  <FaLinkedin className="text-4xl" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={contactInfo.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-all transform hover:-translate-y-1 hover:scale-110"
                >
                  <FaInstagram className="text-4xl" />
                  <span>Instagram</span>
                </a>
              </div>
              {/* Second Column */}
              <div className="space-y-6">
                <a
                  href={contactInfo.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-all transform hover:-translate-y-1 hover:scale-110"
                >
                  <FaFacebook className="text-4xl" />
                  <span>Facebook</span>
                </a>
                <a
                  href={contactInfo.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-all transform hover:-translate-y-1 hover:scale-110"
                >
                  <FaYoutube className="text-4xl" />
                  <span>YouTube</span>
                </a>
                <a
                  href={contactInfo.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-all transform hover:-translate-y-1 hover:scale-110"
                >
                  <FaTiktok className="text-4xl" />
                  <span>TikTok</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 