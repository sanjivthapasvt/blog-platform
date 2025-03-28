import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const PostDetail = () => {
  const baseUrl = "http://127.0.0.1:8000/api/posts/";
  const { id } = useParams();
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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#1f2937",
      color: "#fff",
      customClass: {
        popup: "dark-theme",
        title: "dark-theme",
        content: "dark-theme",
        confirmButton: "dark-theme",
        cancelButton: "dark-theme",
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

  if (loading) return <p>Loading...</p>;
  if (!post) return <p className="text-red-500 text-center">Post not found.</p>;

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-black text-white">
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
      <div className="mx-auto bg-gradient-to-br from-gray-900 to-black p-6 rounded-lg">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <p className="text-gray-400">
          By{" "}
          <span className="text-blue-400 cursor-pointer">
            {post.author || "Unknown"}
          </span>{" "}
          on {new Date(post.created_at).toDateString()}
        </p>
        {post.img && (
          <img
            src={post.img}
            alt={post.title}
            className="w-full max-h-[500px] object-cover mt-4"
          />
        )}
        <p className="mt-4 text-gray-300">{post.content}</p>

        {/* Comments Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Comments</h2>
          {comments.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {comments.map((comment) => (
                <li
                  key={comment.id}
                  className="p-4 bg-gray-800 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="text-gray-300">{comment.content}</p>
                    <p className="text-sm text-gray-500">
                      By {comment.author || "Anonymous"} on{" "}
                      {new Date(comment.created_at).toDateString()}
                    </p>
                  </div>
                  {loggedInUser?.username === comment.author && (
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      Delete
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No comments yet.</p>
          )}
        </div>

        {/* Add Comment Section */}
        <div className="mt-6">
          {localStorage.getItem("token") ? (
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment..."
                className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400"
                rows="4"
              />
              {postError && <p className="text-red-500">{postError}</p>}
              <button
                type="submit"
                disabled={isPosting}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
              >
                {isPosting ? "Posting..." : "Post Comment"}
              </button>
            </form>
          ) : (
            <p className="text-gray-400">
              Please{" "}
              <Link
                to="/auth"
                className="text-blue-400 underline cursor-pointer"
              >
                log in
              </Link>{" "}
              to post a comment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
