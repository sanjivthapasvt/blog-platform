import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Github, ExternalLink } from "lucide-react";

const Projects = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
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
        console.error("Error loading projects. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [location]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const cardHoverVariants = {
    hover: {
      y: -5,
      boxShadow: "0 12px 20px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
  };

  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  const getProjectPairs = (projectsList) => {
    const pairs = [];
    for (let i = 0; i < projectsList.length; i += 2) {
      pairs.push(projectsList.slice(i, i + 2));
    }
    return pairs;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-black"
    >
      <div className="transition-all duration-300 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-6 sm:mb-8 text-center"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                My Portfolio Projects
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto"
            >
              A collection of my work and personal projects
            </motion.p>
          </motion.header>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <motion.div
                animate={{ rotate: 360, transition: { duration: 1, ease: "linear", repeat: Infinity } }}
                className="h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-indigo-500 rounded-full"
              />
            </div>
          ) : (
            <div className="space-y-12">
              {featuredProjects.length > 0 && (
                <section>
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl font-bold text-white mb-6 border-b border-slate-700 pb-2"
                  >
                    Featured Projects
                  </motion.h2>
                  <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8">
                    {getProjectPairs(featuredProjects).map((pair, pairIndex) => (
                      <div key={pairIndex} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {pair.map((project) => (
                          <ProjectCard
                            key={project.id}
                            project={project}
                            cardHoverVariants={cardHoverVariants}
                          />
                        ))}
                      </div>
                    ))}
                  </motion.div>
                </section>
              )}

              {otherProjects.length > 0 && (
                <section>
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl font-bold text-white mb-6 border-b border-slate-700 pb-2"
                  >
                    Other Projects
                  </motion.h2>
                  <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8">
                    {getProjectPairs(otherProjects).map((pair, pairIndex) => (
                      <div key={pairIndex} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {pair.map((project) => (
                          <ProjectCard
                            key={project.id}
                            project={project}
                            cardHoverVariants={cardHoverVariants}
                          />
                        ))}
                      </div>
                    ))}
                  </motion.div>
                </section>
              )}

              {!loading && projects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-12 sm:py-16 bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl shadow-sm border border-slate-700/50"
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-300 mb-2">No projects found</h2>
                  <p className="text-sm sm:text-base text-slate-400">Check back later for project updates</p>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ project, cardHoverVariants, onClick }) => {
  const navigate = useNavigate();
  return (
    <motion.article
      whileHover="hover"
      variants={cardHoverVariants}
      className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden flex flex-col border border-slate-700/50 group"
      style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(120, 100, 250, 0.07), transparent 25%)' }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      {project.image && (
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-50 z-10"></div>
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7 }}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-3 bg-black/50 p-4 rounded-lg">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-slate-800 p-2 rounded-full text-slate-800 dark:text-white hover:bg-indigo-500 hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-slate-800 p-2 rounded-full text-slate-800 dark:text-white hover:bg-indigo-500 hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="p-5 sm:p-6 flex-grow flex flex-col relative z-10">
        <h2
          onClick={(e) => {
            e.stopPropagation();
            onClick(project.id);
          }}
          className="text-xl sm:text-2xl font-bold text-white mb-3 line-clamp-2 group-hover:text-indigo-300 transition-colors duration-300 cursor-pointer"
        >
          {project.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mb-4 sm:mb-5 line-clamp-3 leading-relaxed">
          {project.description}
        </p>
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.05 }}
                className="px-2.5 py-1 text-xs rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 cursor-pointer backdrop-blur-sm shadow-sm hover:shadow-indigo-600/20 transition-all duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
          
          <motion.div
            whileHover={{ x: 5 }}
            onClick={() => navigate(`/project/${project.id}`)}
            className="inline-flex items-center text-indigo-400 font-medium text-sm sm:text-base group-hover:text-indigo-300 transition-colors duration-300 cursor-pointer"
          >
            View details
            <ArrowRight size={16} className="ml-1.5 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.div>
        </div>

      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </motion.article>
  );
};

export default Projects;