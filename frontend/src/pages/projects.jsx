import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";

const Projects = () => {
  const baseUrl = "http://127.0.0.1:8000/api";
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${baseUrl}/project/`);
        setProjects(response.data);
      } catch (error) {
        toast.error("Error loading projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [location]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -5,
      boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    }
  };

  // Get featured projects
  const featuredProjects = projects.filter(project => project.featured);
  // Get other projects
  const otherProjects = projects.filter(project => !project.featured);

  // Chunk projects into pairs for grid layout
  const getProjectPairs = (projectsList) => {
    const pairs = [];
    for (let i = 0; i < projectsList.length; i += 2) {
      pairs.push(projectsList.slice(i, i + 2));
    }
    return pairs;
  };

  const handleProjectClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-slate-900 dark:to-slate-800 p-6"
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit={3}
      />
      
      <div className="max-w-6xl mx-auto">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-extrabold mb-2 text-indigo-900 dark:text-white">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              My Portfolio Projects
            </span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto"
          >
            A collection of my work and personal projects that showcase my skills and experience
          </motion.p>
        </motion.header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div 
              animate={{ 
                rotate: 360,
                transition: {
                  duration: 1,
                  ease: "linear",
                  repeat: Infinity
                }
              }}
              className="h-12 w-12 border-t-2 border-b-2 border-indigo-500 rounded-full"
            />
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Projects Section */}
            {featuredProjects.length > 0 && (
              <section>
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-2xl font-bold text-slate-800 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-700 pb-2"
                >
                  Featured Projects
                </motion.h2>
                
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="space-y-8"
                >
                  {getProjectPairs(featuredProjects).map((pair, pairIndex) => (
                    <div key={pairIndex} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {pair.map((project) => (
                        <ProjectCard 
                          key={project.id} 
                          project={project} 
                          cardHoverVariants={cardHoverVariants}
                          onClick={() => handleProjectClick(project.id)}
                        />
                      ))}
                    </div>
                  ))}
                </motion.div>
              </section>
            )}
            
            {/* Other Projects Section */}
            {otherProjects.length > 0 && (
              <section>
                <motion.h2 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-2xl font-bold text-slate-800 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-700 pb-2"
                >
                  Other Projects
                </motion.h2>
                
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="space-y-8"
                >
                  {getProjectPairs(otherProjects).map((pair, pairIndex) => (
                    <div key={pairIndex} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {pair.map((project) => (
                        <ProjectCard 
                          key={project.id} 
                          project={project} 
                          cardHoverVariants={cardHoverVariants}
                          onClick={() => handleProjectClick(project.id)}
                        />
                      ))}
                    </div>
                  ))}
                </motion.div>
              </section>
            )}
            
            {/* No Projects Found */}
            {!loading && projects.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16 bg-white dark:bg-slate-800 rounded-xl shadow-sm"
              >
                <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">No projects found</h2>
                <p className="text-slate-600 dark:text-slate-400">Check back later for project updates</p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Project Card Component
const ProjectCard = ({ project, cardHoverVariants, onClick }) => {
    return (
      <motion.article
        whileHover="hover"
        variants={cardHoverVariants}
        className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col h-full"
        onClick={() => onClick(project.id)} // Pass project ID on click
      >
        {project.img}
        {project.image && (
          <div className="relative h-48 overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 transition-opacity duration-300 flex items-center justify-center">
              <div className="opacity-0 hover:opacity-100 flex space-x-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-slate-800 p-2 rounded-full text-slate-800 dark:text-white hover:bg-indigo-500 hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-slate-800 p-2 rounded-full text-slate-800 dark:text-white hover:bg-indigo-500 hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        )}
        
        <div className="p-6 flex-grow flex flex-col">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
            {project.title}
          </h2>
          
          <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
            {project.description}
          </p>
          
          <div className="mt-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  onClick={(e) => e.stopPropagation()}
                  className="px-2 py-1 text-xs rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
            
            <motion.button
              whileHover={{ x: 5 }}
              onClick={(e) => {
                  e.stopPropagation();
                  onClick(project.id); 
                }}
              className="inline-flex items-center text-indigo-600 dark:text-indigo-400 cursor-pointer font-medium hover:text-indigo-800 dark:hover:text-indigo-300"
            >
              View details
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.article>
    );
  };

export default Projects;