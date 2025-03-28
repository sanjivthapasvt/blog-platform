import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black p-6 w-full">
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
      <h1 className="text-3xl font-bold mb-6 text-white">Latest Posts</h1>

      {loading ? (
        <p className="text-white">Loading posts...</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="bg-gradient-to-br from-gray-900 to-black text-white shadow-lg rounded-lg p-6 mb-6"
          >
            {post.img && (
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
            )}
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <p className="text-gray-400">
              By{" "}
              <span className="text-blue-400">{post.author || "Unknown"}</span>{" "}
              on {new Date(post.created_at).toDateString()}
            </p>
            <p className="text-gray-300 mt-2">
              {post.content.slice(0, 150)}...
            </p>
            <button
              onClick={() => navigate(`/posts/${post.id}`)}
              className="mt-4 cursor-pointer text-blue-400 hover:underline"
            >
              Read more →
            </button>
            <div className="mt-4">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-700 px-3 py-1 rounded-full text-sm mr-2">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
