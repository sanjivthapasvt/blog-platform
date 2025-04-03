import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Quote } from "lucide-react";
import ReactPlayer from "react-player";

const Love = () => {
  const baseUrl = import.meta.env.VITE_API_URL + "/love/";
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeItemIndex, setActiveItemIndex] = useState(null);

  //favorite quotes array
  const favoriteQuotes = [
    {
      quote:
        "Intelligence is the ability to avoid doing work, yet getting the work done.",
      author: "Linus Torvalds",
    },
    {
      quote:
        "I like offending people, because I think people who get offended should be offended.",
      author: "Linus Torvalds",
    },
  ];

  // Fetch love items from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(baseUrl);
        // Sort items by id in ascending order
        const sortedItems = response.data.sort((a, b) => a.id - b.id);
        setItems(sortedItems);
      } catch (error) {
        console.error("Error fetching love items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
      },
    },
  };

  const fadeInUpVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Loading section
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-black">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
            className="h-16 w-16 border-t-2 border-b-2 border-indigo-500 rounded-full"
          />
          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
            className="absolute inset-0 h-16 w-16 border-l-2 border-r-2 border-pink-400 rounded-full"
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-indigo-300"
        >
          Loading lovely things...
        </motion.p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white pb-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-5xl relative z-10">
        {/* Header */}
        <div className="max-w-7xl mx-auto">
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-4 sm:mb-6 text-center"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                Things I love
              </span>
            </h1>
          </motion.header>

          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 196 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>

        {/* Items section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {items.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="text-center mt-10 p-8 rounded-xl bg-gray-800/50 border border-gray-700/50 max-w-md mx-auto backdrop-blur-sm"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                No Items Found
              </h2>
              <p className="text-gray-300 mb-6">
                There are no items to display at the moment.
              </p>
            </motion.div>
          ) : (
            items.map((item, index) => (
              <motion.div
                key={item.id}
                className="mb-20 relative"
                variants={itemVariants}
                onViewportEnter={() => setActiveItemIndex(index)}
                viewport={{ once: false, amount: 0.3 }}
              >
                {/* Item title */}
                <div className="mb-6 mt-10 text-center">
                  <h2 className="text-4xl sm:text-3xl font-semibold text-white inline-block">
                    {item.title}
                  </h2>
                  <motion.div
                    className="h-1 mt-5 bg-indigo-500 rounded-full mt-2"
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: "100%", opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    viewport={{ once: true }}
                  />
                </div>

                {/* video or image section */}
                <div className="relative mt-10 mb-8">
                  <motion.div
                    className="w-full overflow-hidden rounded-lg shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  >
                    <div className="w-full max-w-[950px] aspect-video cursor-pointer mx-auto">
                      {item.video ? (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.4 }}
                          className="relative"
                        >
                          <ReactPlayer
                            url={item.video}
                            playing={false}
                            controls
                            width="100%"
                            height="100%"
                            className="rounded-lg"
                            light={item.image}
                          />
                          <motion.div
                            className="absolute inset-0 rounded-lg"
                            initial={{
                              boxShadow: "0 0 0 rgba(99, 102, 241, 0)",
                            }}
                            whileHover={{
                              boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)",
                            }}
                          />
                        </motion.div>
                      ) : (
                        <motion.div
                          className="relative"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="object-cover rounded-lg w-full h-full"
                          />
                          <motion.div
                            className="absolute inset-0 rounded-lg"
                            initial={{
                              boxShadow: "0 0 0 rgba(99, 102, 241, 0)",
                            }}
                            whileHover={{
                              boxShadow: "0 0 20px rgba(99, 102, 241, 0.5)",
                            }}
                          />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>

                  {/* Decorative elements only on mobile*/}
                  <motion.div
                    className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-indigo-500 sm:hidden"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    viewport={{ once: true }}
                  />
                  <motion.div
                    className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-indigo-500 sm:hidden"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    viewport={{ once: true }}
                  />
                </div>

                {/* Item description */}
                <motion.div
                  className="prose prose-invert prose-lg max-w-none"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <p className="text-lg leading-relaxed text-gray-300 whitespace-pre-line backdrop-blur-sm rounded-lg p-4 bg-gray-900/30">
                    {item.description}
                  </p>
                </motion.div>

                {/* divider */}
                {index !== items.length && (
                  <motion.div
                    className="w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent my-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  />
                )}
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Quotes section*/}
        <motion.div
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-24"
        >
          <motion.div className="flex items-center justify-center mb-10 space-x-3">
            <motion.div
              animate={{ rotate: [0, 15, 0, -15, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            >
              <Quote size={30} className="text-indigo-400" />
            </motion.div>
            <h2 className="text-3xl sm:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-300">
              Favorite Quotes
            </h2>
            <motion.div
              animate={{ rotate: [0, -15, 0, 15, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
            >
              <Quote size={30} className="text-indigo-400" />
            </motion.div>
          </motion.div>

          <div className="grid cursor-pointer grid-cols-1 md:grid-cols-2 gap-8">
            {favoriteQuotes.map((quote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.1 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
                  backgroundColor: "rgba(55, 65, 81, 0.7)",
                }}
                className="p-6 rounded-xl bg-gray-800/50 border border-gray-700/50 transition-all duration-300 backdrop-blur-sm relative overflow-hidden group"
                viewport={{ once: true, amount: 0.6 }}
              >
                {/* quote icon */}
                <motion.div
                  initial={{ opacity: 0.1 }}
                  whileHover={{ opacity: 0.2 }}
                  className="absolute -right-4 -bottom-6 pointer-events-none"
                >
                  <Quote size={80} className="text-indigo-500/30" />
                </motion.div>

                {/* Quote text */}
                <p className="text-gray-200 italic mb-4 z-10 relative">
                  "{quote.quote}"
                </p>

                {/* Author */}
                <motion.p
                  className="text-indigo-300 text-right font-semibold flex items-center justify-end space-x-2"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.span
                    initial={{ width: 0 }}
                    whileInView={{ width: "20px" }}
                    transition={{ delay: 0.5 + index * 0.2, duration: 0.4 }}
                    className="bg-indigo-400 inline-block"
                  />
                  <span>— {quote.author}</span>
                </motion.p>

                {/* Background hover effect */}
                <motion.div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Love;
