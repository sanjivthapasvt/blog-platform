import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaHtml5, FaCss3Alt, FaJs, FaPython, FaGitAlt, FaGithub } from "react-icons/fa";
import { SiTailwindcss, SiDjango, SiFastapi,SiVite, SiElectron, SiObsidian, SiHyprland, SiGnubash, SiSupabase,SiVercel ,SiRender , SiPostgresql, SiLinux, SiArchlinux } from "react-icons/si";

export default function About() {
  const techStack = [
    { name: "Python", icon: <FaPython />, color: "text-blue-500" },
    { name: "Django", icon: <SiDjango />, color: "text-green-700" },
    { name: "Linux", icon: <SiLinux />, color: "text-yellow-500" },
    { name: "React", icon: <FaReact />, color: "text-blue-400" },
    { name: "Bash", icon: <SiGnubash />, color: "text-green-300" },
    { name: "HTML5", icon: <FaHtml5 />, color: "text-orange-500" },
    { name: "CSS3", icon: <FaCss3Alt />, color: "text-blue-500" },
    { name: "JavaScript", icon: <FaJs />, color: "text-yellow-400" },
    { name: "Electron", icon: <SiElectron />, color: "text-blue-500" },
    { name: "Supabase", icon: <SiSupabase />, color: "text-emerald-500" },
    { name: "Vercel", icon: <SiVercel />, color: "text-grtay-900" },
    { name: "Render", icon: <SiRender />, color: "text-indigo-600" },
    { name: "Vite", icon: <SiVite />, color: "text-purple-500" },
    { name: "Hyprland", icon: <SiHyprland />, color: "text-cyan-400" },
    { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-cyan-400" },
    { name: "FastAPI", icon: <SiFastapi />, color: "text-teal-500" },
    { name: "PostgreSQL", icon: <SiPostgresql />, color: "text-blue-400" },
    { name: "Git", icon: <FaGitAlt />, color: "text-orange-600" },
    { name: "GitHub", icon: <FaGithub />, color: "text-gray-300" },
    { name: "Arch Linux", icon: <SiArchlinux />, color: "text-blue-500" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      y: -5,
      scale: 1.05,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-left"
        >
          <h1 className="text-4xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
              Hey 👋, I'm Sanjiv Thapa
            </span>
          </h1>
          <p className="text-gray-400 mt-2">
            🔭 A Tech Enthusiast who likes to play around with Computers and stuff
          </p>
        </motion.div>

        {/* About Me Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-10 text-left"
        >
          <h2 className="text-3xl font-semibold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              💫 About Me:
            </span>
          </h2>
          <ul className="space-y-4 text-gray-300">
            <motion.li 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-start"
            >
              <span className="mr-2 text-indigo-400">-</span>
              <span>🌱 I'm currently learning <strong className="text-indigo-300">FastAPI, Django</strong></span>
            </motion.li>
            <motion.li 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-start"
            >
              <span className="mr-2 text-indigo-400">-</span>
              <span>👨‍💻 I'm currently learning how to code properly and I have at least learnt something, I think… 🤷‍♂️</span>
            </motion.li>
            <motion.li 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-start"
            >
              <span className="mr-2 text-indigo-400">-</span>
              <span>💬 Ask me about <strong className="text-indigo-300">anything, Except Maths 😅</strong></span>
            </motion.li>
            <motion.li 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-start"
            >
              <span className="mr-2 text-indigo-400">-</span>
              <span>📫 How to reach me <strong className="text-indigo-300">thapasvt12@gmail.com</strong></span>
            </motion.li>
            <motion.li 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex items-start"
            >
              <span className="mr-2 text-indigo-400">-</span>
              <span>⚡ Fun fact <strong className="text-indigo-300">I use Arch btw</strong></span>
            </motion.li>
          </ul>
        </motion.div>

        {/* Tech Stack Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-left"
        >
          <h2 className="text-3xl font-semibold mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              🛠️ My Tech Stack
            </span>
          </h2>
          
          <motion.div 
            className="relative p-6 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 shadow-xl"
            style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(120, 100, 250, 0.07), transparent 25%)' }}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 opacity-30"></div>
            
            {/* Top horizontal line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
            
            <div className="grid grid-cols-3 md:grid-cols-5 gap-6 relative z-10">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center justify-center p-3 md:p-4 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/20 hover:border-indigo-500/30 transition-all duration-300 group"
                  variants={itemVariants}
                  whileHover="hover"
                >
                  <div className={`text-3xl md:text-4xl mb-2 ${tech.color} group-hover:scale-110 transition-transform duration-300`}>
                    {tech.icon}
                  </div>
                  <span className="text-xs md:text-sm text-gray-300 group-hover:text-indigo-300 transition-colors duration-300">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
            
            {/* Bottom horizontal line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
          </motion.div>
        </motion.div>

        {/* GitHub Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="mt-16 text-left"
        >
          <h2 className="text-3xl font-semibold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              🔥 GitHub Streak
            </span>
          </h2>
          <motion.div 
            className="mt-6 flex justify-start"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative p-2 rounded-lg border border-slate-700/50 bg-gradient-to-br from-slate-800/50 to-slate-900/50 shadow-xl overflow-hidden">
              {/* Border glow */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-indigo-500/5 to-purple-500/5"></div>
              
              <img
                src="https://camo.githubusercontent.com/9a0faded4de5a37cb65f732079d22def1f1e3e66b54295763581470b08addb36/68747470733a2f2f6e69727a616b2d73747265616b2d73746174732e76657263656c2e6170702f3f757365723d73616e6a69767468617061737674267468656d653d67727576626f7826686964655f626f726465723d66616c7365"
                alt="GitHub Streak"
                className="max-w-full h-auto rounded-lg relative z-10"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}