import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";

const Home = () => {
  const baseUrl = "http://127.0.0.1:8000/api";
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for login success message from location state
    if (location.state?.showLoginSuccess) {
      toast.success("You've successfully logged in.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // Clear the state
      window.history.replaceState({}, document.title);
    }

    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/posts/`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        toast.error("Error loading posts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [location]);

  // chunk posts into pairs
  const getPostPairs = () => {
    const pairs = [];
    for (let i = 0; i < posts.length; i += 2) {
      pairs.push(posts.slice(i, i + 2));
    }
    return pairs;
  };

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

  const handleTitleClick = (postId) => {
    navigate(`/posts/${postId}`);
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
              Explore Latest Posts
            </span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto"
          >
            Discover thought-provoking articles and stay updated with the latest insights
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
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            {getPostPairs().map((pair, pairIndex) => (
              <div key={pairIndex} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pair.map((post, index) => (
                  <motion.article
                    key={post.id}
                    whileHover="hover"
                    variants={cardHoverVariants}
                    className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col h-full"
                  >
                    {post.img && (
                      <div className="relative h-48 overflow-hidden">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                          src={post.img}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="p-6 flex-grow flex flex-col">
                      <div className="flex items-center mb-3">
                        <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                          {new Date(post.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="mx-2 text-slate-300 dark:text-slate-600">•</span>
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                          By {post.author || "Unknown"}
                        </span>
                      </div>
                      
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 cursor-pointer">
                        {post.title}
                      </h2>
                      
                      <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                        {post.content.slice(0, 200)}...
                      </p>
                      
                      <div className="mt-auto">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, index) => (
                            <motion.span
                              key={index}
                              whileHover={{ scale: 1.05 }}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="px-2 py-1 text-xs rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 cursor-pointer"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                        
                        <motion.button
                          whileHover={{ x: 5 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/posts/${post.id}`);
                          }}
                          className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 cursor-pointer"
                        >
                          Read more
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            ))}
          </motion.div>
        )}
        
        {!loading && posts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 bg-white dark:bg-slate-800 rounded-xl shadow-sm"
          >
            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">No posts found</h2>
            <p className="text-slate-600 dark:text-slate-400">Check back later for new content</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Home;