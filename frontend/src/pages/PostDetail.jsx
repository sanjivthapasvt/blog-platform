import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Clock, User, ArrowLeft, MessageCircle, Send, Trash2 } from "lucide-react";

const PostDetail = () => {
  const baseUrl = import.meta.env.VITE_API_URL+"/posts/";
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState("");

  // Get user data from localStorage
  const userData = localStorage.getItem("user");
  const loggedInUser = userData ? JSON.parse(userData) : null;

  // Fetch post and comments
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postResponse = await axios.get(`${baseUrl}${id}/`);
        setPost(postResponse.data);
        // Set page title based on post title
        document.title = `${postResponse.data.title} | Sanjiv Thapa`;
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const commentsResponse = await axios.get(`${baseUrl}${id}/comments/`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchPost(), fetchComments()]);
      setLoading(false);
    };

    fetchData();
    
    // Reset title when component unmounts
    return () => {
      document.title = "Sanjiv Thapa";
    };
  }, [id]);

  // Handle comment posting
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    setIsPosting(true);
    setPostError("");

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${baseUrl}${id}/comments/`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment("");
      // Refresh comments after posting
      const commentsResponse = await axios.get(`${baseUrl}${id}/comments/`);
      setComments(commentsResponse.data);

      // Show success toast
      toast.success("Comment added successfully!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error posting comment:", error);
      setPostError(
        error.response?.status === 401
          ? "You are not authorized. Please log in again."
          : "Failed to post comment. Please try again."
      );

      // Show error toast
      toast.error(
        error.response?.status === 401
          ? "You are not authorized. Please log in again."
          : "Failed to post comment. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
    } finally {
      setIsPosting(false);
    }
  };

  // Handle comment deletion with SweetAlert2
  const handleDeleteComment = async (commentId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#1e293b",
      color: "#fff",
      customClass: {
        popup: "rounded-lg border border-slate-700",
        title: "text-xl font-bold text-white",
        content: "text-slate-300",
        confirmButton: "rounded-lg text-sm",
        cancelButton: "rounded-lg text-sm",
      },
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You need to be logged in to delete comments.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          return;
        }

        const response = await axios.delete(
          `${baseUrl}${id}/comments/${commentId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 204) {
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.id !== commentId)
          );

          // Show success toast
          toast.success("Comment has been deleted.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
        let errorMessage = "Failed to delete comment. Please try again.";

        if (error.response?.status === 401) {
          errorMessage = "You are not authorized to delete this comment.";
        } else if (error.response?.status === 404) {
          errorMessage = "Comment not found.";
        }

        // Show error toast
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-black">
        <motion.div 
          animate={{ 
            rotate: 360,
            transition: { duration: 1, ease: "linear", repeat: Infinity }
          }}
          className="h-12 w-12 border-t-2 border-b-2 border-indigo-500 rounded-full"
        />
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 rounded-xl bg-gray-800/50 border border-gray-700/50 max-w-md"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Post Not Found</h2>
          <p className="text-gray-300 mb-6">The post you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition duration-300 flex items-center justify-center space-x-2"
          >
            <ArrowLeft size={18} />
            <span>Back to Home</span>
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
        theme="dark"
        limit={3}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Back button */}
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 transition-colors duration-300 py-6"
        >
          <ArrowLeft size={18} />
          <span>Back to all posts</span>
        </motion.button>
        
        {/* Post header */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-300">
            {post.title}
          </h1>
          
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center">
              <User size={16} className="mr-2 text-indigo-400" />
              <span className="text-indigo-300">{post.author || "Unknown"}</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2 text-indigo-400" />
              <span>{new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long', 
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center">
              <MessageCircle size={16} className="mr-2 text-indigo-400" />
              <span>{comments.length} comment{comments.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </motion.div>
        
        {/* Featured image */}
        {post.img && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative mb-10 rounded-xl overflow-hidden shadow-xl shadow-black/30"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-30 z-10"></div>
            <img
              src={post.img}
              alt={post.title}
              className="w-full h-auto max-h-[500px] object-cover"
            />
          </motion.div>
        )}
        
        {/* Post content */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose prose-invert prose-lg max-w-none mb-16"
        >
          <p className="text-lg leading-relaxed text-gray-300 whitespace-pre-line">
            {post.content}
          </p>
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 cursor-pointer hover:bg-indigo-800/50 transition-colors duration-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
        
        {/* Comments Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
            <MessageCircle size={20} className="mr-2 text-indigo-400" />
            Comments ({comments.length})
          </h2>
          
          {/* Add Comment Section */}
          <div className="mb-8">
            {localStorage.getItem("token") ? (
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div className="relative">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full p-4 border border-gray-700/70 rounded-lg bg-slate-900/80 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all duration-300"
                    rows="4"
                  />
                  {postError && (
                    <p className="text-red-400 text-sm mt-2 pl-1">{postError}</p>
                  )}
                </div>
                <motion.button
                  type="submit"
                  disabled={isPosting}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className="bg-indigo-600 text-white py-2 cursor-pointer px-6 rounded-lg hover:bg-indigo-500 transition-colors duration-300 flex items-center space-x-2 shadow-lg shadow-indigo-900/30 disabled:opacity-70"
                >
                  <Send size={16} className={isPosting ? "animate-pulse" : ""} />
                  <span>{isPosting ? "Posting..." : "Post Comment"}</span>
                </motion.button>
              </form>
            ) : (
              <div className="bg-slate-800/70 rounded-lg p-6 text-center border border-slate-700/50">
                <p className="text-gray-300 mb-3">
                  Please log in to post a comment
                </p>
                <Link
                  to="/auth"
                  className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-500 transition-colors duration-300"
                >
                  Log In / Sign Up
                </Link>
              </div>
            )}
          </div>
          
          {/* Comments list */}
          {comments.length > 0 ? (
            <motion.ul 
              className="space-y-6"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
              initial="hidden"
              animate="show"
            >
              {comments.map((comment, index) => (
                <motion.li
                  key={comment.id}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: { opacity: 1, y: 0 }
                  }}
                  className="p-5 bg-slate-800/50 rounded-lg border border-slate-700/30 transition-all duration-300 hover:bg-slate-800/70"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-600/30 flex items-center justify-center text-indigo-300 font-medium text-sm">
                        {comment.author ? comment.author.charAt(0).toUpperCase() : 'A'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-200">
                          {comment.author || "Anonymous"}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(comment.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    {loggedInUser?.username === comment.author && (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-red-400 hover:text-red-300 transition-colors cursor-pointer duration-300"
                        title="Delete comment"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    )}
                  </div>
                  
                  <div className="mt-3 pl-11">
                    <p className="text-gray-300 leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <div className="text-center py-10 text-gray-400">
              <MessageCircle size={30} className="mx-auto mb-3 text-gray-500" />
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PostDetail;