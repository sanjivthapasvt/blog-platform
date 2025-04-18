import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  ChevronRight,
  Clock,
  User,
  ArrowRight,
  Archive,
  Calendar
} from "lucide-react";

const ArchivePage = () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [archivedPosts, setArchivedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [allTags, setAllTags] = useState([]);
  const [years, setYears] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArchivedPosts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/posts/archived`);
        setArchivedPosts(response.data);
        
        const tags = new Set();
        response.data.forEach((post) => {
          post.tags.forEach((tag) => tags.add(tag));
        });
        setAllTags(Array.from(tags));
        
        // Extract all unique years from post dates
        const yearsSet = new Set();
        response.data.forEach((post) => {
          const year = new Date(post.created_at).getFullYear();
          yearsSet.add(year);
        });
        setYears(Array.from(yearsSet).sort((a, b) => b - a)); // Sort years in descending order
      } catch (error) {
        console.error("Error fetching archived posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArchivedPosts();
  }, []);

  // Filter posts based on search term, selected tag, and year
  const filteredPosts = archivedPosts.filter((post) => {
    const matchesSearch =
      searchTerm === "" ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = selectedTag === "" || post.tags.includes(selectedTag);
    
    const matchesYear = 
      selectedYear === "" || 
      new Date(post.created_at).getFullYear().toString() === selectedYear;
    
    return matchesSearch && matchesTag && matchesYear;
  });

  // Chunk posts into pairs for larger screens
  const getPostPairs = () => {
    const pairs = [];
    for (let i = 0; i < filteredPosts.length; i += 2) {
      pairs.push(filteredPosts.slice(i, i + 2));
    }
    return pairs;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -8,
      boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-indigo-900 dark:text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-600">
                <Archive className="inline-block mr-2 mb-1" size={28} />
                Post Archives
              </span>
            </h1>

            {/* Responsive Search and Filter bar */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-3xl mx-auto mt-4 sm:mt-6">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-gray-400 sm:w-5 sm:h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search archives..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 w-full rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base text-gray-800 dark:text-gray-200"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {/* Year filter */}
                <div className="relative w-full sm:w-auto">
                  <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                    <Calendar size={16} className="text-gray-400 sm:w-5 sm:h-5" />
                  </div>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="pl-8 sm:pl-10 pr-8 sm:pr-10 py-2 appearance-none w-full sm:w-32 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base text-gray-800 dark:text-gray-200"
                  >
                    <option value="">All Years</option>
                    {years.map((year) => (
                      <option key={year} value={year.toString()}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none">
                    <ChevronRight size={16} className="text-gray-400 sm:w-5 sm:h-5" />
                  </div>
                </div>

                {/* Tag filter */}
                <div className="relative w-full sm:w-auto">
                  <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                    <Filter size={16} className="text-gray-400 sm:w-5 sm:h-5" />
                  </div>
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="pl-8 sm:pl-10 pr-8 sm:pr-10 py-2 appearance-none w-full sm:w-40 md:w-44 rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base text-gray-800 dark:text-gray-200"
                  >
                    <option value="">All Tags</option>
                    {allTags.map((tag) => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none">
                    <ChevronRight size={16} className="text-gray-400 sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>
            </div>
          </motion.header>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <motion.div
                animate={{
                  rotate: 360,
                  transition: { duration: 1, ease: "linear", repeat: Infinity },
                }}
                className="h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-purple-500 rounded-full"
              />
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-6 sm:space-y-8"
            >
              {getPostPairs().map((pair, pairIndex) => (
                <div
                  key={pairIndex}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
                >
                  {pair.map((post) => (
                    <motion.article
                      key={post.id}
                      whileHover="hover"
                      variants={cardHoverVariants}
                      className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden flex flex-col border border-slate-700/50 group"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 50% 0%, rgba(120, 100, 250, 0.07), transparent 25%)",
                      }}
                    >
                      {/* Archive indicator */}
                      <div className="absolute top-3 right-3 bg-purple-700/70 text-white text-xs px-2 py-1 rounded-full z-20 backdrop-blur-sm flex items-center">
                        <Archive size={12} className="mr-1" />
                        Archived
                      </div>

                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {post.img && (
                        <div className="relative h-48 sm:h-56 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60 z-10"></div>
                          <motion.img
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.7 }}
                            src={post.img}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 filter saturate-50"
                          />
                        </div>
                      )}

                      <div className="p-5 sm:p-6 flex-grow flex flex-col relative z-10">
                        <div className="flex items-center mb-3 sm:mb-4 space-x-3">
                          <div className="flex items-center text-xs font-medium text-purple-400">
                            <Clock size={14} className="mr-1" />
                            {new Date(post.created_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                          <span className="text-slate-600">•</span>
                          <div className="flex items-center text-xs font-medium text-slate-400">
                            <User size={14} className="mr-1" />
                            {post.author || "Unknown"}
                          </div>
                        </div>

                        <h2 className="text-xl sm:text-2xl cursor-pointer font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors duration-300">
                          {post.title}
                        </h2>

                        <p className="text-sm sm:text-base text-slate-300 mb-4 sm:mb-5 line-clamp-3 leading-relaxed">
                          {post.content.slice(0, 120)}...
                        </p>

                        <div className="mt-auto">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, index) => (
                              <motion.span
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedTag(tag === selectedTag ? "" : tag);
                                }}
                                className={`px-2.5 py-1 text-xs rounded-full ${
                                  tag === selectedTag
                                    ? "bg-purple-500 text-white"
                                    : "bg-purple-900/50 text-purple-300 border border-purple-700/50"
                                } cursor-pointer backdrop-blur-sm shadow-sm hover:shadow-purple-600/20 transition-all duration-300`}
                              >
                                #{tag}
                              </motion.span>
                            ))}
                          </div>

                          <motion.div
                            whileHover={{ x: 5 }}
                            onClick={() => navigate(`/post/${post.id}`)}
                            className="inline-flex items-center cursor-pointer text-purple-400 font-medium text-sm sm:text-base group-hover:text-purple-300 transition-colors duration-300"
                          >
                            View archived post
                            <ArrowRight
                              size={16}
                              className="ml-1.5 group-hover:translate-x-1 transition-transform duration-300"
                            />
                          </motion.div>
                        </div>
                      </div>

                      {/* Bottom shine */}
                      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </motion.article>
                  ))}
                </div>
              ))}
            </motion.div>
          )}

          {!loading && filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12 sm:py-16 bg-gradient-to-b from-slate-800 to-slate-900 rounded-xl shadow-sm border border-slate-700/50"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-slate-300 mb-2">
                No archived posts found
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                {searchTerm || selectedTag || selectedYear
                  ? "Try adjusting your search or filters"
                  : "There are no archived posts yet"}
              </p>
              {(searchTerm || selectedTag || selectedYear) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedTag("");
                    setSelectedYear("");
                  }}
                  className="mt-4 sm:mt-5 px-4 sm:px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors duration-300 text-sm sm:text-base shadow-lg shadow-purple-900/30"
                >
                  Clear filters
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ArchivePage;