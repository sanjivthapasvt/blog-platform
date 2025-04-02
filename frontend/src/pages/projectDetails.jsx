import { React, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import ReactPlayer from "react-player";

const ProjectDetail = () => {
  const baseUrl = import.meta.env.VITE_API_URL + "/project/";
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch project
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectResponse = await axios.get(`${baseUrl}${id}/`);
        setProject(projectResponse.data);
        // Set page title based on project title
        document.title = `${projectResponse.data.title} | Sanjiv Thapa`;
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchProject()]);
      setLoading(false);
    };

    fetchData();

    // Reset title when component unmounts
    return () => {
      document.title = "Sanjiv Thapa";
    };
  }, [id]);

  //loading section
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-black">
        <motion.div
          animate={{
            rotate: 360,
            transition: { duration: 1, ease: "linear", repeat: Infinity },
          }}
          className="h-12 w-12 border-t-2 border-b-2 border-indigo-500 rounded-full"
        />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 rounded-xl bg-gray-800/50 border border-gray-700/50 max-w-md"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Project Not Found
          </h2>
          <p className="text-gray-300 mb-6">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/projects")}
            className="px-4 py-2 cursor-pointer bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-300 flex items-center justify-center space-x-2"
          >
            <ArrowLeft size={18} />
            <span>Back to Projects</span>
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pb-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Back button */}
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => navigate("/projects")}
          className="flex cursor-pointer items-center space-x-2 text-indigo-400 hover:text-indigo-300 transition-colors duration-300 py-6"
        >
          <ArrowLeft size={18} />
          <span>Back to all projects</span>
        </motion.button>

        {/* Project header */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-3xl text-center sm:text-4xl md:text-5xl font-bold pb-7 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-300">
            {project.title}
          </h1>
        </motion.div>

        {/* Featured image or video*/}

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative mb-6 flex justify-center items-center"
        >
          <div className="w-full max-w-[900px] aspect-video">
            {project.video ? (
              <ReactPlayer
                url={project.video}
                playing={true}
                controls
                width="100%"
                height="100%"
              />
            ) : (
              <img
                src={project.image}
                alt="Featured"
                className="object-cover rounded-lg"
              />
            )}
          </div>
        </motion.div>

        {/* Project description */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose prose-invert prose-lg max-w-none mb-16"
        >
          <p className="text-lg leading-relaxed text-gray-300 whitespace-pre-line">
            {project.description}
          </p>

          {/* technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {project.technologies.map((technologies, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 cursor-pointer hover:bg-indigo-800/50 transition-colors duration-300"
                >
                  {technologies}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
